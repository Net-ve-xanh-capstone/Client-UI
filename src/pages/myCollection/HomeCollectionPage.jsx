import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../../components/common/footer/Footer';
import useFetchData from '../../hooks/useQueryData.js';
import { whiteScreen } from '../../constant/imageDefault.js';
import { formatDate } from '../../utils/formatDate.js';
import { useForm } from 'react-hook-form';
import TextFieldCommon from '../../components/input/TextfieldCommon.jsx';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import lodash from 'lodash';
import { useSelector } from 'react-redux';
import ModalAddPainting from './modal/ModalAddPainting.jsx';
import styles from './page.module.css';

const GET_ALL_COLLECTION_BY_ACCOUNT = 'collections/getcollectionbyaccountid';
const HomeCollectionPage = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(6);
  const [query, setQuery] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [collection, setCollection] = useState([]); // Danh sách ảnh ban đầu
  const [filterCollection, setFilterCollection] = useState([]); // Danh sách ảnh đã lọc
  const { userInfo } = useSelector(state => state.auth);
  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 4);
  };

  const handleShowModal = () => {
    setModalShow(true);
  };
  const { control } = useForm({});
  const { isLoading, isError, data, error } = useFetchData(
    GET_ALL_COLLECTION_BY_ACCOUNT,
    userInfo.Id,
  );

  // Debounced filter function
  const debouncedFilter = useMemo(
    () =>
      lodash.debounce(query => {
        if (!collection.length) return;

        if (query.toString().trim() === '') {
          setFilterCollection(collection);
          setMessage(null);
          setVisible(6);
          return;
        }

        const filtered = collection.filter(image =>
          image.name.toLowerCase().includes(query.toString().toLowerCase()),
        );

        console.log('filtered', filtered);
        console.log('message', message);

        if (filtered.length || !filtered === 0) {
          setMessage('Không tìm thấy bộ sưu tập nào');
          setVisible(0);
          setFilterCollection([]);
        } else {
          setMessage(null);
          setVisible(6);
          setFilterCollection(filtered);
        }
      }, 300),
    [collection],
  );

  useEffect(() => {
    if (data) {
      const initialCollection = data?.data?.result?.list || [];
      setCollection(initialCollection);
      setFilterCollection(initialCollection);
    }
  }, [data]);

  useEffect(() => {
    debouncedFilter(query);
    return () => {
      debouncedFilter.cancel();
    };
  }, [query, debouncedFilter]);

  if (isLoading)
    return (
      <span>
        <DotLoaderCustom />
      </span>
    );

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
                <h1 className="heading text-center">BỘ SƯU TẬP</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>Bộ sưu tập</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-activity tf-section">
        <div className="themesflat-container">
          {filterCollection.length > 0 ? (
            <div className="row">
              <div className="col-xl-8 col-lg-9 col-md-8 col-12">
                {message ? (
                  <h2 className="text-center font-weight-bold">{message}</h2>
                ) : (
                  <div className="box-activity">
                    {filterCollection.slice(0, visible).map((item, index) => (
                      <div key={index} className="sc-card-activity style-2">
                        <div className="content flex justify-content-between">
                          <div
                            style={{
                              width: '60%',
                              boxShadow: 'none',
                              margin: '0',
                              padding: '0',
                            }}
                            className="sc-card-collection style-2 home5">
                            <div className="media-images-collection">
                              <div className="box-left">
                                <img
                                  className="border-3"
                                  src={item.image[0] || whiteScreen}
                                  alt="painting"
                                />
                              </div>
                              <div className="box-right">
                                <div className="top-img">
                                  <img
                                    className="border-3"
                                    src={item.image[1] || whiteScreen}
                                    alt="painting"
                                  />
                                </div>
                                <div className="bottom-img">
                                  <img
                                    className="border-3"
                                    src={item.image[2] || whiteScreen}
                                    alt="painting"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="infor text-right">
                            <h4>
                              <Link
                                to={`/collection-painting/${item.id}`}>
                                {item.name}
                              </Link>
                            </h4>
                            <div className="status">{item.description}</div>
                            <div className="time">
                              {formatDate(item.createdTime)}
                            </div>
                            <button
                              className={`${styles.tf_button_submit} mt-4 button-center`}
                              onClick={handleShowModal}>
                              Thêm bài vẽ
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {visible < filterCollection.length && (
                  <div className="btn-activity mg-t-10 center">
                    <Link
                      to="#"
                      id="load-more"
                      className="sc-button loadmore fl-button pri-3"
                      onClick={showMoreItems}>
                      <span>Tải thêm</span>
                    </Link>
                  </div>
                )}
                <ModalAddPainting
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              <div className="col-xl-4 col-lg-3 col-md-4 col-12">
                <div id="side-bar" className="side-bar style-2">
                  <div className="widget widget-search mgbt-24">
                    <form>
                      <TextFieldCommon
                        control={control}
                        id="name"
                        name="name"
                        className="style-2"
                        type="text"
                        placeholder="Tìm tên bộ sưu tập"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h2 className="text-center font-weight-bold">
              Không có bộ sưu tập nào
            </h2>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomeCollectionPage;
