import { Link } from 'react-router-dom';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import { useForm } from 'react-hook-form';
import TextfieldCommon from '../components/input/TextfieldCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import { competitorLogin } from '../store/auth/authAction';

const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Vui lòng nhập đúng định dạng email')
      .required('Vui lòng nhập email của bạn'),
    password: yup.string().required('Vui lòng nhập mật khẩu của bạn').max(10)
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  });

  const handleRegister = (data) => {
    dispatch(competitorLogin(data));
    reset();
  };

  const { loading, userInfo, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (!success) navigate('/login');
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile');
  }, [navigate, userInfo, success]);

  return (
    <div>
      <HeaderVersion1 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Đăng nhập</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Login</li>
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
              <h2 className="tf-title-heading ct style-1">Đăng nhập tài khoản</h2>

              <div className="flat-form box-login-email">
                <div className="box-title-login"></div>

                <div className="form-inner">
                  <form onSubmit={handleSubmit(handleRegister)} className="select-none">
                    <TextfieldCommon
                      control={control}
                      error={errors.email?.message}
                      id="email"
                      name="email"
                      tabIndex="1"
                      placeholder="Nhập email"
                      autoFocus
                    />
                    <TextfieldCommon
                      control={control}
                      error={errors.password?.message}
                      id="password"
                      name="password"
                      tabIndex="2"
                      aria-required="true"
                      type="password"
                      placeholder="Nhập mật khẩu"
                    />
                    <div className="row-form style-1">
                      <label>
                        Ghi nhớ
                        <input type="checkbox" />
                        <span className="btn-checkbox"></span>
                      </label>
                      <Link to="#" className="forgot-pass">
                        Quên mật khẩu ?
                      </Link>
                    </div>

                    <button className="submit">đăng nhập</button>
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

export default Login;
