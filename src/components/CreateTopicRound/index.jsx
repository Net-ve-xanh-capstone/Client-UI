import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTopicRound, getAll } from '../../api/topicStaffApi';
import CreateModal from '../CreateModal';
import { round } from 'lodash';
import styles from './style.module.css';

function CreateTopicRound({ modalShow, onHide, roundData }) {
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [topic, setTopic] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    if (userInfo === null) navigate('/login');
    getTopic();
  }, []);

  useEffect(() => {
    setFormData(intialState);
    const selecteBefore = roundData?.roundTopic?.map(ele => ({
      id: ele.topic.id,
      name: ele.topic.name,
    }));
    setSelectedTopics(selecteBefore);
  }, [roundData]);

  const intialState = {
    roundId: roundData?.id,
    listTopicId: [],
  };

  const [formData, setFormData] = useState(intialState);

  const getTopic = async () => {
    try {
      const { data } = await getAll();
      setTopic(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const postRoundTopic = async () => {
    try {
      const { data } = await createTopicRound(formData);
      if (data?.result) {
        toast.success('Tạo chủ đề thi thành công', {
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

  const handleInputChange = selectedIds => {
    setFormData(prevState => ({
      ...prevState,
      listTopicId: selectedIds,
    }));
  };

  const handleSelect = seletedList => {
    const newTopic = seletedList.filter(
      item => !roundData?.roundTopic?.some(t => t.topic.id === item.id),
    );
    handleInputChange(newTopic.map(item => item.id));
  };

  const handleRemove = seletedList => {
    const newTopic = seletedList.filter(
      item => !roundData?.roundTopic?.some(t => t.topic.id === item.id),
    );
    handleInputChange(newTopic.map(item => item.id));
  };

  const handleOpenCrete = () => {
    if (!formData.listTopicId.length > 0) {
      toast.error('Chưa chọn chủ đề nào', {
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
    setShowModalCreate(true);
  };

  const selectedTopicsIds = formData.listTopicId;
  const filteredTopics = topic.filter(t => !selectedTopicsIds.includes(t.id));

  return (
    <>
      <CreateModal
        setShow={setShowModalCreate}
        show={showModalCreate}
        title={'chủ đề thi'}
        callBack={postRoundTopic}
      />
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
            Thêm chủ đề thi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: '60vh',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <div>
            <h4 className={styles.title}>Chọn chủ đề</h4>
            <Multiselect
              displayValue="name"
              disablePreSelectedValues
              onKeyPressFn={function noRefCheck() {}}
              onRemove={e => handleRemove(e)}
              onSelect={e => handleSelect(e)}
              options={filteredTopics}
              selectedValues={selectedTopics}
              placeholder="Chọn chủ đề"
              emptyRecordMsg="Không tìm thấy chủ đề nào"
              avoidHighlightFirstOption="true"
              style={{
                chips: {
                  background: 'var(--linear)',
                },
              }}
              showArrow
            />
          </div>
          <div className="flex justify-content-end mt-20">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => handleOpenCrete()}>
              Thêm
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateTopicRound;
