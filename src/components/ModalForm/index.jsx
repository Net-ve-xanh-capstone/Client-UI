import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function ModalForm({ modalShow, onHide }) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    description: '',
    content: '',
    round1StartTime: '',
    round1EndTime: '',
    round2StartTime: '',
    round2EndTime: '',
    currentUserId: '5a71c581-20bc-488e-8269-b8a8e22d6e79',
    rank1: 0,
    rank2: 0,
    rank3: 0,
    rank4: 0
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name.includes('rank') && name !== NaN ? parseInt(value) : value
    });
  };

  const handleSubmit = async (event) => {
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
      formErrors.round1 = 'Vòng sơ khảo phải nằm trong khoảng thời gian cuộc thi';
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
      await postContest();
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  const postContest = async () => {
    axios
      .post(`https://webapp-240702160733.azurewebsites.net/api/contests`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    // toast.success('Tạo cuộc thi thành công', {
    //   position: 'top-right',
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'light',
    //   transition: Bounce
    // });
    // onHide();
  };

  return (
    <Modal
      show={modalShow}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ margin: '0 auto' }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontWeight: 'bold', fontSize: '20px' }}
        >
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
          {errors.startTime && <p className={styles.error}>{errors.startTime}</p>}
          <h4 className={styles.title}>Mô tả ngắn</h4>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <h4 className={styles.title}>Nội dung cuộc thi</h4>
          <textarea
            required
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          ></textarea>
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
                />
              </div>
            </div>
            {errors.round2 && <p className={styles.error}>{errors.round2}</p>}
          </div>
          <h4 className={styles.title}>Cơ cấu giải thưởng</h4>
          <div className="row mb-4 box-award">
            <div
              className="col-md-6 d-flex justify-content-center align-items-center"
              style={{ gap: '20px' }}
            >
              <p className={styles.rankTitle}>Giải nhất</p>
              <input
                className={styles.inputAward}
                required
                type="number"
                min="0"
                max="99"
                name="rank1"
                value={formData.rank1}
                onChange={handleInputChange}
              />
              <p>giải</p>
            </div>
            <div
              className="col-md-6 d-flex justify-content-center align-items-center"
              style={{ gap: '20px' }}
            >
              <p className={styles.rankTitle}>Giải ba</p>
              <input
                className={styles.inputAward}
                required
                type="number"
                min="0"
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
              style={{ gap: '20px' }}
            >
              <p className={styles.rankTitle}>Giải nhì</p>
              <input
                className={styles.inputAward}
                required
                type="number"
                min="0"
                max="99"
                name="rank2"
                value={formData.rank2}
                onChange={handleInputChange}
              />
              <p>giải</p>
            </div>
            <div
              className="col-md-6 d-flex justify-content-center align-items-center"
              style={{ gap: '20px' }}
            >
              <p className={styles.rankTitle}>Giải khuyến khích</p>
              <input
                className={styles.inputAward}
                required
                type="number"
                min="0"
                max="99"
                name="rank4"
                value={formData.rank4}
                onChange={handleInputChange}
              />
              <p>giải</p>
            </div>
          </div>
          <div style={{ textAlign: 'end' }}>
            <button className={styles.btnCreate} type="submit">
              Tạo
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
