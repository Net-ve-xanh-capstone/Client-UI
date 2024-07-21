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
import { createTopic, editTopic } from '../../api/topicStaffApi';
import Multiselect from 'multiselect-react-dropdown';
import { createResource, editResource } from '../../api/resourceStaffApi';

function ResourceForm({ modalShow, onHide, resourceData, type }) {
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

  const getSponsor = () => {
    axios
      .get('https://netvexanh.azurewebsites.net/api/sponsors/getallsponsor')
      .then(res => {
        const data = filterSponsor(res?.result, resourceData.resource);
        setSponsor(data);
      });
  };

  const filterSponsor = (dataApi, existingData) => {
    return dataApi.filter(
      data =>
        !existingData.some(existingId => existingId.sponsor.id === data.id),
    );
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
      if (!formData.sponsorId) {
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
        onHide();
      }
    } catch (e) {
      console.log('err', e);
      onHide();
    }
  };

  const handleEditTopic = async () => {
    try {
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
        onHide();
      }
    } catch (e) {
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
          callBack={handleEditTopic}
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
            Thêm tài trợ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '50vh', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <Multiselect
              displayValue="name"
              disablePreSelectedValues
              onKeyPressFn={function noRefCheck() {}}
              onRemove={e => handleSelect(e)}
              onSelect={e => handleSelect(e)}
              options={sponsor}
              selectedValues={type !== 'create' && [type?.sponsor]}
              disable={type !== 'create'}
              selectionLimit={1}
              placeholder="Đơn vị tài trợ"
              emptyRecordMsg="Không tìm thấy nhà tài trợ nào"
              avoidHighlightFirstOption="true"
              style={{
                chips: {
                  background: 'var(--linear)',
                },
              }}
              singleSelect
            />
            <h4 className={styles.title}>Tài trợ</h4>
            <textarea
              required
              name="sponsorship"
              value={formData.sponsorship}
              onChange={handleInputChange}></textarea>
            <div style={{ textAlign: 'end' }}>
              <button className={styles.btnCreate} type="submit">
                Lưu
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResourceForm;
