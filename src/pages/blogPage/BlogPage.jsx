import { Pagination } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { getAllBlog } from '../../api/blogApi.js';
import CardBlog from '../../components/cardBlog/page.jsx';
import Footer from '../../components/common/footer/Footer.jsx';
import HeaderVersion2 from '../../components/common/header/HeaderVersion2.jsx';
import HerosBlog from '../../components/herosBlog/page.jsx';
import SidebarBlog from '../../components/sidebarBlog/page.jsx';
import styles from './blog.module.css';

function BlogPage() {
  const [blogList, setBlogList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const moveToBox = useRef(null);
  const activeMoving = () => {
    moveToBox.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // change value of page when navigating
  const handleChange = (_, value) => {
    setPageNumber(value);
  };

  // fetch data
  const fetchDataBlog = async () => {
    await getAllBlog(pageNumber)
      .then((res) => {
        const data = res.data.result;
        setTotalPage(data.totalPage);
        setBlogList(data.list);
      })
      .catch((err) => console.log(err));
  };

  // fetch data when re-render
  useEffect(() => {
    fetchDataBlog();
  }, []);

  // fetch data when re-render
  useEffect(() => {
    fetchDataBlog();
  }, [pageNumber]);

  return (
    <div className="home-5">
      <HeaderVersion2 />
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <HerosBlog activeMoving={activeMoving} />
          <SidebarBlog ref={moveToBox}>
            <>
              <CardBlog blogList={blogList} />
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
                    fontSize: '1.5rem'
                  },
                  '.Mui-selected': {
                    backgroundColor: '#5142fc !important', // Customize the selected item background color
                    color: 'white' // Ensure text is readable on selected background
                  }
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
export default BlogPage;
