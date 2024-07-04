// import React from 'react';
import { Link } from 'react-router-dom';
import HeaderVersion2 from '../components/common/header/HeaderVersion2';
import Footer from '../components/common/footer/Footer';
import Countdown from 'react-countdown';
import 'react-tabs/style/react-tabs.css';
import avt from '../assets/images/avatar/avt-9.jpg';
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

const topicsData = ['Chủ đề 1', 'Chủ đề 2', 'Chủ đề 3', 'Chủ đề 4', 'Chủ đề 5'];

const SubmitPage = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const { progress, url, error } = useUploadImage(file);

  const schema = yup.object().shape({
    file: yup.mixed().required('Vui lòng chọn ảnh'),
    name: yup.string().required('Vui lòng nhập tên của bức tranh'),
    description: yup.string(),
    topic: yup.string().required('Vui lòng chọn chủ đề')
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    trigger,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  });
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
    setError('file', '');
  };

  const handleSubmitPainting = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;

    setFile(file);

    console.log(progress, url, error);
  };

  const getDropdownOptions = (data, defaultValue = '') => {
    const value = watch(data) || defaultValue;
    return value;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
    setError(name, '');
  };

  useEffect(() => {
    //clean-up
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  console.log('errors', errors.file?.message);

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
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 style={{ marginBottom: '20px' }} className="title-create-item">
                Xem trước
              </h4>
              <div className="sc-card-product">
                <div className="card-media">
                  <Link className="cursor-none" to="#">
                    <img src={image ? image.preview : defaultImage} alt="preview" />
                  </Link>
                </div>
                <div className="card-title">
                  <h5>
                    <Link className="" to="#">
                      Tên bức tranh
                    </Link>
                  </h5>
                  <div className="tags">Trạng thái</div>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="text">
                      <span>Tác giả</span>
                      <h5>Nguyễn Duy</h5>
                    </div>
                  </div>
                  <div className="text">
                    <span>Ngày nộp</span>
                    <h5>29/06/2024</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <form action="#" onSubmit={handleSubmit(handleSubmitPainting)}>
                  <h4 className="title-create-item">Tải ảnh</h4>
                  <label
                    className={classNames(
                      'uploadFile',
                      errors.file?.message?.length > 0 ? 'border-danger' : ''
                    )}
                  >
                    {image ? (
                      <span className="filename">Tên file: {image.name}</span>
                    ) : errors.file ? (
                      <span className="text-danger h5">{errors.file.message}</span>
                    ) : (
                      <span className="filename">PNG, JPG. tối đa 20mb.</span>
                    )}
                    <input
                      onChange={handlePreviewImage}
                      type="file"
                      className="inputfile form-control"
                      name="file"
                    />
                  </label>
                  <div>
                    <h4 className="title-create-item">Tên bức tranh</h4>
                    <TextfieldCommon
                      control={control}
                      error={errors.name?.message}
                      id="name"
                      name="name"
                      tabIndex="1"
                      placeholder="Nhập tên của bức tranh"
                      className="mb-15"
                      autoFocus
                    />
                    <h4 className="title-create-item">Mô tả bức tranh</h4>
                    <TextareaCommon
                      control={control}
                      id="description"
                      name="description"
                      tabIndex="1"
                      placeholder="Nhập mô tả của bức tranh"
                      className="mb-15"
                      autoFocus
                    />

                    <div className="inner-row-form style-2">
                      <div id="item-create" className="dropdown">
                        <h4 className="title-create-item">Chủ đề</h4>
                        {errors.topic && (
                          <span className="text-danger h5">{errors.topic.message}</span>
                        )}
                        <Dropdown errors={errors.topic?.message}>
                          <Dropdown.Select
                            placeholder={getDropdownOptions('topic', 'Chọn chủ đề')}
                          ></Dropdown.Select>
                          <Dropdown.List>
                            {topicsData.map((topic) => (
                              <Dropdown.Option
                                key={topic}
                                onClick={() => handleSelectDropdownOption('topic', topic)}
                              >
                                {topic}
                              </Dropdown.Option>
                            ))}
                          </Dropdown.List>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn-submit">
                    Nộp bản vẽ mềm
                  </button>
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

export default SubmitPage;
