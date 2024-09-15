import React, { useEffect, useState } from 'react';
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
import { createPreliminary, editSchedule } from '../../api/scheduleStaffApi.js';
import styles from './style.module.css';

function ScheduleForm({
  modalShow,
  onHide,
  roundData,
  scheduleData,
  type,
  roundId,
  competitionStartTime,
  competitionEndTime,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [examiner, setExaminer] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [award, setAward] = useState([]);
  const [isAutoSchedule, setIsAutoSchedule] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, getValues, reset, watch } = useForm({
    defaultValues: {
      description: type?.description || '',
      roundId: roundData?.id,
      endDate: type?.endDate ? new Date(type.endDate) : null,
      listExaminer: [],
      currentUserId: userInfo?.Id,
      judgedCount: 0,
      awardCount: 0,
      listScheduleSingleExaminer: [
        {
          description: '',
          endDate: null,
          examinerId: '',
          judgedCount: 0,
          awards: [{ awardId: '', awardCount: 0 }]
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

  const getExaminer = async () => {
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
          judgedCount: data.judgedCount,
          currentUserId: userInfo?.Id,
          awards: [
            {
              awardId: award[0]?.awardId,
              awardCount: data.awardCount,
            },
          ],
        };
      } else {
        payload = {
          roundId: roundData?.id,
          currentUserId: userInfo?.Id,
          listScheduleSingleExaminer: data.listScheduleSingleExaminer.map(examiner => ({
            ...examiner,
            awards: [{ awardId: award[0]?.awardId, awardCount: examiner.awards[0].awardCount }]
          }))
        };
      }

      if (type === 'create') {
        await createPreliminary(payload);
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

  useEffect(() => {
    getExaminer();
  }, []);

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

              <h4 className={styles.title}>Ngày chấm</h4>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className={styles.formControl}
                    dateFormat="dd/MM/yyyy"
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

              <h4 className={styles.title}>Số lượng bài chấm</h4>
              <input
                {...register('judgedCount', { required: 'Vui lòng nhập số lượng bài chấm' })}
                className={styles.inputModal}
                type="number"
              />
              {errors.judgedCount && <p className={styles.error}>{errors.judgedCount.message}</p>}

              <h4 className={styles.title}>Số lượng giải thưởng</h4>
              <input
                {...register('awardCount', { required: 'Vui lòng nhập số lượng giải thưởng' })}
                className={styles.inputModal}
                type="number"
              />
              {errors.awardCount && <p className={styles.error}>{errors.awardCount.message}</p>}
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
                      <h5 className={styles.title}>Số lượng bài chấm</h5>
                      <input
                        {...register(`listScheduleSingleExaminer.${index}.judgedCount`, { required: 'Vui lòng nhập số lượng bài chấm' })}
                        className={styles.formControl}
                        type="number"
                      />
                      {errors.listScheduleSingleExaminer?.[index]?.judgedCount && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].judgedCount.message}</p>}
                    </div>
                    <div className="col-md-6">
                      <h5 className={styles.title}>Số lượng giải thưởng</h5>
                      <input
                        {...register(`listScheduleSingleExaminer.${index}.awards.0.awardCount`, { required: 'Vui lòng nhập số lượng giải thưởng' })}
                        className={styles.formControl}
                        type="number"
                      />
                      {errors.listScheduleSingleExaminer?.[index]?.awards?.[0]?.awardCount && <p className={styles.error}>{errors.listScheduleSingleExaminer[index].awards[0].awardCount.message}</p>}
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