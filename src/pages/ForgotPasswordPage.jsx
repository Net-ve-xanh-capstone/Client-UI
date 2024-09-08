import React from 'react';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import { Link } from 'react-router-dom';
import { TextFieldCommon } from '../components/input/TextfieldCommon';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgetPassword } from '../api/authenApi';
import ShowAlert from '../components/showAller/ShowAlert';

const ForgotPasswordPage = () => {
  const schema = yup.object().shape({
    userName: yup.string().required('Vui lòng nhập username của bạn'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForgot = async data => {
    const content = 'Thông báo sẽ đóng sau <b></b> giây.';
    try {
      const res = await forgetPassword(data);
      const message = res?.data?.message;
      ShowAlert(message, content, 3000);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message;
      ShowAlert(message, content, 3000);
    }
  };

  return (
    <div>
      <HeaderVersion1 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">QUÊN MẬT KHẨU</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>quên mật khẩu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-login tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <div className="flat-form box-login-email">
                <div className="form-inner">
                  <form
                    onSubmit={handleSubmit(handleForgot)}
                    className="select-none">
                    <TextFieldCommon
                      control={control}
                      error={errors?.userName?.message}
                      id="userName"
                      name="userName"
                      tabIndex="1"
                      type="text"
                      placeholder="Nhập tên tài khoản của bạn"
                      autoFocus
                    />

                    <button className="submit flex justify-content-center align-items-center h-100 p-0">
                      <div style={{ padding: '2rem' }}>Tìm mật khẩu</div>
                    </button>

                    <div className="mt-5 text-right h5">
                      Bạn đã tài khoản? {''}
                      <Link to={'/login'} className="font-weight-bold">
                        đăng nhập
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
