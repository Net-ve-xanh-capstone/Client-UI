import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../CreateModal';
import { createContest } from '../../api/contestStaffApi';

function ModalForm({ modalShow, onHide }) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [showModalCreate, setShowModalCreate] = useState(false);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    setFormData(intialState);
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

  const [formData, setFormData] = useState(intialState);

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
      setValidated(true);
      setShowModalCreate(true);
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  const postContest = async () => {
    try {
      const { data } = await createContest(formData);
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
      onHide();
    } catch (e) {
      console.log('err', e);
    }
  };

  return (
    <>
      <CreateModal
        show={showModalCreate}
        setShow={setShowModalCreate}
        title={'cuộc thi'}
        callBack={postContest}
      />
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
            <h4 className={styles.title}>Tên cuộc thi</h4>
            <input
              className={styles.inputModal}
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="row">
              <div className="col-md-6">
                <h5 className={styles.title}>Thời gian bắt đầu</h5>
                <input
                  required
                  type="date"
                  name="startTime"
                  id="startTime"
                  className={styles.formControl}
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
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
            {errors.startTime && (
              <p className={styles.error}>{errors.startTime}</p>
            )}

            <h4 className={styles.title}>Nội dung cuộc thi</h4>
            <textarea
              required
              name="content"
              value={formData.content}
              onChange={handleInputChange}></textarea>
            <h4 className={styles.title}>Đối tượng tham gia</h4>
            <div className={styles.levelBlock}>
              <p>Bảng A</p>
              <p>Mầm non</p>
            </div>
            <div className={styles.levelBlock}>
              <p>Bảng B</p>
              <p>Tiểu học</p>
            </div>
            <h4 className={styles.title}>Vòng thi</h4>
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
              {errors.round1 && <p className={styles.error}>{errors.round1}</p>}
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
              {errors.round2 && <p className={styles.error}>{errors.round2}</p>}
            </div>

            <h4 className={styles.title}>Cơ cấu giải thưởng</h4>
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
                />
                <p>giải</p>
              </div>
            </div>
            <h4 className={styles.title}>Số người qua vòng 1: </h4>
            <input
              className={styles.inputAward}
              required
              type="number"
              name="passRound1"
              min="1"
              max="99"
              value={formData.passRound1}
              onChange={handleInputChange}
            />
            <div style={{ textAlign: 'end' }}>
              <button className={styles.btnCreate} type="submit">
                Tạo
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalForm;
