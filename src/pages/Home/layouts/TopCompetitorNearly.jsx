import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Fallback } from '../../../constant/Fallback';
import { withErrorBoundary } from 'react-error-boundary';
import { userAvatar } from '../../../constant/imageDefault.js';
import PropTypes from 'prop-types';
import 'react-tabs/style/react-tabs.css';
const TopCompetitorNearly = () => {
  const [dataTopSellerTab] = useState([
    {
      title: '1 năm'
    },
    {
      title: '3 năm'
    },
    {
      title: '5 năm'
    }
  ]);
  const [dataTopSellerPanel] = useState([
    {
      id: 1,
      dataTopSellerContent: [
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
      ]
    },
    {
      id: 2,
      dataTopSellerContent: [
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
      ]
    },
    {
      id: 3,
      dataTopSellerContent: [
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
        {
          img: userAvatar,
          name: 'Nhật Vy',
          price: '1 giải'
        },
      ]
    }
  ]);
  return (
    <div>
      <section className="tf-section top-seller home5 s2 mobie-style bg-style2">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <h2 className="tf-title style2 mb-25 text-left">Các thí sinh có nhiều giải nhất</h2>
              <div className="flat-tabs seller-tab tablet-30">
                <Tabs>
                  <TabList>
                    {dataTopSellerTab.map((item, index) => (
                      <Tab key={index}>{item.title}</Tab>
                    ))}
                  </TabList>

                  <div className="content-tab">
                    {dataTopSellerPanel.map((item) => (
                      <TabPanel key={item.id}>
                        {item.dataTopSellerContent.map((item, index) => (
                          <div className="box-item" key={index}>
                            <div className="sc-author-box style-3">
                              <div className="author-avatar">
                                <Link to="/authors-02">
                                  <img src={item.img} alt="Axies" className="avatar" />
                                </Link>
                                <div className="badge">
                                  <i className="ripple"></i>
                                </div>
                              </div>
                              <div className="author-infor">
                                <h5>
                                  <Link to="/authors-02">{item.name}</Link>
                                </h5>
                                <span className="price">{item.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabPanel>
                    ))}
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

TopCompetitorNearly.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default withErrorBoundary(TopCompetitorNearly, {
  FallbackComponent: Fallback
});
