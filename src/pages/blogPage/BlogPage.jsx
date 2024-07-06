import { Pagination } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CardBlog from '../../components/cardBlog/page.jsx';
import Footer from '../../components/common/footer/Footer.jsx';
import HeaderVersion2 from '../../components/common/header/HeaderVersion2.jsx';
import HerosBlog from '../../components/herosBlog/page.jsx';
import SidebarBlog from '../../components/sidebarBlog/page.jsx';
import TypeBlog from '../../components/typeBlog/page.jsx';
import styles from './blog.module.css';

function BlogPage() {
  const [navigate, setNavigate] = useState('blog');
  const moveToBox = useRef(null);
  const activeMoving = () => {
    moveToBox.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    console.log(navigate);
  }, [navigate]);

  return (
    <div className="home-5">
      <HeaderVersion2 />
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <HerosBlog activeMoving={activeMoving} />
          <SidebarBlog setNavigate={setNavigate} ref={moveToBox}>
            {navigate === 'blog' ? (
              <>
                <CardBlog />
                <Pagination
                  count={10}
                  color="secondary"
                  size="large"
                  sx={{
                    width: '70%',
                    display: 'flex',
                    justifyContent: 'center',
                    '.MuiPaginationItem-text': {
                      fontSize: '1.5rem'
                    },
                    '.Mui-selected': {
                      backgroundColor: '#5142fc !important', // Customize the selected item background color
                      color: 'white' // Ensure text is readable on selected background
                    }
                  }}
                />
              </>
            ) : navigate === 'category' ? (
              <TypeBlog />
            ) : (
              ''
            )}
          </SidebarBlog>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default BlogPage;
