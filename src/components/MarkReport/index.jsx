import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getById } from '../../api/awardApi.js';
import Header from '../../components/common/header/HeaderVersion2';
import { defaultImage } from '../../constant/imageDefault.js';
import Footer from '../common/footer/Footer.jsx';
import styles from './MarkReport.module.css';
import { useDispatch } from 'react-redux';
import { store } from '../../store/examiner/markingSlice.js';

const MarkReport = ({ pageType }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [contests, setContests] = useState([]);
  const [lazyData, setLazyData] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const [selectedContests, setSelectedContests] = useState(
    contests.map(() => false),
  );
  const itemsPerPage = 8;

  // define data loading
  const lazyLoading = () => {
    const startIndex = lazyData.length;
    const dataLoad = contests.splice(startIndex, startIndex + itemsPerPage);
    setLazyData(prevData => [...prevData, ...dataLoad]);
  };

  // adding new painting to redux
  const postIntoRedux = item => {
    const payload = contests.filter((_, idx) => item[idx] === true);
    dispatch(store(payload));
  };

  // get all data from api
  const fetchData = async id => {
    const { data } = await getById(id);
    setContests(data.result.paintingViewModelsList);
    setQuantity(data.result.quantity);
  };
  useEffect(() => {
    fetchData(searchParams.get('id'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (_, index) => {
    const updatedSelections = [...selectedContests];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedContests(updatedSelections);
  };

  // check if image is update to the variable
  useEffect(() => {
    postIntoRedux(selectedContests);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContests]);

  useEffect(() => {
    lazyLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                onChange={e => handleSelect(e, index)}
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
