import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Autoplay } from "swiper/modules";
import img1 from "../../assets/images/box-item/item-h5.1.png";
import img2 from "../../assets/images/box-item/item-h5.2.png";
import img3 from "../../assets/images/box-item/item-h5.3.png";

const SliderStyle2 = () => {
  const subtitle = "Cuộc thi sáng tạo nghệ thuật";
  const title = "Nét Vẽ Xanh thành phố Hồ Chí Minh";
  const description = "Khơi dậy sự sáng tạo, Vươn xa cùng đam mê";
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
                href="/login"
                className="sc-button header-slider style style-1 rocket fl-button pri-1"
              >
                <span>Đăng nhập</span>
              </a>
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
            direction={"vertical"}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={2000}
          >
            {Array(5)
              .fill()
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <img src={img1} alt="Axies" />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={"vertical"}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={2100}
          >
            {Array(5)
              .fill()
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <img src={img1} alt="Axies" />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={"vertical"}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={2200}
          >
            {Array(5)
              .fill()
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <img src={img1} alt="Axies" />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            modules={[Autoplay]}
            direction={"vertical"}
            spaceBetween={10}
            slidesPerView={4}
            loop
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={2000}
            className="end"
          >
            {Array(5)
              .fill()
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <img src={img1} alt="Axies" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SliderStyle2;
