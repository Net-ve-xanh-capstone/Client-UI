import React from 'react';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import { Link } from 'react-router-dom';
import { TextFieldCommon } from '../components/input/TextfieldCommon';
import { useForm } from 'react-hook-form';

const ForgotPasswordPage = () => {
  const { control, handleSubmit, errors } = useForm({});

  const handleForgot = data => {
    console.log(data);
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
                      error={errors?.username?.message}
                      id="username"
                      name="username"
                      tabIndex="1"
                      type="text"
                      placeholder="Nhập tài khoản của bạn"
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
