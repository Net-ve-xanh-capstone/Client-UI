import { styled, Tooltip, tooltipClasses } from '@mui/material';
import React, { forwardRef} from 'react';
import coin from '../../assets/images/logo/coin.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';

const TitleComponent = props => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <ul
            style={{
                width: '180px',
            }}
            id="menu-primary-menu"
            className="menu h5">
            <li className="mb-15">
                <a href="/edit-profile">
                    <i className="fab fa-accusoft"></i>{' '}
                    <span>Tranh của tôi</span>
                </a>
            </li>
            <li className="mb-15">
                <a href="/edit-profile">
                    <i className="fas fa-pencil-alt"></i>{' '}
                    <span> Chỉnh sửa thông tin</span>
                </a>
            </li>
            <li>
                <a href="/#" id="logout" onClick={handleLogout}>
                    <i className="fal fa-sign-out"></i>
                    <span>Đăng xuất</span>
                </a>
            </li>
        </ul>
    );
};

const InsideComponent = forwardRef(function MyComponent(props, ref) {
    return (
        <div {...props} ref={ref}>
            <div className="sc-button header-slider style style-1 fl-button pri-1 flex justify-content-between align-items-center">
                <div className="info">
                    <span>Thông tin</span>
                </div>
                <img className="avatar" src={coin} alt="avatar" />
            </div>
        </div>
    );
});

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 18,
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
