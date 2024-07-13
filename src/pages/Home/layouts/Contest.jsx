import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Countdown from 'react-countdown';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { Fallback } from '../../../constant/Fallback';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { defaultAvatar, defaultImage } from '../../../constant/imageDefault.js';
import LoadingSkeleton from '../../../components/loading/LoadingSkeleton.jsx';
import useFetchData from '../../../hooks/useQueryData.js';

const Contest = () => {
    const { isLoading, isError, data, error } = useFetchData(
        'contests/getallcontest',
    );
    const contests = data?.data?.result;

    const navigate = useNavigate();

    if (isLoading) {
        return <ContestLoading></ContestLoading>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
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
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                ]}
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
                                                                <div className="sc-card-product">
                                                                    <div className="card-media">
                                                                        <Link to="/item-details-01">
                                                                            <img
                                                                                src={
                                                                                    defaultImage
                                                                                }
                                                                                alt="axies"
                                                                            />
                                                                        </Link>

                                                                        <div className="featured-countdown">
                                                                            {contest?.endTime <
                                                                            new Date().toISOString() ? (
                                                                                <span>
                                                                                    Đã
                                                                                    kết
                                                                                    thúc
                                                                                </span>
                                                                            ) : (
                                                                                <div>
                                                                                    <span className="slogan"></span>
                                                                                    <Countdown
                                                                                        date={
                                                                                            Date.now() +
                                                                                            new Date(
                                                                                                contest?.endTime,
                                                                                            ).getTime() /
                                                                                                1000
                                                                                        }></Countdown>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="button-place-bid">
                                                                            <button
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        `/contest-detail/${contest?.id}`,
                                                                                    )
                                                                                }
                                                                                className="sc-button style-place-bid style fl-button pri-3">
                                                                                <span>
                                                                                    Chi
                                                                                    tiết
                                                                                </span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-title">
                                                                        <h5>
                                                                            <Link to="/item-details-01">
                                                                                {
                                                                                    contest?.name
                                                                                }
                                                                            </Link>
                                                                        </h5>
                                                                        <div className="tags tag-flex">
                                                                            {contest?.status ===
                                                                            'Active'
                                                                                ? 'Diễn ra'
                                                                                : 'Kết thúc'}
                                                                        </div>
                                                                    </div>
                                                                    <div className="meta-info">
                                                                        <div className="author">
                                                                            <div className="avatar">
                                                                                <img
                                                                                    src={
                                                                                        defaultAvatar
                                                                                    }
                                                                                    alt="axies"
                                                                                />
                                                                            </div>
                                                                            <div className="info">
                                                                                <span>
                                                                                    Người
                                                                                    tạo
                                                                                </span>
                                                                                <h6>
                                                                                    {' '}
                                                                                    <Link to="/authors-02">
                                                                                        {
                                                                                            contest?.accountFullName
                                                                                        }
                                                                                    </Link>{' '}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                width: '100px',
                                                                            }}
                                                                            className="price"></div>
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
                        <div className="sc-card-product">
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
                                    <LoadingSkeleton
                                        width="250px"
                                        height="50px"
                                        radius="16px"
                                    />
                                </h5>
                                <div className="tag-flex">
                                    <LoadingSkeleton
                                        width="90px"
                                        height="70px"
                                        radius="16px"
                                    />
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
                                <div
                                    style={{ width: '100px' }}
                                    className="price">
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
