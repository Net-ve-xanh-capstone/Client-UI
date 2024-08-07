import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createPreliminary,
  createFinal,
  editShedule,
} from '../../api/scheduleStaffApi';
import { getAll } from '../../api/examinerStaffApi';
import CreateModal from '../CreateModal';
import EditModal from '../EditModal';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from './style.module.css';

function ScheduleForm({ modalShow, onHide, roundData, scheduleData, type }) {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [examiner, setExaminer] = useState();
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    setFormData(intialState);
  }, [modalShow]);

  useEffect(() => {
    getExaminer();
  }, []);

  const getExaminer = async () => {
    try {
      const { data } = await getAll();
      setExaminer(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const intialState = {
    description: type?.description || '',
    roundId: roundData?.id,
    endDate: type?.endDate?.split('T')[0] || '',
    listExaminer: [],
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

  const handleSelect = seletedList => {
    const selectIds = seletedList.map(item => item.id);
    setFormData({
      ...formData,
      listExaminer: selectIds,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

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
      setValidated(true);
      setModal(true);
      setErrors({});
    } else {
      setValidated(false);
      setErrors(formErrors);
    }
  };

  const postResource = async () => {
    try {
      setIsLoading(true);

      const { data } =
        roundData?.name === 'Vòng Sơ Khảo'
          ? await createPreliminary(formData)
          : await createFinal(formData);
      if (data?.result) {
        toast.success('Thêm lịch chấm thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setIsLoading(false);
        onHide();
      }
    } catch (e) {
      toast.error(e.response?.data?.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setIsLoading(false);
      console.log('err', e);
      onHide();
    }
  };

  const handleEditResource = async () => {
    formData.id = type?.id;
    try {
      setIsLoading(true);
      if (type !== 'create') formData.id = type?.id;
      const { data } = await editShedule(formData);
      if (data?.result) {
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
        setIsLoading(false);
        onHide();
      }
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
      setIsLoading(false);
      console.log('Err', e);
    }
  };

  const filteredExaminers = examiner?.filter(
    e => !scheduleData?.some(sd => sd.examinerId === e.id),
  );

  return (
    <>
      {type === 'create' ? (
        <CreateModal
          show={modal}
          setShow={setModal}
          title={'lịch chấm'}
          callBack={postResource}
        />
      ) : (
        <EditModal
          show={modal}
          setShow={setModal}
          title={'lịch chấm'}
          callBack={handleEditResource}
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
            {type === 'create' ? 'Thêm lịch chấm' : 'Chỉnh sửa lịch chấm'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '60vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <h4 className={styles.title}>Ngày chấm</h4>
            <input
              required
              type="date"
              name="endDate"
              id="endDate"
              className={styles.formControl}
              value={formData.endDate}
              onChange={handleInputChange}
              min={currentDate}
              max={roundData?.endTime.split('T')[0]}
            />
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
            <h4 className={styles.title}>Mô tả</h4>
            <input
              className={styles.inputModal}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
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

export default ScheduleForm;
