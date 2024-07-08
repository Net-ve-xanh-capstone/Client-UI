import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import LevelFragment from '../LevelFragment';

function ContestDetail({ contest, handleBack }) {
  const [contestDes, setContestDes] = useState();

  useEffect(() => {
    getContestDetail();
  }, []);
  const getContestDetail = () => {
    axios
      .get(`https://webapp-240702160733.azurewebsites.net/api/contests/${contest.id}`)
      .then((res) => {
        setContestDes(res?.result);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const tabs = [
    {
      title: 'Cuộc thi',
      icon: <ColorLens />,
      component: <ContestFragment contestFrag={contestDes} getContestDetail={getContestDetail} />
    },
    {
      title: 'Đối tượng',
      icon: <School />,
      component: <LevelFragment levelFrag={contestDes} getContestDetail={getContestDetail} />
    },
    {
      title: 'Vòng thi',
      icon: <AccessTimeFilled />,
      component: <h1></h1>
    },
    { title: 'Topic', icon: <Topic />, component: <h1></h1> },
    { title: 'Schedule', icon: <CalendarMonth />, component: <h1></h1> }
    // Add more tabs here as needed
  ];
  return (
    contestDes && (
      <div className={styles.containerDetail}>
        <div className={styles.heading}>
          <div className={styles.iconBox}>
            <IconButton onClick={handleBack}>
              <ArrowBack className={styles.backIcon} />
            </IconButton>
          </div>
          <div>
            <h2 className={styles.titleHeader}>Nét vẽ xanh 2023-2024</h2>
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
    )
  );
}

export default ContestDetail;
