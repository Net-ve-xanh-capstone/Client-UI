import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useState } from 'react';
import SidebarStraff from '../../components/SideBarStaff';

import './style.scss';

function SideBarStaff({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = value => {
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
          />
          <main>
            <div
              className="btn-toggle"
              onClick={() => handleToggleSidebar(true)}>
              <DensityMediumIcon />
            </div>
          </main>
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#F5F7F8',
          }}>
          {/* {componentFragment[type]} */}
          {children}
        </div>
      </div>
    </>
  );
}

export default SideBarStaff;
