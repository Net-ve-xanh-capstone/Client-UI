import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CardModal from '../CardModal';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton.jsx';
import { Grid } from '@mui/material';

const PaintingItem = props => {
  const data = props.data;
  const loading = props.loading;

  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  const [modalShow, setModalShow] = useState(false);
  return (
    <Fragment>
      {loading ? <PaintingItemSkeleton /> : (
        <div>
          <div className="explore">
            <div className="box-epxlore">
              {
                data.length > 0 ? data.slice(0, visible).map((item, index) => (
                    <div className={`sc-card-product explode style2 mg-bt ${item.feature ? 'comingsoon' : ''} `}
                         key={index}>
                      <div className="card-media">
                        <Link to="/item-details-01"><img src={item.img} alt="Axies" /></Link>
                        <div className="button-place-bid">
                          <button onClick={() => setModalShow(true)}
                                  className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span>
                          </button>
                        </div>
                        <Link to="/login" className="wishlist-button heart"><span
                          className="number-like">{item.wishlist}</span></Link>
                        <div className="coming-soon">{item.feature}</div>
                      </div>
                      <div className="card-title">
                        <h5><Link to="/item-details-01">"{item.title}"</Link></h5>
                      </div>
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            <img src={item.imgAuthor} alt="Axies" />
                          </div>
                          <div className="info">
                            <span>Creator</span>
                            <h6><Link to="/author-02">{item.nameAuthor}</Link></h6>
                          </div>
                        </div>
                        <div className="tags">{item.tags}</div>
                      </div>
                      <div className="card-bottom style-explode">
                        <div className="price">
                          <span>Price</span>
                          <div className="price-details">
                            <h5>{item.price}</h5>
                            <span>= {item.priceChange}</span>
                          </div>
                        </div>
                        <Link to="/activity-01" className="view-history reload">View History</Link>
                      </div>
                    </div>
                  )) :
                  <Grid ml={16}>
                    <h2 className="centered-message-container">Bạn chưa có tranh nào!</h2>
                  </Grid>
              }
            </div>
            {
              visible < data.length &&
              <div className="btn-auction center">
                <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3"
                      onClick={showMoreItems}><span>Load More</span></Link>
              </div>
            }
          </div>
          <CardModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      )
      }
    </Fragment>
  )
    ;
};

const PaintingItemSkeleton = () => {
  return (

    <div className="explore">
      <div className="box-epxlore">
        {Array(3).fill().map((item, index) => (
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
