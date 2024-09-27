import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './page.module.css';
import { useSelector } from 'react-redux';
import { createAward, putAwards } from '../../../api/awrdApi.js';
import { toast } from 'react-toastify';
import { formatCurrencyVND, formatNumber } from '../../../utils/formatUtils.js';
import { Autocomplete, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NUMBER_TYPE = {
  CURRENCY: 'currency',
  NUMBER: 'number',
};
const AddingModal = ({
                       modalShow,
                       onHide,
                       roundId,
                       recallData,
                       isEdit = false,
                       dataEdit,
                       checkedFinalRound = false,
                     }) => {
  const { userInfo } = useSelector(state => state.auth);
  const defaultRank = [
    { title: 'Giải nhất', year: 1994 },
    { title: 'Giải nhì', year: 1972 },
    { title: 'Giải ba', year: 1974 },
    { title: 'Giải khuyến khích', year: 2008 },
  ];
  const [fieldUpdate, setFieldUpdate] = useState({
    id: '',
    rank: '',
    quantity: '',
    cash: '',
    artifact: '',
    roundId: roundId,
    createdBy: userInfo.Id,
  });

  const [errorField, setErrorField] = useState(null);

  // api for adding new award
  const postAward = async payload => {
    try {
      await createAward(payload);
      onHide();
      recallData();
      clear(fieldUpdate);
      clear(errorField);
      toast.success('Tạo giải thưởng thành công !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  // api for updating award
  const updateAward = async payload => {
    try {
      await putAwards(payload);
      onHide();
      recallData();
      clear(fieldUpdate);
      clear(errorField);
      toast.success('Cập nhật giải thưởng thành công !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  // clear all field input
  const clear = val => {
    for (let index in val) {
      val[index] = '';
    }
  };

  // function using for validation and return object to adding string error
  const validationInput = val => {
    let error = {};
    if (val.rank.length > 100) {
      error.rank = 'Kích thước không vượt qua 200 ký tự';
    }
    if (val.quantity.length > 100 || val.quantity.length <= 1) {
      error.quantity = 'Cho phép nhập từ 1-100 số';
    }
    if (val.cash.length > 200) {
      error.cash = 'Kích thước không vượt qua 200 ký tự';
    }
    if (val.artifact.length > 200) {
      error.artifact = 'Kích thước không vượt qua 200 ký tự';
    }

    return error;
  };

  // get value while user input and set it to state
  const handleInput = e => {
    const { name, value } = e.target;
    setFieldUpdate(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputNumber = (e, type) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ''); // Loại bỏ ký tự không phải số
    let formattedValue;

    if (type === NUMBER_TYPE.CURRENCY) {
      formattedValue = formatCurrencyVND(rawValue); // Format thành VND
      setFieldUpdate({ ...fieldUpdate, cash: rawValue }); // Cập nhật cash
    } else if (type === NUMBER_TYPE.NUMBER) {
      formattedValue = formatNumber(rawValue); // Format thành số nguyên
      setFieldUpdate({ ...fieldUpdate, quantity: rawValue }); // Cập nhật quantity
    }

    e.target.value = formattedValue; // Hiển thị giá trị đã format
  };

  // handle error after user sumbmit the form after filling on
  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const objectError = validationInput(fieldUpdate);
    if (objectError.length > 0) {
      toast.error('Vui lòng kiểm tra lại thông tin !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setErrorField(objectError);
    } else {
      const payload = {
        rank: checkedFinalRound ? fieldUpdate.rank : 'Qua vòng loại',
        quantity: fieldUpdate.quantity,
        cash: checkedFinalRound ? fieldUpdate.cash : 0,
        artifact: fieldUpdate.artifact,
        roundId: roundId,
        createdBy: userInfo.Id,
      };
      const editPayload = {
        id: fieldUpdate?.id,
        rank: checkedFinalRound ? fieldUpdate.rank : 'Qua vòng loại',
        quantity: fieldUpdate.quantity,
        cash: checkedFinalRound ? fieldUpdate.cash : 0,
        artifact: fieldUpdate.artifact,
        updatedBy: userInfo.Id,
      };
      isEdit ? updateAward(editPayload) : postAward(payload);
    }
  };

  // adding value when editting
  const addingEditVal = val => {
    for (let index in val) {
      setFieldUpdate(prv => ({
        ...prv,
        [index]: val[index],
      }));
    }
  };

  // adding current value while editting
  useEffect(() => {
    if (isEdit) {
      addingEditVal(dataEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShow]);

  return (
    <>
      <Dialog
        classes={{
          paper: styles.modalForm,
        }}
        open={modalShow}
        onClose={onHide}
        maxWidth={'xs'}
        fullWidth
        hideBackdrop
      >
        <DialogTitle disableTypography style={{}}>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '24px',
              color: '#14141F',
              textAlign: 'center',
            }}
          >{isEdit ? 'Chỉnh sửa giải thưởng' : 'Thêm giải thưởng'}</Typography>
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              transform: 'translate(-0%, -0%)',
              color: '#14141F',
            }}
            onClick={onHide}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ height: '100%', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.small_place}>
              <h4 className={styles.title}>Giải thưởng</h4>
              {checkedFinalRound ? (
                // <input
                //   className={styles.inputModal}
                //   required
                //   type="text"
                //   name="rank"
                //   value={fieldUpdate.rank}
                //   onChange={e => handleInput(e)}
                // />
                <div>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    onChange={(e, value) => {
                      setFieldUpdate({ ...fieldUpdate, rank: value });
                    }}
                    options={defaultRank.map((option) => option.title)}
                    renderInput={(params) => <TextField
                      {...params}
                      name="rank"
                      value={fieldUpdate.rank}
                      onChange={e => handleInput(e)}
                    />}
                    PopperProps={{ transition: 'none', disablePortal: true }}
                  />
                </div>

              ) : (
                <input
                  className={styles.inputModal}
                  required
                  type="text"
                  name="rank"
                  readOnly
                  value={'Qua vòng loại'}
                  onChange={e => handleInput(e)}
                />
              )}

              <h4 className={styles.title}>Số lượng</h4>
              <input
                className={styles.inputModal}
                required
                type="text"
                name="quantity"
                value={formatNumber(fieldUpdate.quantity)}
                onChange={e => handleInputNumber(e, NUMBER_TYPE.NUMBER)}
              />
              {checkedFinalRound && (
                <div>
                  <h4 className={styles.title}>Tiền mặt</h4>
                  <input
                    className={styles.inputModal}
                    type="text"
                    name="cash"
                    value={formatCurrencyVND(fieldUpdate.cash)}
                    onChange={e => handleInputNumber(e, NUMBER_TYPE.CURRENCY)}
                  />
                </div>
              )}

              {checkedFinalRound && (
                <div>
                  <h4 className={styles.title}>Phần thưởng</h4>
                  <input
                    className={styles.inputModal}
                    type="text"
                    name="artifact"
                    value={fieldUpdate.artifact}
                    onChange={e => handleInput(e)}
                  />
                </div>
              )}
            </div>
            <div className={styles.btn}>
              <button className={styles.btnCreate} type="submit">
                {isEdit ? 'Lưu' : 'Tạo'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddingModal;
