import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { addSponsor, getSponsorId, putSponsor } from '../../api/sponsorApi.js';
import { isPhoneNumber } from '../../utils/validation.js';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function AddNewSponsor({ idSponsor, reCallData, modalShow, onHide }) {
  const { userInfo } = useSelector(state => state.auth);

  const [imgLoad, setImgLoad] = useState(null);
  const [imgPost, setImagePost] = useState(null);

  // calling customHook for return image from firebae
  const uploadImage = useUploadImage(imgPost);
  const { progress, url } = uploadImage;
  // ending that action of get image from firebase

  const [valueInput, setValueInput] = useState({
    name: {
      value: '',
      error: '',
    },
    delegate: {
      value: '',
      error: '',
    },
    phoneNumber: {
      value: '',
      error: '',
    },
    address: {
      value: '',
      error: '',
    },
    currentUserId: { value: userInfo.Id },
  });

  // list of field input for user typing
  const listField = [
    {
      name: 'Tên đơn vị tài trợ',
      value: valueInput.name.value,
      onchange: e =>
        setValueInput(prv => ({
          ...prv,
          name: { ...prv.name, value: e.target.value },
        })),
      placeHolder: 'Xin hãy nhập đơn vị tài trợ',
      error: valueInput.name.error,
    },
    {
      name: 'Người dại diện',
      value: valueInput.delegate.value,
      onchange: e =>
        setValueInput(prv => ({
          ...prv,
          delegate: { ...prv.delegate, value: e.target.value },
        })),
      placeHolder: 'Xin hãy nhập tên người đại diện',
      error: valueInput.delegate.error,
    },
    {
      name: 'Số điện thoại',
      value: valueInput.phoneNumber.value,
      onchange: e =>
        setValueInput(prv => ({
          ...prv,
          phoneNumber: { ...prv.phoneNumber, value: e.target.value },
        })),
      placeHolder: 'Xin hãy nhập số điện thoại liên hệ',
      error: valueInput.phoneNumber.error,
    },
    {
      name: 'Địa chỉ',
      value: valueInput.address.value,
      onchange: e =>
        setValueInput(prv => ({
          ...prv,
          address: { ...prv.address, value: e.target.value },
        })),
      placeHolder: 'Xin hãy nhập địa chỉ',
      error: valueInput.address.error,
    },
  ];

  const clearAllField = () => {
    setImgLoad(null);
    for (let index in valueInput) {
      valueInput[index].value = '';
    }
  };

  const validateName = val => {
    if (val.length < 3 || val.length > 200) {
      return 'độ dài phải từ 3 đến 200 chữ';
    }
    return '';
  };

  const validateDelegate = val => {
    if (val.length < 3 || val.length > 200) {
      return 'độ dài phải từ 3 đến 200 chữ';
    }
    return '';
  };

  const validatePhoneNumber = phoneNumber => {
    if (!isPhoneNumber(phoneNumber)) {
      return 'Số điện thoại không hợp lệ';
    }
    return '';
  };

  const validateAddress = address => {
    if (address.length < 5 || address.length > 200) {
      return 'độ dài phải từ 3 đến 200 chữ';
    }
    return '';
  };

  // validation the length of all field
  const validateAllFields = () => {
    const nameError = validateName(valueInput.name.value);
    const delegateError = validateDelegate(valueInput.delegate.value);
    const phoneNumberError = validatePhoneNumber(valueInput.phoneNumber.value);
    const addressError = validateAddress(valueInput.address.value);

    setValueInput(prevState => ({
      ...prevState,
      name: { ...prevState.name, error: nameError },
      delegate: { ...prevState.delegate, error: delegateError },
      phoneNumber: { ...prevState.phoneNumber, error: phoneNumberError },
      address: { ...prevState.address, error: addressError },
    }));

    return !nameError && !delegateError && !phoneNumberError && !addressError;
  };

  // rule when adding new image
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  // adding file to state and loading to the UI
  const changeFile = e => {
    if (
      !(
        e.target.files.length > 0 &&
        allowedTypes.includes(e.target.files[0].type)
      )
    ) {
      return;
    }
    setImagePost(e.target.files[0]);
    setImgLoad(URL.createObjectURL(e.target.files[0]));
  };

  // binding data when editing
  const bindingData = val => {
    setValueInput(prevState => ({
      ...prevState,
      name: { ...prevState.name, value: val.name || '' },
      delegate: { ...prevState.delegate, value: val.delegate || '' },
      phoneNumber: { ...prevState.phoneNumber, value: val.phoneNumber || '' },
      address: { ...prevState.address, value: val.address || '' },
    }));
    setImgLoad(val.logo);
  };

  // geting new object without the error field
  const updateObject = val => {
    let currentObject = {};
    for (let index in val) {
      currentObject[index] = val[index].value;
    }

    return currentObject;
  };

  // Get sponsor by ID
  const getSponsorByID = async () => {
    try {
      const res = await getSponsorId(idSponsor);
      const data = res.data.result;
      bindingData(data);
    } catch (error) {
      toast.warning('Không tìm thấy nhà tài trợ !!', {
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

  // post with calling api
  const postSponsor = async val => {
    try {
      await addSponsor(val);
      toast.success('Nhà tài trợ đã được tạo thành công !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      clearAllField();
      onHide();
      reCallData();
    } catch (error) {
      toast.warning('Có lỗi khi tạo, vui lòng thử lại !!', {
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

  // calling api for update sponsor
  const updateSponsor = async () => {
    let payload;
    payload = updateObject(valueInput);
    payload = { ...payload, logo: url || imgLoad, id: idSponsor };
    if (!validateAllFields()) {
      toast.warning('Bạn vui lòng bổ sung thêm ảnh nhé !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    try {
      await putSponsor(payload);
      toast.success('Cập nhật thành công !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      onHide();
      reCallData();
    } catch (error) {
      toast.warning('Không thể cập nhật xin thử lại sau !!', {
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

  // while click post check it  was validate or not
  const postImage = () => {
    if (validateAllFields()) {
      const listJson = updateObject(valueInput);
      let payload;
      if (progress) {
        payload = {
          ...listJson,
          logo: url,
          currentUserId: userInfo.Id,
        };
        postSponsor(payload);
      } else {
        toast.warning('Bạn vui lòng bổ sung thêm ảnh nhé !!', {
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
    } else {
      toast.warning('Vui lòng kiểm tra lại thông tin !!', {
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

  useEffect(() => {
    if (idSponsor !== null) {
      console.log('call lan dau');
      getSponsorByID();
    }
  }, [idSponsor]);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => {
          clearAllField();
          onHide();
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '20px' }}>
            {idSponsor ? 'Cập nhật nhà tài trợ' : 'Thêm nhà tài trợ'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: '80vh',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}>
          <div className={styles.section}>
            {listField.map((val, idx) => (
              <div key={idx} className={styles.input_box}>
                <div className={styles.container_error}>
                  <p className={styles.field_title}>{val.name}</p>
                  <div className={styles.textArea}>
                    <input
                      className={styles.input_place}
                      type="text"
                      placeholder={val.placeHolder}
                      value={val.value}
                      onChange={val.onchange}
                    />
                  </div>
                </div>
                {(val.error !== '' || val.error !== null) && (
                  <div className={styles.error_text}>
                    <span></span>
                    <p className={styles.txt_error}>{val.error}</p>
                  </div>
                )}
              </div>
            ))}
            <div className={`${styles.input_box} ${styles.image_box}`}>
              <p className={`${styles.field_title} ${styles.image_title}`}>
                Logo
              </p>
              {imgLoad !== null ? (
                <div className={styles.container_image}>
                  <label htmlFor="add_more_file" className={styles.upload_logo}>
                    <img src={imgLoad} alt="image" className={styles.image} />
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
                </div>
              ) : (
                <div className={styles.container_image}>
                  <label
                    htmlFor="add_more_file"
                    className={styles.onClick_upload}>
                    <CloudUploadIcon
                      sx={{ color: '#5142fc', fontSize: '10rem' }}
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
                </div>
              )}
            </div>
          </div>
          <div className={styles.btn_action}>
            <span
              className={styles.btn_find}
              onClick={() => {
                onHide();
              }}>
              <h5>Huỷ</h5>
            </span>
            <span
              className={styles.btn_find}
              onClick={() => {
                idSponsor ? updateSponsor() : postImage();
              }}>
              <h5>{idSponsor ? 'Lưu' : 'Thêm mới'}</h5>
            </span>
          </div>
        </Modal.Body>
      </Modal>
      {/* <div className={styles.container}>
        <h2 className={`tf-title pb-20 ${styles.title}`}>Thêm nhà tài trợ</h2>
        <div className={styles.section}>
          {listField.map((val, idx) => (
            <div key={idx} className={styles.input_box}>
              <div className={styles.container_error}>
                <p className={styles.field_title}>{val.name}</p>
                <div className={styles.textArea}>
                  <input
                    className={styles.input_place}
                    type="text"
                    placeholder={val.placeHolder}
                    value={val.value}
                    onChange={val.onchange}
                  />
                </div>
              </div>
              {(val.error !== '' || val.error !== null) && (
                <div className={styles.error_text}>
                  <span></span>
                  <p className={styles.txt_error}>{val.error}</p>
                </div>
              )}
            </div>
          ))}
          <div className={`${styles.input_box} ${styles.image_box}`}>
            <p className={`${styles.field_title} ${styles.image_title}`}>
              Logo
            </p>
            {imgLoad !== null ? (
              <div className={styles.container_image}>
                <label htmlFor="add_more_file" className={styles.upload_logo}>
                  <img src={imgLoad} alt="image" className={styles.image} />
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
              </div>
            ) : (
              <div className={styles.container_image}>
                <label
                  htmlFor="add_more_file"
                  className={styles.onClick_upload}>
                  <CloudUploadIcon
                    sx={{ color: '#5142fc', fontSize: '10rem' }}
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
              </div>
            )}
          </div>
        </div>
        <div className={styles.btn_action}>
          <span
            className={styles.btn_find}
            onClick={() => {
              setAddPopup(null);
              setIdSponsor(null);
            }}>
            <h5>Huỷ</h5>
          </span>
          <span
            className={styles.btn_find}
            onClick={() => {
              idSponsor ? updateSponsor() : postImage();
            }}>
            <h5>{idSponsor ? 'Lưu' : 'Thêm mới'}</h5>
          </span>
        </div>
      </div> */}
    </>
  );
}

export default AddNewSponsor;
