import { Link, useNavigate } from 'react-router-dom';
import HeaderVersion1 from '../components/common/header/HeaderVersion1';
import Footer from '../components/common/footer/Footer';
import TextfieldCommon from '../components/input/TextfieldCommon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormControlLabel, Grid, styled, Dialog, DialogContent, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatepickerCommon from '../components/datepicker/DatePickerCommon';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import RadioCommon from '../components/checkbox/RadioCommon';
import CloseIcon from '@mui/icons-material/Close';
import { competitorRegister } from '../store/auth/authAction';
import { FadeLoader } from 'react-spinners';
import { setDefault } from '../store/auth/authSlice';

const SignUp = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

  const currentDate = dayjs(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const {
    register: { success, message, loading },
    jwtToken
  } = useSelector((state) => state.auth);

  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const schema = yup.object().shape({
    lastname: yup.string().required('Vui lòng nhập Họ của bạn'),
    firstname: yup.string().required('Vui lòng nhập Tên của bạn'),
    email: yup.string().required('Vui lòng nhập email của bạn').email('Email không hợp lệ'),
    phone: yup
      .string()
      .matches(regexPhoneNumber, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại của bạn'),
    userName: yup.string().required('Vui lòng nhập tên tài khoản của bạn'),
    password: yup.string().required('Vui lòng nhập mật khẩu của bạn'),
    gender: yup.boolean().required('Vui lòng chọn giới tính').typeError('Vui lòng chọn giới tính'),
    birthday: yup.string().required('Vui lòng chọn ngày sinh').typeError('Vui lòng chọn ngày sinh')
  });

  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit'
  });

  if (jwtToken) {
    navigate('/');
  }

  useEffect(() => {
    if (success !== null) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch(setDefault());
      }, 3000);
    }
    if (success) {
      reset();
      setTimeout(() => {
        setOpen(false);
        dispatch(setDefault());
        navigate('/login');
      }, 3000);
    }
    // clear timeout
    return () => {
      clearTimeout();
    };
  }, [success]);

  const handleRegister = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;
    else {
      dispatch(competitorRegister(data)).then(() => {
        if (message) setOpen(true);
      });
      reset();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === '+') {
      e.preventDefault();
    }
  };

  const valueArray = [
    { value: '0', label: 'Nam' },
    { value: '1', label: 'Nữ' }
  ];

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
                  <form
                    action="#"
                    id="contactform"
                    className="select-none"
                    onSubmit={handleSubmit(handleRegister)}
                  >
                    <Grid container spacing={4}>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          error={errors.lastname?.message}
                          id="lastname"
                          name="lastname"
                          aria-required="true"
                          type="text"
                          placeholder="Họ"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          error={errors.firstname?.message}
                          id="firstname"
                          name="firstname"
                          aria-required="true"
                          type="text"
                          placeholder="Tên"
                        />
                      </Grid>
                    </Grid>
                    <Grid sx={{ marginTop: '-10px', marginBottom: '24px' }} container spacing={2}>
                      <Grid item md={6}>
                        <p className="font-weight-bold h5">Ngày sinh</p>
                        <DatepickerCommon
                          defaultValue={currentDate}
                          control={control}
                          error={errors.birthday?.message}
                          name="birthday"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <p className="font-weight-bold h5">Giới tính</p>
                        <RadioCommon
                          control={control}
                          error={errors?.gender?.message}
                          name="gender"
                          valueArray={valueArray}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          error={errors.email?.message}
                          id="email"
                          name="email"
                          aria-required="true"
                          type="email"
                          placeholder="Email"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextfieldCommon
                          control={control}
                          error={errors.phone?.message}
                          id="phone"
                          name="phone"
                          aria-required="true"
                          type="number"
                          placeholder="Số điện thoại"
                          className="number"
                          onKeyDown={handleKeyDown}
                        />
                      </Grid>
                      <Grid item md={3}></Grid>
                    </Grid>
                    <Grid sx={{ marginBottom: '12px' }} container>
                      <Grid item md={12}>
                        <TextfieldCommon
                          control={control}
                          error={errors.userName?.message}
                          id="userName"
                          name="userName"
                          aria-required="true"
                          type="text"
                          placeholder="Tên tài khoản"
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item md={12}>
                        <TextfieldCommon
                          control={control}
                          id="password"
                          error={errors.password?.message}
                          name="password"
                          aria-required="true"
                          type="password"
                          placeholder="Mật khẩu"
                        />
                      </Grid>
                    </Grid>

                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
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
                          {success === true ? 'Đăng ký thành công' : 'Đăng ký thất bại'}
                        </TypographyStyled>
                      </DialogContent>
                    </BootstrapDialog>

                    <button className="submit">
                      {loading ? (
                        <FadeLoader color="#fff" loading={loading} size={10} />
                      ) : (
                        'Đăng ký'
                      )}
                    </button>
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

const FormControlLabelStyled = styled(FormControlLabel)({
  '& .MuiSvgIcon-root': {
    fontSize: 24
  },
  //Font size
  '& .MuiTypography-root': {
    fontSize: 16,
    fontFamily: 'REM'
  }
});

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
export default SignUp;
