import React, { useState } from 'react';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../../components/common/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import Countdown from 'react-countdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import liveAuctionData from '../../assets/fake-data/data-live-auction';
import LiveAuction from '../../layouts/auctions/LiveAuction.jsx';
import img1 from '../../assets/images/avatar/avt-3.jpg';
import img2 from '../../assets/images/avatar/avt-11.jpg';
import img3 from '../../assets/images/avatar/avt-1.jpg';
import img4 from '../../assets/images/avatar/avt-5.jpg';
import img5 from '../../assets/images/avatar/avt-7.jpg';
import img6 from '../../assets/images/avatar/avt-8.jpg';
import levelIcon from '../../assets/images/icon/level.png';
import useFetchData from '../../hooks/useQueryData.js';
import { defaultImage, defaultAvatar } from '../../constant/imageDefault.js';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';

const ContestDetail = () => {
    const { contestId } = useParams();
    const { isLoading, isError, data, error } = useFetchData(
        `contests/${contestId}`,
    );
    const contest = data?.data?.result;
    const checkTime = new Date(contest?.endTime) < new Date();
    const [dataHistory] = useState([
        {
            img: img1,
            name: 'Mason Woodward',
            time: '8 hours ago',
            price: '4.89 ETH',
            priceChange: '$12.246',
        },
        {
            img: img2,
            name: 'Mason Woodward',
            time: 'at 06/10/2021, 3:20 AM',
            price: '4.89 ETH',
            priceChange: '$12.246',
        },
        {
            img: img3,
            name: 'Mason Woodward',
            time: '8 hours ago',
            price: '4.89 ETH',
            priceChange: '$12.246',
        },
        {
            img: img4,
            name: 'Mason Woodward',
            time: '8 hours ago',
            price: '4.89 ETH',
            priceChange: '$12.246',
        },
        {
            img: img5,
            name: 'Mason Woodward',
            time: '8 hours ago',
            price: '4.89 ETH',
            priceChange: '$12.246',
        },
        {
            img: img6,
            name: 'Mason Woodward',
            time: '8 hours ago',
            price: '4.89 ETH',
            priceChange: '$12.246',
        },
    ]);
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
                                <h1 className="heading text-center">
                                    Chi tiết cuộc thi
                                </h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li>
                                        <Link to="/">Trang chủ</Link>
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
                                    <img src={defaultImage} alt="Axies" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <h2 className="style2">
                                        {`"${contest?.name}"`}
                                    </h2>

                                    <div className="client-infor sc-card-product">
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img
                                                        src={defaultAvatar}
                                                        alt="Axies"
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span>Tổ chức bởi</span>
                                                    <h6>
                                                        <Link className="cursor-none">
                                                            Nét vẽ xanh
                                                        </Link>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img
                                                        src={defaultAvatar}
                                                        alt="Axies"
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span>Tạo bởi</span>
                                                    <h6>
                                                        <Link className="cursor-none">
                                                            {
                                                                contest?.account
                                                                    .fullName
                                                            }
                                                        </Link>{' '}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="meta-item-details style2">
                                        <div className="item meta-price">
                                            <span className="heading">
                                                Tổng số người dự thi:
                                            </span>
                                            <div className="price">
                                                <div className="price-box">
                                                    <h5>1,234 người</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item count-down">
                                            <span className="heading style-2">
                                                Thời gian
                                            </span>
                                            {checkTime ? (
                                                <span>Đã kết thúc</span>
                                            ) : (
                                                <div>
                                                    <span className="slogan"></span>
                                                    <Countdown
                                                        date={
                                                            Date.now() +
                                                            new Date(
                                                                contest?.endTime,
                                                            ).getTime() /
                                                                1000
                                                        }></Countdown>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {checkTime ? (
                                        <Link
                                            to="#"
                                            className="sc-button loadmore style fl-button pri-3 cursor-none">
                                            <span>Đã kết thúc</span>
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/submit/${contestId}`}
                                            className="sc-button loadmore style fl-button pri-3">
                                            <span>Đăng ký dự thi</span>
                                        </Link>
                                    )}

                                    <div className="flat-tabs themesflat-tabs">
                                        <Tabs>
                                            <TabList>
                                                <Tab>Cấp</Tab>
                                                <Tab>Nội dung</Tab>
                                            </TabList>

                                            <TabPanel>
                                                <ul className="bid-history-list">
                                                    {contest.educationalLevel
                                                        .length > 0 &&
                                                        contest.educationalLevel.map(
                                                            (item, index) => (
                                                                <li key={index}>
                                                                    <div className="content">
                                                                        <div className="client">
                                                                            <div className="sc-author-box style-2">
                                                                                <div className="author-avatar">
                                                                                    <Link to="#">
                                                                                        <img
                                                                                            src={
                                                                                                levelIcon
                                                                                            }
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
                                                                                                {
                                                                                                    item.level
                                                                                                }{' '}
                                                                                            </Link>
                                                                                        </h6>{' '}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="price">
                                                                            <h5>
                                                                                {
                                                                                    item.description
                                                                                }
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ),
                                                        )}
                                                </ul>
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="provenance">
                                                    <p>{contest?.content}</p>
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
            <LiveAuction data={liveAuctionData} />
            <Footer />
        </div>
    );
};

export default ContestDetail;