import {
  AccessTimeFilled,
  ArrowBack,
  CalendarMonth,
  ColorLens,
  School,
  Topic,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton';
import { IconButton } from '@mui/material';
import { getById } from '../../api/contestStaffApi';
import ContestFragment from '../ContestFragment';
import LevelFragment from '../LevelFragment';
import RoundFragment from '../RoundFragment';
import TopicFragment from '../TopicFragment';

function ContestDetail({ contest, handleBack }) {
  const [contestDes, setContestDes] = useState();

  useEffect(() => {
    getContestDetail();
  }, []);
  const getContestDetail = async () => {
    try {
      const { data } = await getById(contest.id);
      setContestDes(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const tabs = [
    {
      title: 'Cuộc thi',
      icon: <ColorLens />,
      component: (
        <ContestFragment
          contestFrag={contestDes}
          getContestDetail={getContestDetail}
        />
      ),
    },
    {
      title: 'Đối tượng',
      icon: <School />,
      component: (
        <LevelFragment
          levelFrag={contestDes}
          getContestDetail={getContestDetail}
        />
      ),
    },
    {
      title: 'Vòng thi',
      icon: <AccessTimeFilled />,
      component: (
        <RoundFragment
          roundFrag={contestDes}
          getContestDetail={getContestDetail}
        />
      ),
    },
    {
      title: 'Topic',
      icon: <Topic />,
      component: (
        <TopicFragment
          topicFrag={contestDes}
          getContestDetail={getContestDetail}
        />
      ),
    },
    {
      title: 'Painting',
      icon: <Topic />,
      component: <h1></h1>,
    },
    { title: 'Schedule', icon: <CalendarMonth />, component: <h1></h1> },
    // Add more tabs here as needed
  ];
  return contestDes ? (
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
              <label
                htmlFor={`tab${index + 1}`}
                role="button"
                className={styles.tabLabel}>
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
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '30px',
      }}>
      <LoadingSkeleton height="50px" radius="5px" />
      <LoadingSkeleton height="200px" radius="10px" />
    </div>
  );
}

export default ContestDetail;
