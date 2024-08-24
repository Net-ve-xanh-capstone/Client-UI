import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllPainting, getScheduleById } from '../../api/awardApi.js';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../common/footer/Footer.jsx';
import ModalPaintingContest from '../showPaintingContest/page.jsx';
import styles from './MarkReport.module.css';
import 'react-tabs/style/react-tabs.css';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { LoadingButton } from '@mui/lab';
import { confirmRating } from '../../api/rating.js';
import { toast } from 'react-toastify';

const MarkReport = ({ pageType }) => {
  const [searchParams] = useSearchParams();
  const [contests, setContests] = useState([]);
  const [lazyData, setLazyData] = useState([]);

  const [contestMarking, setContestMarking] = useState([]);

  const [showModal, setShowMoadal] = useState(false);
  const [type, setType] = useState('');
  const [dataObject, setDataObject] = useState(null);

  const [awardObject, setAwardObject] = useState(null);
  const [awardLoading, setAwardLoading] = useState(null);
  const [postAllLoading, setPostAllLoading] = useState(false);

  const [typeOfTab, setTypeOfTabs] = useState(0);

  const [scheduleId, setScheduleId] = useState('');

  // const [selectedContests, setSelectedContests] = useState(
  //   contests.map(() => false),
  // );
  const itemsPerPage = 8;

  // define data loading
  const lazyLoading = () => {
    const startIndex = lazyData.length;
    const dataLoad = contests.splice(startIndex, startIndex + itemsPerPage);
    setLazyData(prevData => [...prevData, ...dataLoad]);
  };

  //post all field and confirm marking by examiner
  const fetchConfirm = async () => {
    setPostAllLoading(true);
    try {
      await confirmRating(searchParams.get('id'));
    } catch (error) {
      toast.warning('Hãy chấm hết tất cả các bài thi nhé!', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.log(error);
    } finally {
      setPostAllLoading(false);
    }
  };

  // adding new painting to redux
  // const postIntoRedux = item => {
  //   const payload = contests.filter((_, idx) => item[idx] === true);
  //   dispatch(store(payload));
  // };

  // get all painting still not marking
  const fetchData = async id => {
    const { data } = await getAllPainting(id);
    const rspNotMarking = data.result.filter(val => val?.isJudged === false);
    const rspMarking = data.result.filter(val => val?.isJudged === true);

    setContests(rspNotMarking);
    setContestMarking(rspMarking);
  };

  // get all award of this round
  const fetchAward = async id => {
    setAwardLoading(true);
    try {
      const res = await getScheduleById(id);
      const data = res.data.result;
      const result = data.map(val => ({
        value: val?.awardId,
        label: val?.rank,
      }));
      setAwardObject(result);
    } catch (error) {
      console.log(error);
    } finally {
      setAwardLoading(false);
    }
  };

  // trigger open modal showing detail of painting
  const handleOpen = data => {
    setShowMoadal(true);
    setDataObject(data);
    if (data.isJudged) {
      setType('edit');
    } else {
      setType('create');
    }
  };

  // trigger close modal
  const handleClose = () => {
    setShowMoadal(false);
    setDataObject(null);
    fetchData(searchParams.get('id'));
  };

  useEffect(() => {
    const queryId = searchParams.get('id');
    fetchData(queryId);
    fetchAward(queryId);
    setScheduleId(queryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleSelect = (_, index) => {
  //   const updatedSelections = [...selectedContests];
  //   updatedSelections[index] = !updatedSelections[index];
  //   setSelectedContests(updatedSelections);
  // };

  // check if image is update to the variable
  // useEffect(() => {
  //   postIntoRedux(selectedContests);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedContests]);

  useEffect(() => {
    lazyLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalPaintingContest
        modalShow={showModal}
        onHide={handleClose}
        items={dataObject}
        awardData={awardObject}
        awardLoading={awardLoading}
        scheduleId={scheduleId}
        type={type}
      />

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
        <div className={`${styles.tablist} flat-tabs themesflat-tabs`}>
          <Tabs
            defaultIndex={typeOfTab}
            onSelect={index => setTypeOfTabs(index)}>
            <TabList>
              <Tab>Chưa chấm</Tab>
              <Tab>Đã chấm</Tab>
            </TabList>
            <TabPanel>
              <div
                className={`${styles.gridContainer} ${
                  pageType === 'edit' ? styles.editPage : ''
                }`}>
                {contests?.map((contest, index) => (
                  <div
                    key={index}
                    className={styles.square}
                    onClick={() => handleOpen(contest)}>
                    <div className={styles.squareContent}>
                      <div className={styles.imageContainer}>
                        <img
                          src={contest?.image}
                          alt="thumbnail"
                          className={styles.image}
                        />
                      </div>
                      <p className={styles.examCode}>{contest?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div
                className={`${styles.gridContainer} ${
                  pageType === 'edit' ? styles.editPage : ''
                }`}>
                {contestMarking?.map((contest, index) => (
                  <div
                    key={index}
                    className={styles.square}
                    onClick={() => handleOpen(contest)}>
                    <div className={styles.squareContent}>
                      <div className={styles.imageContainer}>
                        <img
                          src={contest?.image}
                          alt="thumbnail"
                          className={styles.image}
                        />
                      </div>
                      <p className={styles.examCode}>{contest?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </div>
        {typeOfTab === 1 && (
          <div className={styles.add_all}>
            <LoadingButton
              className={styles.btnCreate}
              size="large"
              onClick={() => fetchConfirm()}
              loading={postAllLoading}
              loadingPosition="center"
              variant="contained">
              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                <h5>Xác nhận</h5>
              </span>
            </LoadingButton>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default MarkReport;
