import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useState } from 'react';
import SidebarStraff from '../../components/SideBarStaff';

import './style.scss';
import ContestManagement from '../ContestManagement';
import BlogStaff from '../../components/cardBlogStaff/page.jsx';
import CategoryBlog from '../../components/categoryBlog/page.jsx';

function StaffManage() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [type, setType] = useState('contest');

  const handleChangeType = (text) => {
    setType(text);
  };
  const componentFragment = {
    contest: <ContestManagement />,
    profile: <Profile />,
    blog: <BlogStaff />,
    category: <CategoryBlog />
  };

  function Profile() {
    return <h1>Profile</h1>;
  }
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <>
      <div className="staff-container">
        <div className={`sidebar ${toggled ? 'toggled' : ''}`}>
          <SidebarStraff
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
            handleChangeType={handleChangeType}
          />
          <main>
            <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
              <DensityMediumIcon />
            </div>
          </main>
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#F5F7F8'
          }}
        >
          {componentFragment[type]}
        </div>
      </div>
    </>
  );
}

export default StaffManage;
