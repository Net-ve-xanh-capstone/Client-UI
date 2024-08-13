import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScheduleExaminer } from '../../api/scheduleExaminer.js';
import Footer from '../../components/common/footer/Footer';
import Header from '../../components/common/header/HeaderVersion2';
import { parseDataVietnam } from '../../utils/formatDate.js';
import '../StaffManage/style.scss';
import styles from './page.module.css';
import { checkNavigateBtn } from '../../utils/checkEditButton.js';

const ExaminerRound = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [roundData, setRoundData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getScheduleExaminer(userInfo.Id);
      const data = res.data.result;
      setRoundData(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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
      <div className="tf-section tf-item-details">hello</div>
      <Footer />
    </div>
  );
};

export default ExaminerRound;
