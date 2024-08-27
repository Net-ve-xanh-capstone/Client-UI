import React, { memo, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../CreateModal';
import { createContest } from '../../api/contestStaffApi';
import { LoadingButton } from '@mui/lab';

// eslint-disable-next-line react-refresh/only-export-components
function ModalForm({ modalShow, onHide }) {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [showModalCreate, setShowModalCreate] = useState(false);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    setFormData(intialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShow]);

  const intialState = {
    name: '',
    startTime: '',
    endTime: '',
    description: '',
    content: '',
    logo: '',
    round1StartTime: '',
    round1EndTime: '',
    round2StartTime: '',
    round2EndTime: '',
    currentUserId: userInfo?.Id,
    rank1: 1,
    rank2: 1,
    rank3: 1,
    rank4: 1,
    passRound1: 1,
  };

  const roundA = {
    description: '',
    minAge: 0,
    maxAge: 0,
  };

  const roundB = {
    description: '',
    minAge: 0,
    maxAge: 0,
  };

  // this is stae using for controlling the text input of data
  const [formData, setFormData] = useState(intialState);
  const [formDataA, setFormDataA] = useState(roundA);
  const [formDataB, setFormDataB] = useState(roundB);

  const handleInputChange = event => {
    try {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // get value on round A and pass to state
  const handleChangeA = e => {
    try {
      const { name, value } = e.target;
      setFormDataA(prv => ({ ...prv, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  // get value on the age of A and pass it to the state
  const changeAgeOfA = e => {
    try {
      const { name, value } = e.target;
      setFormDataA(prv => ({ ...prv, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  // get value on round B and pass to state
  const handleChangeB = e => {
    try {
      const { name, value } = e.target;
      setFormDataB(prv => ({ ...prv, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit with the error before adding calling to post api
  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    let formErrors = {};

    const startDate = new Date(formData.startTime);
    const endDate = new Date(formData.endTime);
    const round1StartDate = new Date(formData.round1StartTime);
    const round1EndDate = new Date(formData.round1EndTime);
    const round2StartDate = new Date(formData.round2StartTime);
    const round2EndDate = new Date(formData.round2EndTime);

    if (startDate >= endDate) {
      formErrors.startTime = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    if (round1StartDate < startDate || round1EndDate > endDate) {
      formErrors.round1 =
        'Vòng sơ khảo phải nằm trong khoảng thời gian cuộc thi';
    }

    if (round1StartDate > round1EndDate) {
      formErrors.round1 = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    if (
      round2StartDate < startDate ||
      round2EndDate > endDate ||
      round2StartDate <= round1EndDate
    ) {
      formErrors.round2 =
        'Vòng chung kết phải nằm trong khoảng thời gian cuộc thi và bắt đầu sau khi vòng sơ khảo kết thúc';
    }

    if (round2StartDate > round2EndDate) {
      formErrors.round2 = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    if (Object.keys(formErrors).length === 0) {
      // chỉnh sữa các thông tin cần thiết phải được đưa vào trong db
      const payload = {
        name: formData.name,
        startTime: formData.startTime,
        endTime: formData.endTime,
        content: formData.content,
        createdBy: formData.currentUserId,
        educationalLevel: [
          {
            level: 'Bảng A',
            description: formDataA.description,
            minAge: formDataA.minAge,
            maxAge: formDataA.maxAge,
            round: [
              {
                name: 'Sơ khảo',
                startTime: formData.round1StartTime,
                endTime: formData.round1EndTime,
                roundNumber: 1,
                award: [
                  {
                    rank: 'Vòng loại',
                    quantity: formData.passRound1,
                  },
                ],
              },
              {
                name: 'Vòng Chung Kết',
                startTime: formData.round2StartTime,
                endTime: formData.round2EndTime,
                roundNumber: 2,
                award: [
                  {
                    rank: 'Giải Nhất',
                    quantity: formData.rank1,
                  },
                  {
                    rank: 'Giải Nhì',
                    quantity: formData.rank2,
                  },
                  {
                    rank: 'Giải Ba',
                    quantity: formData.rank3,
                  },
                  {
                    rank: 'Giải Khuyến Khích',
                    quantity: formData.rank4,
                  },
                ],
              },
            ],
          },
          {
            level: 'Bảng B',
            description: formDataB.description,
            minAge: formDataB.minAge,
            maxAge: formDataB.maxAge,
            round: [
              {
                name: 'Sơ khảo',
                startTime: formData.round1StartTime,
                endTime: formData.round1EndTime,
                roundNumber: 1,
                award: [
                  {
                    rank: 'Vòng loại',
                    quantity: formData.passRound1,
                  },
                ],
              },
              {
                name: 'Vòng Chung Kết',
                startTime: formData.round2StartTime,
                endTime: formData.round2EndTime,
                roundNumber: 2,
                award: [
                  {
                    rank: 'Giải Nhất',
                    quantity: formData.rank1,
                  },
                  {
                    rank: 'Giải Nhì',
                    quantity: formData.rank2,
                  },
                  {
                    rank: 'Giải Ba',
                    quantity: formData.rank3,
                  },
                  {
                    rank: 'Giải Khuyến Khích',
                    quantity: formData.rank4,
                  },
                ],
              },
            ],
          },
        ],
      };
      setValidated(true);
      postContest(payload);
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
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
      onHide();
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
    if (event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };
  const handleInput = event => {
    event.target.value = event.target.value.replace(/e/gi, '');
  };
  // catch if user trying to enter e character

  // cancel if user try to input float number
  const keydowFloat = event => {
    if (event.key === '.' || event.key === ',') {
      event.preventDefault();
    }
  };
  const inputFloat = event => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  return (
    <>
      {/* <CreateModal
        show={showModalCreate}
        setShow={setShowModalCreate}
        title={'cuộc thi'}
        callBack={postContest}
      /> */}
      <Modal
        show={modalShow}
        onHide={onHide}
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
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            {/* thong tin cuoc thi */}
            <div className={styles.first_zone}>
              <h3 className={styles.title_zone}>Thông tin cuộc thi</h3>
              <h4 className={styles.title}>Tên cuộc thi</h4>
              <input
                className={styles.inputModal}
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <div className={styles.outside}>
                <div className={`row ${styles.data_time}`}>
                  <div className={styles.div_data}>
                    <h5 className={styles.title}>Thời gian bắt đầu</h5>
                    <input
                      required
                      type="date"
                      name="startTime"
                      id="startTime"
                      className={styles.formControl}
                      value={formData.startTime}
                      onChange={handleInputChange}
                      min={currentDate}
                    />
                  </div>
                  <div className={styles.div_data}>
                    <h4 className={styles.title}>Thời gian kết thúc</h4>
                    <input
                      required
                      type="date"
                      name="endTime"
                      id="endTime"
                      className={styles.formControl}
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              {errors.startTime && (
                <p className={styles.error}>{errors.startTime}</p>
              )}

              <h4 className={styles.title}>Nội dung cuộc thi</h4>
              <textarea
                required
                name="content"
                value={formData.content}
                onChange={handleInputChange}></textarea>
            </div>
            {/*ket thuc thong tin cuoc thi */}

            {/* Doi tuong tham gia */}
            <div className={styles.first_zone}>
              <h4 className={styles.title_zone}>Đối tượng tham gia</h4>
              <div className={styles.levelBlock}>
                <h4 className={styles.title}>Bảng A</h4>
                <div className={styles.levelblock_input}>
                  <div className={styles.input_place}>
                    <span>
                      <p
                        style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#1f1f2c',
                        }}>
                        Mô tả:
                      </p>
                      <input
                        className={styles.level_textarea}
                        required
                        type="text"
                        name="description"
                        value={formDataA.description}
                        onChange={e => handleChangeA(e)}
                      />
                    </span>
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
                          required
                          type="number"
                          name="minAge"
                          value={formDataA.minAge}
                          onKeyDown={handleKeyDown}
                          onInput={handleInput}
                          onChange={e => handleChangeA(e)}
                          min="3"
                          max="99"
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
                          required
                          type="number"
                          name="maxAge"
                          value={formDataA.maxAge}
                          onKeyDown={handleKeyDown}
                          onInput={handleInput}
                          onChange={e => handleChangeA(e)}
                          min="3"
                          max="99"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.levelBlock}>
                <h4 className={styles.title}>Bảng B</h4>
                <div className={styles.levelblock_input}>
                  <div className={styles.input_place}>
                    <span>
                      <p
                        style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#1f1f2c',
                        }}>
                        Mô tả:
                      </p>
                      <input
                        className={styles.level_textarea}
                        required
                        type="text"
                        name="description"
                        value={formDataB.description}
                        onChange={e => handleChangeB(e)}
                      />
                    </span>
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
                          required
                          type="number"
                          name="minAge"
                          value={formDataB.minAge}
                          onKeyDown={handleKeyDown}
                          onInput={handleInput}
                          onChange={e => handleChangeB(e)}
                          min="3"
                          max="99"
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
                          required
                          type="number"
                          name="maxAge"
                          value={formDataB.maxAge}
                          onKeyDown={handleKeyDown}
                          onInput={handleInput}
                          onChange={e => handleChangeB(e)}
                          min="3"
                          max="99"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ket thuc doi tuong tham gia */}

            {/* ngay bat dau va ngay ket thuc */}
            <div className={styles.first_zone}>
              <h4 className={styles.title_zone}>Vòng thi</h4>
              <div style={{ marginLeft: '20px' }}>
                <div className={styles.roundBlock}>
                  <h5>Vòng sơ khảo</h5>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5 className={styles.title}>Thời gian bắt đầu</h5>
                    <input
                      required
                      type="date"
                      name="round1StartTime"
                      id="round1StartTime"
                      className={styles.formControl}
                      value={formData.round1StartTime}
                      onChange={handleInputChange}
                      min={formData.startTime}
                      max={formData.endTime}
                    />
                  </div>
                  <div className="col-md-6">
                    <h4 className={styles.title}>Thời gian kết thúc</h4>
                    <input
                      required
                      type="date"
                      name="round1EndTime"
                      id="round1EndTime"
                      className={styles.formControl}
                      value={formData.round1EndTime}
                      onChange={handleInputChange}
                      min={formData.round1StartTime}
                      max={formData.endTime}
                    />
                  </div>
                </div>
                {errors.round1 && (
                  <p className={styles.error}>{errors.round1}</p>
                )}
                <div className={styles.roundBlock}>
                  <h5>Vòng chung kết</h5>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5 className={styles.title}>Thời gian bắt đầu</h5>
                    <input
                      required
                      type="date"
                      name="round2StartTime"
                      id="round2StartTime"
                      className={styles.formControl}
                      value={formData.round2StartTime}
                      onChange={handleInputChange}
                      min={formData.round1EndTime}
                      max={formData.endTime}
                    />
                  </div>
                  <div className="col-md-6">
                    <h4 className={styles.title}>Thời gian kết thúc</h4>
                    <input
                      required
                      type="date"
                      name="round2EndTime"
                      id="round2EndTime"
                      className={styles.formControl}
                      value={formData.round2EndTime}
                      onChange={handleInputChange}
                      min={formData.round2StartTime}
                      max={formData.endTime}
                    />
                  </div>
                </div>
                {errors.round2 && (
                  <p className={styles.error}>{errors.round2}</p>
                )}
              </div>
            </div>
            {/* ngay bat dau va ngay ket thuc */}

            <div className={styles.first_zone}>
              <h3 className={styles.title_zone}>Cơ cấu giải thưởng</h3>
              <div className={styles.first_round}>
                <h4 className={styles.title} style={{ margin: '0' }}>
                  Số lượng bài thi đậu sơ khảo:
                </h4>
                <input
                  className={styles.inputAward}
                  required
                  type="number"
                  name="passRound1"
                  min="1"
                  max="99"
                  value={formData.passRound1}
                  onChange={handleInputChange}
                  onInput={inputFloat}
                  onKeyDown={keydowFloat}
                />
              </div>
              <h4 className={styles.title}>Số lượng giải</h4>
              <div className="row mb-4 box-award">
                <div
                  className="col-md-6 d-flex justify-content-center align-items-center"
                  style={{ gap: '20px' }}>
                  <p className={styles.rankTitle}>Giải nhất</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank1"
                    value={formData.rank1}
                    onChange={handleInputChange}
                    onInput={inputFloat}
                    onKeyDown={keydowFloat}
                  />
                  <p>giải</p>
                </div>
                <div
                  className="col-md-6 d-flex justify-content-center align-items-center"
                  style={{ gap: '20px' }}>
                  <p className={styles.rankTitle}>Giải ba</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank3"
                    value={formData.rank3}
                    onChange={handleInputChange}
                    onInput={inputFloat}
                    onKeyDown={keydowFloat}
                  />
                  <p>giải</p>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-6 d-flex justify-content-center align-items-center"
                  style={{ gap: '20px' }}>
                  <p className={styles.rankTitle}>Giải nhì</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank2"
                    value={formData.rank2}
                    onChange={handleInputChange}
                    onInput={inputFloat}
                    onKeyDown={keydowFloat}
                  />
                  <p>giải</p>
                </div>
                <div
                  className="col-md-6 d-flex justify-content-center align-items-center"
                  style={{ gap: '20px' }}>
                  <p className={styles.rankTitle}>Giải khuyến khích</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank4"
                    value={formData.rank4}
                    onChange={handleInputChange}
                    onInput={inputFloat}
                    onKeyDown={keydowFloat}
                  />
                  <p>giải</p>
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
