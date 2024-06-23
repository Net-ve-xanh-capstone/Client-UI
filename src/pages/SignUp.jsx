import { Link } from 'react-router-dom';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import TextfieldCommon from '../components/input/TextfieldCommon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const SignUp = () => {
  const schema = yup.object().shape({
    userName: yup.string().required('Vui lòng nhập username của bạn'),
    password: yup.string().required('Vui lòng nhập mật khẩu của bạn').max(10)
  });

  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  });
  return (
    <div>
      <HeaderVersion1 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Đăng ký</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>Đăng ký</li>
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
                  <form action="#" id="contactform">
                    <Grid container spacing={4}>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          id="lastname"
                          name="lastname"
                          tabIndex="1"
                          aria-required="true"
                          type="text"
                          placeholder="Họ"
                          className="textfield"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          id="firstname"
                          name="firstname"
                          tabIndex="2"
                          aria-required="true"
                          type="text"
                          placeholder="Tên"
                          className="textfield"
                        />
                      </Grid>
                    </Grid>

                    <div className="font-weight-bold h5">Ngày sinh</div>
                    <Grid sx={{ marginTop: '-10px' }} container spacing={2}>
                      <Grid item md={4}>
                        <DatePicker defaultValue={dayjs(new Date())} openTo="day" views={['day']} />
                      </Grid>
                      <Grid item md={4}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          openTo="month"
                          views={['month']}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          disablePast
                          openTo="year"
                          views={['year']}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          id="username"
                          name="username"
                          tabIndex="3"
                          aria-required="true"
                          placeholder="tên tài khoản"
                          className="textfield"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          id="phone"
                          name="phone"
                          tabIndex="4"
                          aria-required="true"
                          type="number"
                          placeholder="Số điện thoại"
                          className="textfield"
                        />
                      </Grid>
                    </Grid>
                    <div className="row-form style-1">
                      <label>
                        Remember me
                        <input type="checkbox" />
                        <span className="btn-checkbox"></span>
                      </label>
                      <Link to="#" className="forgot-pass">
                        Forgot Password ?
                      </Link>
                    </div>
                    <button className="submit">Login</button>
                    <div className="mt-5 text-right h5">
                      Bạn đã có tài khoản? {''}
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

export default SignUp;
