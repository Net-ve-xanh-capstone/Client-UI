import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardModal from '../../components/CardModal';
import { withErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../../constant/Fallback';
import { defaultAvatar } from '../../constant/imageDefault.js';
const PaintingPicks = (props) => {
  const { data } = props;

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <section className="tf-section sc-explore-1">
        <div className="themesflat-container">
          <div className="row">
            {data.slice(0, visible).map((item, index) => (
              <div key={index} className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="sc-card-product explode style2 mg-bt">
                  <div className="card-media">
                    <Link to="#" className="cursor-none">
                      <img className="img-painting" src={item.image} alt="painting" />
                    </Link>
                  </div>
                  <div className="card-title">
                    <h5 className="style2">
                      <Link className="cursor-none" to="#">{item.name}</Link>
                    </h5>
                    <div className="tags" style={{ lineHeight: 4 }}>{item.rank}</div>
                  </div>
                  <div className="meta-info">
                    <div className="author">
                      <div className="avatar">
                        <img src={item?.ownerImage || defaultAvatar} alt="axies" />
                      </div>
                      <div className="info">
                        <span>Người vẽ</span>
                        <h6>
                          <div>{item?.ownerName}</div>
                        </h6>
                      </div>
                    </div>
                    <div className="price">
                      <span>Cuộc thi</span>
                      <h5> {item.contestName}</h5>
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
              </div>
            ))}
            {visible < data.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Tải thêm</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

PaintingPicks.propTypes = {
  data: PropTypes.array.isRequired
};

export default withErrorBoundary(PaintingPicks, {
  FallbackComponent: Fallback
});
