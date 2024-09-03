import React from 'react';
import { cutString } from '../../utils/formatDate.js';
import styles from './card.module.css';

function CardBlog({ blogList }) {
  return (
    <>
      {blogList?.length
        ? blogList.map(vl => (
          <div key={vl} className={styles.card}>
            <div className={styles.image}>
              <img src={vl.image} alt={vl.title} />
            </div>
            <div className={styles.card_content}>
              <div className={styles.text_box}>
                <h3>
                  {vl.title?.length > 35
                    ? cutString(vl.title, 35) + '...'
                    : vl.title}
                </h3>
                <p>
                  {vl.description?.length > 200
                    ? cutString(vl.description, 200) + '...'
                    : vl.description}
                </p>
              </div>
              <div className={styles.tag_list}>
                <div className={styles.tag}>
                    <span
                      style={{
                        backgroundColor: '#9835FB',
                      }}></span>
                  <h6
                    style={{
                      color: '#9835FB',
                    }}>
                    {vl.categoryName?.length > 20
                      ? cutString(vl.categoryName, 20) + '...'
                      : vl.categoryName}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))
        : ''}
    </>
  );
}

export default CardBlog;
