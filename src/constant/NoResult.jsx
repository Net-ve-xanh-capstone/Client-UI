import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Countdown from 'react-countdown';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import CardModal from '../components/CardModal';
const NoResult = () => {
  const [data] = useState(liveAuctionData);
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <HeaderVersion1 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">No Result</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>No Result</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-no-result tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                Sorry, We Couldn’t Find Any Results For This Search.
              </h2>
              <h5 className="sub-title help-center mg-bt-32 ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati
                dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.
              </h5>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section live-auctions result">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="tf-title">Live Auctions</h2>
              <div className="heading-line"></div>
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
                  },
                  1300: {
                    slidesPerView: 4
                  }
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data.slice(0, 7).map((item, index) => (
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
                                    <span>Place Bid</span>
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
      <Footer />
    </div>
  );
};
export default NoResult;
