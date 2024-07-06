import React, { useState } from 'react';
import styles from './page.module.css';
import fakeImage from '../../assets/images/blog/herosBlog.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function BlogStaff() {
  const [popup, setPopup] = useState('');

  const handlePopup = (idx) => {
    setPopup(idx);
  };
  return (
    <div className={styles.container}>
      <h2 className="tf-title pb-20">Blog Của Tôi</h2>
      <div className={styles.blog_list}>
        {Array.from(new Array(5)).map((_, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.image}>
              <img src={fakeImage} alt="title image" />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>
                <div className={styles.check_btn}>
                  <h3>Title of blog</h3>
                  <MoreHorizIcon
                    onClick={() => handlePopup(idx)}
                    sx={{
                      color: '#9835FB',
                      fontSize: '3rem',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                <p>
                  This is all content of this blog is less then 500 character that u want to fill, I
                  will make this content later after you done all of the api call request in this
                  feature ...
                </p>
              </div>
              <div className={styles.tag_list}>
                {Array.from(new Array(2)).map((_, idx) => (
                  <div key={idx} className={styles.tag}>
                    <span
                      style={{
                        backgroundColor: idx === 0 ? '#9835FB' : '#47A432'
                      }}
                    ></span>
                    <h6
                      style={{
                        color: idx === 0 ? '#9835FB' : '#47A432'
                      }}
                    >
                      Name of tag
                    </h6>
                  </div>
                ))}
              </div>
            </div>
            {popup === idx && (
              <div className={styles.poup}>
                <span>
                  <h6>Edit</h6>
                </span>
                <span>
                  <h6>Delete</h6>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogStaff;
