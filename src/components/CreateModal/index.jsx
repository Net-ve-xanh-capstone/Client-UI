import { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react-refresh/only-export-components
function CreateModal({ show, setShow, title, callBack }) {
  const handleClose = () => setShow(false);
  const handleCallBack = () => {
    handleClose();
    callBack();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn tạo {title} này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="lg" onClick={handleClose}>
            Không
          </Button>
          <Button variant="danger" size="lg" onClick={handleCallBack}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(CreateModal);
