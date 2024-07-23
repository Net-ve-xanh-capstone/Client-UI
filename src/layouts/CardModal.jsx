import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

const CardModal = (props) => {
    
return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Thêm vào bộ sưu tập</h3>
        <input type="text" className="form-control" placeholder="1" />
        <div className="hr"></div>
        
        <Link to="/wallet-connect" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Thêm</Link>
    </div>
    </Modal>
    
  );
};

export default CardModal;
