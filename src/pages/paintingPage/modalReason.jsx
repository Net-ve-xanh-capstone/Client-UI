import { memo, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './reason.module.css';

// eslint-disable-next-line react-refresh/only-export-components
function ModalReason({ show, setShow, title, callBack, payload }) {
  const [error, setError] = useState('');
  const [currentPayload, setCurrentPayload] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError('');
  };

  const handleCallBack = () => {
    if (
      currentPayload?.reason.length > 3 &&
      currentPayload?.reason.length < 1000
    ) {
      handleClose();
      callBack(currentPayload);
      setError('');
    } else {
      setError('Phải để lại lý do bạn từ chối trong 3-1000 ký tự');
    }
  };

  useEffect(() => {
    setCurrentPayload(payload);
  }, [payload]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Lý do từ chối </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.container}>
            <div className={styles.topic_error}>
              <div className={styles.field_painting}>
                <textarea
                  type="text"
                  value={currentPayload?.reason}
                  onChange={e =>
                    setCurrentPayload(prv => ({
                      ...prv,
                      reason: e.target.value,
                    }))
                  }></textarea>
              </div>
              {(error !== '' || error !== null) && (
                <div className={styles.error_text}>
                  <span></span>
                  <p className={styles.txt_error}>{error}</p>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="lg" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="success" size="lg" onClick={handleCallBack}>
            Khởi tạo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ModalReason);
