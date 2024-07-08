import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditModal from '../EditModal';

function EditContest({ modalShow, onHide, contestEdit, callBack }) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const findRoundTimes = (levels) => {
    for (const level of levels) {
      if (level.round && level.round.length > 0) {
        const startTime =
          level.round.find((item) => item.name === 'Vòng Sơ Khảo')?.startTime?.split('T')[0] ||
          null;
        const endTime =
          level.round.find((item) => item.name === 'Vòng Chung Kết')?.endTime?.split('T')[0] ||
          null;

        if (startTime && endTime) {
          return { startTime, endTime };
        }
      }
    }
    return { startTime: null, endTime: null };
  };

  const time = findRoundTimes(contestEdit.educationalLevel);
  const [formData, setFormData] = useState(contestEdit);

  useEffect(() => {
    if (contestEdit) {
      setFormData({
        ...contestEdit,
        startTime: contestEdit.startTime.split('T')[0],
        endTime: contestEdit.endTime.split('T')[0],
        currentUserId: contestEdit.createdBy
      });
    }
  }, [contestEdit]);

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

    if (startDate >= endDate) {
      formErrors.startTime = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    if (Object.keys(formErrors).length === 0) {
      setValidated(true);
      setShowModalEdit(true);
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  const putContest = async () => {
    axios
      .put(`https://webapp-240702160733.azurewebsites.net/api/contests`, formData)
      .then((res) => {
        if (res.result) {
          toast.success('Chỉnh sửa thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
          callBack();
          onHide();
        }
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        console.error('There was an error!', error);
      });
  };

  return (
    <>
      <EditModal
        show={showModalEdit}
        setShow={setShowModalEdit}
        title={'cuộc thi'}
        callBack={putContest}
      />
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
            Chỉnh sửa cuộc thi
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
                  max={time.startTime}
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
                  min={time.endTime}
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
            <div style={{ textAlign: 'end' }}>
              <button className={styles.btnCreate} type="submit">
                Chỉnh sửa
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditContest;
