import FlareIcon from '@mui/icons-material/Flare';
import SearchIcon from '@mui/icons-material/Search';
import React, { forwardRef } from 'react';
import styles from './page.module.css';
const SidebarBlog = forwardRef((props, ref) => {
  const { children } = props;

  return (
    <div className={styles.section} ref={ref}>
      <div className={styles.left_side}>{children}</div>
      <div className={styles.right_side}>
        <div className={styles.sticky}>
          <div className={styles.topic}>
            <FlareIcon
              sx={{
                fontSize: '3rem',
                color: '#5142fc'
              }}
            />
            <h3>Finding your post</h3>
          </div>
          <div className={styles.side_choose}>
            <input type="text" />
            <SearchIcon
              sx={{
                fontSize: '3rem',
                color: '#5142fc'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default SidebarBlog;
