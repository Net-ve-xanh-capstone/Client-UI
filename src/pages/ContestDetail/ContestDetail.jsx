import React, { useEffect } from 'react';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../../components/common/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import levelIcon from '../../assets/images/icon/level.png';
import useFetchData from '../../hooks/useQueryData.js';
import {
  defaultImage,
  defaultAvatar,
  userAvatar,
} from '../../constant/imageDefault.js';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import CountdownComponent from '../../components/CountdownComponent.jsx';
import {
  contestStatus,
  paintingStatusEnable,
} from './../../constant/Status.js';
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
      const paintingResponse =
        await paintingApi.getAllPaintingByContestAccountId(
          getAllPaintingByCompetitorIdEndpoint,
          contestId,
          userInfo?.Id,
        );
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Link to="/Client-UI/">Trang chủ</Link>
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
                  <img src={contest?.logo} alt="ContestComing" />
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
                              {contest?.account?.fullName}
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
                  ) : (
                    registerButton({ status, check, contestId, userInfo })
                  )}

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
                                            alt="Icon"
                                            className="avatar"
                                          />
                                        </Link>
                                        <div className="badge"></div>
                                      </div>
                                      <div className="author-infor">
                                        <div className="name">
                                          <h6>
                                            <div className="text-black">
                                              {item.level}
                                            </div>
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-black">
                                    <h5>{item.description}</h5>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </TabPanel>

                      <TabPanel>
                        <ul className="bid-history-list">
                          {contest?.resource.length > 0 ? (
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
                                            <div className="text-black">
                                              {item.sponsor?.name}
                                            </div>
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
                            ))
                          ) : (
                            <div className="text-black">
                              <h5>Không có nhà tài trợ</h5>
                            </div>
                          )}
                        </ul>
                      </TabPanel>

                      <TabPanel>
                        <div className="provenance">
                          <p className="mb-5 text-black">
                            Nội dung cuộc thi: {contest?.content}
                          </p>
                          <div>
                            {contest?.educationalLevel.map((item, key) => {
                              return (
                                <div
                                  key={key}
                                  className="mb-5 flex justify-content-between">
                                  <p className="text-black">
                                    {item?.description}
                                  </p>
                                  <p
                                    className="text-black"
                                    style={{ width: '120px' }}>
                                    Các giải thưởng:
                                  </p>
                                  <div
                                    className="text-black"
                                    style={{ width: '220px' }}>
                                    {item?.round?.map((round, key) => {
                                      return (
                                        <div key={key}>
                                          {round?.award?.map((award, key) => {
                                            return (
                                              <div
                                                key={key}
                                                className="flex justify-content-center">
                                                <p
                                                  className="text-black"
                                                  style={{
                                                    flex: '1',
                                                    textAlign: 'left',
                                                  }}>
                                                  {award?.rank}:{' '}
                                                </p>
                                                <p className="text-black">
                                                  {award?.quantity}
                                                </p>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
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
          to={`/Client-UI/submit/${contestId}`}
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
      );
    }
  }
  if (!userInfo) {
    return (
      <Link
        to={`/Client-UI/submit/${contestId}`}
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
