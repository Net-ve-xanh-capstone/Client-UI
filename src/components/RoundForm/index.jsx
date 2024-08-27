import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './style.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../CreateModal';
import { formatDate } from '../../utils/formatDate';
import EditModal from '../EditModal';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createRoundLevel, editRoundLevel } from '../../api/roundStaffApi';

function RoundForm({ modalShow, onHide, roundData, contestData }) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  //for checkbox level
  const [selectedLevel, setSelectedLevel] = useState([]);

  const handleCheckall = event => {
    if (event.target.checked) {
      const levelIds = contestData.educationalLevel.map(data => data.id);
      setSelectedLevel(levelIds);
    } else {
      setSelectedLevel([]);
    }
  };

  const handleChangeCheckbox = id => {
    const index = selectedLevel.indexOf(id);
    if (index === -1) {
      setSelectedLevel([...selectedLevel, id]);
    } else {
      setSelectedLevel(selectedLevel.filter(levelId => levelId !== id));
    }
  };

  const children = (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginLeft: '25px' }}>
      {contestData.educationalLevel?.map(data => (
        <FormControlLabel
          key={data.id}
          label={<span style={{ fontSize: '16px' }}>{data.level}</span>}
          checked={selectedLevel.includes(data.id)}
          control={<Checkbox onChange={() => handleChangeCheckbox(data.id)} />}
        />
      ))}
      <FormControlLabel
        label={<span style={{ fontSize: '16px' }}>Chọn tất cả</span>}
        checked={
          selectedLevel.length > 0 &&
          selectedLevel.length === contestData.educationalLevel.length
        }
        control={<Checkbox onChange={handleCheckall} />}
      />
    </div>
  );

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    setFormData(intialState);
  }, [modalShow]);

  const intialState = {
    name: roundData?.name || '',
    startTime: roundData?.startTime.split('T')[0] || '',
    endTime: roundData?.endTime.split('T')[0] || '',
    location: roundData?.location || '',
    description: roundData?.description || '',
    listLevel: [],
    currentUserId: userInfo?.Id,
  };

  const [formData, setFormData] = useState(intialState);

  const handleInputChange = event => {
    try {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // check datetime of user choosing level
  const isValidDate = (startTime, endTime, listLevel) => {
    console.log(listLevel);

    //check for edit and create
    if (roundData?.id) {
      const selectLevel = contestData.educationalLevel.find(item =>
        item.round.find(ele => ele.id === roundData.id),
      );
      console.log('log ra ham selectlevel', selectLevel);

      if (selectLevel.round && selectLevel.round.length > 0) {
        for (let round of selectLevel.round) {
          const roundStart = new Date(round.startTime);
          const roundEnd = new Date(round.endTime);
          roundEnd.setDate(roundEnd.getDate() + 1);
          if (
            !(startTime > roundEnd || endTime < roundStart) &&
            round.id !== roundData.id
          ) {
            return false;
          }
        }
      }
    } else {
      // get the value level of user choosing
      // map the starttime and endtime of that level
      // using date time in current round compare to input time of user
      const eduLevel = contestData.educationalLevel;
      for (let index in eduLevel) {
        for (let userIndex in listLevel) {
          if (eduLevel[index].id === listLevel[userIndex]) {
            if (eduLevel[index].round && eduLevel[index].round.length > 0) {
              for (let round of eduLevel[index].round) {
                console.log(round);

                const roundStart = new Date(round.startTime);
                // const roundEnd = new Date(round.endTime);
                // roundEnd.setDate(roundEnd.getDate() + 1);
                if (
                  !(
                    startTime.setHours(0, 0, 0, 0) !==
                    roundStart.setHours(0, 0, 0, 0)
                  )
                ) {
                  return false;
                }
              }
            }
          }
        }
      }

      // for (let level of contestData.educationalLevel) {
      //   if (level.round && level.round.length > 0) {
      //     for (let round of level.round) {
      //       console.log(round);

      //       const roundStart = new Date(round.startTime);
      //       const roundEnd = new Date(round.endTime);

      //       roundEnd.setDate(roundEnd.getDate() + 1);

      //       if (!(startTime > roundEnd || endTime < roundStart)) {
      //         return false;
      //       }
      //     }
      //   }
      // }
    }

    return true;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    let formErrors = {};
    let currentRound = selectedLevel;
    const startDate = new Date(formData.startTime);
    const endDate = new Date(formData.endTime);

    if (selectedLevel.length === 0 && !roundData?.id) {
      toast.error('Vui lòng chọn đối tượng', {
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

    if (startDate >= endDate) {
      formErrors.startTime = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    if (!isValidDate(startDate, endDate, currentRound)) {
      console.log('loi kiem tra ngay');

      formErrors.startTime = 'Trùng ngày với vòng thi khác của bảng';
    }

    if (Object.keys(formErrors).length === 0) {
      setValidated(true);
      setModal(true);
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  const postRound = async () => {
    try {
      formData.listLevel = selectedLevel;
      const { data } = await createRoundLevel(formData);
      if (data?.result) {
        toast.success('Tạo vòng thi thành công', {
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
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const editRound = async () => {
    try {
      formData.id = roundData.id;
      const { data } = await editRoundLevel(formData);
      if (data?.result) {
        toast.success('Chỉnh sửa vòng thi thành công', {
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
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  return (
    <>
      {!roundData ? (
        <CreateModal
          show={modal}
          setShow={setModal}
          title={'vòng thi'}
          callBack={postRound}
        />
      ) : (
        <EditModal
          show={modal}
          setShow={setModal}
          title={'vòng thi'}
          callBack={editRound}
        />
      )}
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
            Thêm vòng thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '80vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            {!roundData?.id && (
              <div>
                <h4 className={styles.title}>Chọn đối tượng</h4>

                {children}
              </div>
            )}
            <h4 className={styles.title}>Tên vòng thi</h4>
            <input
              className={styles.inputModal}
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="row">
              <div className="col-md-6">
                <h5 className={styles.title}>Thời gian bắt đầu</h5>
                <input
                  required
                  type="date"
                  name="startTime"
                  id="startTime"
                  className={styles.formControl}
                  value={formData.startTime}
                  onChange={handleInputChange}
                  min={contestData.startTime.split('T')[0]}
                  max={contestData.endTime.split('T')[0]}
                />
              </div>
              <div className="col-md-6">
                <h4 className={styles.title}>Thời gian kết thúc</h4>
                <input
                  required
                  type="date"
                  name="endTime"
                  id="endTime"
                  className={styles.formControl}
                  value={formData.endTime}
                  onChange={handleInputChange}
                  min={contestData.startTime.split('T')[0]}
                  max={contestData.endTime.split('T')[0]}
                />
              </div>
            </div>
            {errors.startTime && (
              <p className={styles.error}>{errors.startTime}</p>
            )}
            <h4 className={styles.title}>Địa điểm thi</h4>
            <input
              className={styles.inputModal}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <h4 className={styles.title}>Mô tả</h4>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}></textarea>

            <div style={{ textAlign: 'end' }}>
              <button className={styles.btnCreate} type="submit">
                {!roundData ? 'Thêm' : 'Chỉnh sửa'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RoundForm;
