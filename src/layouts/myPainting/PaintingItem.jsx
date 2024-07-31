import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CardCollectionModal from './CardCollectionModal.jsx';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton.jsx';
import { Grid } from '@mui/material';
import { formatDate } from '../../utils/formatDate.js';

const PaintingItem = props => {
  const data = props.data;
  const loading = props.loading;

  const [visible, setVisible] = useState(6);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPaintingId, setSelectedPaintingId] = useState(null);

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 6);
  };

  const handleShowModal = (id) => {
    setSelectedPaintingId(id);
    setModalShow(true);
  };

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
                      <Link onClick={() => handleShowModal(item.id)}>
                        <img src={item?.image} alt="tranh" />
                      </Link>
                      <div className="button-place-bid">
                        <button
                          onClick={() => handleShowModal(item.id)}
                          className="sc-button style-place-bid style fl-button pri-3">
                          <span>Thêm vào bộ sưu tập</span>
                        </button>
                      </div>
                    </div>
                    <div className="card-title">
                      <h5>
                        <Link className="cursor-none" to="#">{item?.name}</Link>
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
                              <Link className="cursor-none">
                                {item?.ownerName}
                              </Link>
                            </h6>
                          </div>
                        </div>
                        <div className="author">
                          <div className="info">
                            <span>Cấp</span>
                            <h6>
                              <Link className="cursor-none">
                                {item?.level}
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="author">
                          <div className="info">
                            <span>Cuộc thi</span>
                            <h6>
                              <Link className="cursor-none">
                              {item?.contestName}
                              </Link>
                            </h6>
                          </div>
                        </div>
                        <div className="author">
                          <div className="author">
                            <div className="info">
                              <span>Thời gian nộp</span>
                              <h6>
                                <Link className="cursor-none">
                                  {formatDate(item?.submitTime)}
                                </Link>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-bottom style-explode">
                      <div className="price">
                        <span>Tên chủ đề</span>
                        <div className="price-details">
                          <h5>{item.topicName}</h5>
                        </div>
                      </div>
                      <div className="price">
                      <span>Mô tả</span>
                        <div className="price-details">
                          <h5>{item?.description}</h5>
                        </div>
                      </div>
                    </div>
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
                  <span>Load More</span>
                </Link>
              </div>
            )}
          </div>
          <CardCollectionModal
            paintingId={selectedPaintingId}
            show={modalShow}
            onHide={() => setModalShow(false)}
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

export default PaintingItem;
