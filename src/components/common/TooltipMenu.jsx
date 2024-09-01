import { styled, Tooltip, tooltipClasses } from '@mui/material';
import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';
import { Link } from 'react-router-dom';

const TitleComponent = props => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <ul
      style={{
        width: '160px',
      }}
      id="menu-primary-menu"
      className="menu h5 select-none">
      <li className="mb-15">
        <Link to="/my-painting">
          <i className="fab fa-accusoft mr-2"></i>
          <span>Tranh của tôi</span>
        </Link>
      </li>
      <li className="mb-15">
        <Link to="/my-collection">
          <i className="fab fa-asymmetrik mr-2"></i>
          <span>Bộ sưu tập của tôi</span>
        </Link>
      </li>
      <li className="mb-15">
        <Link to="/edit-profile">
          <i className="fas fa-pencil-alt mr-2"></i>
          <span> Thông tin cá nhân</span>
        </Link>
      </li>
      <li>
        <Link className="cursor-pointer" id="logout" onClick={handleLogout}>
          <i className="fal fa-sign-out mr-3"></i>
          <span>Đăng xuất</span>
        </Link>
      </li>
    </ul>
  );
};

const InsideComponent = forwardRef(function MyComponent(props, ref) {
  return (
    <div {...props} ref={ref}>
      <div className="sc-button header-slider style style-1 fl-button pri-1 flex  align-items-center">
        <div className="info select-none">
          <span>Thông tin</span>
        </div>
      </div>
    </div>
  );
});

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    PopperProps={{ disablePortal: true }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    zIndex: 9999,
  },
}));

const TooltipMenu = () => {
  return (
    <LightTooltip title={<TitleComponent />}>
      <InsideComponent />
    </LightTooltip>
  );
};

export default TooltipMenu;
