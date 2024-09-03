import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { regexEmail, regexPassword, regexPhone } from '../../../../constant/Regex.js';
import { Grid } from '@mui/material';
import { TextFieldCommon } from '../../../../components/input/TextfieldCommon.jsx';
import styles from './style.module.css';
import RadioCommon from '../../../../components/checkbox/RadioCommon.jsx';
import Role from '../../../../constant/Role.js';
import { addNewStaff } from '../../../../api/authenApi.js';
import { toast } from 'react-toastify';

const AccountForm = forwardRef(({ modalShow, toggle }, ref) => {
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const genders = [
    { value: '0', label: 'Nam' },
    { value: '1', label: 'Nữ' },
  ];

  useImperativeHandle(ref, () => ({
    handleOpen: () => {
      reset();
      toggle();
      setDate(currentDate);
    },
  }));

  const schema = yup.object().shape({
    fullName: yup.string().required('Vui lòng nhập họ tên'),
    username: yup.string().required('Vui lòng nhập username'),
    email: yup
      .string()
      .matches(regexEmail, 'Email không hợp lệ')
      .required('Vui lòng nhập email của bạn'),
    phone: yup
      .string()
      .matches(regexPhone, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại của bạn'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu của bạn')
      .matches(regexPassword,
        'Mật khẩu của bạn phải chứa 8 ký tự, bao gồm một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt.'),
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
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;
    const birthday = new Date(data.birthday).toISOString();
    const payload = {
      ...data,
      birthday,
      address: 'N/A',
      role: Role.STAFF,
    };
    await addNewStaff(payload)
      .then((response) => {
        const message = response?.data?.message;
        toast.success(message,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        toggle();
      })
      .catch((error) => {
        const message = error.response ? error.response.data.message : 'Đã xảy ra lỗi.';
        toast.error(message,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
      });
  };

  const handleKeyDown = event => {
    //Chặn nhập bé hơn 3 và lớn hơn 99
    if (event.key === 'e'
      || event.key === '-'
      || event.key === '+'
      || event.key === 'E'
      || event.key === '.') {
      event.preventDefault();
    }
  };

  const handleChangeBirthday = useCallback((dateChange) => {
    setValue('birthday', dateChange, {
      shouldDirty: true,
    });
    setDate(dateChange);
  }, [setValue]);


  return (
    <>
      <Modal
        show={modalShow}
        onHide={toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '22px', margin: 0, padding: 0 }}>
            Tạo tài khoản của staff
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '70vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
            {/* -------FullName & Email----------- */}
            <Grid container spacing={2}>
              <Grid item md={6}>
                <h4 className={styles.title}>Họ và tên</h4>
                <TextFieldCommon
                  control={control}
                  id="fullName"
                  name="fullName"
                  error={errors?.fullName?.message}
                  aria-required="true"
                  type="text"
                  placeholder="Nhập họ và tên"
                />
              </Grid>
              <Grid item md={6}>
                <h4 className={styles.title}>Email</h4>
                <TextFieldCommon
                  control={control}
                  error={errors?.email?.message}
                  id="email"
                  name="email"
                  aria-required="true"
                  type="email"
                  placeholder="Nhập email"
                />
              </Grid>
            </Grid>
            {/* -------Phone & Birthday & Gender----------- */}
            <Grid container spacing={2}>
              <Grid item md={4}>
                <h4 className={styles.title}>Số điện thoại</h4>
                <TextFieldCommon
                  control={control}
                  id="phone"
                  name="phone"
                  error={errors?.phone?.message}
                  aria-required="true"
                  type="number"
                  placeholder="Nhập số điện thoại"
                  onKeyDown={handleKeyDown}
                ></TextFieldCommon>
              </Grid>
              <Grid sx={{ height: '0%' }} item md={4}>
                <h4 className={styles.title}>Ngày sinh</h4>
                <Controller
                  name="birthday"
                  control={control}
                  defaultValue={currentDate}
                  render={() => (
                    <DatePicker
                      selected={date}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày sinh"
                      maxDate={currentDate}
                      onChange={handleChangeBirthday}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4}>
                <h4 className={styles.title}>Giới tính</h4>
                <RadioCommon
                  control={control}
                  error={errors?.gender?.message}
                  defaultValue={false}
                  name="gender"
                  valueArray={genders}
                />
              </Grid>
            </Grid>
            {/* -------Username----------- */}
            <Grid container spacing={2}>
              <Grid item md={12}>
                <h4 className={styles.title}>Username</h4>
                <TextFieldCommon
                  control={control}
                  id="username"
                  name="username"
                  error={errors?.username?.message}
                  aria-required="true"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                />
              </Grid>
            </Grid>
            {/* -------Password----------- */}
            <Grid container spacing={2}>
              <Grid item md={12}>
                <h4 className={styles.title}>Mật khẩu</h4>
                <TextFieldCommon
                  control={control}
                  id="password"
                  error={errors.password?.message}
                  name="password"
                  aria-required="true"
                  type="password"
                  placeholder="Nhập mật khẩu"
                />
              </Grid>
            </Grid>
            <div style={{ textAlign: 'end' }}>
              <LoadingButton
                type="submit"
                className={styles.btnAdd}
                size="large"
                loadingPosition="center"
                variant="contained">
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  Thêm
                </span>
              </LoadingButton>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default AccountForm;