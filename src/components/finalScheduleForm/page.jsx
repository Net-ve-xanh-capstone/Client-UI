import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FormControlLabel, Switch, CircularProgress } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import { getAll } from '../../api/examinerStaffApi';
import { createAutoFinal, createManualFinal } from '../../api/scheduleStaffApi';
import { getAwardForScheduleByRoundId } from '../../api/awrdApi';
import styles from './page.module.css';

const awardOrder = ['Giải Nhất', 'Giải Nhì', 'Giải Ba', 'Giải Khuyến Khích', 'Khác'];
const sortAwards = (awards) => awards.sort((a, b) => awardOrder.indexOf(a.name) - awardOrder.indexOf(b.name));

function FinalSchedule({ modalShow, onHide, roundData, roundId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [examiners, setExaminers] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);
  const [isAutoSchedule, setIsAutoSchedule] = useState(false);
  const [awardLoading, setAwardLoading] = useState(false);
  const [paintingForSchedule, setPaintingForSchedule] = useState(0);
  const [firstPrizeCount, setFirstPrizeCount] = useState(0);
  const [totalAwardedCounts, setTotalAwardedCounts] = useState({});

  const defaultValues = {
    description: '',
    roundId: roundData?.id,
    endDate: null,
    listExaminer: [],
    currentUserId: userInfo?.Id,
    listScheduleSingleExaminer: [
      {
        description: '',
        endDate: null,
        examinerId: '',
        judgedCount: 0,
        awards: [],
      },
    ],
  };

  const { control, register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm({
    defaultValues,
    mode: 'onSubmit',
  });

  const {
    fields: examinerFields,
    append: appendExaminer,
    remove: removeExaminer,
  } = useFieldArray({
    control,
    name: 'listScheduleSingleExaminer',
  });

  const fetchAwards = useCallback(async (id) => {
    setAwardLoading(true);
    try {
      const { data } = await getAwardForScheduleByRoundId(id);

      const quantityPainting = data.result.paintingForSchedule;
      const list = data.result.listAward;

      const result = list.map(val => ({
        awardId: val.id,
        name: val.rank,
        quantity: val.quantity,
        originalQuantity: val.quantity,
      }));
      const sortedAwards = sortAwards(result);
      setAwards(sortedAwards);
      setPaintingForSchedule(quantityPainting);

      const firstPrize = sortedAwards.find(award => award.name === 'Giải Nhất');
      if (firstPrize) {
        setFirstPrizeCount(firstPrize.originalQuantity);
      }

      setValue('listScheduleSingleExaminer', examinerFields.map(field => ({
        ...field,
        awards: result.map(award => ({ awardId: award.awardId, awardCount: 0 })),
      })));

      setTotalAwardedCounts(result.reduce((acc, award) => ({
        ...acc,
        [award.awardId]: 0,
      }), {}));
    } catch (error) {
      console.error('Error fetching awards:', error);
      toast.error('Failed to fetch awards');
    } finally {
      setAwardLoading(false);
    }
  }, [setValue, examinerFields]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name && name.includes('awards') && type === 'change') {
        const newTotalAwardedCounts = { ...totalAwardedCounts };

        awards.forEach(award => {
          newTotalAwardedCounts[award.awardId] = value.listScheduleSingleExaminer.reduce(
            (sum, examiner) =>
              sum + (examiner.awards.find(a => a.awardId === award.awardId)?.awardCount || 0),
            0,
          );
        });

        setTotalAwardedCounts(newTotalAwardedCounts);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, awards, totalAwardedCounts]);

  const calculateRemainingAwards = useCallback((awardId) => {
    const award = awards.find(a => a.awardId === awardId);
    if (!award) return 0;
    return Math.max(award.originalQuantity - (totalAwardedCounts[awardId] || 0), 0);
  }, [awards, totalAwardedCounts]);

  const fetchExaminers = async () => {
    try {
      const { data } = await getAll();
      setExaminers(data.result);
    } catch (error) {
      console.error('Error fetching examiners:', error);
      toast.error('Failed to fetch examiners');
    }
  };

  const validateTotalCounts = (data) => {
    let totalJudgedCount = 0;
    let totalAwardCounts = {};
    let errors = {};

    data.listScheduleSingleExaminer.forEach((examiner) => {
      totalJudgedCount += parseInt(examiner.judgedCount) || 0;
      examiner.awards.forEach((award) => {
        const awardId = award.awardId;
        totalAwardCounts[awardId] = (totalAwardCounts[awardId] || 0) + (parseInt(award.awardCount) || 0);
      });
    });

    if (totalJudgedCount > paintingForSchedule) {
      errors.totalJudgedCount = `Tổng số lượng bài thi (${totalJudgedCount}) vượt quá số lượng bài thi cho phép (${paintingForSchedule})`;
    }

    awards.forEach((award) => {
      if (totalAwardCounts[award.awardId] > award.quantity) {
        errors[award.awardId] = `Tổng số lượng giải ${award.name} (${totalAwardCounts[award.awardId]}) vượt quá số lượng cho phép (${award.quantity})`;
      }
    });

    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const onSubmit = async (data) => {
    const { isValid, errors } = validateTotalCounts(data);
    if (!isValid) {
      Object.keys(errors).forEach(key => {
        toast.error(errors[key]);
      });
      return;
    }

    setIsLoading(true);
    try {
      let payload;
      if (isAutoSchedule) {
        payload = {
          description: data.description,
          roundId: roundData?.id,
          endDate: data.endDate,
          listExaminer: data.listExaminer,
          currentUserId: userInfo?.Id,
        };
        await createAutoFinal(payload);
      } else {
        payload = {
          roundId: roundData?.id,
          currentUserId: userInfo?.Id,
          listScheduleSingleExaminer: data.listScheduleSingleExaminer.map(examiner => ({
            description: examiner.description,
            endDate: examiner.endDate,
            examinerId: examiner.examinerId,
            judgedCount: parseInt(examiner.judgedCount),
            awards: examiner.awards.filter(award => award.awardCount > 0).map(award => ({
              awardId: award.awardId,
              awardCount: parseInt(award.awardCount),
            })),
          })),
        };
        await createManualFinal(payload);
      }
      toast.success('Thêm lịch chấm thi thành công');
      onHide();
    } catch (error) {
      toast.error('Thêm lịch chấm thi không thành công');
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAllState = useCallback(() => {
    reset(defaultValues);
    setIsAutoSchedule(false);
    setAwards([]);
    setPaintingForSchedule(0);
    setTotalAwardedCounts({});
  }, [reset]);

  useEffect(() => {
    if (!modalShow) {
      resetAllState();
    } else if (roundId) {
      fetchAwards(roundId);
    }
  }, [modalShow, roundId, resetAllState]);

  useEffect(() => {
    if (!userInfo) navigate('/login');
    if (modalShow) {
      fetchExaminers();
    }
  }, [modalShow, userInfo, navigate]);

  const handleAddExaminer = () => {
    if (examinerFields.length < firstPrizeCount) {
      appendExaminer({
        description: '',
        endDate: null,
        examinerId: '',
        judgedCount: 0,
        awards: awards.map(award => ({
          awardId: award.awardId,
          awardCount: 0,
        })),
      });
    } else {
      toast.error(`Số lượng giám khảo không nhiều hơn số lượng giải nhất (${firstPrizeCount} giải)`);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      background: 'transparent',
      border: 0,
      color: '#070F2B',
      boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
      height: '5rem',
      minWidth: '20rem',
      fontSize: '1.5rem !important',
      '&:hover': {
        borderColor: 'none',
      },
    }),
    menu: base => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      padding: 0,
    }),
  };

  const renderAutoScheduleForm = () => (
    <>
      <h4 className={styles.title_zone}>Giám Khảo</h4>
      <Controller
        control={control}
        name="listExaminer"
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={examiners.map(examiner => ({
              value: examiner.id,
              label: examiner.fullName,
            }))}
            onChange={(selectedOptions) =>
              field.onChange(selectedOptions.map(option => option.value))
            }
            value={field.value.map(id => {
              const examiner = examiners.find(e => e.id === id);
              return examiner ? { value: examiner.id, label: examiner.fullName } : null;
            }).filter(Boolean)}
            styles={customStyles}
            placeholder="Chọn giám khảo"
          />
        )}
      />

      <h4 className={styles.title_zone}>Ngày Chấm</h4>
      <Controller
        control={control}
        name="endDate"
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={date => field.onChange(date)}
            className={styles.formControl}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        )}
      />

      <h4 className={styles.title}>Mô tả</h4>
      <input
        {...register('description', { required: 'Vui lòng nhập mô tả' })}
        className={styles.inputModal}
        type="text"
      />
      {errors.description && (
        <p className={styles.error}>{errors.description.message}</p>
      )}
    </>
  );

  const renderManualScheduleForm = () => (
    <div className={styles.first_zone}>
      <h4 className={styles.title_zone}>Tạo Lịch Chấm</h4>

      {examinerFields.map((item, index) => (
        <div key={item.id} className={styles.roundBlock}>
          <div className={styles.remove_block}>
            <h5 className={styles.title}>{`Giám Khảo ${index + 1}`}</h5>
            {index > 0 && (
              <RemoveCircleOutline
                className={styles.icon_remove}
                onClick={() => removeExaminer(index)}
              />
            )}
          </div>

          <div className="row">
            <div className="col-md-6">
              <h5 className={styles.title}>Giám Khảo</h5>
              <Controller
                control={control}
                name={`listScheduleSingleExaminer.${index}.examinerId`}
                render={({ field }) => (
                  <Select
                    styles={customStyles}
                    options={examiners.map(examiner => ({
                      value: examiner.id,
                      label: examiner.fullName,
                    }))}
                    onChange={(selectedOption) => field.onChange(selectedOption.value)}
                    value={examiners
                      .filter(examiner => examiner.id === field.value)
                      .map(examiner => ({
                        value: examiner.id,
                        label: examiner.fullName,
                      }))[0]
                    }
                  />
                )}
              />
            </div>

            <div className="col-md-6">
              <h5 className={styles.title}>Ngày Chấm</h5>
              <div className={styles.datePickerContainer}>
                <Controller
                  control={control}
                  name={`listScheduleSingleExaminer.${index}.endDate`}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className={`${styles.formControl} ${styles.datePicker}`}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                    />
                  )}
                />
              </div>
              {errors.listScheduleSingleExaminer?.[index]?.endDate && (
                <p className={styles.error}>
                  {errors.listScheduleSingleExaminer[index].endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h5 className={styles.title}>Mô Tả</h5>
              <input
                {...register(`listScheduleSingleExaminer.${index}.description`)}
                className={styles.formControl}
                type="text"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h5 className={styles.title}>{`Số Lượng Bài Thi : ${paintingForSchedule}`}</h5>
              <input
                {...register(`listScheduleSingleExaminer.${index}.judgedCount`)}
                className={styles.formControl}
                type="number"
                min="0"
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value) || 0);
                  setValue(`listScheduleSingleExaminer.${index}.judgedCount`, value);
                }}
              />
            </div>
          </div>
          <div className="row">

            {awardLoading ? (
              <div className={styles.loadingContainer}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              awards.map((award, awardIndex) => (
                <div className="col-md-6">
                  <div key={award.awardId} className={styles.round}>
                    <input
                      {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardId`)}
                      type="hidden"
                      value={award.awardId}
                    />
                    <h5
                      className={styles.title}>{`Số Bài Thi Đạt ${award.name}: ${calculateRemainingAwards(award.awardId)}`}</h5>
                    <input
                      {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`)}
                      className={styles.formControl}
                      type="number"
                      min="0"
                      onChange={(e) => {
                        const value = Math.max(0, parseInt(e.target.value) || 0);
                        setValue(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`, value);
                      }}
                    />
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      ))}

      <div className={styles.add_block}>
        <AddCircleOutline
          fontSize="large"
          className={styles.icon_add}
          onClick={handleAddExaminer}
        />
      </div>
    </div>
  );

  return (
    <Modal
      show={modalShow}
      onHide={() => {
        resetAllState();
        onHide();
      }}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Thêm lịch chấm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
          <FormControlLabel
            control={
              <Switch
                checked={isAutoSchedule}
                onChange={() => setIsAutoSchedule(!isAutoSchedule)}
                name="scheduleType"
                color="primary"
              />
            }
            label={isAutoSchedule ? 'Tự Động' : 'Thủ Công'}
          />

          {isAutoSchedule
            ? renderAutoScheduleForm()
            : renderManualScheduleForm()}

          <button
            type="submit"
            className={styles.btnCreate}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Lưu'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default FinalSchedule;
