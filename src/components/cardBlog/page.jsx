import React from 'react';
import styles from './card.module.css';
import fakeImage from '../../assets/images/blog/herosBlog.png';

function CardBlog() {
  return (
    <>
      {Array.from(new Array(5)).map((_, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.image}>
            <img src={fakeImage} alt="Title anh" />
          </div>
          <div className={styles.card_content}>
            <h3>Title of blog</h3>
            <p>
              This is all content of this blog is less then 500 character that u want to fill, I
              will make this content later after you done all of the api call request in this
              feature ...
            </p>
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
        </div>
      ))}
    </>
  );
}

export default CardBlog;
