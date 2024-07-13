import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../CreateModal';
import Checkbox from '@mui/material/Checkbox';

function CreateTopicRound({ modalShow, onHide, topicName }) {
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
    description: '',
    level: '',
    currentUserId: userInfo?.Id,
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
      console.log('err', e);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    let formErrors = {};

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
    axios
      .post(
        `https://webapp-240702160733.azurewebsites.net/api/educationallevels`,
        formData,
      )
      .then(res => {
        if (res.result) {
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
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

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
            Thêm chủ đề thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '50vh', overflow: 'hidden' }}>
          <div className={styles.roundContainer}>
            <ul className={styles.roundTableResponse}>
              <li className={styles.roundHeader}>
                <div className={styles.col}></div>
                <div className={styles.col}>Tên chủ đề</div>
                <div className={styles.col}>Mô tả</div>
              </li>

              <li className={styles.tableRow}>
                <div className={styles.col} data-label="Chọn">
                  <input type="checkbox" />
                </div>
                <div className={styles.col} data-label="Tên chủ đề">
                  Biển đảo
                </div>

                <div className={styles.col} data-label="Mô tả">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <>Chưa có mô tả</>
                  </div>
                </div>
              </li>
              <li className={styles.tableRow}>
                <div className={styles.col} data-label="Chọn">
                  <input type="checkbox" />
                </div>
                <div className={styles.col} data-label="Tên chủ đề">
                  Biển đảo
                </div>

                <div className={styles.col} data-label="Mô tả">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <>Chưa có mô tả</>
                  </div>
                </div>
              </li>
            </ul>
            <div className="flex justify-content-end mt-20">
              <button
                className="btn btn-outline-primary btn-lg"
                //onClick={() => handleOpenCreate()}
              >
                Thêm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateTopicRound;
