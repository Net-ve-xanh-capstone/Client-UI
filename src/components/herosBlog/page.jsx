import React from 'react';
import styles from './hero.module.css';
import herosImage from '../../assets/images/blog/herosBlog.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function HerosBlog({ activeMoving }) {
  const subtitle = 'Các bài viết hữu ích';
  const title =
    'Nét Vẽ Xanh thành phố Hồ Chí Minh hiện đang tiến bước trở thành một trong những trang đăng ký rộng mở nhất dành cho các bạn trẻ có mong muốn được thể hiện tài năng của mình.';
  const description =
    'Có rất nhiều cuộc thi đang chờ đợi các bạn, hãy tìm hiểu các cuộc thi bạn cần nhé !';
  return (
    <div className={styles.container_hero}>
      <div className={styles.heros}>
        <div className={styles.heros_title}>
          <h1>{subtitle}</h1>
          <p>{title}</p>
          <div className={styles.search_box}>
            <p>{description}</p>
            <div className={styles.search}>
              <span className={styles.btn_find} onClick={() => activeMoving()}>
                <h5>Xem thêm các bài viết</h5>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.heros_image}>
          <div className={styles.box_image}>
            <img src={herosImage} alt="Title" />
          </div>
        </div>
      </div>
      <div className={styles.tagheros}>
        <h2 className="tf-title pb-20">Hash Tag</h2>
        <div className={styles.hashtag}>
          <div className={styles.tag_list}>
            <div className={styles.hashtag_card}>
              <h6>Hello</h6>
            </div>
            <div className={styles.hashtag_card}>
              <h6>Hello</h6>
            </div>
            <div className={styles.hashtag_card}>
              <h6>Hello</h6>
            </div>
            <div className={styles.hashtag_card}>
              <h6>Hello</h6>
            </div>
          </div>
          <div className={styles.icon}>
            <KeyboardArrowDownIcon sx={{ fontSize: '5rem', color: '#5142fc' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HerosBlog;
