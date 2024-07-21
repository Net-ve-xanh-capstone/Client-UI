import React from 'react';
import { formatDate } from '../../utils/formatDate.js';
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
        <img src={items.image} alt="" />
      </div>
      <div className={styles.content}>
        <span className={styles.author_name}>
          <h5>{items.ownerName}</h5>
        </span>
        <span className={styles.topic_content}>
          <h6>{items.topicName}</h6>
          <h6>{items.level}</h6>
        </span>
        <span className={styles.round_content}>
          <h6>{items.roundName}</h6>
          <h6>{items.status}</h6>
        </span>
      </div>
      <div className={styles.btn_trigger}>
        <span className={styles.btn_find} onClick={() => getPaintingByID(items.id)}>
          <h5>Chi tiết</h5>
        </span>
      </div>
    </div>
  );
}

export default CardPainting;
