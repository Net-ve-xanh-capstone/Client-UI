import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../CreateModal';
import EditModal from '../EditModal';
import { createTopic, editTopic } from '../../api/topicStaffApi';

function TopicForm({ modalShow, onHide, topicData }) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState('');
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    setFormData(intialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShow]);

  const intialState = {
    name: topicData?.name || '',
    description: topicData?.description || '',
    image: '',
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
      console.log(e);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    let formErrors = {};
    if (formData?.name?.length < 1 && formData?.name?.length > 100) {
      formErrors.name = 'Chủ đề chỉ được từ 1-100 ký tự';
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

  const postTopic = async () => {
    try {
      const { data } = await createTopic(formData);
      if (data?.result) {
        toast.success('Tạo chủ đề thi thành công', {
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
      onHide();
    } finally {
      setErrors(null);
    }
  };

  const handleEditTopic = async () => {
    try {
      formData.id = topicData?.id;
      const { data } = await editTopic(formData);
      if (data?.result) {
        toast.success('Chỉnh sửa chủ đề thi thành công', {
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
      console.log('Err', e);
    } finally {
      setErrors(null);
    }
  };

  return (
    <>
      {!topicData ? (
        <CreateModal
          show={modal}
          setShow={setModal}
          title={'chủ đề'}
          callBack={postTopic}
        />
      ) : (
        <EditModal
          show={modal}
          setShow={setModal}
          title={'chủ đề'}
          callBack={handleEditTopic}
        />
      )}
      <Modal
        show={modalShow}
        onHide={() => {
          onHide();
          setErrors(null);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Tạo chủ đề thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '50vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <h4 className={styles.title}>Tên chủ đề</h4>
            <input
              className={styles.inputModal}
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}></input>
            <p style={{ color: '#eb0014', fontSize: '1rem' }}>{errors?.name}</p>
            <h4 className={styles.title}>Mô tả</h4>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}></textarea>

            <div style={{ textAlign: 'end' }}>
              <button className={styles.btnCreate} type="submit">
                {!topicData ? 'Thêm' : 'Chỉnh sửa'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TopicForm;
