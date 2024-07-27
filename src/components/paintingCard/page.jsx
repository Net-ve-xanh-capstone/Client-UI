import React from 'react';
import { cutString, formatDate } from '../../utils/formatDate.js';
import styles from './page.module.css';

function CardPainting({ items, getPaintingByID }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <span className={`${styles.child_image}  ${styles.code_contest}`}>
          <h6>{items.code}</h6>
        </span>
        <span className={`${styles.child_image} ${styles.date_contest}`}>
          <h6>{formatDate(items.submitTime)}</h6>
        </span>
        <img src={items.image} className={styles.image_field} alt="" />
      </div>
      <div className={styles.content}>
        <span className={styles.painting_name}>
          <h5>{items.name}</h5>
          <span
            className={styles.status}
            style={{
              backgroundColor:
                items.status === 'Accepted' || items.status === 'Submitted'
                  ? 'rgba(57, 153, 24, 0.7)'
                  : 'rgba(255, 0, 0, 0.7)',
            }}>
            <h5>{items.status}</h5>
          </span>
        </span>
        <div className={`${styles.field} ${styles.title_field}`}>
          <div className={styles.title_field}>
            <p>Mã thí sinh: </p>
          </div>
          <div className={styles.des_field}>
            <p>{items.competitorCode}</p>
          </div>
        </div>
        <div className={`${styles.field} ${styles.title_field}`}>
          <div className={styles.title_field}>
            <p>Tác giả: </p>
          </div>
          <div className={styles.des_field}>
            <p>{items.ownerName}</p>
          </div>
        </div>
        <div className={`${styles.field} ${styles.title_field}`}>
          <div className={styles.title_field}>
            <p>Cấp độ: </p>
          </div>
          <div className={styles.des_field}>
            <p>{items.level}</p>
          </div>
        </div>
        <div className={`${styles.field} ${styles.title_field}`}>
          <div className={styles.title_field}>
            <p>Chủ đề: </p>
          </div>
          <div className={styles.des_field}>
            <p>{items.topicName}</p>
          </div>
        </div>
        <div className={`${styles.field} ${styles.title_field}`}>
          <div className={styles.title_field}>
            <p>Vòng thi: </p>
          </div>
          <div className={styles.des_field}>
            <p>{items.roundName}</p>
          </div>
        </div>
      </div>
      <div className={styles.btn_trigger}>
        <span
          className={styles.btn_find}
          onClick={() => getPaintingByID(items.id)}>
          <h5>Chi tiết</h5>
        </span>
      </div>
    </div>
  );
}

export default CardPainting;
