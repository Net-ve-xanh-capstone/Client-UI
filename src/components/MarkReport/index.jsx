import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/header/HeaderVersion2';
import { defaultImage } from '../../constant/imageDefault.js';
import Footer from '../common/footer/Footer.jsx';
import styles from './MarkReport.module.css';

const contestF = () => {
  return {
    name: faker.person.fullName(),
    code: faker.number.int({ min: 1000, max: 9999 }),
  };
};

const createContests = (num = 5) => {
  return Array.from({ length: num }, contestF);
};

const MarkReport = ({ pageType }) => {
  // const { id } = useParams();
  const [contests, setContests] = useState([]);
  const fetchData = async () => {
    // const { data } = await getScheduleById(
    //   id || '64a4b9b5-17f1-495e-9fe4-34b727cd0aa4',
    // );

    // setContests(data.result);
    setContests(createContests(10));
  };
  useEffect(() => {
    fetchData();
    console.log(contests);
  }, []);

  const [selectedContests, setSelectedContests] = useState(
    contests.map(() => false),
  );

  const handleSelect = index => {
    const updatedSelections = [...selectedContests];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedContests(updatedSelections);
  };
  return (
    <div className="item-details">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">CHẤM BÀI THI</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>Chấm bài thi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className={`${styles.gridContainer} ${
          pageType === 'edit' ? styles.editPage : ''
        }`}>
        {contests.map((contest, index) => (
          <div key={index} className={styles.square}>
            <div className={styles.squareContent}>
              <input
                type="checkbox"
                checked={selectedContests[index]}
                onChange={() => handleSelect(index)}
                className={`${styles.checkbox} ${
                  selectedContests[index] ? styles.selected : styles.unselected
                }`}
              />
              <div className={styles.imageContainer}>
                <img
                  src={defaultImage}
                  alt="thumbnail"
                  className={styles.image}
                />
              </div>
              <p className={styles.examCode}>{contest.code}</p>
            </div>
          </div>
        ))}
        {pageType === 'edit' && (
          <div className={styles.buttons}>
            <button className={styles.button}>Chỉnh sửa</button>
            <button className={styles.button}>Hoàn thành</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MarkReport;
