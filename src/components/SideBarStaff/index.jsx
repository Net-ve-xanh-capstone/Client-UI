import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import TopicIcon from '@mui/icons-material/Topic';
import React, { useEffect, useState } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaGem,
  FaPalette,
  FaPersonBooth,
} from 'react-icons/fa';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from 'react-pro-sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice.js';
import { IconButton } from '@mui/material';

const SideBarStaff = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('contest');

  const listContent = [
    {
      icon: <FaPalette />,
      path: '/contest',
      name: ' Cuộc thi',
      new: false,
    },
    {
      icon: <ColorLensIcon />,
      path: '/painting',
      name: 'Bài dự thi',
      new: false,
    },
    {
      icon: <BookIcon />,
      path: '/blog',
      name: 'Bài viết',
      new: false,
    },
    {
      icon: <CategoryIcon />,
      path: '/category',
      name: 'Thể Loại',
      new: false,
    },
    {
      icon: <TopicIcon />,
      path: '/topic',
      name: 'Chủ đề',
      new: false,
    },
    {
      icon: <FaPersonBooth />,
      path: '/examiner',
      name: 'Giám khảo',
      new: false,
    },
    {
      icon: <FaGem />,
      path: '/sponsor',
      name: 'Nhà tài trợ',
      new: false,
    },

    {
      icon: <AccountBoxIcon />,
      path: '/competitor',
      name: 'Thí sinh',
      new: false,
    },
  ];

  const handleItemClick = val => {
    if (val) {
      navigate(`/Client-UI/staff-management${val}`);
    }
  };

  const triggerLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    const currentPath = pathname.replace('/staff-management', '');
    setActiveItem(currentPath);
  }, [pathname]);

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md">
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}>
              <div
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 18,
                  letterSpacing: '1px',
                }}>
                Nét vẽ xanh
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          {listContent.map((vl, _) => (
            <MenuItem
              key={vl}
              icon={vl.icon}
              onClick={() => handleItemClick(vl.path)}
              suffix={vl.new && <span className="badge red">NEW</span>}
              active={activeItem === vl.path}>
              {vl.name}
            </MenuItem>
          ))}
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <IconButton
            className="sidebar-btn"
            onClick={() => triggerLogout()}
            size="large">
            <LogoutIcon color="action" style={{ color: 'white' }} />
          </IconButton>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBarStaff;
