import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../CreateModal';
import { formatDate } from '../../utils/formatDate';
import EditModal from '../EditModal';

function RoundForm({ modalShow, onHide, roundData, contestData }) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    setFormData(intialState);
  }, [modalShow]);

  const intialState = {
    name: roundData?.name || '',
    startTime: roundData?.startTime.split('T')[0] || '',
    endTime: roundData?.endTime.split('T')[0] || '',
    location: roundData?.location || '',
    description: roundData?.description || '',
    educationalLevelId: roundData?.educationalLevelId || '',
    listTopic: [],
    currentUserId: userInfo?.id,
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

  const isValidDate = (startTime, endTime) => {
    for (let level of contestData.educationalLevel) {
      if (level.round && level.round.length > 0) {
        for (let round of level.round) {
          const roundStart = new Date(round.startTime);
          const roundEnd = new Date(round.endTime);
          roundEnd.setDate(roundEnd.getDate() + 1);
          if (!(startTime > roundEnd || endTime < roundStart)) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    let formErrors = {};

    const startDate = new Date(formData.startTime);
    const endDate = new Date(formData.endTime);

    if (startDate >= endDate) {
      formErrors.startTime = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    if (!isValidDate(startDate, endDate)) {
      formErrors.startTime = 'Trùng ngày với vòng thi khác';
    }

    if (Object.keys(formErrors).length === 0) {
      setValidated(true);
      setModal(true);
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  const postRound = async () => {
    axios
      .post(
        `https://webapp-240702160733.azurewebsites.net/api/contes2ts`,
        formData,
      )
      .then(res => {
        if (res.result) {
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
          onHide();
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const editRound = async () => {
    axios
      .post(
        `https://webapp-240702160733.azurewebsites.net/api/contes2ts`,
        formData,
      )
      .then(res => {
        if (res.result) {
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
          onHide();
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <>
      {!roundData ? (
        <CreateModal
          show={modal}
          setShow={setModal}
          title={'vòng thi'}
          callBack={postRound}
        />
      ) : (
        <EditModal
          show={modal}
          setShow={setModal}
          title={'vòng thi'}
          callBack={editRound}
        />
      )}
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
            Thêm vòng thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '80vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <h4 className={styles.title}>Tên vòng thi</h4>
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
                  min={contestData.startTime.split('T')[0]}
                  max={contestData.endTime.split('T')[0]}
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
                  min={contestData.startTime.split('T')[0]}
                  max={contestData.endTime.split('T')[0]}
                />
              </div>
            </div>
            {errors.startTime && (
              <p className={styles.error}>{errors.startTime}</p>
            )}
            <h4 className={styles.title}>Địa điểm thi</h4>
            <input
              className={styles.inputModal}
              required
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <h4 className={styles.title}>Mô tả</h4>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}></textarea>

            <div style={{ textAlign: 'end' }}>
              <button className={styles.btnCreate} type="submit">
                {!roundData ? 'Thêm' : 'Chỉnh sửa'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RoundForm;
