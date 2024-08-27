import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ActiveModal({ show, setShow, title, callBack, status }) {
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
          <Modal.Title>{`${status === 'Active' ? 'Khóa' : 'Mở khóa'} ${title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Bạn có chắc chắn muốn ${status === 'Active' ? 'khóa' : 'mở khóa'} ${title} này?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="lg" onClick={handleClose}>
            Không
          </Button>
          <Button variant="danger" size="lg" onClick={() => handleCallBack()}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ActiveModal;
