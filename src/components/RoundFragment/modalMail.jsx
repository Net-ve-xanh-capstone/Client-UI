import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MailModal({ show, setShow, callBack, idLevel }) {
  const handleClose = () => setShow(false);
  const handleCallBack = () => {
    handleClose();
    callBack(idLevel);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận công bố kết quả</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn gửi mail đi không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="lg" onClick={handleClose}>
            Không
          </Button>
          <Button variant="success" size="lg" onClick={handleCallBack}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MailModal;
