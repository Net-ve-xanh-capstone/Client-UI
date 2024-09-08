import { Link } from 'react-router-dom';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import { useForm } from 'react-hook-form';
import TextFieldCommon from '../components/input/TextfieldCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { competitorLogin } from '../store/auth/authAction';
import { FadeLoader } from 'react-spinners';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton, styled } from '@mui/material';
import * as yup from 'yup';
import { color } from '../constant/Color.js';
import Role from '../constant/Role.js';

const Login = () => {
  const [open, setOpen] = useState(false);
  // open dialog
  const schema = yup.object().shape({
    username: yup.string().required('Vui lòng nhập username của bạn'),
    password: yup.string().required('Vui lòng nhập mật khẩu của bạn'),
  });

  const {
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const {
    login: { loading, success, error },
    jwtToken,
    userInfo,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async data => {
    // Trigger validate form
    const isValid = await trigger();
    if (!isValid) return;
    else {
      dispatch(competitorLogin(data)).then(res => {
        if (error) setOpen(true);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (success || jwtToken) {
      if (userInfo.role === Role.STAFF) {
        reset();
        navigate('/staff-management/contest');
      } else if (userInfo.role === Role.ADMIN) {
        reset();
        navigate('/admin-management/');
      } else {
        reset();
        navigate('/');
      }
    }
    if (error) {
      setOpen(true);
    }
  }, [success, error, jwtToken]);

  return (
    <div>
      <HeaderVersion1 />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">ĐĂNG NHẬP</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>Đăng nhập</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 6,
            color: theme => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className="space-y-20 pd-40">
            <h4 className="text-center font-weight-bold">
              Sai tài khoản hoặc mật khẩu, xin nhập lại
            </h4>
          </div>
        </DialogContent>
      </BootstrapDialog>
      <section className="tf-login tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <div className="flat-form box-login-email">
                <div className="form-inner">
                  <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="select-none">
                    <TextFieldCommon
                      control={control}
                      error={errors.username?.message}
                      id="username"
                      name="username"
                      tabIndex="1"
                      placeholder="Tên tài khoản"
                      autoFocus
                    />
                    <TextFieldCommon
                      control={control}
                      error={errors.password?.message}
                      id="password"
                      name="password"
                      tabIndex="2"
                      aria-required="true"
                      type="password"
                      placeholder="Mật khẩu"
                    />
                    <div className="row-form style-1 flex-row-reverse">
                      <Link to="#" className="forgot-pass">
                        Quên mật khẩu ?
                      </Link>
                    </div>

                    <button className="submit flex justify-content-center align-items-center h-100 p-0">
                      {loading ? (
                        <div>
                          <FadeLoader
                            color={color.purple}
                            loading={loading}
                            size={2}
                          />
                        </div>
                      ) : (
                        <div style={{ padding: '2rem' }}>Đăng nhập</div>
                      )}
                    </button>

                    <div className="mt-5 text-right h5">
                      Bạn chưa có tài khoản? {''}
                      <Link to={'/sign-up'} className="font-weight-bold">
                        đăng ký
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5),
  },
}));

export default Login;
