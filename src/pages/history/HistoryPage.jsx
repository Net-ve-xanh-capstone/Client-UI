import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../../components/common/footer/Footer';
import useFetchData from '../../hooks/useQueryData.js';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import { color } from '../../constant/Color.js';
import { formatDate } from '../../utils/formatDate.js';

const TRACKING_PAINTING = 'paintings/tracking';
const HistoryPage = () => {
  const { paintingId } = useParams();
  const [history, setHistory] = useState(null);
  const [created, setCreated] = useState(null);
  const [reviewed, setReviewed] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [finalDecision, setFinalDecision] = useState(null);

  const { isLoading, isError, data, error } = useFetchData(TRACKING_PAINTING, paintingId);

  useEffect(() => {
    if (data) {
      const response = data?.data?.result;
      const event = data?.data?.result?.history;
      setHistory(response);
      setCreated(event?.created);
      setReviewed(event?.reviewed);
      setSubmitted(event?.submitted);
      setUpdated(event?.updated);
      setFinalDecision(event?.finalDecision);
    }
    console.log(history);
  }, [data]);

  if (isLoading) return <span><DotLoaderCustom /></span>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">LỊCH SỬ</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li><Link to="/">Trang chủ</Link></li>
                  <li>Lịch sử</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-activity s1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            {created?.time && (
              <div className="col-lg-10 col-md-10 col-12">
                <div className="sc-card-activity style1">
                  <div className="content">
                    <div className="media">
                      <img className="object-fit-contain" src={history?.image} alt="Painting" />
                    </div>
                    <div className="infor">
                      <h3>
                        <div>Tên tranh: {history?.name}</div>
                      </h3>
                      <div className="status text-black">{created?.message} vào ngày</div>
                      <div className="author">{formatDate(created?.time)}</div>
                    </div>
                  </div>
                  <div className="button-active icon flex align-items-center justify-content-center">
                    <FaHistory size="32px" />
                  </div>
                </div>
              </div>
            )}
            {reviewed?.time && (
              <div className="col-lg-10 col-md-10 col-12">
                <div className="sc-card-activity style1">
                  <div className="content">
                    <div className="media">
                      <img className="object-fit-contain" src={history?.image} alt="Painting" />
                    </div>
                    <div className="infor">
                      <h3>
                        <div>Tên tranh: {history?.name}</div>
                      </h3>
                      <div className="status text-black">{reviewed?.message} vào ngày</div>
                      <div className="author">{formatDate(reviewed?.time)}</div>
                    </div>
                  </div>
                  <div className="button-active icon flex align-items-center justify-content-center">
                    <FaHistory size="32px" />
                  </div>
                </div>
              </div>
            )}
            {submitted?.time && (
              <div className="col-lg-10 col-md-10 col-12">
                <div className="sc-card-activity style1">
                  <div className="content">
                    <div className="media">
                      <img className="object-fit-contain" src={history?.image} alt="Painting" />
                    </div>
                    <div className="infor">
                      <h3>
                        <div>Tên tranh: {history?.name}</div>
                      </h3>
                      <div className="status text-black">{submitted?.message} vào ngày</div>
                      <div className="author">{formatDate(submitted?.time)}</div>
                    </div>
                  </div>
                  <div className="button-active icon flex align-items-center justify-content-center">
                    <FaHistory size="32px" />
                  </div>
                </div>
              </div>
            )}
            {updated?.time && (
              <div className="col-lg-10 col-md-10 col-12">
                <div className="sc-card-activity style1">
                  <div className="content">
                    <div className="media">
                      <img className="object-fit-contain" src={history?.image} alt="Painting" />
                    </div>
                    <div className="infor">
                      <h3>
                        <div>Tên tranh: {history?.name}</div>
                      </h3>
                      <div className="status text-black">{updated?.message} vào ngày</div>
                      <div className="author">{formatDate(updated?.time)}</div>
                    </div>
                  </div>
                  <div className="button-active icon flex align-items-center justify-content-center">
                    <FaHistory size="32px" />
                  </div>
                </div>
              </div>
            )}
            {finalDecision?.time && (
              <div className="col-lg-10 col-md-10 col-12">
                <div className="sc-card-activity style1">
                  <div className="content">
                    <div className="media">
                      <img className="object-fit-contain" src={history?.image} alt="Painting" />
                    </div>
                    <div className="infor">
                      <h3>
                        <div>Tên tranh: {history?.name}</div>
                      </h3>
                      <div className="status text-black">{finalDecision?.message} vào ngày</div>
                      <div className="author">{formatDate(finalDecision?.time)}</div>
                    </div>
                  </div>
                  <div className="button-active icon flex align-items-center justify-content-center">
                    <FaHistory size="32px" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HistoryPage;
