import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { paintingApi } from '../../api/paintingApi.js';
import { getAllRoundStaff, roundTopicById } from '../../api/roundStaffApi.js';
import { useUploadImage } from '../../hooks/firebaseImageUpload/useUploadImage.js';
import { isEmail, isPhoneNumber } from '../../utils/validation.js';
import styles from './page.module.css';
import ModalReason from '../../pages/paintingPage/modalReason.jsx';

function ModalAddPainting({ modalShow, onHide, fetchData, setPageNumber }) {
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

  const [loadingContest, setLoadingContest] = useState(true);
  const [contest, setContest] = useState([]);

  const [loadingRound, setLoadingRound] = useState(true);
  const [roundTopic, setRoundTopic] = useState([]);

  const [isFinalRound, setIsFinalRound] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [codeStudent, setCodeStudent] = useState([{ value: '', label: '' }]);
  const [listUser, setListUser] = useState([]);
  const [idCompetitor, setIdCompetitor] = useState('');

  // handle open popReason
  const [openPopReason, setOpenPopReason] = useState(false);
  const [payloadReason, setPayloadReason] = useState(null);
  // geting new object without the error field
  const updateObject = val => {
    let currentObject = {};
    for (let index in val) {
      currentObject[index] = val[index].value;
    }
    return currentObject;
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
      value: fieldInput.fullName.value,
      onchange: e => {
        setFieldInput(prv => ({
          ...prv,
          fullName: { ...prv.fullName, value: e.target.value },
        }));
      },
      label: 'fullName',
    },
    {
      title: 'Ngày sinh',
      type: 'date',
      value: fieldInput.birthday.value,
      onchange: e => {
        setFieldInput(prv => ({
          ...prv,
          birthday: { ...prv.birthday, value: e.target.value },
        }));
      },
      label: 'birthday',
    },
    {
      title: 'Email',
      type: 'text',
      value: fieldInput.email.value,
      onchange: e => {
        setFieldInput(prv => ({
          ...prv,
          email: { ...prv.email, value: e.target.value },
        }));
      },
      label: 'email',
    },
    {
      title: 'Số điện thoại',
      type: 'text',
      value: fieldInput.phone.value,
      onchange: e => {
        setFieldInput(prv => ({
          ...prv,
          phone: { ...prv.phone, value: e.target.value },
        }));
      },
      label: 'phone',
    },
    {
      title: 'Địa chỉ',
      type: 'text',
      value: fieldInput.address.value,
      onchange: e => {
        setFieldInput(prv => ({
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
    setImageLoaded(null);
    setIsFinalRound(false);
  };

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
    const nameError = validateName(fieldInput.fullName.value);
    const birthdayError = validateBirthDay(fieldInput.birthday.value);
    const emailError = validateEmail(fieldInput.email.value);
    const addressError = validateAddress(fieldInput.address.value);
    const phoneNumberError = validatePhoneNumber(fieldInput.phone.value);

    const namePaintingErr = validateNamePainting(fieldInput.name.value);
    const descriptionError = validateDescription(fieldInput.description.value);
    const roundTopicError = validateRoundTopic(fieldInput.roundTopicId.value);

    setFieldInput(prevState => ({
      ...prevState,
      fullName: { ...prevState.fullName, error: nameError },
      email: { ...prevState.email, error: emailError },
      birthday: { ...prevState.birthday, error: birthdayError },
      address: { ...prevState.address, error: addressError },
      phone: { ...prevState.phone, error: phoneNumberError },
      name: { ...prevState.name, error: namePaintingErr },
      description: { ...prevState.description, error: descriptionError },
      roundTopicId: { ...prevState.roundTopicId, error: roundTopicError },
    }));

    return (
      !nameError &&
      !birthdayError &&
      !emailError &&
      !addressError &&
      !namePaintingErr &&
      !descriptionError &&
      !roundTopicError &&
      !phoneNumberError
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

  // addnew painting
  const postPainting = async payload => {
    console.log(payload);
    try {
      await paintingApi.addNewPainting(
        'paintings/submitepainting1stroundforCompetitor',
        payload,
      );
      resetFieldInputValues();
      setPageNumber(1);
      fetchData();
      onHide();
      toast.success('Bài thi đã được thêm vào danh sách', {
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

  const postingFinalRound = async payload => {
    try {
      await paintingApi.addNewFinalRound(
        'paintings/createpaintingfinalround',
        payload,
      );
      resetFieldInputValues();
      setPageNumber(1);
      fetchData();
      onHide();
      toast.success('Thêm thành công!', {
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
      toast.warning('Thêm cuộc thi không thành công vui lòng thử lại!', {
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

  // post painting by final round
  const postFinal = () => {
    if (validateAllFields()) {
      if (progress) {
        let payload = {
          competitorId: idCompetitor,
          currentUserId: userInfo.Id,
          image: url,
          name: fieldInput.name.value,
          description: fieldInput.description.value,
          roundTopicId: fieldInput.roundTopicId.value,
        };
        postingFinalRound(payload);
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

  // get all contest
  const fetchAllContest = async () => {
    setLoadingContest(true);
    try {
      const res = await getAllRoundStaff();
      const data = res.data.result;
      setContest(
        data !== null
          ? data.map(vl => ({
            value: vl.id,
            label: vl.name + ' - ' + vl.educationalLevelName,
          }))
          : [],
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingContest(false);
    }
  };

  // filter user when select user code and set information to current state
  const filterUserByCode = id => {
    const competitorById = listUser.filter(vl => vl.id === id);
    setIdCompetitor(id);
    for (let index in competitorById[0]) {
      setFieldInput(prv => ({
        ...prv,
        [index]: {
          ...prv[index],
          value:
            index === 'birthday'
              ? competitorById[0][index]
              : competitorById[0][index],
        },
      }));
    }
  };

  // get competitor by finalround
  const getCompetitorByRound = async id => {
    setLoadingUser(true);
    try {
      const res = await axios.get(
        `https://netvexanh.azurewebsites.net/finalround/${id}`,
      );
      setCodeStudent(
        res.result.length
          ? res.result.map(vl => ({ value: vl.id, label: vl.code }))
          : [],
      );
      setListUser(res.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUser(false);
    }
  };

  //final round condition
  const finalCondition = (isFinal, id) => {
    if (isFinal) {
      setIsFinalRound(true);
      getCompetitorByRound(id);
    } else {
      setIsFinalRound(false);
      resetFieldInputValues();
      return;
    }
  };

  // after click on the round selected then will setit to final
  const fetchRoundTopic = async (id, label) => {
    console.log(label.split(' -')[0] === 'Vòng Chung Kết');

    finalCondition(label.split(' -')[0] === 'Vòng Chung Kết', id);
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
      let rejecPayload;
      if (progress) {
        if (val === 'Rejected') {
          rejecPayload = updateObject(fieldInput);
          rejecPayload = {
            ...rejecPayload,
            image: url,
            status: val,
            currentUserId: userInfo.Id,
            birthday: rejecPayload.birthday,
            reason: '',
          };

          setPayloadReason(rejecPayload);
          setOpenPopReason(true);
        } else {
          console.log(val);

          payload = updateObject(fieldInput);
          payload = {
            ...payload,
            image: url,
            status: val,
            currentUserId: userInfo.Id,
            birthday: payload.birthday,
          };

          postPainting(payload);
        }
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

  // calling data first time
  useEffect(() => {
    fetchAllContest();
  }, []);

  return (
    <>
      <ModalReason
        show={openPopReason}
        setShow={setOpenPopReason}
        title={'vòng thi'}
        callBack={postPainting}
        payload={payloadReason}
      />
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
            Tạo bài thi
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
                placeholder={<div>Vòng thi</div>}
                isLoading={loadingContest}
                styles={customStyles}
                options={contest}
                defaultValue={{ value: '', label: 'Vòng thi' }}
                onChange={val =>
                  fetchRoundTopic(val?.value ? val?.value : '', val?.label)
                }
              />
            </div>
            <div className={styles.competitor_box}>
              <div className={styles.competitor_title}>
                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Thông tin thí sinh
                </p>
              </div>
              <div className={styles.field_competitor}>
                {isFinalRound && (
                  <div className={styles.input_competitor}>
                    <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                      Mã thí sinh
                    </p>
                    <div className={styles.select_topic}>
                      <Select
                        isClearable={true}
                        placeholder={<div>Mã thí sinh</div>}
                        styles={customStyles}
                        options={codeStudent}
                        isLoading={loadingUser}
                        defaultValue={{ value: '', label: 'Mã thí sinh' }}
                        onChange={val => filterUserByCode(val?.value)}
                      />
                    </div>
                  </div>
                )}
                {competitorList.map((vl, idx) => (
                  <div key={idx} className={styles.conpetitor_error}>
                    <div className={styles.input_competitor}>
                      <p style={{ fontWeight: 'normal', fontSize: '14px' }}>
                        {vl.title}
                      </p>
                      <input
                        type={vl.type}
                        value={vl.value}
                        onChange={vl.onchange}
                        readOnly={isFinalRound}
                        min="1899-01-01"
                        max={new Date().toJSON().slice(0, 10)}
                      />
                    </div>
                    {(fieldInput[vl.label].error !== '' ||
                      fieldInput[vl.label].error !== null) && (
                        <div className={styles.error_text}>
                          <span></span>
                          <p className={styles.txt_error}>
                            {fieldInput[vl.label].error}
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
                        placeholder={<div>Chủ đề</div>}
                        styles={customStyles}
                        options={roundTopic}
                        isLoading={loadingRound}
                        defaultValue={{ value: '', label: 'Chủ đề' }}
                        onChange={val => {
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
              </div>
            </div>
            <div className={styles.btn_trigger}>
              {isFinalRound ? (
                <span className={styles.btn_find} onClick={() => postFinal()}>
                  <h5>Lưu</h5>
                </span>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAddPainting;
