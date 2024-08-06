import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logodark from '../../../assets/images/logo/net-ve-xanh-logo.png';
import logofooter from '../../../assets/images/logo/net-ve-xanh-logo.png';
import { withErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../../../constant/Fallback';
const Footer = () => {
  const accountList = [
    {
      title: 'Thí sinh',
      link: '/authors-01',
    },
    {
      title: 'Bô sưu tập',
      link: '/wallet-connect',
    },
    {
      title: 'Thông tin tài khoản',
      link: '/edit-profile',
    },
    {
      title: 'Nộp bài',
      link: '/create-item',
    },
  ];
  const companyList = [
    {
      title: 'Tìm hiểu',
      link: '/explore-01',
    },
    {
      title: 'Liên hệ',
      link: '/contact-01',
    },
    {
      title: 'Bài đọc',
      link: '/blog',
    },
    {
      title: 'FAQ',
      link: '/faq',
    },
  ];
  const socialList = [
    {
      icon: 'fab fa-facebook',
      link: '#',
    },

    {
      icon: 'icon-fl-tik-tok-2',
      link: '#',
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link to="/Client-UI">
                    <img
                      className="logo-dark"
                      id="logo_footer"
                      src={logodark}
                      alt="nft-gaming"
                    />
                    <img
                      className="logo-light"
                      id="logo_footer"
                      src={logofooter}
                      alt="nft-gaming"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu fl-st-3">
                <h5 className="title-widget">Thông tin</h5>
                <ul>
                  {companyList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-7 col-12">
              <div className="widget widget-subcribe">
                <h5 className="title-widget">Gửi email cho chúng tôi:</h5>
                <div className="form-subcribe">
                  <form
                    id="subscribe-form"
                    action="#"
                    method="GET"
                    acceptCharset="utf-8"
                    className="form-submit">
                    <input
                      name="email"
                      className="email"
                      type="email"
                      placeholder="info@yourgmail.com"
                      required
                    />
                    <button id="submit" name="submit" type="submit">
                      <i className="icon-fl-send"></i>
                    </button>
                  </form>
                </div>
                <div className="widget-social style-1 mg-t32">
                  <ul style={{ justifyContent: 'center' }}>
                    {socialList.map((item, index) => (
                      <li key={index}>
                        <Link to={item.link}>
                          <i className={item.icon}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {isVisible && <Link onClick={scrollToTop} to="#" id="scroll-top"></Link>}

      <div
        className="modal fade popup"
        id="popup_bid"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body space-y-20 pd-40">
              <h3>Place a Bid</h3>
              <p className="text-center">
                You must bid at least{' '}
                <span className="price color-popup">4.89 ETH</span>
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="00.00 ETH"
              />
              <p>
                Enter quantity. <span className="color-popup">5 available</span>
              </p>
              <input type="number" className="form-control" placeholder="1" />
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <p> You must bid at least:</p>
                <p className="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div>
              <Link
                to="#"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close">
                {' '}
                Place a bid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(Footer, {
  FallbackComponent: Fallback,
});
