import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Countdown from 'react-countdown';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import CardModal from '../../components/CardModal';
import { Fallback } from '../../constant/Fallback';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { contestApi } from '../../api/contestApi.js';
import { useQuery } from '@tanstack/react-query';
import { defaultAvatar, defaultImage } from '../../constant/imageDefault.js';
const Contest = () => {
  const { isLoading, isError, data, error } =  useQuery({
    queryKey: ['contests'],
    queryFn: contestApi.fetchAllContest,
  })
  const [contest, setContest] = useState(null);
  useEffect(() => {
    if(data) {
      setContest(data?.data?.result)
    }
  }, [data]);
 
  const [modalShow, setModalShow] = useState(false);

  if (isLoading) {
    return <span>Loading...</span>
  }
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
                {contest && (
                  <SwiperSlide>
                    <div className="swiper-container show-shadow carousel auctions">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="slider-item">
                            <div className="sc-card-product">
                              <div className="card-media">
                                <Link to="/item-details-01">
                                  <img src={defaultImage} alt="axies" />
                                </Link>
                                
                                <div className="featured-countdown">
                                  <span className="slogan"></span>
                                  <Countdown date={Date.now() + new Date(contest?.endTime).getTime()/1000}>
                                    <span>You are good to go!</span>
                                  </Countdown>
                                </div>
                                <div className="button-place-bid">
                                  <button
                                    onClick={() => setModalShow(true)}
                                    className="sc-button style-place-bid style fl-button pri-3"
                                  >
                                    <span>Chi tiết</span>
                                  </button>
                                </div>
                              </div>
                              <div className="card-title">
                                <h5>
                                  <Link to="/item-details-01">{contest?.name}</Link>
                                </h5>
                                <div className="tags tag-flex">{contest?.status}</div>
                              </div>
                              <div className="meta-info">
                                <div className="author">
                                  <div className="avatar">
                                    <img src={defaultAvatar} alt="axies" />
                                  </div>
                                  <div className="info">
                                    <span>Người tạo</span>
                                    <h6>
                                      {' '}
                                      <Link to="/authors-02">{contest?.staffId}</Link>{' '}
                                    </h6>
                                  </div>
                                </div>
                                <div style={{width: '100px'}}className="price">
                                  <span>Mô tả</span>
                                  <h5> {contest?.content}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )}
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
