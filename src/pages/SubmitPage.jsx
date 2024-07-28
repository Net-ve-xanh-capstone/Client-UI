import { Link, useParams } from 'react-router-dom';
import HeaderVersion2 from '../components/common/header/HeaderVersion2';
import Footer from '../components/common/footer/Footer';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import { defaultImage } from '../constant/imageDefault';
import { useUploadImage } from '../hooks/firebaseImageUpload/useUploadImage';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextfieldCommon from '../components/input/TextfieldCommon';
import TextareaCommon from '../components/textarea/TextareaCommon';
import { Dropdown } from '../components/dropdown';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { topicApi } from '../api/topicApi';
import { paintingApi } from '../api/paintingApi';
import { paintingStatus, paintingStatusDisable } from '../constant/Status.js';
import Swal from 'sweetalert2';

const getAllPaintingByCompetitorIdEndpoint =
  'paintings/getpaintingbyaccountcontest';
const SubmitPage = () => {
  const { contestId } = useParams();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [paintingId, setPaintingId] = useState(null);
  const [roundTopicsData, setRoundTopicsData] = useState([]);
  const [topicId, setTopicId] = useState(null);
  const [disable, setDisable] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const { progress, url, error } = useUploadImage(file);
  const userInfo = useSelector(state => state.auth.userInfo);
  const today = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    const fetchData = async () => {
      const response = await topicApi.getAllTopic(
        'roundtopics/getalltopic',
        userInfo.Id,
        contestId,
      );
      setRoundTopicsData(response.data.result);
    };
    fetchData();
  }, []);
  const schema = yup.object().shape({
    file: yup.mixed().required('Vui lòng chọn ảnh'),
    name: yup.string().required('Vui lòng nhập tên của bức tranh'),
    description: yup.string(),
    topic: yup.string().required('Vui lòng chọn chủ đề'),
  });

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });
  const handlePreviewImage = e => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(URL.createObjectURL(file));
    setValue('file', file);
    setError('file', '');
    setFile(file);
  };

  const handleDraftPainting = async e => {
    // Trigger validate form
    const isValid = await trigger();
    if (!isValid) return;
    let data = {};
    let endpoint = '';
    let method = '';
    if (paintingId) {
      method = 'PUT';
      endpoint = 'paintings/update';
      data = {
        id: paintingId,
        image: image,
        name: e.name,
        description: e.description,
        status: paintingStatus.DRAFT,
        roundTopicId: topicId,
        currentUserId: userInfo.Id,
      };
    } else {
      method = 'POST';
      endpoint = 'paintings/draftepainting1stround';
      data = {
        image: url,
        name: e.name,
        description: e.description,
        roundTopicId: topicId,
        accountId: userInfo.Id,
      }
    }
    SwalComponent(
      'Bạn có chắc chắn lưu bài?',
      endpoint,
      method,
      data, 
      'Lưu bài thành công', 
      'Lưu bài thất bại', 
      'Bạn đã hủy lưu bài',
      setRefreshTrigger
    );
  };
  const handleSubmitPainting = async e => {
    const isValid = await trigger();
    if (!isValid) return;
    let data = {};
    let endpoint = '';
    let method = '';
    if (paintingId) {
      method = 'PUT';
      endpoint = 'paintings/update';
      data = {
        id: paintingId,
        image: image,
        name: e.name,
        description: e.description,
        status: paintingStatus.SUBMITTED,
        roundTopicId: topicId,
        currentUserId: userInfo.Id,
      };
    } else {
      method = 'POST';
      endpoint = 'paintings/submitepainting1stround';
      data = {
        image: url,
        name: e.name,
        description: e.description,
        roundTopicId: topicId,
        accountId: userInfo.Id,
      }
    }
    SwalComponent(
      'Bạn có chắc chắn nộp bài?',
      endpoint,
      method,
      data,
      'Nộp bài thành công',
      'Nộp bài thất bại',
      'Bạn đã hủy nộp bài',
      setRefreshTrigger
    );
  };
  const getDropdownOptions = (data, defaultValue = '') => {
    const value = watch(data) || defaultValue;
    return value;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value.name);
    setTopicId(value.id);
    setError(name, '');
  };

  useEffect(() => {
    //clean-up
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image, userInfo?.Id]);

  useEffect(() => {
    paintingApi
      .getAllPaintingByContestAccountId(
        getAllPaintingByCompetitorIdEndpoint, contestId, userInfo?.Id,
      )
      .then(result => {
        const data = result.data.result;
        setImage(data.image);
        setPaintingId(data.id);
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('topic', data.topicName);
        setTopicId(data.roundTopicId);
        setValue('file', data.image);
        if(paintingStatusDisable.some(status => status === data.status)) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      });
  }, [userInfo?.Id, contestId, refreshTrigger]);

  return (
    <div className="create-item">
      <HeaderVersion2 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Đăng ký tham gia</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="#">Trang</Link>
                  </li>
                  <li>Đăng ký</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            {image && (
              <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                <h4
                  style={{ marginBottom: '20px' }}
                  className="title-create-item">
                  Xem trước
                </h4>
                <div className="sc-card-product">
                  <div className="card-media">
                    <Link className="cursor-none" to="#">
                      <img src={image ? image : defaultImage} alt="preview" />
                    </Link>
                  </div>
                  <div className="meta-info">
                    <div className="author">
                      <div className="text">
                        <span>Tác giả</span>
                        <h5>{userInfo.nameid}</h5>
                      </div>
                    </div>
                    <div className="text">
                      <span>Ngày nộp</span>
                      <h5>{today}</h5>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className={`${image ? 'col-xl-9 col-lg-6 col-md-12 col-12' : 'col-xl-12 col-lg-12 col-md-12 col-12'}`}>
              <div className="form-create-item" style={{ left: '50%' }}>
                <form>
                  <h4 className="title-create-item">Tải ảnh</h4>
                  <label
                    className={classNames(
                      disable ? 'read-only' : '',
                      'uploadFile',
                      errors.file?.message?.length > 0 ? 'border-danger' : '',
                    )}>
                    {image ? (
                      <span className="filename">PNG, JPG. tối đa 20mb.</span>
                    ) : errors.file ? (
                      <span className="text-danger h5">
                        {errors.file.message}
                      </span>
                    ) : (
                      <span className="filename">PNG, JPG. tối đa 20mb.</span>
                    )}
                    <input
                      onChange={handlePreviewImage}
                      type="file"
                      className={`${disable ? 'read-only' : ''} inputfile form-control`}
                      name="file"
                      disabled={disable}
                    />
                  </label>
                  <div>
                    <h4 className="title-create-item disable-select">Tên bức tranh</h4>
                    <TextfieldCommon
                      control={control}
                      error={errors.name?.message}
                      id="name"
                      name="name"
                      tabIndex="1"
                      placeholder="Nhập tên của bức tranh"
                      className={`${disable ? 'read-only' : ''} mb-15`}
                      autoFocus
                      disabled={disable}
                      readOnly={disable}
                    />
                    <h4 className="title-create-item">Mô tả bức tranh</h4>
                    <TextareaCommon
                      control={control}
                      id="description"
                      name="description"
                      tabIndex="1"
                      placeholder="Nhập mô tả của bức tranh"
                      className={`${disable ? 'read-only' : ''} mb-15`}
                      autoFocus
                      disabled={disable}
                    />

                    <div className="inner-row-form style-2">
                      <div id="item-create" className="dropdown">
                        <h4 className="title-create-item">Chủ đề</h4>
                        {errors.topic && (
                          <span className="text-danger h5">
                            {errors.topic.message}
                          </span>
                        )}
                        <Dropdown 
                          disabled={disable}
                          errors={errors.topic?.message}>
                          <Dropdown.Select
                            placeholder={getDropdownOptions(
                              'topic',
                              'Chọn chủ đề',
                            )}></Dropdown.Select>
                          <Dropdown.List>
                            {roundTopicsData.map(topic => (
                              <Dropdown.Option
                                key={topic.name}
                                onClick={() =>
                                  handleSelectDropdownOption('topic', topic)
                                }>
                                {topic.name}
                              </Dropdown.Option>
                            ))}
                          </Dropdown.List>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-content-center align-items-center mt-5">
                    <button
                      type="submit"
                      className={`${disable ? 'button-read-only' : ''} btn-submit`}
                      disabled={disable}
                      onClick={handleSubmit(handleDraftPainting)}>
                      Lưu bản vẽ
                    </button>
                    <button
                      type="submit"
                      className={`${disable ? 'button-read-only' : ''} btn-submit`}
                      disabled={disable}
                      onClick={handleSubmit(handleSubmitPainting)}>
                      Nộp bản vẽ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const SwalComponent = (title, endpoint, method, data, successMsg, errorMsg, cancelMsg, setRefreshTrigger) => {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: 'Lưu',
  }).then(result => {
    if (result.isConfirmed) {
      if (method === 'POST') {
        paintingApi
          .postPainting(endpoint, data)
          .then(() => {
            Swal.fire(successMsg, '', 'success').then(
              () => {
                setRefreshTrigger(prev => !prev);
              }
            );
          })
          .catch(error => {
            Swal.fire(errorMsg, 'Hãy thử lại sau bạn nhé', 'error');
          });
      } else if(method === 'PUT') {
        paintingApi
          .updatePainting(endpoint, data)
          .then(() => {
            Swal.fire(successMsg, '', 'success').then(
              () => {
                setRefreshTrigger(prev => !prev);
              }
            );
          })
          .catch(error => {
            Swal.fire(errorMsg, 'Hãy thử lại sau bạn nhé', 'error');
          });
      }
      
    } else if (result.isDismissed) {
      Swal.fire(cancelMsg, '', 'info');
    }
  });
}

export default SubmitPage;
