import React, { memo, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createContest } from '../../api/contestStaffApi';
import { LoadingButton } from '@mui/lab';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// eslint-disable-next-line react-refresh/only-export-components
function ModalForm({ modalShow, onHide }) {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo === null) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShow]);
  const defaultValues = {
    name: '',
    startTime: '',
    endTime: '',
    description: '',
    content: '',
    logo: '',
    currentUserId: userInfo?.Id,
    educationalLevel: [
      {
        level: 'Bảng A',
        description: 'Mầm non',
        minAge: 3,
        maxAge: 5,
      },
      {
        level: 'Bảng B',
        description: 'Tiểu học',
        minAge: 6,
        maxAge: 10,
      },
    ],
    round: [
      {
        name: 'Vòng sơ khảo',
        startTime: '',
        endTime: '',
        roundNumber: 1,
      },
      {
        name: 'Vòng chung kết',
        startTime: '',
        endTime: '',
        roundNumber: 2,
      },
    ],
  };
  const {
    getValues,
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const {
    fields: levelFields,
    append: appendLevel,
    remove: removeLevel,
  } = useFieldArray({
    control,
    name: 'educationalLevel',
  });

  const {
    fields: roundFields,
    append: appendRound,
    remove: removeRound,
  } = useFieldArray({
    control,
    name: 'round',
  });

  console.log('roundFields', roundFields);

  const handleAddEducationalLevel = () => {
    // Tạo tên bảng mới dựa trên số lượng bảng hiện tại
    const nextLevelName = `Bảng ${String.fromCharCode(
      65 + levelFields.length,
    )}`; // 'A' = 65 trong mã ASCII

    const levelObj = {
      level: nextLevelName,
      description: '',
      minAge: 0,
      maxAge: 0,
    };
    appendLevel(levelObj); // Thêm level mới vào field array
  };

  const handleRemoveEducationalLevelItem = index => {
    // Xóa mục
    removeLevel(index);
    // Sắp xếp lại tên bảng
    const updatedFields = getValues('educationalLevel');
    const updatedFieldsWithNewNames = updatedFields?.map((field, idx) => ({
      ...field,
      level: `Bảng ${String.fromCharCode(65 + idx)}`,
    }));

    // Cập nhật giá trị của field array
    reset({ educationalLevel: updatedFieldsWithNewNames });
  };

  const handleAddRound = () => {
    const roundObj = {
      name: '',
      startTime: '',
      endTime: '',
      roundNumber: roundFields.length + 1,
    };
    appendRound(roundObj);
  };

  const handleRemoveRoundItem = index => {
    removeRound(index);
    const updatedFields = getValues('round');
    const updatedFieldsWithNewNames = updatedFields?.map((field, idx) => ({
      ...field,
      roundNumber: idx + 1,
    }));

    reset({ round: updatedFieldsWithNewNames });
  };
  const competitionStartTime = useWatch({ control, name: 'startTime' });
  const competitionEndTime = useWatch({ control, name: 'endTime' });

  const onHideReset = () => {
    reset(defaultValues);
    onHide();
  };

  // get value on round A and pass to state
  // const handleChangeA = e => {
  //   try {
  //     const { name, value } = e.target;
  //     setFormDataA(prv => ({ ...prv, [name]: value }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // handle submit with the error before adding calling to post api
  const handleSubmitForm = async payload => {
    const startDate = new Date(watch('startTime'));
    const endDate = new Date(watch('endTime'));

    // const round1StartDate = new Date(formData.round1StartTime);
    // const round1EndDate = new Date(formData.round1EndTime);
    // const round2StartDate = new Date(formData.round2StartTime);
    // const round2EndDate = new Date(formData.round2EndTime);

    if (startDate >= endDate) {
      setError('startTime', {
        type: 'manual',
        message: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc',
      });
    }

    const bulkPayload = {
      ...payload,
      createdBy: userInfo?.Id,
      educationalLevel: payload.educationalLevel.map(item => ({
        ...item,
        minAge: parseInt(item.minAge, 10),
        maxAge: parseInt(item.maxAge, 10),
        round: payload.round,
      })),
    };

    // if (round1StartDate < startDate || round1EndDate > endDate) {
    //   formErrors.round1 =
    //     'Vòng sơ khảo phải nằm trong khoảng thời gian cuộc thi';
    // }
    //
    // if (round1StartDate > round1EndDate) {
    //   formErrors.round1 = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    // }
    //
    // if (
    //   round2StartDate < startDate ||
    //   round2EndDate > endDate ||
    //   round2StartDate <= round1EndDate
    // ) {
    //   formErrors.round2 =
    //     'Vòng chung kết phải nằm trong khoảng thời gian cuộc thi và bắt đầu sau khi vòng sơ khảo kết thúc';
    // }
    //
    // if (round2StartDate > round2EndDate) {
    //   formErrors.round2 = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    // }

    if (Object.keys(errors).length === 0) {
      // chỉnh sữa các thông tin cần thiết phải được đưa vào trong db
      setValidated(true);
      postContest(bulkPayload);
      clearErrors();
    } else {
      setValidated(false);
    }
  };

  const postContest = async payload => {
    try {
      setIsLoading(true);
      const { data } = await createContest(payload);
      if (data?.result) {
        toast.success('Tạo cuộc thi thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      setIsLoading(false);
      onHideReset();
    } catch (e) {
      toast.error(e.response?.data?.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setIsLoading(false);
      console.log('err', e);
    }
  };

  // catch if user trying to enter e character
  const handleKeyDown = event => {
    //Chặn nhập bé hơn 3 và lớn hơn 99
    if (
      event.key === 'e' ||
      event.key === '-' ||
      event.key === '+' ||
      event.key === 'E' ||
      event.key === '.'
    ) {
      event.preventDefault();
    }
  };
  const handleInput = event => {
    const value = parseInt(event.target.value, 10);
    // Nếu giá trị nhỏ hơn 3 hoặc lớn hơn 99, reset về giá trị hợp lệ
    if (value > 99) {
      event.target.value = 99;
    }
    event.target.value = event.target.value.replace(/e/gi, '');
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={onHideReset}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Tạo cuộc thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '80vh', overflow: 'hidden' }}>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className={styles.modalForm}>
            {/* thong tin cuoc thi */}
            <div className={styles.first_zone}>
              <h3 className={styles.title_zone}>Thông tin cuộc thi</h3>
              <h4 className={styles.title}>Tên cuộc thi</h4>
              <input
                className={styles.inputModal}
                type="text"
                name="name"
                {...register('name', {
                  required: 'Vui lòng nhập tên của cuộc thi',
                })}
              />
              {/*message tên cuộc thi*/}
              {errors?.name && (
                <p className={styles.error}>{errors.name?.message}</p>
              )}
              <div className={styles.outside}>
                <div className={`row ${styles.data_time}`}>
                  <div className={styles.div_data}>
                    <h5 className={styles.title}>Thời gian bắt đầu</h5>
                    <input
                      type="date"
                      name="startTime"
                      id="startTime"
                      className={styles.formControl}
                      min={currentDate}
                      {...register('startTime', {
                        required: 'Vui lòng chọn thời gian bắt đầu',
                      })}
                    />
                    {/*message thời gian bắt đầu*/}
                    {errors?.startTime && (
                      <p
                        style={{ display: 'inline-block' }}
                        className={styles.error}>
                        {errors.startTime?.message}
                      </p>
                    )}
                  </div>
                  <div className={styles.div_data}>
                    <h4 className={styles.title}>Thời gian kết thúc</h4>
                    <input
                      type="date"
                      name="endTime"
                      id="endTime"
                      className={styles.formControl}
                      {...register('endTime', {
                        required: 'Vui lòng chọn thời gian kết thúc',
                      })}
                      min={
                        competitionStartTime
                          ? new Date(
                              new Date(competitionStartTime).setDate(
                                new Date(competitionStartTime).getDate() + 1,
                              ),
                            )
                              .toISOString()
                              .split('T')[0]
                          : ''
                      }
                    />
                    {/*message thời gian kết thúc*/}
                    {errors?.endTime && (
                      <p
                        style={{ display: 'inline-block' }}
                        className={styles.error}>
                        {errors.endTime?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <h4 className={styles.title}>Nội dung cuộc thi</h4>
              <textarea
                name="content"
                {...register('content', {
                  required: 'Vui lòng nhập nội dung cuộc thi',
                })}></textarea>
              {/*message nội dung cuộc thi*/}
              {errors?.content && (
                <p className={styles.error}>{errors.content?.message}</p>
              )}
            </div>
            {/*ket thuc thong tin cuoc thi */}

            {/* Doi tuong tham gia */}
            <div className={styles.first_zone}>
              <h4 className={styles.title_zone}>Đối tượng tham gia</h4>
              {levelFields.map((item, index) => {
                return (
                  <div key={index} className={styles.levelBlock}>
                    <div className={styles.remove_block}>
                      <h4 className={styles.title}>{item?.level}</h4>

                      {/*Nếu như chỉ có 1 phần tử thì không xuất hiện*/}
                      {levelFields.length > 1 && (
                        <RemoveCircleOutlineIcon
                          style={{ cursor: 'pointer' }}
                          className={styles.icon_remove}
                          onClick={() =>
                            handleRemoveEducationalLevelItem(index)
                          }
                        />
                      )}
                    </div>
                    <div className={styles.levelblock_input}>
                      <div className={styles.input_place}>
                        <span>
                          <p
                            style={{
                              fontSize: '16px',
                              fontWeight: '500',
                              color: '#1f1f2c',
                            }}>
                            Đối tượng:
                          </p>
                          <input
                            className={styles.level_textarea}
                            type="text"
                            name="description"
                            {...register(
                              `educationalLevel.${index}.description`,
                              {
                                required: 'Vui lòng điền thông tin mô tả',
                              },
                            )}
                          />
                        </span>
                        {errors?.educationalLevel?.[index]?.description && (
                          <p className={styles.error}>
                            {errors.educationalLevel[index].description.message}
                          </p>
                        )}
                        <div className={styles.age_box}>
                          <span>
                            <p
                              style={{
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#1f1f2c',
                              }}>
                              Từ tuổi:
                            </p>
                            <input
                              className={styles.level_textarea}
                              type="number"
                              name="minAge"
                              onKeyDown={handleKeyDown}
                              onInput={handleInput}
                              {...register(`educationalLevel.${index}.minAge`, {
                                required: true,
                                min: 3,
                                max: 99,
                              })}
                            />
                          </span>
                          <span>
                            <p
                              style={{
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#1f1f2c',
                              }}>
                              Đến tuổi:
                            </p>
                            <input
                              className={styles.level_textarea}
                              type="number"
                              name="maxAge"
                              onKeyDown={handleKeyDown}
                              onInput={handleInput}
                              {...register(`educationalLevel.${index}.maxAge`, {
                                required: 'Tuổi kết thúc là bắt buộc',
                                max: 99,
                                validate: value => {
                                  const minAge = parseInt(
                                    watch(`educationalLevel.${index}.minAge`),
                                  );
                                  return (
                                    value > minAge ||
                                    'Tuổi phải lớn hơn tuổi bắt đầu ít nhất 1 tuổi'
                                  );
                                },
                              })}
                            />
                          </span>
                        </div>
                        {errors?.educationalLevel?.[index]?.maxAge && (
                          <p className={styles.error}>
                            {errors.educationalLevel[index].maxAge.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/*  Add thêm đối tượng tham gia*/}
              <div className={styles.add_block}>
                <AddCircleOutlineIcon
                  style={{ cursor: 'pointer' }}
                  fontSize={'large'}
                  className={styles.icon_add}
                  onClick={handleAddEducationalLevel}
                />
              </div>
            </div>
            {/* ket thuc doi tuong tham gia */}

            {/* ngay bat dau va ngay ket thuc */}
            <div className={styles.first_zone}>
              <h4 className={styles.title_zone}>Vòng thi</h4>
              <div>
                {roundFields.map((item, index) => {
                  return (
                    <>
                      <div key={index} className={styles.roundBlock}>
                        <div className={` ${styles.remove_block}`}>
                          {item?.name ? (
                            <h5>{item?.name}</h5>
                          ) : (
                            <input
                              type={'text'}
                              name={`round.${index}.name`}
                              id={`round.${index}.name`}
                              placeholder={'Tên vòng thi'}
                              style={{
                                width: '50%',
                              }}
                              className={styles.formControl}
                              {...register(`round.${index}.name`, {
                                required: 'Vui lòng nhập tên vòng thi',
                              })}
                            />
                          )}
                          {errors?.round?.[index]?.name && (
                            <p className={styles.error}>
                              {errors.round[index].name?.message}
                            </p>
                          )}
                          {/*Nếu như chỉ có 2 phần tử thì không xuất hiện*/}
                          {item?.roundNumber > 2 && (
                            <RemoveCircleOutlineIcon
                              style={{ cursor: 'pointer' }}
                              className={styles.icon_remove}
                              onClick={() => handleRemoveRoundItem(index)}
                            />
                          )}
                        </div>

                        <div className="row">
                          <div className="col-md-5">
                            <h5 className={styles.title}>Thời gian bắt đầu</h5>
                            <input
                              type="date"
                              name={`round.${index}.startTime`}
                              id={`round.${index}.startTime`}
                              className={styles.formControl}
                              min={
                                index > 0
                                  ? watch(`round.${index - 1}.endTime`)
                                  : competitionStartTime
                              }
                              max={competitionEndTime}
                              {...register(`round.${index}.startTime`, {
                                required: 'Vui lòng chọn thời gian bắt đầu',
                                // validate: (value) => {
                                //   const previousRoundEndTime = index > 0
                                //     ? watch(`round.${index - 1}.endTime`)
                                //     : competitionStartTime;
                                //
                                //   return value >= previousRoundEndTime
                                //     || 'Thời gian bắt đầu phải sau thời gian kết thúc của vòng trước';
                                // },
                              })}
                            />
                            {errors?.round?.[index]?.startTime && (
                              <p className={styles.error}>
                                {errors.round[index].startTime?.message}
                              </p>
                            )}
                          </div>
                          <div className="col-md-5">
                            <h4 className={styles.title}>Thời gian kết thúc</h4>
                            <input
                              type="date"
                              name={`round.${index}.endTime`}
                              id={`round.${index}.endTime`}
                              className={styles.formControl}
                              min={
                                watch(`round.${index}.startTime`) ||
                                (index > 0
                                  ? watch(`round.${index - 1}.endTime`)
                                  : competitionStartTime)
                              }
                              max={competitionEndTime}
                              {...register(`round.${index}.endTime`, {
                                required: 'Vui lòng chọn thời gian kết thúc',
                                // validate: (value) => {
                                //   const previousRoundEndTime = index > 0
                                //     ? watch(`round.${index - 1}.endTime`)
                                //     : competitionStartTime;
                                //
                                //   return value > previousRoundEndTime
                                //     || 'Thời gian kết thúc phải sau thời gian bắt đầu';
                                // },
                              })}
                            />
                            {errors?.round?.[index]?.endTime && (
                              <p className={styles.error}>
                                {errors.round[index].endTime?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                {errors?.round1 && (
                  <p className={styles.error}>{errors.round1}</p>
                )}
                <div className={styles.add_block}>
                  <AddCircleOutlineIcon
                    style={{ cursor: 'pointer' }}
                    fontSize={'large'}
                    className={styles.icon_add}
                    onClick={handleAddRound}
                  />
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'end' }}>
              <LoadingButton
                type="submit"
                className={styles.btnCreate}
                size="large"
                loading={isLoading}
                loadingPosition="center"
                variant="contained">
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Tạo
                </span>
              </LoadingButton>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ModalForm);
