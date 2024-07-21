import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/header/HeaderVersion1';
import Footer from '../../components/common/footer/Footer';
import useFetchData from '../../hooks/useQueryData.js';
import { useSelector } from 'react-redux';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import { useForm } from 'react-hook-form';
import TextfieldCommon from '../../components/input/TextfieldCommon.jsx';
import TextareaCommon  from '../../components/textarea/TextareaCommon.jsx';
import RadioCommon from '../../components/checkbox/RadioCommon.jsx';
import { defaultAvatar } from '../../constant/imageDefault.js';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import Swal from 'sweetalert2';
import { masterApi } from '../../api/masterApi.js';


const ProfilePage = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const { url } = useUploadImage(file);
  
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
  });

  const handleKeyDown = e => {
    if (e.key === '-' || e.key === '+') {
      e.preventDefault();
    }
  };

  const valueArray = [
    { value: '0', label: 'Nam' },
    { value: '1', label: 'Nữ' },
  ];
  
  function convertToVietnameseDateFormat(isoDateString) {
    const dateObject = new Date(isoDateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  }
  
  const handleUpdate = async input => {
    const data = {
      id: userInfo.Id,
      address: input.address,
      avatar: url,
    }
    Swal.fire({
      title: 'Bạn có chắc chắn cập nhật?',
      showCancelButton: true,
      confirmButtonText: 'Có',
    }).then(result => {
      if (result.isConfirmed) {
        masterApi
          .update('accounts', data)
          .then(() => {
            Swal.fire('Cập nhật thành công', '', 'success');
          })
          .catch(error => {
            Swal.fire(
              'Cập nhật thất bại thất bại',
              'Hãy thử lại sau bạn nhé',
              'error',
            );
          });
      } else if (result.isDenied) {
        Swal.fire('Bạn đã hủy', '', 'info');
      }
    });
  }

  const handleUploadImage = e => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setImage(URL.createObjectURL(file));
    setFile(file);
  };

  useEffect(() => {
    //clean-up
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image, userInfo?.Id]);
  
  const { isLoading, isError, data, error } = useFetchData(
    'accounts/getaccountbyid', `${userInfo.Id}`
  );
  const info = data?.data?.result;
  useEffect(() => {
    if (info) {
      setImageUrl(info.avatar);
    }
  }, [data]);

  if (isLoading) {
    return <DotLoaderCustom />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">
                                    Thông tin cá nhân
                                </h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li>
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    
                                    <li>Thông tin cá nhân</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                            <div className="sc-card-profile text-center">
                                <div className="card-media">
                                    <img
                                        id="profileimg"
                                        src={imageUrl}
                                        alt="Axies"
                                    />
                                </div>
                                <div id="upload-profile">
                                    <Link to="#" className="btn-upload">
                                        Cập nhật hình ảnh mới
                                    </Link>
                                    <input
                                        id="tf-upload-img"
                                        type="file"
                                        name="profile"
                                        onChange={handleUploadImage}
                                        required=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                            <div className="form-upload-profile">
                                <form className="form-profile" action="#" onSubmit={handleSubmit(handleUpdate)}>
                                    <div className="form-infor-profile">
                                      <div className="info-account">
                                        <h4 className="title-create-item">
                                          Thông tin cơ bản
                                        </h4>
                                        <fieldset>
                                          <h4 className="title-infor-account">
                                            Họ và tên
                                          </h4>
                                          <TextfieldCommon
                                            control={control}
                                            className="color-disabled"
                                            type="text"
                                            name="fullname"
                                            placeholder="Họ và tên"
                                            defaultValue={info?.fullName}
                                            readOnly
                                          />
                                        </fieldset>
                                        <fieldset>
                                          <div className="flex">
                                            <div className='w-half mr-auto'>
                                              <h4 className="title-infor-account">
                                                Ngày sinh
                                              </h4>
                                              <TextfieldCommon
                                                className="color-disabled"
                                                defaultValue={convertToVietnameseDateFormat(info?.birthday)}
                                                control={control}
                                                error={
                                                  errors.birthday?.message
                                                }
                                                name="birthday"
                                                readOnly
                                              />
                                            </div>
                                            <div className='w-birthday'>
                                              <h4 className="title-infor-account">
                                                Giới tính
                                              </h4>
                                              <RadioCommon
                                                disabled
                                                control={control}
                                                error={
                                                  errors?.gender?.message
                                                }
                                                defaultValue={info?.gender}
                                                name="gender"
                                                valueArray={valueArray}
                                              />
                                            </div>
                                          </div>
                                        </fieldset>
                                        <fieldset>
                                          <h4 className="title-infor-account">
                                            Số điện thoại
                                          </h4>
                                          <TextfieldCommon
                                            control={control}
                                            error={
                                              errors.phone?.message
                                            }
                                            className="number color-disabled"
                                            name="phone"
                                            aria-required="true"
                                            type="number"
                                            defaultValue={info?.phone}
                                            placeholder="Số điện thoại"
                                            onKeyDown={handleKeyDown}
                                            readOnly
                                          />
                                        </fieldset>
                                        <fieldset>
                                          <h4 className="title-infor-account">
                                            Email
                                          </h4>
                                          <TextfieldCommon
                                            control={control}
                                            className="color-disabled"
                                            error={
                                              errors.email?.message
                                            }
                                            id="email"
                                            name="email"
                                            aria-required="true"
                                            type="email"
                                            defaultValue={info?.email}
                                            placeholder="Nhập email"
                                            readOnly
                                          />
                                        </fieldset>
                                        <fieldset>
                                          <h4 className="title-infor-account">
                                            Địa chỉ
                                          </h4>
                                          <TextareaCommon
                                            control={control}
                                            id="address"
                                            name="address"
                                            aria-required="true"
                                            type="text"
                                            defaultValue={info?.address}
                                            placeholder="Nhập địa chỉ"
                                          />
                                        </fieldset>
                                      </div>
                                    </div>
                                  <div style={{ width: '100%' }} className="flex">
                                    <button
                                      className="tf-button-submit mg-t-15 button-center"
                                      type="submit">
                                      Cập nhật
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

export default ProfilePage;
