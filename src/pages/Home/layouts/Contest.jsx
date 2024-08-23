import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { Fallback } from '../../../constant/Fallback';
import { withErrorBoundary } from 'react-error-boundary';
import LoadingSkeleton from '../../../components/loading/LoadingSkeleton.jsx';
import useFetchData from '../../../hooks/useQueryData.js';
import { formatDate } from '../../../utils/formatDate.js';
import { color } from '../../../constant/Color.js';
import { userAvatar } from '../../../constant/imageDefault.js';
import PropTypes from 'prop-types';
import { paintingStatusActive } from '../../../constant/Status.js';

const Contest = () => {
  const { isLoading, isError, data, error } = useFetchData(
    'contests/getallcontest',
  );
  const contests = data?.data?.result.filter(
    item => item.status === paintingStatusActive,
  );
  const navigate = useNavigate();

  if (isLoading) {
    return <ContestLoading></ContestLoading>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <Fragment>
      <section className="tf-section live-auctions padding-bottom-zero">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title">Cuộc Thi Đang Diễn Ra</h2>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                }}
                //disable
                navigation={false}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}>
                {contests.length > 0 &&
                  contests.map(contest => {
                    return (
                      <SwiperSlide key={contest.id}>
                        <div className="swiper-container show-shadow carousel auctions">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="slider-item">
                                <div className="sc-card-contest">
                                  <div className="card-media">
                                    <Link
                                      to={`/Client-UI/contest-detail/${contest?.id}`}>
                                      <img
                                        className="object-fit-contain"
                                        src={contest?.logo}
                                        alt="Logo cuộc thi"
                                      />
                                    </Link>
                                    <div className="button-place-bid">
                                      <button
                                        onClick={() =>
                                          navigate(
                                            `/Client-UI/contest-detail/${contest?.id}`,
                                          )
                                        }
                                        className="sc-button style-place-bid style fl-button pri-3">
                                        <span>Chi tiết</span>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="card-title">
                                    <h5>
                                      <Link
                                        to={`/Client-UI/contest-detail/${contest?.id}`}>
                                        {contest?.name}
                                      </Link>
                                    </h5>
                                  </div>
                                  <div className="meta-info mb-4">
                                    <div className="author">
                                      <div className="avatar">
                                        <img src={userAvatar} alt="avatar" />
                                      </div>
                                      <div className="info">
                                        <span className="font-weight-bold">
                                          Người tạo
                                        </span>
                                        <h6>
                                          <div
                                            style={{
                                              color: color.black,
                                            }}>
                                            {contest?.accountFullName}
                                          </div>
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="price">
                                      <div className="flex flex-column align-items-start justify-content-center">
                                        <span className="text-start">
                                          Trạng thái
                                        </span>
                                        <h6>
                                          <div>{contest?.status}</div>
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="meta-info">
                                    <div className="price w-100">
                                      <div className="flex justify-content-between">
                                        <div className="">
                                          <span>Thời gian bắt đầu</span>
                                          <h6>
                                            <div className="text-left">
                                              {formatDate(contest?.startTime)}
                                            </div>
                                          </h6>
                                        </div>

                                        <div className="">
                                          <span>Thời gian kết thúc</span>
                                          <h6>
                                            <div className="text-left">
                                              {formatDate(contest?.endTime)}
                                            </div>
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const ContestLoading = () => {
  return (
    <div className="swiper-container show-shadow carousel auctions">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="slider-item">
            <div
              className="sc-card-product"
              style={{ maxHeight: '500px !important' }}>
              <div className="card-media">
                <LoadingSkeleton
                  width="100%"
                  height="400px"
                  radius="16px"></LoadingSkeleton>

                <div className="button-place-bid">
                  <LoadingSkeleton
                    width="100%"
                    height="100%"
                    radius="16px"></LoadingSkeleton>
                </div>
              </div>
              <div className="card-title">
                <h5>
                  <LoadingSkeleton width="250px" height="50px" radius="16px" />
                </h5>
                <div className="tag-flex">
                  <LoadingSkeleton width="90px" height="70px" radius="16px" />
                </div>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <LoadingSkeleton
                      width="100%"
                      height="100%"
                      radius="50%"></LoadingSkeleton>
                  </div>
                  <div className="info">
                    <span>
                      <LoadingSkeleton
                        width="100px"
                        height="20px"
                        radius="16px"
                      />
                    </span>
                    <h6>
                      <LoadingSkeleton />
                    </h6>
                  </div>
                </div>
                <div style={{ width: '100px' }} className="price">
                  <span>
                    <LoadingSkeleton
                      width="100px"
                      height="20px"
                      radius="16px"
                    />
                  </span>
                  <h5>
                    <LoadingSkeleton />
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Contest.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default withErrorBoundary(Contest, {
  FallbackComponent: Fallback,
});
