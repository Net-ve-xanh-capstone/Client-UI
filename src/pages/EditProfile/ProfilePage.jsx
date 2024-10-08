import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/header/HeaderVersion1';
import Footer from '../../components/common/footer/Footer';
import useFetchData from '../../hooks/useQueryData.js';
import { useSelector } from 'react-redux';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import { useForm } from 'react-hook-form';
import TextFieldCommon from '../../components/input/TextfieldCommon.jsx';
import TextareaCommon from '../../components/textarea/TextareaCommon.jsx';
import RadioCommon from '../../components/checkbox/RadioCommon.jsx';
import { userAvatar } from '../../constant/imageDefault.js';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import { masterApi } from '../../api/masterApi.js';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  regexEmail,
  regexFullNameVN,
  regexPhone,
} from '../../constant/Regex.js';
import DatepickerCommon from '../../components/datepicker/DatePickerCommon.jsx';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const ProfilePage = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const { url } = useUploadImage(file);

  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required('Vui lòng nhập tên của bạn')
      .matches(regexFullNameVN, 'Tên không hợp lệ'),
    email: yup
      .string()
      .required('Vui lòng nhập email của bạn')
      .matches(regexEmail, 'Email không hợp lệ'),
    phone: yup
      .string()
      .required('Vui lòng nhập số điện thoại của bạn')
      .matches(regexPhone, 'Số điện thoại không hợp lệ'),
    gender: yup
      .boolean()
      .required('Vui lòng chọn giới tính')
      .typeError('Vui lòng chọn giới tính'),
    birthday: yup
      .string()
      .required('Vui lòng chọn ngày sinh')
      .typeError('Vui lòng chọn ngày sinh'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
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

  const handleUpdate = async input => {
    const birthday = dayjs(input.birthday).toISOString();
    const data = {
      id: userInfo.Id,
      phone: input.phone,
      gender: input.gender,
      fullname: input.fullname,
      birthday: birthday,
      address: input.address,
      avatar: url || imageUrl,
    };
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
  };

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

  const { isLoading, isError, data, error, refetch } = useFetchData(
    'accounts/getaccountbyid',
    `${userInfo.Id}`,
  );
  const info = data?.data?.result;
  useEffect(() => {
    if (info !== undefined) {
      if (info.avatar) {
        setImageUrl(info.avatar);
      } else {
        setImageUrl(userAvatar);
      }
    }
    refetch();
  }, [refetch, userInfo.Id]);

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
                <h1 className="heading text-center">THÔNG TIN CÁ NHÂN</h1>
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
                  <img id="profileimg" src={imageUrl} alt="avatar" />
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
                <form
                  className="form-profile"
                  onSubmit={handleSubmit(handleUpdate)}>
                  <div className="form-infor-profile">
                    <div className="info-account">
                      <h4 className="title-create-item">Thông tin cơ bản</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Họ và tên</h4>
                        <TextFieldCommon
                          control={control}
                          error={errors.fullname?.message}
                          className="color-disabled"
                          type="text"
                          name="fullname"
                          placeholder="Họ và tên"
                          defaultValue={info?.fullName}
                        />
                      </fieldset>
                      <fieldset>
                        <div className="flex">
                          <div className="w-half mr-auto">
                            <h4 className="title-infor-account">Ngày sinh</h4>
                            <DatepickerCommon
                              PopperProps={{
                                sx: {
                                  '&.MuiPickersPopper-root': {
                                    border: '4px solid red',
                                  },
                                },
                              }}
                              future={false}
                              defaultValue={dayjs(info?.birthday)}
                              control={control}
                              error={errors.birthday?.message}
                              name="birthday"
                            />
                          </div>
                          <div className="w-birthday">
                            <h4 className="title-infor-account">Giới tính</h4>
                            <RadioCommon
                              control={control}
                              error={errors?.gender?.message}
                              defaultValue={info?.gender}
                              name="gender"
                              valueArray={valueArray}
                            />
                          </div>
                        </div>
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Số điện thoại</h4>
                        <TextFieldCommon
                          control={control}
                          error={errors.phone?.message}
                          className="number color-disabled"
                          name="phone"
                          aria-required="true"
                          type="number"
                          defaultValue={info?.phone}
                          placeholder="Số điện thoại"
                          onKeyDown={handleKeyDown}
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Email</h4>
                        <TextFieldCommon
                          control={control}
                          className="color-disabled"
                          error={errors.email?.message}
                          id="email"
                          name="email"
                          aria-required="true"
                          type="email"
                          defaultValue={info?.email}
                          placeholder="Nhập email"
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Địa chỉ</h4>
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
