import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { isEmail, isPhoneNumber } from '../../utils/validation.js';
import styles from './style.module.css';
import { addNewExaminer } from '../../api/examinerStaffApi.js';
import Select from 'react-select';
import { toast } from 'react-toastify';

function AddExaminer({ modalShow, onHide }) {
  const [valueChane, setValueChange] = useState({
    fullName: '',
    email: '',
    role: '',
    phone: '',
    gender: true,
    birthday: '',
  });

  const [error, setError] = useState(null);
  const [renderGnder, setGender] = useState({ value: '', label: '' });

  // styling the topic label
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'transparent',
      border: '1px solid #8a8aa0',
      // match with the menu
      borderRadius: state.isFocused ? '0.625rem' : '0.625rem',
      color: '#070F2B',
      // Overwrittes the different states of border
      borderColor: 'none !important',
      // Removes weird border around container

      height: '5rem',
      width: '100%',
      fontSize: '1.5rem !important',
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: 'none',
      },
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  const changeData = e => {
    const { value, name } = e.target;
    setValueChange(prv => ({
      ...prv,
      [name]: value,
    }));
  };

  // const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  // const [imageLoaded, setImageLoaded] = useState(null);
  // const [imagePost, setImagePost] = useState(null);

  // const { progress, url } = useUploadImage(imagePost);

  // const changeFile = e => {
  //   if (
  //     !(
  //       e.target.files.length > 0 &&
  //       allowedTypes.includes(e.target.files[0].type)
  //     )
  //   ) {
  //     return;
  //   }
  //   setImagePost(e.target.files[0]);
  //   setImageLoaded(URL.createObjectURL(e.target.files[0]));
  // };

  //   // while click post check it  was validate or not
  // const postImage = val => {
  //   if (validateAllFields()) {
  //     let payload;
  //     let rejecPayload;
  //     if (progress) {
  //       if (val === 'Rejected') {
  //         rejecPayload = updateObject(fieldInput);
  //         rejecPayload = {
  //           ...rejecPayload,
  //           image: url,
  //           status: val,
  //           currentUserId: userInfo.Id,
  //           birthday: rejecPayload.birthday,
  //           reason: '',
  //         };

  //         setPayloadReason(rejecPayload);
  //         setOpenPopReason(true);
  //       } else {
  //         console.log(val);

  //         payload = updateObject(fieldInput);
  //         payload = {
  //           ...payload,
  //           image: url,
  //           status: val,
  //           currentUserId: userInfo.Id,
  //           birthday: payload.birthday,
  //         };

  //         postPainting(payload);
  //       }
  //     } else {
  //       toast.warning('Bạn vui lòng bổ sung thêm ảnh nhé !!', {
  //         position: 'top-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light',
  //       });
  //     }
  //   } else {
  //     toast.warning('Vui lòng kiểm tra lại thông tin !!', {
  //       position: 'top-right',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });
  //   }
  // };
  // fetch data
  const postData = async payload => {
    try {
      await addNewExaminer(payload);
      onHide();
    } catch (error) {
      toast.error('Thêm không thành công', {
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

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    let formErrors = {};
    if (!isEmail(valueChane.email)) {
      formErrors.email = 'Email không hợp lệ';
    }
    if (!isPhoneNumber(valueChane.phone)) {
      formErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (Object.keys(formErrors).length === 0) {
      setError(null);
      postData(valueChane);
    } else {
      setError(formErrors);
    }
  };

  const genderOptions = [
    {
      value: true,
      label: 'Nam',
    },
    {
      value: false,
      label: 'Nữ',
    },
  ];

  return (
    <>
      <Modal
        show={modalShow}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Thông tin Giám Khảo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '70vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            {/* <div className={styles.boxAvatar}>
              <div className={styles.upload_image}>
                {imageLoaded !== null ? (
                  <>
                    <label htmlFor="add_more_file" className={styles.image_box}>
                      <img
                        src={imageLoaded}
                        alt="image"
                        className={styles.image}
                      />
                    </label>
                    <input
                      type="file"
                      className={styles.input_hidden}
                      id="add_more_file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={e => changeFile(e)}
                      onClick={e => {
                        e.currentTarget.value = null;
                      }}
                    />
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="add_more_file"
                      className={styles.onClick_upload}>
                      <AddPhotoAlternateIcon
                        sx={{ color: '#5142fc', fontSize: '20rem' }}
                      />
                    </label>
                    <input
                      type="file"
                      className={styles.input_hidden}
                      id="add_more_file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={e => changeFile(e)}
                      onClick={e => {
                        e.currentTarget.value = null;
                      }}
                    />
                  </>
                )}
              </div>
            </div> */}
            <div className={styles.detailBox}>
              {/* <div className={styles.detailExam}>
                <h4 className={styles.title}>Mã Giám Khảo:</h4>
                <input
                  className={styles.inputModal}
                  required
                  type="text"
                  name="fullName"
                  value={valueChane.fullName}
                  onChange={e => changeData(e)}></input>
              </div> */}
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Tên Giám Khảo:</h4>
                <input
                  className={styles.inputModal}
                  required
                  type="text"
                  name="fullName"
                  value={valueChane?.fullName}
                  onChange={e => changeData(e)}></input>
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Giới tính:</h4>
                <Select
                  className={styles.inputModal_select}
                  isClearable={true}
                  placeholder={<div>Giới tính</div>}
                  styles={customStyles}
                  options={genderOptions}
                  value={renderGnder}
                  defaultValue={{ value: '', label: 'Giới tính' }}
                  onChange={val => {
                    setGender(prv => ({ ...prv, label: val?.label }));
                    setValueChange(prv => ({ ...prv, gender: val?.value }));
                  }}
                />
                {/* <input
                  className={styles.inputModal}
                  required
                  type="text"
                  name="gender"
                  value={valueChane.gender ? 'nam' : 'nữ'}
                  onChange={e => changeValue(e)}></input> */}
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Ngày sinh:</h4>
                <input
                  className={styles.inputModal}
                  required
                  type="date"
                  name="birthday"
                  value={valueChane?.birthday}
                  onChange={e => changeData(e)}></input>
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Email:</h4>
                <input
                  className={styles.inputModal}
                  required
                  type="text"
                  name="email"
                  value={valueChane?.email}
                  onChange={e => changeData(e)}></input>
                {error?.email && (
                  <p style={{ color: '#eb0014', fontSize: '0.9rem' }}>
                    {error?.email}
                  </p>
                )}
              </div>
              <div className={styles.detailExam}>
                <h4 className={styles.title}>Số điện thoại:</h4>
                <input
                  className={styles.inputModal}
                  required
                  type="text"
                  name="phone"
                  value={valueChane?.phone}
                  onChange={e => changeData(e)}></input>
                {error?.phone && (
                  <p style={{ color: '#eb0014', fontSize: '0.9rem' }}>
                    {error?.phone}
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'end' }}>
                <button className={styles.btnCreate} type="submit">
                  Tạo
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddExaminer;
