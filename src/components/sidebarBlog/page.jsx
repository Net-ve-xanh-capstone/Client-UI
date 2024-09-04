import FlareIcon from '@mui/icons-material/Flare';
import SearchIcon from '@mui/icons-material/Search';
import React, { forwardRef } from 'react';
import styles from './page.module.css';
import { FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useBlogProvider } from '../../pages/blogPage/provider/index.js';

const SidebarBlog = forwardRef((props, ref) => {
  const { category, children } = props;
  const { handleCheckCategoryName } = useBlogProvider();
  return (
    <div className={styles.section} ref={ref}>
      <div className={styles.left_side}>{children}</div>
      <div className={styles.right_side}>
        <div className={styles.sticky}>
          <div className={styles.topic}>
            <FlareIcon
              sx={{
                fontSize: '3rem',
                color: '#5142fc',
              }}
            />
            <h3>Tìm bài viết</h3>
          </div>
          <div className={styles.side_choose}>
            <input type="text" />
            <SearchIcon
              sx={{
                fontSize: '3rem',
                color: '#5142fc',
              }}
            />
          </div>
          <FormGroup>
            {category.map((category, idx) => (
              <FormControlLabel
                control={<Checkbox />}
                key={idx}
                value={category}
                label={category}
                aria-label={category}
                onChange={(event) => handleCheckCategoryName(event.target.value)}
              />
            ))}
          </FormGroup>
        </div>
      </div>
    </div>
  );
});

export default SidebarBlog;
