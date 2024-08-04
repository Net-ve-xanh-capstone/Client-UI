import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import styles from './page.module.css';
import CircularProgress from '@mui/material/CircularProgress';

const ModalAddingImg = ({ modalShow, onHide, setListImage, listImage }) => {
  const [imagePost, setImagePost] = useState(null);
  const { url, progress } = useUploadImage(imagePost);
  const [isHover, setIsHover] = useState('');
  const [loading, setLoading] = useState(false);

  const mouseEnter = id => {
    setIsHover(id);
  };

  const mouseLeave = () => {
    setIsHover('');
  };

  // trigger delete image from list state --> its will effect to parent state
  const deleteImage = index => {
    setListImage(state => state.filter((_, idx) => index !== idx));
  };

  // adding image to state in parent
  const updateImageload = val => {
    if (progress) {
      setListImage(prev => [
        ...prev,
        {
          url: val,
          description: 'empty',
        },
      ]);
    } else {
      toast.error('Quá trình load ảnh bị lỗi vui lòng thử lại!!!', {
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
  };

  // hanle choosing file from browser
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const changeFile = e => {
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setLoading(true);
      setImagePost(file);
    }
  };

  // catch when url was returned from firebase
  useEffect(() => {
    if (url) {
      setLoading(false);
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
                <div
                  key={index}
                  className={styles.card_image}
                  onMouseEnter={() => mouseEnter(index)}
                  onMouseLeave={() => mouseLeave()}>
                  <img src={val.url} alt="" className={styles.image} />
                  {isHover === index && (
                    <div className={styles.delete_icon}>
                      <DeleteIcon
                        onClick={() => deleteImage(index)}
                        sx={{ color: '#eb0014', fontSize: '2rem' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            <label
              htmlFor="addfile"
              className={`${styles.card_image} ${styles.plus_btn}`}>
              {loading ? (
                <CircularProgress />
              ) : (
                <AddCircleIcon sx={{ color: '#5142fc', fontSize: '10rem' }} />
              )}
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
              disabled={loading}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAddingImg;
