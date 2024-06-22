import { Link } from 'react-router-dom';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import { useForm } from 'react-hook-form';
import TextfieldCommon from '../components/input/TextfieldCommon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { competitorLogin } from '../store/auth/authAction';
import { FadeLoader } from 'react-spinners';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, IconButton, Typography, styled } from '@mui/material';
const Login = () => {
  // open dialog
  const [open, setOpen] = useState(false);
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

  const handleRegister = async (data) => {
    // Trigger validate form
    const isValid = await trigger();
    if (!isValid) return;
    else {
      setOpen(true);
      dispatch(competitorLogin(data));
      reset();
    }
  };

  const {
    login: { loading, userInfo, success }
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    // redirect home page
    if (userInfo) navigate('/');
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
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>Đăng nhập</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 6,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TypographyStyled className="h3 text-center">
            Sai tài khoản hoặc mật khẩu, vui lòng nhập lại
          </TypographyStyled>
        </DialogContent>
      </BootstrapDialog>
      <section className="tf-login tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <div className="flat-form box-login-email">
                <div className="form-inner">
                  <form onSubmit={handleSubmit(handleRegister)} className="select-none">
                    <TextfieldCommon
                      control={control}
                      error={errors.userName?.message}
                      id="userName"
                      name="userName"
                      tabIndex="1"
                      placeholder="Nhập username"
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
                    <div className="row-form style-1 flex-row-reverse">
                      <Link to="#" className="forgot-pass">
                        Quên mật khẩu ?
                      </Link>
                    </div>

                    <button className="submit">
                      {loading ? (
                        <FadeLoader color="#fff" loading={loading} size={10} />
                      ) : (
                        'Đăng nhập'
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
    padding: theme.spacing(5)
  }
}));

const TypographyStyled = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: theme.typography.fontWeightMedium
}));

export default Login;
