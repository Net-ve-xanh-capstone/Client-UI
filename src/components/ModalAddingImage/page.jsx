import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import styles from './page.module.css';

const ModalAddingImg = ({ modalShow, onHide, setListImage, listImage }) => {
  const [imagePost, setImagePost] = useState(null);
  const { url, progress } = useUploadImage(imagePost);

  const updateImageload = val => {
    if (progress) {
      console.log(val);
      setListImage(prev => [
        ...prev,
        {
          url: val,
          description: '',
        },
      ]);
    }
  };

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const changeFile = e => {
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setImagePost(file);
    }
  };

  useEffect(() => {
    if (url) {
      updateImageload(url);
    }
  }, [url]);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => {
          onHide();
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Thêm ảnh
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: '80vh',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}>
          <div className={styles.container}>
            {listImage?.length > 0 &&
              listImage !== null &&
              listImage.map((val, index) => (
                <div key={index} className={styles.card_image}>
                  <img src={val.url} alt="" className={styles.image} />
                  <div className={styles.delete_icon}>
                    <DeleteIcon sx={{ color: '#eb0014', fontSize: '2rem' }} />
                  </div>
                </div>
              ))}
            <label
              htmlFor="addfile"
              className={`${styles.card_image} ${styles.plus_btn}`}>
              <AddCircleIcon sx={{ color: '#5142fc', fontSize: '10rem' }} />
            </label>
            <input
              type="file"
              id="addfile"
              name="addfile"
              accept="image/png, image/gif, image/jpeg"
              className={styles.hidden_file}
              onChange={changeFile}
              onClick={e => {
                e.currentTarget.value = null;
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAddingImg;
