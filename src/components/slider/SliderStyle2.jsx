import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Autoplay } from 'swiper/modules';
import img1 from '../../assets/images/box-item/item-h5.1.png';
import useFetchData from '../../hooks/useQueryData.js';
import DotLoaderCustom from '../dotLoader/DotLoader.jsx';
import React from 'react';

const GET_16_PAINTINGS = 'paintings/list16winingpainting';
const SliderStyle2 = () => {
  const subtitle = 'Cuộc thi sáng tạo nghệ thuật';
  const title = 'Nét Vẽ Xanh thành phố Hồ Chí Minh';
  const description = 'Khơi dậy sự sáng tạo, Vươn xa cùng đam mê';
  const { isLoading, isError, data, error } = useFetchData(
    GET_16_PAINTINGS
  );
  const contests = data?.data?.result;
  
  if (isLoading) {
    return <DotLoaderCustom />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  
  return (
    <section className="flat-title-page home5">
      <div className="overlay"></div>
      <div className="themesflat-container">
        <div className="wrap-heading flat-slider d-flex align-items-center">
          <div className="content">
            <h4 className="mg-bt-11">
              <span className="h1 fill">
                <strong>{subtitle}</strong>
              </span>
            </h4>
            <h1 className="heading">{title}</h1>
            <p className="sub-heading mg-t-7 mg-bt-39">{description}</p>
            <div className="flat-bt-slider style2 flex">
              <a
                href="/explore"
                className="sc-button header-slider style style-1 note fl-button pri-1"
              >
                <span>Tìm hiểu</span>
              </a>
            </div>
          </div>

          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={2800}
          >
            {contests.slice(0, 5).map((contest, index) => (
              <SwiperSlide key={index}>
                <img
                  className='img-painting-slider'
                  src={contest?.image}
                  loading={'lazy'}
                  srcSet={contest?.image}
                  alt="Painting" />
              </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={2900}
          >
            {contests.slice(5, 10).map((contest, index) => (
                <SwiperSlide key={index}>
                  <img 
                    className='img-painting-slider' 
                    src={contest?.image}
                    loading={'lazy'}
                    srcSet={contest?.image}
                    alt="Painting" />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={3000}
          >
            {contests.slice(10, 15).map((contest, index) => (
              <SwiperSlide key={index}>
                <img
                  className='img-painting-slider'
                  src={contest?.image}
                  loading={'lazy'}
                  srcSet={contest?.image}
                  alt="Painting" />
              </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={'vertical'}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={3100}
            className="end"
          >
            {contests.slice(9, 15).map((contest, index) => (
              <SwiperSlide key={index}>
                <img
                  className='img-painting-slider'
                  src={contest?.image}
                  loading={'lazy'}
                  srcSet={contest?.image}
                  alt="Painting" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SliderStyle2;
