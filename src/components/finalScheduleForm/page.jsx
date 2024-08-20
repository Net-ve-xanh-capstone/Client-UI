import LoadingButton from '@mui/lab/LoadingButton';
import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAwardId } from '../../api/awrdApi.js';
import { getAll } from '../../api/examinerStaffApi';
import {
  createFinal,
  createPreliminary,
  editShedule,
} from '../../api/scheduleStaffApi';
import styles from './page.module.css';
import { CircularProgress } from '@mui/material';

function FinalScheduleForm({
  modalShow,
  onHide,
  roundData,
  scheduleData,
  type,
  roundId,
}) {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [examiner, setExaminer] = useState([]);
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [awardLoading, setAwardLoading] = useState(false);
  const [award, setAward] = useState([]);

  //get all award of this round to GET the ID and  NAME
  const fetchAwardId = async id => {
    console.log('chay api du thua');

    setAwardLoading(true);
    try {
      const { data } = await getAwardId(id);
      const result = data.result.map(val => {
        return { awardId: val.id, name: val.rank, quantity: '' };
      });
      setAward(result);
    } catch (error) {
      console.log(error);
    } finally {
      setAwardLoading(false);
    }
  };

  // get all examiner in system
  const getExaminer = async () => {
    try {
      const { data } = await getAll();
      setExaminer(data.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  // put schedule to server
  const putSchedule = async payload => {
    setIsLoading(true);
    try {
      await editShedule(payload);
      toast.success('Chỉnh sửa lịch chấm thành công', {
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
    } catch (e) {
      toast.error('Có lỗi xảy ra vui lòng thử lại', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.log('Err', e);
    } finally {
      setIsLoading(false);
    }
  };

  // post information while complete
  const postSchedule = async payload => {
    setIsLoading(true);
    try {
      await createFinal(payload); // calling api here
      toast.success('Thêm lịch chấm thi thành công', {
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
    } catch (error) {
      toast.error('Thêm lịch chấm thi không thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const intialState = {
    description: type?.description || '',
    roundId: roundData?.id,
    endDate: type?.endDate?.split('T')[0] || '',
    listExaminer: [],
    currentUserId: userInfo?.Id,
    judgedCount: '',
  };

  const [formData, setFormData] = useState(intialState);

  const handleInputChange = event => {
    try {
      const { name, value } = event.target;
      if (name === 'award') {
        setAward(prv => [
          ...prv,
          { ...prv.awardId, ...prv.name, awardCount: value },
        ]);
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // adding new examiner after user selected
  const handleSelect = seletedList => {
    const selectIds = seletedList.map(item => item.id);
    setFormData({
      ...formData,
      listExaminer: selectIds,
    });
  };

  // adding new award value to the state
  const awardOnchange = (e, id) => {
    const { value } = e.target;
    for (let index in award) {
      if (award[index].awardId === id) {
        setAward(prv =>
          prv.map(val => {
            if (val.awardId === id) {
              return { ...val, quantity: value };
            }
            return val;
          }),
        );
      }
    }
  };

  //filter all examiner is still not asign to mark the painting
  const filteredExaminers = examiner?.filter(
    valExaminer =>
      !scheduleData?.some(
        scheduleVal => scheduleVal.examinerId === valExaminer.id,
      ),
  );

  // adding value while edit
  const editValue = val => {
    const result = val?.awards?.map(val => {
      return { awardId: val.id, name: val.rank, quantity: val.quantity };
    });
    console.log(result);

    setAward(result);
    setAwardLoading(false);
    setFormData(prv => ({
      ...prv,
      roundId: roundData?.id,
      endDate: val?.endDate?.split('T')[0],
      description: val?.description,
      judgedCount: val.judgeCount,
    }));
  };

  //   change value in award
  const convertAward = val => {
    return val.map(val => {
      return {
        awardId: val.awardId,
        awardCount: val.quantity,
      };
    });
  };

  // validation and then submit the form to server
  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    // adding validation here
    if (formData.listExaminer.length === 0 && type === 'create') {
      toast.error('Chưa chọn giám khảo nào', {
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
    let formErrors = {};

    if (Object.keys(formErrors).length === 0) {
      const awardList = convertAward(award);
      // pass this payload to post api for saving new schedule
      const payload = {
        description: formData.description,
        roundId: formData.roundId,
        endDate: formData.endDate,
        ListExaminer: formData.listExaminer,
        judgedCount: formData.judgedCount,
        currentUserId: formData.currentUserId,
        awards: awardList,
      };

      const payloadEdit = {
        id: roundId,
        description: formData.description,
        endDate: formData.endDate,
        currentUserId: formData.currentUserId,
      };
      type === 'create' ? postSchedule(payload) : putSchedule(payloadEdit);
      setValidated(true);
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  useEffect(() => {
    getExaminer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    if (modalShow) {
      setFormData(intialState);
      if (roundId !== null && type === 'create') {
        fetchAwardId(roundId);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShow]);

  useEffect(() => {
    if (modalShow) {
      if (type !== 'create' && type !== undefined) {
        editValue(type);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShow]);

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
            {type === 'create'
              ? 'Thêm lịch chấm chung kết'
              : 'Chỉnh sửa lịch chấm'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '60vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <h4 className={styles.title}>Giám khảo</h4>
            <Multiselect
              displayValue="fullName"
              disablePreSelectedValues
              onKeyPressFn={function noRefCheck() {}}
              onRemove={e => handleSelect(e)}
              onSelect={e => handleSelect(e)}
              options={filteredExaminers}
              disable={type !== 'create'}
              selectedValues={
                type === 'create'
                  ? []
                  : [{ id: type?.id, fullName: type?.examinerName }]
              }
              placeholder="Chọn giám khảo"
              emptyRecordMsg="Không tìm thấy giám khảo nào"
              avoidHighlightFirstOption="true"
              style={{
                chips: {
                  background: 'var(--linear)',
                },
              }}
              showArrow
            />
            <h4 className={styles.title}>Ngày chấm</h4>
            {/* <input
              required
              type="date"
              name="endDate"
              id="endDate"
              className={styles.formControl}
              value={formData.endDate}
              onChange={handleInputChange}
              min={currentDate}
            /> */}
            <div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={formData.endDate}
                className={styles.formControl}
                onChange={date =>
                  setFormData(prv => ({ ...prv, endDate: date }))
                }
                minDate={currentDate}
              />
            </div>
            <h4 className={styles.title}>Mô tả</h4>
            <input
              required
              className={styles.inputModal}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <h4 className={styles.title}>Số lượng bài chấm</h4>
            <input
              required
              className={styles.inputModal}
              type="number"
              name="judgedCount"
              value={formData.judgedCount}
              onChange={handleInputChange}
            />
            <div className={styles.list_round}>
              {awardLoading ? (
                <div
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CircularProgress
                    color="secondary"
                    sx={{ fontSize: '3rem' }}
                  />
                </div>
              ) : (
                award.map(val => (
                  <div key={val.awardId} className={styles.round}>
                    <h4 className={styles.title}>{val.name}</h4>
                    <input
                      required
                      className={styles.grid_input}
                      type="number"
                      value={val.quantity}
                      onChange={e => awardOnchange(e, val.awardId)}
                    />
                  </div>
                ))
              )}
            </div>

            <div style={{ textAlign: 'end' }}>
              <LoadingButton
                type="submit"
                className={styles.btnCreate}
                size="large"
                loading={isLoading}
                loadingPosition="center"
                variant="contained">
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Lưu
                </span>
              </LoadingButton>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FinalScheduleForm;
