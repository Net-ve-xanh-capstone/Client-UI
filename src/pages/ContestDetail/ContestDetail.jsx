import React, { useEffect } from 'react';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../../components/common/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import liveAuctionData from '../../assets/fake-data/data-live-auction';
import LiveAuction from '../../layouts/auctions/LiveAuction.jsx';
import levelIcon from '../../assets/images/icon/level.png';
import useFetchData from '../../hooks/useQueryData.js';
import { defaultImage, defaultAvatar, userAvatar } from '../../constant/imageDefault.js';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import CountdownComponent from '../../components/CountdownComponent.jsx';
import { contestStatus, paintingStatusEnable } from './../../constant/Status.js';
import { topicApi } from '../../api/topicApi.js';
import { useSelector } from 'react-redux';
import { paintingApi } from '../../api/paintingApi.js';

const getAllPaintingByCompetitorIdEndpoint =
  'paintings/getpaintingbyaccountcontest';
const ContestDetail = () => {
  const { contestId } = useParams();
  const userInfo = useSelector(state => state.auth.userInfo);
  const [check, setCheck] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const { isLoading, isError, data, error } = useFetchData(
    `contests/${contestId}`,
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await topicApi.getAllTopic(
        'roundtopics/getalltopic',
        userInfo.Id,
        contestId,
      );
      const paintingResponse = await paintingApi.getAllPaintingByContestAccountId(
        getAllPaintingByCompetitorIdEndpoint, contestId, userInfo?.Id,
      )
      if (response.data.result.length > 0) {
        setCheck(true);
      }
      if (paintingResponse.data.result.status) {
        setStatus(paintingResponse.data.result.status);
      } else {
        setStatus('New');
      }
      console.log(paintingResponse);
    };
    fetchData();
  }, []);
  
  const contest = data?.data?.result;

  if (isLoading) {
    return <DotLoaderCustom />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="item-details">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">CHI TIẾT CUỘC THI</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/Client-UI">Trang chủ</Link>
                  </li>
                  <li>Chi tiết cuộc thi</li>
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
                  <img src={contest?.logo} alt="Contest" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="content-right">
                <div className="sc-item-details">
                  <h2 className="style2">{`${contest?.name}`}</h2>

                  <div className="client-infor sc-card-contest">
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <img src={defaultAvatar} alt="Axies" />
                        </div>
                        <div className="info">
                          <span>Tổ chức bởi</span>
                          <h6>
                            <Link className="cursor-none">Nét vẽ xanh</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <img src={userAvatar} alt="Axies" />
                        </div>
                        <div className="info">
                          <span>Tạo bởi</span>
                          <h6>
                            <Link className="cursor-none">
                              {contest?.account.fullName}
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="meta-item-details style2">
                    <div className="item meta-price">
                      <span className="heading">Tổng số người dự thi:</span>
                      <div className="price">
                        <div className="price-box">
                          <h5>{contest?.competitorCount || 0}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="item count-down">
                      <span className="heading style-2">Thời gian</span>
                      <CountdownComponent endtimeString={contest?.endTime} />
                    </div>
                  </div>
                  {contest?.status !== contestStatus.IN_PROCESS ? (
                      <Link
                        to="#"
                        className="disable-button loadmore style fl-button pri-3 cursor-none">
                        <span>{contest?.status}</span>
                      </Link>
                    ): registerButton({ status, check, contestId, userInfo })}

                  <div className="flat-tabs themesflat-tabs">
                    <Tabs>
                      <TabList>
                        <Tab>Cấp</Tab>
                        <Tab>Nhà tài trợ</Tab>
                        <Tab>Nội dung</Tab>
                      </TabList>

                      <TabPanel>
                        <ul className="bid-history-list">
                          {contest?.educationalLevel.length > 0 &&
                            contest.educationalLevel.map((item, index) => (
                              <li key={index}>
                                <div className="content">
                                  <div className="client">
                                    <div className="sc-author-box style-2">
                                      <div className="author-avatar">
                                        <Link to="#">
                                          <img
                                            src={levelIcon}
                                            alt="Axies"
                                            className="avatar"
                                          />
                                        </Link>
                                        <div className="badge"></div>
                                      </div>
                                      <div className="author-infor">
                                        <div className="name">
                                          <h6>
                                            <Link to="/author-02">
                                              {item.level}{' '}
                                            </Link>
                                          </h6>{' '}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="price">
                                    <h5>{item.description}</h5>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </TabPanel>

                      <TabPanel>
                        <ul className="bid-history-list">
                          {contest?.resource.length > 0 &&
                            contest.resource.map((item, index) => (
                              <li key={index}>
                                <div className="content">
                                  <div className="client">
                                    <div className="sc-author-box style-2">
                                      <div className="author-avatar">
                                        <Link to="#">
                                          <img
                                            src={item.sponsor?.logo}
                                            alt="logo"
                                            className="avatar"
                                          />
                                        </Link>
                                        <div className="badge"></div>
                                      </div>
                                      <div className="author-infor">
                                        <div className="name">
                                          <h6>
                                            <Link to="/author-02">
                                              {item.sponsor?.name}
                                            </Link>
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="price">
                                    <h5>{item.sponsorship}</h5>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </TabPanel>

                      <TabPanel>
                        <div className="provenance">
                          <p className="mb-5">Nội dung cuộc thi: {contest?.content}</p>
                          <p>{contest?.educationalLevel.map(item => {
                            return (
                              <div className="mb-5 flex justify-content-between">
                                <p>{item?.description}</p>
                                <p style={{ width: '120px' }}>Các giải thưởng:</p>
                                <p style={{ width: '220px' }}>{item?.award.map((award, key) => {
                                  return (
                                    <div key={key} className="flex justify-content-center">
                                      <p style={{ flex: '1', textAlign: 'left' }}>{award?.rank}: </p>
                                      <p>{award?.quantity}</p>
                                    </div>
                                  );
                                })}</p>
                              </div>
                            );
                          })}</p>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const registerButton = ({ status, check, contestId, userInfo }) => {
  if (paintingStatusEnable.includes(status)) {
    if (check) {
      return (
        <Link
          to={`/submit/${contestId}`}
          className="sc-button loadmore style fl-button pri-3">
          <span>Đăng ký dự thi</span>
        </Link>
      );
    } else {
      return (
        <Link
          to="#"
          className="disable-button loadmore style fl-button pri-3 cursor-none">
          <span>Bạn chưa đủ tuổi</span>
        </Link>
      )
    }
  }
  if (!userInfo) {
    return (
      <Link
        to={`/submit/${contestId}`}
        className="sc-button loadmore style fl-button pri-3">
        <span>Đăng ký dự thi</span>
      </Link>
    );
  }
  return (
    <Link
      to="#"
      className="disable-button loadmore style fl-button pri-3 cursor-none">
      <span>Bạn đã đăng ký</span>
    </Link>
  );
};
export default ContestDetail;
