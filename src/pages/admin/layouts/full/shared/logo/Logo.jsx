import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import LogoNetVeXanh from '../../../../../../assets/images/logo/net-ve-xanh-logo.png';

const LinkStyled = styled(Link)(() => ({
  height: '180px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled
      className="select-none mb-15"
      to="/Client-UI/admin-management/dashboard">
      <img className="select-none" src={LogoNetVeXanh} alt="logo" />
    </LinkStyled>
  );
};

export default Logo;
