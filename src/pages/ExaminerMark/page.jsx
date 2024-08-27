import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getScheduleExaminer } from '../../api/scheduleExaminer.js';
import Footer from '../../components/common/footer/Footer';
import Header from '../../components/common/header/HeaderVersion2';
import { parseDataVietnam } from '../../utils/formatDate.js';
import '../StaffManage/style.scss';
import styles from './page.module.css';
import { checkNavigateBtn } from '../../utils/checkEditButton.js';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';

const ExaminerMark = () => {
  const { userInfo } = useSelector(state => state.auth);
  const goTo = useNavigate();
  const [roundData, setRoundData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchData = async () => {
    setIsloading(true);
    try {
      const res = await getScheduleExaminer(userInfo.Id);
      const data = res.data.result;
      setRoundData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const roundNavigate = id => {
    goTo({
      pathname: '/Client-UI/mark-report',
      search: `?id=${id}`,
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="item-details">
        <Header />
        <section className="flat-title-page inner">
          <div className="overlay"></div>
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-12">
                <div className="page-title-heading mg-bt-12">
                  <h1 className="heading text-center">Lịch chấm</h1>
                </div>
                <div className="breadcrumbs style2">
                  <ul>
                    <li>
                      <Link to="/Client-UI/">Trang chủ</Link>
                    </li>
                    <li>Lịch chấm</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="tf-section tf-item-details">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-xl-6 col-md-12">
                <div className="content-left">
                  <div className="media">
                    <img
                      src="https://th.bing.com/th/id/R.04d9fafe76804758e42695367bfc6e68?rik=2gP8R1TVn1ddkA&riu=http%3a%2f%2ftrandainghia.edu.vn%2fwp-content%2fuploads%2f2020%2f12%2flogonet-ve-xanh.jpg&ehk=qIg%2bj98Zo8lSrattuMS2lPrCcsrVOALSy6GSwgjNv5o%3d&risl=&pid=ImgRaw&r=0"
                      alt="ContestComing"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-12">
                <div className="content-right">
                  <div className={styles.right_container}>
                    <h1 className={styles.heading_right}>
                      Cuộc thi năm 2023-2024
                    </h1>

                    {isLoading ? (
                      <DotLoaderCustom />
                    ) : roundData?.length > 0 ? (
                      roundData.map(val => (
                        <Accordion key={val.id}>
                          <AccordionSummary
                            style={{ fontSize: '16px' }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header">
                            {val.level}
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={styles.roundContainer}>
                              <ul className={styles.roundTableResponse}>
                                {val.scheduleViewModels?.length > 0 &&
                                  val.scheduleViewModels.map(val => (
                                    <li
                                      key={val.id}
                                      className={styles.tableRow}>
                                      <div
                                        className={styles.col}
                                        data-label="Tên chủ đề">
                                        {val.round}
                                      </div>
                                      <div
                                        className={styles.col}
                                        data-label="Mô tả">
                                        <div>
                                          {parseDataVietnam(val.endDate)}
                                        </div>
                                      </div>
                                      <div
                                        className={styles.col}
                                        data-label="Tương tác">
                                        <button
                                          className={styles.button_marking}
                                          style={{
                                            fontSize: '16px !important',
                                            padding: '2rem 1rem !important',
                                            lineHeight: '0',
                                            width: '15rem',
                                          }}
                                          // disabled={checkNavigateBtn(val.endDate)}
                                          onClick={() => roundNavigate(val.id)}>
                                          Chấm bài
                                        </button>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    ) : (
                      <p style={{ fontSize: '3rem', fontWeight: '700' }}>
                        Không có lịch chấm
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ExaminerMark;
