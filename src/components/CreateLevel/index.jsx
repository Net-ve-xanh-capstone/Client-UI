import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { putLevel } from '../../api/educationLevel.js';
import { createLevel } from '../../api/levelStaffApi';
import { parseDateEdit } from '../../utils/formatDate.js';
import './datePicker.css';
import styles from './style.module.css';
function CreateLevel({
  modalShow,
  onHide,
  contestId,
  startTime,
  endTime,
  type,
  roundData,
}) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const intialState = {
    description: '',
    level: '',
    contestId: contestId,
    currentUserId: userInfo?.Id,
    round1StartTime: '',
    round1EndTime: '',
    round2StartTime: '',
    round2EndTime: '',
    minAge: '',
    maxAge: '',
    // award here
    rank1: 1,
    rank2: 1,
    rank3: 1,
    rank4: 1,
    passRound1: 1,
  };

  const [formData, setFormData] = useState(intialState);

  // get the value of input field and pass to the state
  const handleInputChange = event => {
    try {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } catch (e) {
      console.log('err', e);
    }
  };

  // put information to server
  const updateInformation = async payload => {
    console.log(payload);
    try {
      await putLevel(payload);
      toast.success('Cập nhật thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      onHide();
    } catch (error) {
      toast.error(error, {
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
  };

  // post the form with api, not in use
  const postContest = async payload => {
    try {
      const { data } = await createLevel(payload);
      if (data?.result) {
        toast.success('Tạo đối tượng dự thi thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        onHide();
      }
    } catch (e) {
      toast.error('Tạo đối tượng dự thi không thành công', {
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
  };

  // map all rank of final to object
  const getAllRank = val => {
    let ob = {};
    const value = val?.award;
    for (let index in value) {
      ob[value[index]?.rank] = value[index]?.quantity;
    }
    return ob;
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

  // cancel if user try to input float number
  const keydowFloat = event => {
    if (event.key === '.' || event.key === ',') {
      event.preventDefault();
    }
  };
  const inputFloat = event => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  // Base on the roundData filter round with final or unfinal round
  const filterRoundList = val => {
    const final = val.filter(
      val => val.name.toLowerCase() === 'Vòng chung kết'.toLowerCase(),
    );
    const unFinal = val.filter(
      val => val.name.toLowerCase() === 'Vòng sơ khảo'.toLowerCase(),
    );
    return { finalRound: final, unFinalRound: unFinal };
  };

  // validation and post form
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
      const payload = {
        level: formData.level,
        description: formData.description,
        createdBy: formData.currentUserId,
        contestId: formData.contestId,
        minAge: formData.minAge,
        maxAge: formData.maxAge,
        round: [
          {
            name: 'Vòng sơ khảo',
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
            name: 'Vòng chung kết',
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
      };
      const editPayload = {
        id: roundData?.id,
        level: formData?.level,
        description: formData?.description,
        minAge: formData?.minAge,
        maxAge: formData?.maxAge,
        currentUserId: userInfo.Id,
      };
      setValidated(true);
      setErrors({});
      // this is will checking if was edit or create
      type === 'edit' ? updateInformation(editPayload) : postContest(payload);
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    if (type === 'edit' && roundData) {
      console.log(roundData);

      const objRound = filterRoundList(roundData.round);
      const rankFinal = getAllRank(objRound.finalRound[0]);

      setFormData(prv => ({
        ...prv,
        level: roundData.level,
        description: roundData.description,
        minAge: roundData.minAge,
        maxAge: roundData.maxAge,

        // time unfinal round
        round1StartTime: objRound.unFinalRound[0]?.startTime.split('T')[0],
        round1EndTime: objRound.unFinalRound[0]?.endTime.split('T')[0],

        //time final round
        round2StartTime: objRound.finalRound[0]?.startTime.split('T')[0],
        round2EndTime: objRound.finalRound[0]?.endTime.split('T')[0],

        // award
        passRound1: objRound.unFinalRound[0]?.award[0].quantity,
        rank1: rankFinal['Giải Nhất'],
        rank2: rankFinal['Giải Nhì'],
        rank3: rankFinal['Giải Ba'],
        rank4: rankFinal['Giải Khuyến Khích'],
      }));
    } else {
      setFormData(intialState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShow]);

  return (
    <>
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
            Thêm đối tượng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '70vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.card_screen}>
              <h3 className={styles.title_zone}>Thông tin cuộc thi</h3>
              <div className={styles.small_place}>
                <h4 className={styles.title}>Tên đối tượng:</h4>
                <input
                  className={styles.inputModal}
                  required
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.small_place}>
                <h4 className={styles.title}>Mô tả ngắn:</h4>
                <textarea
                  required
                  name="description"
                  className={styles.inputModal}
                  value={formData.description}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className={styles.age}>
                <div className={styles.small_age}>
                  <h4 className={styles.title}>Từ tuổi</h4>
                  <input
                    className={styles.inputModal}
                    required
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    min="3"
                    max="99"
                  />
                </div>
                <div className={styles.small_age}>
                  <h4 className={styles.title}>Đến tuổi</h4>
                  <input
                    className={styles.inputModal}
                    required
                    type="number"
                    name="maxAge"
                    value={formData.maxAge}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    min="3"
                    max="99"
                  />
                </div>
              </div>
            </div>

            {/* Round */} 
            <div className={styles.card_screen}>
              <h3 className={styles.title_zone}>Vòng thi</h3>
              <div style={{ marginLeft: '20px' }}>
                <div className={styles.roundBlock}> 
                  <h5>Vòng sơ khảo:</h5>
                </div> 

                <div style={{ marginLeft: '20px' }} className="row">
                  <div className="col-md-6">
                    <h5 className={styles.title}>Thời gian bắt đầu</h5>
                    {/* <input
                      required
                      type="date"
                      name="round1StartTime"
                      id="round1StartTime"
                      className={styles.formControl}
                      value={formData.round1EndTime}
                      defaultValue="05-01-2023"
                      onChange={handleInputChange}
                      min={parseDateEdit(startTime)}
                      max={parseDateEdit(endTime)}
                    /> */}
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={formData.round1StartTime}
                      className={styles.formControl}
                      readOnly={type === 'edit'}
                      onChange={date =>
                        setFormData(prv => ({ ...prv, round1StartTime: date }))
                      }
                      minDate={parseDateEdit(startTime)}
                      maxDate={parseDateEdit(endTime)}
                    />
                  </div>
                  <div className="col-md-6">
                    <h4 className={styles.title}>Thời gian kết thúc</h4>
                    {/* <input
                      required
                      type="date"
                      name="round1EndTime"
                      id="round1EndTime"
                      className={styles.formControl}
                      value={formData.round1EndTime}
                      onChange={handleInputChange}
                      min={formData.round1StartTime}
                      max={parseDateEdit(endTime)}
                    /> */}
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={formData.round1EndTime}
                      className={styles.formControl}
                      readOnly={type === 'edit'}
                      onChange={date =>
                        setFormData(prv => ({ ...prv, round1EndTime: date }))
                      }
                      minDate={formData.round1StartTime}
                      maxDate={parseDateEdit(endTime)}
                    />
                  </div>
                </div>
                {errors.round1 && (
                  <p className={styles.error}>{errors.round1}</p>
                )}

                <div style={{ marginTop: '20px' }} className={styles.roundBlock}>

                  <h5>Vòng chung kết:</h5>
                </div>
                <div style={{ marginLeft: '20px' }} className="row">
                  <div className="col-md-6">
                    <h5 className={styles.title}>Thời gian bắt đầu</h5>
                    {/* <input
                      required
                      type="date"
                      name="round2StartTime"
                      id="round2StartTime"
                      className={styles.formControl}
                      value={formData.round2StartTime}
                      onChange={handleInputChange}
                      min={formData.round1EndTime}
                      max={parseDateEdit(endTime)}
                    /> */}
                    <DatePicker
                      selected={formData.round2StartTime}
                      className={styles.formControl}
                      readOnly={type === 'edit'}
                      onChange={date =>
                        setFormData(prv => ({ ...prv, round2StartTime: date }))
                      }
                      dateFormat="dd/MM/yyyy"
                      minDate={formData.round1EndTime}
                      maxDate={parseDateEdit(endTime)}
                    />
                  </div>
                  <div className="col-md-6">
                    <h4 className={styles.title}>Thời gian kết thúc</h4>
                    {/* <input
                      required
                      type="date"
                      name="round2EndTime"
                      id="round2EndTime"
                      className={styles.formControl}
                      value={formData.round2EndTime}
                      onChange={handleInputChange}
                      min={formData.round2StartTime}
                      max={parseDateEdit(endTime)}
                    /> */}
                    <DatePicker
                      selected={formData.round2EndTime}
                      className={styles.formControl}
                      readOnly={type === 'edit'}
                      onChange={date =>
                        setFormData(prv => ({ ...prv, round2EndTime: date }))
                      }
                      dateFormat="dd/MM/yyyy"
                      minDate={formData.round2StartTime}
                      maxDate={parseDateEdit(endTime)}
                    />
                  </div>
                </div>
                {errors.round2 && (
                  <p className={styles.error}>{errors.round2}</p>
                )}
              </div>
            </div>

            {/* Award */} 

            <div className={styles.card_screen}>
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
                  readOnly={type === 'edit'}
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
                  <p className={styles.rankTitle}>Giải nhất:</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank1"
                    readOnly={type === 'edit'}
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
                  <p className={styles.rankTitle}>Giải ba:</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank3"
                    value={formData.rank3}
                    readOnly={type === 'edit'}
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
                  <p className={styles.rankTitle}>Giải nhì:</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank2"
                    value={formData.rank2}
                    readOnly={type === 'edit'}
                    onChange={handleInputChange}
                    onInput={inputFloat}
                    onKeyDown={keydowFloat}
                  />
                  <p>giải</p>
                </div>
                <div
                  className="col-md-6 d-flex justify-content-center align-items-center"
                  style={{ gap: '20px' }}>
                  <p className={styles.rankTitle}>Giải khuyến khích:</p>
                  <input
                    className={styles.inputAward}
                    required
                    type="number"
                    min="1"
                    max="99"
                    name="rank4"
                    value={formData.rank4}
                    readOnly={type === 'edit'}
                    onChange={handleInputChange}
                    onInput={inputFloat}
                    onKeyDown={keydowFloat}
                  />
                  <p>giải</p>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'end' }}>
              {type === 'edit' ? (
                <button className={styles.btnCreate} type="submit">
                  Lưu
                </button>
              ) : (
                <button className={styles.btnCreate} type="submit">
                  Tạo
                </button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateLevel;
