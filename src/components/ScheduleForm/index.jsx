import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Multiselect from 'multiselect-react-dropdown';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControlLabel, Switch } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getById } from '../../api/awardApi.js';
import { getAll } from '../../api/examinerStaffApi.js';
import { createManualPreliminary, createAutoPreliminary, editSchedule } from '../../api/scheduleStaffApi.js';
import styles from './style.module.css';
import { CircularProgress } from '@mui/material';
import { getAwardForScheduleByRoundId } from '../../api/awrdApi';

function ScheduleForm({
  modalShow,
  onHide,
  roundData,
  type,
  roundId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [examiner, setExaminer] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [award, setAward] = useState([]);
  const [isAutoSchedule, setIsAutoSchedule] = useState(false);
  const [awardLoading, setAwardLoading] = useState(false);
  const [awards, setAwards] = useState([]);
  const [paintingForSchedule, setPaintingForSchedule] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    defaultValues: {
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
          awards: []
        }
      ]
    }
  });

  const {
    fields: examinerFields,
    append: appendExaminer,
    remove: removeExaminer,
  } = useFieldArray({
    control,
    name: 'listScheduleSingleExaminer',
  });

  const fetchAwardId = async (id) => {
    try {
      const { data } = await getById(id);
      setAward(data.result.map((val) => ({
        awardId: val.id,
        name: val.rank,
      })));
    } catch (error) {
      console.error('Error fetching award ID:', error);
    }
  };

  const fetchExaminers = async () => {
    try {
      const { data } = await getAll();
      setExaminer(data.result);
    } catch (error) {
      console.error('Error fetching examiners:', error);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let payload;
      if (isAutoSchedule) {
        payload = {
          description: data.description,
          roundId: roundData?.id,
          endDate: data.endDate,
          listExaminer: data.listExaminer,
          currentUserId: userInfo?.Id
        };
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
              awardCount: parseInt(award.awardCount)
            }))
          }))
        };
      }

      if (type === 'create') {
        if (isAutoSchedule) {
          await createAutoPreliminary(payload);
        } else {
          await createManualPreliminary(payload);
        }
        toast.success('Thêm lịch chấm thi thành công');
      } else {
        await editSchedule(payload);
        toast.success('Chỉnh sửa lịch chấm thành công');
      }
      onHide();
    } catch (error) {
      toast.error(type === 'create' ? 'Thêm lịch chấm thi không thành công' : 'Có lỗi xảy ra vui lòng thử lại');
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleAddExaminer = () => {
    appendExaminer({
      description: '',
      endDate: null,
      examinerId: '',
      judgedCount: 0,
      awards: [{ awardId: '', awardCount: 0 }]
    });
  };

  const fetchAwards = useCallback(async (id) => {
    setAwardLoading(true);
    try {
      const { data } = await getAwardForScheduleByRoundId(id);

      const quantityPainting = data.result.paintingForSchedule; // Số lượng paintings trong schedule
      const list = data.result.listAward;

      const result = list.map(val => ({
        awardId: val.id,
        name: val.rank,
        quantity: 0,
        originalQuantity: val.quantity
      }));

      setAwards(result);
      setPaintingForSchedule(quantityPainting);

      // Initialize awards for each examiner
      setValue('listScheduleSingleExaminer', examinerFields.map(field => ({
        ...field,
        awards: result.map(award => ({ awardId: award.awardId, awardCount: 0 }))
      })));

    } catch (error) {
      console.error('Error fetching awards:', error);
      toast.error('Failed to fetch awards');
    } finally {
      setAwardLoading(false);
    }
  }, []);


  useEffect(() => {
    if (!userInfo) navigate('/login');
    if (modalShow) {
      reset();
      if (roundId) fetchAwards(roundId);
    }
    fetchExaminers();
  }, [modalShow, roundId, userInfo, navigate, reset]);

  useEffect(() => {
    if (!userInfo) navigate('/login');
    if (modalShow) {
      reset();
      if (roundId) {
        fetchAwardId(roundId);
      }
    }
  }, [modalShow, roundId, userInfo, navigate, reset]);

  useEffect(() => {
    if (modalShow && type !== 'create') {
      reset({
        description: type?.description,
        endDate: type?.endDate ? new Date(type.endDate) : null,
        judgedCount: type?.judgedCount,
        awardCount: type?.awards?.[0]?.quantity,
      });
    }
  }, [modalShow, type, reset]);

  return (
    <Modal show={modalShow} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === 'create' ? 'Thêm lịch chấm' : 'Chỉnh sửa lịch chấm'}
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
            label={isAutoSchedule ? 'Tự động' : 'Thủ công'}
          />

          {isAutoSchedule ? (
            <>
              <h4 className={styles.title}>Giám khảo</h4>
              <Controller
                control={control}
                name="listExaminer"
                render={({ field }) => (
                  <Multiselect
                    {...field}
                    displayValue="fullName"
                    onRemove={(selectedList) => field.onChange(selectedList.map(item => item.id))}
                    onSelect={(selectedList) => field.onChange(selectedList.map(item => item.id))}
                    options={examiner}
                    selectedValues={type !== 'create' ? [{ id: type?.id, fullName: type?.examinerName }] : []}
                    placeholder="Chọn giám khảo"
                  />
                )}
              />
              <h4 className={styles.title}>Ngày Chấm</h4>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className={styles.formControl}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}  // Ngăn không cho chọn quá khứ
                  />
                )}
              />

              <h4 className={styles.title}>Mô tả</h4>
              <input
                {...register('description', { required: 'Vui lòng nhập mô tả' })}
                className={styles.inputModal}
                type="text"
              />
              {errors.description && <p className={styles.error}>{errors.description.message}</p>}
            </>
          ) : (
            <div className={styles.first_zone}>
              <h4 className={styles.title_zone}>Lịch chấm cho từng giám khảo</h4>
              {examinerFields.map((item, index) => (
                <div key={item.id} className={styles.roundBlock}>
                  <div className={styles.remove_block}>
                    <h5>Giám khảo {index + 1}</h5>
                    {index > 0 && (
                      <RemoveCircleOutlineIcon
                        className={styles.icon_remove}
                        onClick={() => removeExaminer(index)}
                      />
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <h5 className={styles.title}>Chọn giám khảo</h5>
                      <select
                        {...register(`listScheduleSingleExaminer.${index}.examinerId`, { required: 'Vui lòng chọn giám khảo' })}
                        className={styles.formControl}
                      >
                        <option value="">Chọn giám khảo</option>
                        {examiner.map((ex) => (
                          <option key={ex.id} value={ex.id}>{ex.fullName}</option>
                        ))}
                      </select>
                      {errors.listScheduleSingleExaminer?.[index]?.examinerId && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].examinerId.message}</p>}
                    </div>
                    <div className="col-md-6">
                      <h5 className={styles.title}>Ngày chấm</h5>
                      <Controller
                        control={control}
                        name={`listScheduleSingleExaminer.${index}.endDate`}
                        render={({ field }) => (
                          <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            className={styles.formControl}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}  // Ngăn chọn ngày trong quá khứ
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <h5 className={styles.title}>Mô tả</h5>
                      <input
                        {...register(`listScheduleSingleExaminer.${index}.description`, { required: 'Vui lòng nhập mô tả' })}
                        className={styles.formControl}
                        type="text"
                      />
                      {errors.listScheduleSingleExaminer?.[index]?.description && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].description.message}</p>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <h5 className={styles.title}>Sô lượng bài thi : {paintingForSchedule}</h5>
                      <input
                        {...register(`listScheduleSingleExaminer.${index}.judgedCount`, { required: 'Vui lòng nhập số lượng bài chấm' })}
                        className={styles.formControl}
                        type="number"
                      />
                      {errors.listScheduleSingleExaminer?.[index]?.judgedCount && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].judgedCount.message}</p>}
                    </div>
                    <div className={styles.list_round}>
                      {awardLoading ? (
                        <div className={styles.loadingContainer}>
                          <CircularProgress color="secondary" />
                        </div>
                      ) : (
                        awards.map((award, awardIndex) => (
                          <div key={award.awardId} className={styles.round}>
                            <div>
                              <h4 className={styles.title}>
                                Số Lượng Bài Thi Qua {award.name} : {Math.max(award.originalQuantity - award.quantity, 0)}
                              </h4>
                              <input
                                {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardId`)}
                                type="hidden"
                                value={award.awardId}
                              />
                              <input
                                {...register(`listScheduleSingleExaminer.${index}.awards.${awardIndex}.awardCount`, {
                                  required: 'Vui lòng nhập số lượng',
                                  valueAsNumber: true, // Chuyển đổi giá trị input thành số
                                  validate: (value) => value <= award.originalQuantity || `Số lượng không được vượt quá ${award.originalQuantity}`
                                })}
                                className={styles.formControl}
                                type="number"
                                value={award.quantity}
                                min="0"
                                max={award.originalQuantity} // Giới hạn giá trị lớn nhất
                                onChange={(e) => {
                                  const newValue = Math.min(
                                    award.originalQuantity, // Giới hạn giá trị tối đa không vượt quá originalQuantity
                                    Math.max(0, parseInt(e.target.value) || 0)
                                  );
                                  setAwards(prevAwards =>
                                    prevAwards.map(a =>
                                      a.awardId === award.awardId ? { ...a, quantity: newValue } : a
                                    )
                                  );
                                }}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>


              ))}
              <div className={styles.add_block}>
                <AddCircleOutlineIcon
                  fontSize="large"
                  className={styles.icon_add}
                  onClick={handleAddExaminer}
                />
              </div>
            </div>
          )}

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            className={styles.loadingBtn}
          >
            {type === 'create' ? 'Thêm lịch chấm' : 'Chỉnh sửa'}
          </LoadingButton>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ScheduleForm;