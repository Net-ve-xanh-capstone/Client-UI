import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
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

const SideBarStaff = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [activeItem, setActiveItem] = useState('contest');

  const listContent = [
    {
      icon: <FaPalette />,
      path: '/contest',
      name: ' Cuộc thi',
      new: true,
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
      name: 'Sponsors',
      new: false,
    },
    {
      icon: <FaGem />,
      path: '/painting',
      name: 'Painting',
      new: false,
    },
  ];

  const handleItemClick = val => {
    if (val) {
      navigate(`/staff-management${val}`);
    }
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
                  fontSize: 15,
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
          <Link className="sidebar-btn" style={{ cursor: 'pointer' }} to="/">
            <span>ĐĂNG XUẤT</span>
          </Link>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBarStaff;
