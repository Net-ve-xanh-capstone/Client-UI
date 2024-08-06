/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoheader from '../../../assets/images/logo/net-ve-xanh-logo.png';
import logoheader2x from '../../../assets/images/logo/net-ve-xanh-logo.png';
import menus from '../../../constant/Menu';
import { withErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../../../constant/Fallback';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/auth/authSlice';

const HeaderVersion1 = () => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });
  const isSticky = e => {
    const header = document.querySelector('.js-header');
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header.classList.add('is-fixed')
      : header.classList.remove('is-fixed');
    scrollTop >= 400
      ? header.classList.add('is-small')
      : header.classList.remove('is-small');
  };

  const menuLeft = useRef(null);
  const btnToggle = useRef(null);
  const btnSearch = useRef(null);

  const menuToggle = () => {
    menuLeft.current.classList.toggle('active');
    btnToggle.current.classList.toggle('active');
  };

  const searchBtn = () => {
    btnSearch.current.classList.toggle('active');
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const handleOnClick = index => {
    setActiveIndex(index);
  };
  const { jwtToken, userInfo } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const hasAccess = submenu => {
    if (submenu.public) {
      return true;
    }

    if (!submenu.role || submenu.role.length === 0) {
      return false;
    }
    return userInfo && submenu.role.includes(userInfo.role);
  };

  return (
    <header id="header_main" className="header_1 js-header" ref={headerRef}>
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <Link
                      to="/Client-UI/"
                      rel="home"
                      className="main-logo">
                      <img
                        className="logo-light"
                        id="logo_header"
                        src={logoheader}
                        srcSet={`${logoheader2x}`}
                        alt="logo-netvexanh"
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className="mobile-button"
                  ref={btnToggle}
                  onClick={menuToggle}>
                  <span></span>
                </div>
                <nav
                  id="main-nav"
                  className="main-nav"
                  ref={menuLeft}>
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map((data, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleOnClick(index)
                        }
                        className={`menu-item ${
                          data.namesub
                            ? 'menu-item-has-children'
                            : ''
                        } ${activeIndex === index ? 'active' : ''} `}>
                        <Link to={data.links}>
                          {data.name}
                        </Link>
                        {data.namesub && (
                          <ul className="sub-menu">
                            {data.namesub
                              .filter(hasAccess)
                              .map(submenu => (
                                <li
                                  key={
                                    submenu.id
                                  }
                                  className={
                                    window
                                      .location
                                      .pathname ===
                                    submenu.links
                                      ? 'menu-item current-item'
                                      : 'menu-item'
                                  }>
                                  <Link
                                    to={
                                      submenu.links
                                    }>
                                    {
                                      submenu.sub
                                    }
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default withErrorBoundary(HeaderVersion1, {
  FallbackComponent: Fallback,
});
