import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../CreateModal';
import { createLevel } from '../../api/levelStaffApi';

function CreateLevel({ modalShow, onHide, contestId }) {
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
    contestId: contestId,
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
    try {
      const { data } = await createLevel(formData);
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
      console.log('err', e);
    }
  };

  return (
    <>
      <CreateModal
        show={showModalCreate}
        setShow={setShowModalCreate}
        title={'đối tượng dự thi'}
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
            Tạo đối tượng dự thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '50vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <h4 className={styles.title}>Tên đối tượng</h4>
            <input
              className={styles.inputModal}
              required
              type="text"
              name="level"
              value={formData.name}
              onChange={handleInputChange}
            />

            <h4 className={styles.title}>Mô tả ngắn</h4>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}></textarea>
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

export default CreateLevel;
