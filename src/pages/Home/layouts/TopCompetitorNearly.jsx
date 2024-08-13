import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Fallback } from '../../../constant/Fallback';
import { withErrorBoundary } from 'react-error-boundary';
import { userAvatar } from '../../../constant/imageDefault.js';
import PropTypes from 'prop-types';
import 'react-tabs/style/react-tabs.css';
import useFetchData from '../../../hooks/useQueryData.js';
import DotLoaderCustom from '../../../components/dotLoader/DotLoader.jsx';

const GET_3_YEARS = 'accounts/getlistwinnerin3nearestcontest';

const TopCompetitorNearly = () => {
  const [dataTopCompetitorTab] = useState([
    // {
    //   title: '1 năm'
    // },
    {
      title: '3 năm'
    },
    // {
    //   title: '5 năm'
    // }
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
  
  const [top3Years, setTop3Years] = useState([{}]);
  
  const { isLoading, isError, data, error }
    = useFetchData(GET_3_YEARS);

  const top3YearsData = data?.data?.result;
  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     setTop3Years([{
  //       id: 1,
  //       dataTop3: data?.data?.result
  //     }]);
  //   }
  // }, [data]);
  if (isLoading) {
    return <DotLoaderCustom />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
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
                    {dataTopCompetitorTab.map((item, index) => (
                      <Tab key={index}>{item.title}</Tab>
                    ))}
                  </TabList>

                  <div className="content-tab">
                    {top3YearsData.map((item) => (
                      <TabPanel key={item.id}>
                        {item?.top3Years.map((item, index) => (
                          <div className="box-item" key={index}>
                            <div className="sc-author-box style-3">
                              <div className="author-avatar">
                                <div>
                                  <img src={item.img} alt="Axies" className="avatar" />
                                </div>
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
