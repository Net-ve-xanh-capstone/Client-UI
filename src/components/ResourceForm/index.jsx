import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createResource, editResource } from '../../api/resourceStaffApi';
import { getAllSponsor } from '../../api/sponsorApi';
import CreateModal from '../CreateModal';
import EditModal from '../EditModal';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from './style.module.css';

function ResourceForm({ modalShow, onHide, resourceData, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [sponsor, setSponsor] = useState();
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    setFormData(intialState);
  }, [modalShow]);

  useEffect(() => {
    getSponsor();
  }, []);

  const getSponsor = async () => {
    try {
      const { data } = await getAllSponsor();
      setSponsor(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const intialState = {
    sponsorship: type?.sponsorship || '',
    contestId: resourceData.id,
    sponsorId: '',
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
    setFormData({
      ...formData,
      sponsorId: seletedList.length > 0 ? seletedList[0].id : '',
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    if (!formData.sponsorId && type === 'create') {
      toast.error('Chưa chọn đơn vị tài trợ nào', {
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
      const { data } = await createResource(formData);
      if (data?.result) {
        toast.success('Thêm tài trợ thành công', {
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
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!!', {
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
    try {
      setIsLoading(true);
      if (type !== 'create') formData.id = type?.id;
      const { data } = await editResource(formData);
      if (data?.result) {
        toast.success('Chỉnh sửa tài trợ thành công', {
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

  return (
    <>
      {type === 'create' ? (
        <CreateModal
          show={modal}
          setShow={setModal}
          title={'tài trợ'}
          callBack={postResource}
        />
      ) : (
        <EditModal
          show={modal}
          setShow={setModal}
          title={'tài trợ'}
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
            {type === 'create' ? 'Thêm tài trợ' : 'Chỉnh sửa tài trợ'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '55vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <h4 className={styles.title}>Đơn vị tài trợ</h4>
            <Multiselect
              displayValue="name"
              disablePreSelectedValues
              onKeyPressFn={function noRefCheck() {}}
              onRemove={e => handleSelect(e)}
              onSelect={e => handleSelect(e)}
              options={sponsor}
              disable={type !== 'create'}
              selectedValues={type === 'create' ? [] : [type?.sponsor]}
              selectionLimit={1}
              placeholder="Chọn đơn vị tài trợ"
              emptyRecordMsg="Không tìm thấy nhà tài trợ nào"
              avoidHighlightFirstOption="true"
              style={{
                chips: {
                  background: 'var(--linear)',
                },
              }}
              showArrow
            />
            <h4 className={styles.title}>Tài trợ</h4>
            <textarea
              required
              name="sponsorship"
              value={formData.sponsorship}
              onChange={handleInputChange}></textarea>
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

export default ResourceForm;
