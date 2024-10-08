import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({ show, setShow, title, callBack }) {
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
          <Modal.Title>Xóa {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa {title} này?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="lg" onClick={handleClose}>
            Không
          </Button>
          <Button variant="success" size="lg" onClick={() => handleCallBack()}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
