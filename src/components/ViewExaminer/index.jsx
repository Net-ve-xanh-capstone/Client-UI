import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { banAccount, unBanAccount } from '../../api/examinerStaffApi';
import { formatDate } from '../../utils/formatDate';
import BanModal from '../BanModal';
import styles from './style.module.css';

function ViewExaminer({ modalShow, onHide, examData }) {
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
  }, [modalShow]);

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    setModal(true);
  };

  const handleAccount = async () => {
    try {
      const { data } =
        examData?.status === 'Active'
          ? await banAccount(examData?.id)
          : await unBanAccount(examData?.id);
      if (data?.result) {
        toast.success(
          `${examData?.status === 'Active' ? 'Khóa' : 'Mở khóa'} tài khoản thành công`,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        );
        onHide();
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  return (
    <>
      <BanModal
        show={modal}
        setShow={setModal}
        title={`${examData?.status === 'Active' ? 'khóa' : 'mở khóa'} tài khoản`}
        callBack={handleAccount}
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
            Thông tin Giám Khảo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '70vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.boxAvatar}>
              <img
                alt="giám khảo"
                src={examData?.avatar}
                className={styles.avatar}
              />
            </div>
            <div className={styles.detailBox}>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Mã Giám Khảo:</h4>
                <input
                  readOnly
                  className={styles.inputModal}
                  required
                  type="text"
                  name="name"
                  value={examData?.code}></input>
              </div>

              <div className={styles.detailExam}>
                <h4 className={styles.title}>Tên Giám Khảo:</h4>
                <input
                  readOnly
                  className={styles.inputModal}
                  required
                  type="text"
                  name="name"
                  value={examData?.fullName}></input>
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Giới tính:</h4>
                <input
                  readOnly
                  className={styles.inputModal}
                  required
                  type="text"
                  name="name"
                  value={examData?.gender ? 'Male' : 'Female'}></input>
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Ngày sinh:</h4>
                <input
                  readOnly
                  className={styles.inputModal}
                  required
                  type="text"
                  name="name"
                  value={formatDate(examData?.birthday)}></input>
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Email:</h4>
                <input
                  readOnly
                  className={styles.inputModal}
                  required
                  type="text"
                  name="name"
                  value={examData?.email}></input>
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Số điện thoại:</h4>
                <input
                  readOnly
                  className={styles.inputModal}
                  required
                  type="text"
                  name="name"
                  value={examData?.phone}></input>
              </div>
              <div style={{ textAlign: 'end' }}>
                <button className={styles.btnCreate} type="submit">
                  {examData?.status === 'Inactive'
                    ? 'Mở khóa tài khoản'
                    : 'Khóa tài khoản'}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewExaminer;
