import { Pagination } from '@mui/material';
import React, { useRef } from 'react';
import CardBlog from '../../components/cardBlog/page.jsx';
import Footer from '../../components/common/footer/Footer.jsx';
import HeaderVersion2 from '../../components/common/header/HeaderVersion2.jsx';
import HerosBlog from '../../components/herosBlog/page.jsx';
import SidebarBlog from '../../components/sidebarBlog/page.jsx';
import styles from './blog.module.css';

import { BlogProvider } from './provider/blog.provider.jsx';
import { useBlogProvider } from './provider/index.js';

function Blog() {
  const { category, totalPage, setPageNumber, resetCategories, filterBlog } =
    useBlogProvider();
  const moveToBox = useRef(null);
  const activeMoving = () => {
    moveToBox.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // change value of page when navigating
  const handleChange = (_, value) => {
    setPageNumber(value);
    resetCategories();
  };

  return (
    <div className="home-5">
      <HeaderVersion2 />
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <HerosBlog activeMoving={activeMoving} />
          <SidebarBlog category={category} ref={moveToBox}>
            <>
              <CardBlog blogList={filterBlog} />
              <Pagination
                count={totalPage}
                color="secondary"
                size="large"
                onChange={handleChange}
                sx={{
                  width: '70%',
                  display: 'flex',
                  justifyContent: 'center',
                  '.MuiPaginationItem-text': {
                    fontSize: '1.5rem',
                  },
                  '.Mui-selected': {
                    backgroundColor: '#5142fc !important',
                    color: 'white',
                  },
                }}
              />
            </>
          </SidebarBlog>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function BlogPage() {
  return (
    <BlogProvider>
      <Blog />
    </BlogProvider>
  );
}

export default BlogPage;
