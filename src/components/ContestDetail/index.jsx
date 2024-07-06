import React, { useEffect } from 'react';
import styles from './style.module.css';
import {
  ColorLens,
  CalendarMonth,
  AccessTimeFilled,
  Topic,
  School,
  ArrowBack
} from '@mui/icons-material';

import ContestFragment from '../ContestFragment';
import { IconButton } from '@mui/material';

function ContestDetail({ contest, handleBack }) {
  const tabs = [
    { title: 'Cuộc thi', icon: <ColorLens />, component: <ContestFragment contest={contest} /> },
    {
      title: 'Đối tượng',
      icon: <School />,
      component: <ContestFragment contest={contest} />
    },
    {
      title: 'Vòng thi',
      icon: <AccessTimeFilled />,
      component: <ContestFragment contest={contest} />
    },
    { title: 'Topic', icon: <Topic />, component: <ContestFragment contest={contest} /> },
    { title: 'Schedule', icon: <CalendarMonth />, component: <ContestFragment contest={contest} /> }
    // Add more tabs here as needed
  ];
  return (
    <div className={styles.containerDetail}>
      <div className={styles.heading}>
        <div className={styles.iconBox}>
          <IconButton onClick={handleBack}>
            <ArrowBack className={styles.backIcon} />
          </IconButton>
        </div>
        <div className="heading-live-auctions">
          <h2 className="tf-title pb-20" style={{ color: 'var(--pink)' }}>
            Nét vẽ xanh 2023-2024
          </h2>
        </div>
      </div>

      <div className={styles.tabs} data-tab-count={tabs.length}>
        {tabs.map((tab, index) => (
          <input
            key={index}
            type="radio"
            id={`tab${index + 1}`}
            name="tab-control"
            defaultChecked={index === 0}
            className={styles.tabInput}
          />
        ))}
        <ul className={styles.tabList}>
          {tabs.map((tab, index) => (
            <li key={index} title={tab.title} className={styles.tabItem}>
              <label htmlFor={`tab${index + 1}`} role="button" className={styles.tabLabel}>
                {tab.icon}
                <br />
                <span>{tab.title}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className={styles.slider}>
          <div className={styles.indicator}></div>
        </div>
        <div className={styles.content}>
          {tabs.map((tab, index) => (
            <section key={index} className={styles.contentSection}>
              <h2>{tab.title}</h2>
              {tab.component}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContestDetail;
