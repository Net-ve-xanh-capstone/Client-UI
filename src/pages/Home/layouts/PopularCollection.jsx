import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { withErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../../../constant/Fallback';
import PropTypes from 'prop-types';
import useFetchData from '../../../hooks/useQueryData.js';
import { userAvatar, whiteScreen } from '../../../constant/imageDefault.js';

const GET_ALL_COLLECTION = 'collections/getallcollection';
const PopularCollection = () => {
  const [collection, setCollection] = useState([]);
  const {
    isLoading,
    isError,
    data,
    error,
  } = useFetchData(GET_ALL_COLLECTION);
  
  useEffect(() => {
    if (data) {
      setCollection(data?.data?.result?.list);
    }
  }, [data, collection]);
  
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <section className="tf-section live-auctions style4 home5 bg-style2">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-22 text-left">
                Các bộ sưu tập nổi trội
              </h2>
              <Link to="/Client-UI/collection" className="exp style2">
                TÌM HIỂU THÊM
              </Link>
            </div>
          </div>
          <div className="col-md-12">
            <div className="">
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
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                navigation={false}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}>
                {collection.length > 0 && collection.slice(0, 16).map((item, index) => (
                  <SwiperSlide key={index}>
                    <PopularCollectionItem item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PopularCollectionItem = props => (
  <div className="swiper-container show-shadow carousel4 button-arow-style">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="sc-card-collection style-2 home5">
            <div className="media-images-collection">
              <div className="box-left">
                <img src={props.item.image[0] || whiteScreen} alt="painting" />
              </div>
              <div className="box-right">
                <div className="top-img">
                  <img
                    src={props.item.image[1] || whiteScreen}
                    alt="painting"
                  />
                </div>
                <div className="bottom-img">
                  <img
                    src={props.item.image[2] || whiteScreen}
                    alt="painting"
                  />
                </div>
              </div>
            </div>
            <div className="author-avatar">
              <div className="image">
                <img
                  src={props.item.imgAuthor || userAvatar}
                  alt="Avatar"
                  className="avatar"
                />
                <div className="badge">
                  <i className="ripple"></i>
                </div>
              </div>
            </div>
            <div className="content">
              <h4 className="heading">
                <Link to={`/Client-UI/collection-painting/${props.item.id}`}>{props.item?.name}</Link>
              </h4>
              <div className="description">
                <span>Mô tả: </span>
                <h6 className="name">
                  <Link className="cursor-none" to="#">
                    {props.item?.description}
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

PopularCollectionItem.propTypes = {
  item: PropTypes.object,
};

export default withErrorBoundary(PopularCollection, {
  FallbackComponent: Fallback,
});
