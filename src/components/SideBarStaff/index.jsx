import React, { useState } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaGem,
  FaPalette,
  FaBlog,
  FaPersonBooth
} from 'react-icons/fa';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SideBarStaff = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
  handleChangeType
}) => {
  const [activeItem, setActiveItem] = useState('contest');

  const handleItemClick = (type) => {
    setActiveItem(type);
    handleChangeType(type);
  };

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem icon={<FaAngleDoubleRight />} onClick={handleCollapsedChange}></MenuItem>
          ) : (
            <MenuItem suffix={<FaAngleDoubleLeft />} onClick={handleCollapsedChange}>
              <div
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px'
                }}
              >
                Nét vẽ xanh
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaPalette />}
            onClick={() => handleItemClick('contest')}
            suffix={<span className="badge red">NEW</span>}
            active={activeItem === 'contest'}
          >
            Cuộc thi
          </MenuItem>
          <MenuItem
            icon={<FaBlog />}
            onClick={() => handleItemClick('blog')}
            active={activeItem === 'blog'}
          >
            Bài viết
          </MenuItem>
          <MenuItem
            icon={<FaBlog />}
            onClick={() => handleItemClick('category')}
            active={activeItem === 'category'}
          >
            Thể Loại
          </MenuItem>
          <MenuItem
            icon={<FaPersonBooth />}
            onClick={() => handleItemClick('judges')}
            active={activeItem === 'judges'}
          >
            Giám khảo
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            onClick={() => handleItemClick('schedule')}
            active={activeItem === 'schedule'}
          >
            Working schedule
          </MenuItem>
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
