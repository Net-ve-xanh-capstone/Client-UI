import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Countdown from 'react-countdown';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import img1 from '../../assets/images/box-item/image-box-26.jpg';
import img2 from '../../assets/images/box-item/image-box-27.jpg';
import imga1 from '../../assets/images/avatar/avt-11.jpg';
import imga2 from '../../assets/images/avatar/avt-12.jpg';
import CardModal from '../../components/CardModal';
import { Fallback } from '../../constant/Fallback';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

const Contest = () => {
  const [data] = useState([
    {
      img: img1,
      title: 'Hamlet Contemplates ...',
      tags: 'bsc',
      imgAuthor: imga1,
      nameAuthor: 'SalvadorDali',
      price: '4.89 ETH',
      wishlist: '100'
    },
    {
      img: img2,
      title: 'Triumphant Awakening...',
      tags: 'bsc',
      imgAuthor: imga2,
      nameAuthor: 'Trista Francis',
      price: '4.89 ETH',
      wishlist: '100'
    }
  ]);

  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <section className="tf-section live-auctions">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-20">Cuộc Thi</h2>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1
                  },
                  767: {
                    slidesPerView: 2
                  },
                  991: {
                    slidesPerView: 3
                  }
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-container show-shadow carousel auctions">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="slider-item">
                            <div className="sc-card-product">
                              <div className="card-media">
                                <Link to="/item-details-01">
                                  <img src={item.img} alt="axies" />
                                </Link>
                                <Link to="/login" className="wishlist-button heart">
                                  <span className="number-like">{item.wishlist}</span>
                                </Link>
                                <div className="featured-countdown">
                                  <span className="slogan"></span>
                                  <Countdown date={Date.now() + 500000000}>
                                    <span>You are good to go!</span>
                                  </Countdown>
                                </div>
                                <div className="button-place-bid">
                                  <button
                                    onClick={() => setModalShow(true)}
                                    className="sc-button style-place-bid style bag fl-button pri-3"
                                  >
                                    <span>Chi tiết</span>
                                  </button>
                                </div>
                              </div>
                              <div className="card-title">
                                <h5>
                                  <Link to="/item-details-01">{item.title}</Link>
                                </h5>
                                <div className="tags">{item.tags}</div>
                              </div>
                              <div className="meta-info">
                                <div className="author">
                                  <div className="avatar">
                                    <img src={item.imgAuthor} alt="axies" />
                                  </div>
                                  <div className="info">
                                    <span>Creator</span>
                                    <h6>
                                      {' '}
                                      <Link to="/authors-02">{item.nameAuthor}</Link>{' '}
                                    </h6>
                                  </div>
                                </div>
                                <div className="price">
                                  <span>Current Bid</span>
                                  <h5> {item.price}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

Contest.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default withErrorBoundary(Contest, {
  FallbackComponent: Fallback
});
