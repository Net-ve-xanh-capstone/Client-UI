import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardCollectionModal from './CardCollectionModal.jsx';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton.jsx';
import { Grid } from '@mui/material';
import { formatDate } from '../../utils/formatDate.js';
import { paintingStatusEnable } from '../../constant/Status.js';
import { Modal } from 'react-bootstrap';

const PaintingItem = props => {
  const data = props.data;
  const loading = props.loading;

  const [visible, setVisible] = useState(6);
  const [modalShow, setModalShow] = useState(false);
  const [modalReject, setModalReject] = useState(false);
  const [selectedPaintingId, setSelectedPaintingId] = useState(null);
  const navigate = useNavigate();
  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 6);
  };

  const handleShowModal = (id) => {
    setSelectedPaintingId(id);
    setModalShow(true);
  };
  
  const handleEditPainting = (status, contestId) => {
    if (paintingStatusEnable.includes(status)) {
      navigate(`/Client-UI/submit/${contestId}`);
    } else {
      setModalReject(true);
    }
  }

  return (
    <Fragment>
      {loading ? (
        <PaintingItemSkeleton />
      ) : (
        <div>
          <div className="explore">
            <div className="box-epxlore justify-content-start">
              {data.length > 0 ? (
                data.slice(0, visible).map((item, index) => (
                  <div
                    className={`sc-card-product mr-4 explode style2 mg-bt ${item.feature ? 'comingsoon' : ''} `}
                    key={index}>
                    <div className="card-media">
                      <div>
                        <img className='img-painting object-fit-contain' style={{
                          height: '320px',
                        }} src={item?.image} alt="painting" />
                      </div>
                      <div className="button-place-bid">
                        <button
                          onClick={() => handleShowModal(item.id)}
                          className="sc-button style-place-bid style fl-button pri-3"
                          style={{ width: '220px'}}
                        >
                          <span>Thêm vào bộ sưu tập</span>
                        </button>
                        <button
                          onClick={() => handleEditPainting(item?.status, item?.contestId)}
                          className="sc-button style-place-bid style fl-button pri-3 mt-5"
                          style={{ width: '220px'}}
                        >
                          <span>Chỉnh sửa bài nộp</span>
                        </button>
                      </div>
                    </div>
                    <div onClick={() => handleEditPainting(item?.status, item?.contestId)} className="card-title">
                      <h5>
                        <div className="cursor-pointer">{item?.name}</div>
                      </h5>
                    </div>
                    <div
                      className="meta-info"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around !important',
                        alignItems: 'center',
                      }}>
                      <div>
                        <div className="author">
                          <div className="info">
                            <span>Người vẽ</span>
                            <h6>
                              <div className="cursor-none">
                                {item?.ownerName}
                              </div>
                            </h6>
                          </div>
                        </div>
                        <div className="author">
                          <div className="info">
                            <span>Cấp</span>
                            <h6>
                              <div className="cursor-none">
                                {item?.level}
                              </div>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="author">
                          <div className="info">
                            <span>Cuộc thi</span>
                            <h6>
                              <div className="cursor-none">
                              {item?.contestName}
                              </div>
                            </h6>
                          </div>
                        </div>
                        <div className="author">
                          <div className="author">
                            <div className="info">
                              <span>Thời gian nộp</span>
                              <h6>
                                <div className="price-details">
                                  {formatDate(item?.submitTime)}
                                </div>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-bottom style-explode justify-content-around mb-4">
                      <div className="price w-50">
                        <span>Tên chủ đề</span>
                        <div className="price-details">
                          <h5>{item.topicName}</h5>
                        </div>
                      </div>
                      <div className="price w-50">
                      <span>Mô tả</span>
                        <div className="price-details">
                          <h5>{item?.description}</h5>
                        </div>
                      </div>
                    </div>
                    <Link to={`/Client-UI/history/${item.id}`} className="view-history reload">Xem lịch sử</Link>
                  </div>
                ))
              ) : (
                <Grid ml={16}>
                  <h2 className="centered-message-container">
                    Bạn chưa có tranh nào!
                  </h2>
                </Grid>
              )}
            </div>
            {visible < data.length && (
              <div className="btn-auction center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}>
                  <span>Xem thêm</span>
                </Link>
              </div>
            )}
          </div>
          <CardCollectionModal
            paintingId={selectedPaintingId}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <RejectModal
            showReject={modalReject}
            onHide={() => setModalReject(false)}
          />
        </div>
      )}
    </Fragment>
  );
};

const PaintingItemSkeleton = () => {
  return (
    <div className="explore">
      <div className="box-epxlore justify-content-start">
        {Array(3)
          .fill()
          .map((item, index) => (
            <div key={index} className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
                <LoadingSkeleton
                  width="290px"
                  height="290px"
                  radius="16px"></LoadingSkeleton>
              </div>
              <div className="card-title">
                <LoadingSkeleton
                  width="100%"
                  height="30px"
                  radius="16px"></LoadingSkeleton>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <LoadingSkeleton
                      width="40px"
                      height="40px"
                      radius="16px"></LoadingSkeleton>
                  </div>
                  <div className="info">
                    <LoadingSkeleton
                      width="120px"
                      height="40px"
                      radius="16px"></LoadingSkeleton>
                  </div>
                </div>
                <div className="tag">
                  <LoadingSkeleton
                    width="50px"
                    height="40px"
                    radius="16px"></LoadingSkeleton>
                </div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <LoadingSkeleton
                    width="132px"
                    height="45px"
                    radius="16px"></LoadingSkeleton>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const RejectModal = ({ showReject, onHide }) => {
  return (
    <Modal 
      animation 
      scrollable 
      show={showReject} 
      onHide={onHide} 
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="space-y-20 pd-40">
          <h4 className="text-center font-weight-bold">Tranh của bạn không thể chỉnh sửa sau khi nộp</h4>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default PaintingItem;
