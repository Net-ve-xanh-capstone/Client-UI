import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { paintingApi } from '../../api/paintingApi.js';
import { roundTopicById } from '../../api/roundStaffApi.js';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import { isEmail, isPhoneNumber } from '../../utils/validation.js';
import styles from './page.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

function ModalEditPainting({
  modalShow,
  onHide,
  fetchData,
  dataPainting,
  setPageNumber,
  currentSeach,
  currentPage,
  isDisabel,
}) {
  const { userInfo } = useSelector(state => state.auth);

  const fieldText = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(null);
  const [imagePost, setImagePost] = useState(null);

  const { progress, url } = useUploadImage(imagePost);

  const [fieldInput, setFieldInput] = useState({
    fullName: { value: '', error: '' },
    email: { value: '', error: '' },
    address: { value: '', error: '' },
    birthday: { value: '', error: '' },
    phone: { value: '', error: '' },

    name: { value: '', error: '' },
    description: { value: '', error: '' },
    roundTopicId: { value: '', error: '' },
    currentUserId: { value: userInfo.Id },
  });

  const [updateField, setUpdateField] = useState({
    id: null,
    image: null,
    name: null,
    description: null,
    status: null,
    roundTopicId: null,
    currentUserId: userInfo.Id,
  });

  const [staffUpdate, setStaffUpdate] = useState({
    fullName: { value: '', error: '' },
    email: { value: '', error: '' },
    address: { value: '', error: '' },
    phone: { value: '', error: '' },
    birthday: { value: '', error: '' },
  });

  const [contestId, setContestId] = useState(null);

  const [loadingRound, setLoadingRound] = useState(true);
  const [roundTopic, setRoundTopic] = useState([]);
  const [roundId, setRoundId] = useState(null);
  const [status, setStatus] = useState(null);

  const [dateSubmit, setDateSubmit] = useState(null);

  // geting new object without the error field
  const updateObject = val => {
    let currentObject = {};
    for (let index in val) {
      currentObject[index] = val[index].value;
    }
    return currentObject;
  };

  // change the value of birthday
  const parseDate = dateString => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

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

  const competitorList = [
    {
      title: 'Tên thí sinh',
      type: 'text',
      value: staffUpdate.fullName.value,
      onchange: e => {
        setStaffUpdate(prv => ({
          ...prv,
          fullName: { ...prv.fullName, value: e.target.value },
        }));
      },
      label: 'fullName',
    },
    {
      title: 'Ngày sinh',
      type: 'date',
      value: staffUpdate.birthday.value,
      onchange: e => {
        setStaffUpdate(prv => ({
          ...prv,
          birthday: { ...prv.birthday, value: e },
        }));
      },
      label: 'birthday',
    },
    {
      title: 'Email',
      type: 'text',
      value: staffUpdate.email.value,
      onchange: e => {
        setStaffUpdate(prv => ({
          ...prv,
          email: { ...prv.email, value: e.target.value },
        }));
      },
      label: 'email',
    },
    {
      title: 'Số điện thoại',
      type: 'text',
      value: staffUpdate.phone.value,
      onchange: e => {
        setStaffUpdate(prv => ({
          ...prv,
          phone: { ...prv.phone, value: e.target.value },
        }));
      },
      label: 'phone',
    },
    {
      title: 'Địa chỉ',
      type: 'text',
      value: staffUpdate.address.value,
      onchange: e => {
        setStaffUpdate(prv => ({
          ...prv,
          address: { ...prv.address, value: e.target.value },
        }));
      },
      label: 'address',
    },
  ];

  // clear field
  const resetFieldInputValues = () => {
    setFieldInput(prevState => {
      // Loop through each key in the prevState and set the value to an empty string
      const updatedState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = { ...prevState[key], value: '' };
        return acc;
      }, {});
      return updatedState;
    });
    setStaffUpdate(prevState => {
      // Loop through each key in the prevState and set the value to an empty string
      const updatedState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = { ...prevState[key], value: '' };
        return acc;
      }, {});
      return updatedState;
    });
    setImageLoaded(null);
  };

  // adding new from another file

  const validateName = val => {
    if (val.length < 3 || val.length > 200) {
      return 'độ dài phải từ 3 đến 200 chữ';
    }
    return '';
  };

  const validateEmail = val => {
    if (!isEmail(val)) {
      return 'Email không đúng định dạng';
    }
    return '';
  };

  const validateBirthDay = val => {
    if (val === '' || val === undefined || val === null) {
      return 'Không được bỏ trống ngày sinh';
    }
    return '';
  };

  // missing phone number in the API
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

  // ending adding new from another file

  const validateNamePainting = val => {
    if (val.length < 3 || val.length > 200) {
      return 'độ dài phải từ 3 đến 200 chữ';
    }
    return '';
  };

  const validateDescription = val => {
    if (val.length < 3 || val.length > 300) {
      return 'độ dài phải từ 3 đến 200 chữ';
    }
    return '';
  };

  const validateRoundTopic = val => {
    if (val === null || val === undefined || val === '') {
      return 'Phải chọn chủ đề';
    }
    return '';
  };

  // validation the length of all field
  const validateAllFields = () => {
    const competitorName = validateName(staffUpdate.fullName.value);
    const competitorEmail = validateEmail(staffUpdate.email.value);
    const competitorAddress = validateAddress(staffUpdate.address.value);
    const competitorPhone = validatePhoneNumber(staffUpdate.phone.value);
    const competitorBirthday = validateBirthDay(staffUpdate.birthday.value);

    const namePaintingErr = validateNamePainting(fieldInput.name.value);
    const descriptionError = validateDescription(fieldInput.description.value);
    const roundTopicError = validateRoundTopic(fieldInput.roundTopicId.value);

    setFieldInput(prevState => ({
      ...prevState,
      name: { ...prevState.name, error: namePaintingErr },
      description: { ...prevState.description, error: descriptionError },
      roundTopicId: { ...prevState.roundTopicId, error: roundTopicError },
    }));

    setStaffUpdate(prev => ({
      ...prev,
      fullName: {
        ...prev.fullName,
        error: competitorName,
      },
      email: {
        ...prev.email,
        error: competitorEmail,
      },
      address: {
        ...prev.address,
        error: competitorAddress,
      },
      phone: {
        ...prev.phone,
        error: competitorPhone,
      },
      birthday: {
        ...prev.birthday,
        error: competitorBirthday,
      },
    }));

    return (
      !namePaintingErr &&
      !descriptionError &&
      !roundTopicError &&
      !competitorName &&
      !competitorEmail &&
      !competitorAddress &&
      !competitorPhone &&
      !competitorBirthday
    );
  };

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

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
    setImageLoaded(URL.createObjectURL(e.target.files[0]));
  };

  //auto resize fix with the content
  const resizeTextArea = value => {
    if (!fieldText.current) {
      return;
    }
    if (value === '') {
      fieldText.current.style.height = 'auto';
      return;
    }
    fieldText.current.style.height = `${fieldText.current.scrollHeight}px`;
  };

  // resize the box whilt input text
  useEffect(() => {
    window.addEventListener('resize', resizeTextArea);
    return () => {
      window.removeEventListener('resize', () =>
        resizeTextArea(fieldInput.description.value),
      );
    };
  }, [fieldInput.description.value]);

  //start edit space

  // get painting by id

  //ending edit space

  // addnew painting
  const updatePainting = async payload => {
    try {
      await paintingApi.updatePainting('paintings/satffupdate', payload);
      toast.success('Đã cập nhật thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setPageNumber(currentPage);
      fetchData(currentSeach);
      onHide();
    } catch (error) {
      toast.warning(error, {
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

  const fetchRoundTopic = async id => {
    setLoadingRound(true);
    try {
      const res = await roundTopicById(id);
      const data = res.data.result;
      setRoundTopic(
        data.length ? data.map(vl => ({ value: vl.id, label: vl.name })) : [],
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRound(false);
    }
  };

  // while click post check it  was validate or not
  const postImage = val => {
    if (validateAllFields()) {
      let payload;
      if (progress) {
        payload = { ...updateField, ...updateObject(staffUpdate) };
        payload = {
          ...payload,
          id: dataPainting.id,
          image: url,
          status: val,
          name: payload.name !== null ? payload.name : dataPainting.name,
          description:
            payload.description !== null
              ? payload.description
              : dataPainting.description,
          roundTopicId:
            updateField.roundTopicId !== null
              ? payload.roundTopicId
              : dataPainting.roundTopicId,

          fullName: payload.fullName,
          email: payload.email,
          address: payload.address,
          phone: payload.phone,
          birthday: payload.birthday,
          currentUserId: userInfo.Id,
        };
        updatePainting(payload);
      } else {
        payload = { ...updateField, ...updateObject(staffUpdate) };
        payload = {
          ...payload,
          id: dataPainting.id,
          image: imageLoaded,
          name: payload.name !== null ? payload.name : dataPainting.name,
          description:
            payload.description !== null
              ? payload.description
              : dataPainting.description,
          status: val,
          roundTopicId:
            updateField.roundTopicId !== null
              ? payload.roundTopicId
              : dataPainting.roundTopicId,

          fullName: payload.fullName,
          email: payload.email,
          address: payload.address,
          phone: payload.phone,
          birthday: payload.birthday,
          currentUserId: userInfo.Id,
        };
        updatePainting(payload);
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

  //update current input with current object
  const currenInput = state => {
    setImageLoaded(state.image);
    setFieldInput(prv => ({
      ...prv,

      name: { ...prv.name, value: state.name },
      description: { ...prv.description, value: state.description },
      roundTopicId: { ...prv.roundTopicId, value: state.roundTopicId },
    }));

    setStaffUpdate(prv => ({
      ...prv,
      fullName: { ...prv.fullName, value: state.ownerName },
      email: { ...prv.email, value: state.email },
      address: { ...prv.address, value: state.address },
      birthday: {
        ...prv.birthday,
        value: parseDate(state.birthday),
      },
      phone: { ...prv.phone, value: state.phone },
    }));

    setRoundId({
      value: state.roundTopicId,
      label: state.topicName,
    });
    setContestId({
      value: state.roundId,
      label: state.roundName + ' - ' + state.level,
    });
    setDateSubmit(state.submitTime.split('T')[0]);
    setStatus(state.status);
  };

  useEffect(() => {
    if (dataPainting !== null) {
      console.log(dataPainting);

      currenInput(dataPainting);
      fetchRoundTopic(dataPainting.roundId);
    }
  }, [dataPainting]);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => {
          onHide();
          resetFieldInputValues();
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{ margin: '0 auto' }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Cập nhật bài dự thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: '80vh',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}>
          <div className={styles.modalForm}>
            <div className={styles.round_select}>
              <Select
                isClearable={true}
                value={contestId}
                placeholder={<div>Vòng thi</div>}
                styles={customStyles}
                isDisabled={true}
              />
            </div>
            <div className={styles.competitor_box}>
              <div className={styles.competitor_title}>
                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Thông tin thí sinh
                </p>
              </div>
              <div className={styles.field_competitor}>
                {competitorList.map((vl, idx) => (
                  <div key={idx} className={styles.conpetitor_error}>
                    <div className={styles.input_competitor}>
                      <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                        {vl.title}
                      </p>
                      {vl.type === 'date' ? (
                        <div className={styles.newinput}>
                          <DatePicker
                            selected={vl.value}
                            onChange={vl.onchange} //only when value has changed
                            readOnly={dataPainting?.ownerRole === 'Competitor'}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                      ) : (
                        <input
                          type={vl.type}
                          value={vl.value}
                          onChange={vl.onchange}
                          readOnly={dataPainting?.ownerRole === 'Competitor'}
                        />
                      )}
                    </div>
                    {(staffUpdate[vl.label].error !== '' ||
                      staffUpdate[vl.label].error !== null) && (
                      <div className={styles.error_text}>
                        <span></span>
                        <p className={styles.txt_error}>
                          {staffUpdate[vl.label].error}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.painting}>
              <div className={styles.painting_title}>
                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Thông tin bài dự thi
                </p>
              </div>
              <div className={styles.painting_section}>
                {/* adding image zone */}
                <div className={styles.upload_image}>
                  {imageLoaded !== null ? (
                    <>
                      <label
                        htmlFor="add_more_file"
                        className={styles.image_box}>
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
                {/* end adding image zone */}
                <div className={styles.topic_error}>
                  <div className={styles.field_painting}>
                    <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                      Chọn chủ đề
                    </p>
                    <div className={styles.select_topic}>
                      <Select
                        isClearable={true}
                        value={roundId}
                        placeholder={<div>Chủ đề</div>}
                        styles={customStyles}
                        options={roundTopic}
                        isLoading={loadingRound}
                        defaultValue={{
                          value: '',
                          lable: 'Chủ đề',
                        }}
                        onChange={val => {
                          setUpdateField(prv => ({
                            ...prv,
                            roundTopicId: val?.value,
                          }));
                          setRoundId({ value: val?.value, label: val?.label });
                          setFieldInput(prv => ({
                            ...prv,
                            roundTopicId: {
                              ...prv.roundTopicId,
                              value: val?.value,
                            },
                          }));
                        }}
                      />
                    </div>
                  </div>
                  {(fieldInput.roundTopicId.error !== '' ||
                    fieldInput.roundTopicId.error !== null) && (
                    <div className={styles.error_text}>
                      <p className={styles.txt_error}>
                        {fieldInput.roundTopicId.error}
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.topic_error}>
                  <div className={styles.field_painting}>
                    <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                      Tên bài dự thi
                    </p>
                    <input
                      type="text"
                      value={fieldInput.name.value}
                      onChange={e => {
                        setUpdateField(prv => ({
                          ...prv,
                          name: e.target.value,
                        }));
                        setFieldInput(prv => ({
                          ...prv,
                          name: {
                            ...prv.name,
                            value: e.target.value,
                          },
                        }));
                      }}
                    />
                  </div>
                  {(fieldInput.name.error !== '' ||
                    fieldInput.name.error !== null) && (
                    <div className={styles.error_text}>
                      <span></span>
                      <p className={styles.txt_error}>
                        {fieldInput.name.error}
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.topic_error}>
                  <div className={styles.field_painting}>
                    <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                      Thông điệp
                    </p>
                    <div className={styles.title_box}>
                      <textarea
                        ref={fieldText}
                        className={styles.title_input}
                        value={fieldInput.description.value}
                        onChange={e => {
                          setUpdateField(prv => ({
                            ...prv,
                            description: e.target.value,
                          }));
                          resizeTextArea(e.target.value);
                          setFieldInput(prv => ({
                            ...prv,
                            description: {
                              ...prv.description,
                              value: e.target.value,
                            },
                          }));
                        }}></textarea>
                    </div>
                  </div>
                  {(fieldInput.description.error !== '' ||
                    fieldInput.description.error !== null) && (
                    <div className={styles.error_text}>
                      <span></span>
                      <p className={styles.txt_error}>
                        {fieldInput.description.error}
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.field_painting}>
                  <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                    Trạng thái
                  </p>
                  <input type="text" value={status} readOnly />
                </div>
                <div className={styles.field_painting}>
                  <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                    Ngày nộp bài
                  </p>
                  <input type="date" value={dateSubmit} readOnly />
                </div>
              </div>
            </div>
            {(dataPainting?.status === 'Đã nộp' || !isDisabel) && (
              <div className={styles.btn_trigger}>
                <span
                  className={styles.btn_find}
                  onClick={() => postImage('Submitted')}>
                  <h5>Lưu</h5>
                </span>
                <span
                  className={styles.btn_find}
                  onClick={() => postImage('Rejected')}>
                  <h5>Không hợp lệ</h5>
                </span>
                <span
                  className={styles.btn_find}
                  onClick={() => postImage('Accepted')}>
                  <h5>Hợp lệ</h5>
                </span>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditPainting;
