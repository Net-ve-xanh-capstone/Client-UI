import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getScheduleById } from '../../api/awardApi.js';
import Footer from '../../components/common/footer/Footer';
import Header from '../../components/common/header/HeaderVersion2';
import styles from './page.module.css';
import '../StaffManage/style.scss';

const ExaminerRound = () => {
  const [searchParams] = useSearchParams();
  const goto = useNavigate();
  const [roundData, setRoundData] = useState([]);

  // navigating to next page for render list of painting
  const navigateToMark = id => {
    goto({
      pathname: '/Client-UI/mark-report',
      search: `?id=${id}`,
    });
  };

  // get round by roundid
  const fetchData = async id => {
    try {
      const res = await getScheduleById(id);
      const data = res.data.result;
      setRoundData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get the id in query param and pass it into the fetch api
  useEffect(() => {
    fetchData(searchParams.get('id'));
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
                <h1 className="heading text-center">Vòng thi</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/Client-UI/">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="/Client-UI/mark-examiner">Lịch chấm</Link>
                  </li>
                  <li>Vòng thi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.container}>
        {roundData?.length &&
          roundData.map(val => (
            <div key={val} className={styles.card}>
              <div className={styles.content}>
                <h3 style={{ color: '#1f1f2c' }}>{val.rank}</h3>
              </div>
              <button
                className={styles.btn_mark}
                onClick={() => navigateToMark(val.id)}>
                Chấm bài
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ExaminerRound;
