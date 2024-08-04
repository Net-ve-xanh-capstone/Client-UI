import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './page.module.css';
import { parseDateEdit } from '../../utils/formatDate.js';

function ModalInforUser({ onHide, modalShow, items }) {
  const listField = [
    {
      value: items?.code,
      label: 'Mã thí sinh',
    },
    {
      value: items?.username,
      label: 'Tên thí sinh',
    },
    {
      value: items?.gender ? 'Nam' : 'Nữ',
      label: 'Giới tính',
    },
    {
      value: parseDateEdit(items?.birthday),
      label: 'Ngày sinh',
    },
    {
      value: items?.email,
      label: 'Email',
    },
    {
      value: items?.phone,
      label: 'Số điện thoại',
    },
  ];

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
            Thông tin thí sinh
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: '30rem',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}>
          <div className={styles.container}>
            <div className={styles.image}>
              <div className={styles.box_image}>
                <img src={items.avatar} alt="" className={styles.img_field} />
              </div>
            </div>
            <div className={styles.infor}>
              {listField.map((val, idx) => (
                <div key={idx} className={styles.field_infor}>
                  <div>
                    <p>{val?.label} :</p>
                  </div>
                  <div>
                    <p>{val?.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalInforUser;
