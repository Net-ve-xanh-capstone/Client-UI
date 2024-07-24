import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkEditButton } from '../../utils/checkEditButton.js';
import DeleteModal from '../DeleteModal';
import RoundForm from '../RoundForm/index.jsx';
import styles from './style.module.css';
import CreateTopicRound from '../CreateTopicRound/index.jsx';
import { getById } from '../../api/contestStaffApi.js';
import { deleteTopicRound } from '../../api/topicStaffApi.js';
import ScheduleForm from '../ScheduleForm/index.jsx';

function ScheduleFragment({ scheduleFrag, getContestDetail }) {
  const [type, setType] = useState();
  const [topic, setTopic] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [topicRoundDelete, setTopicRoundDelete] = useState();
  const isEditing = checkEditButton(scheduleFrag.startTime);
  const [level, setLevel] = useState();
  const [editRoundData, setEditRoundData] = useState();

  const resetDetail = () => {
    setModalShow(false);
    //getContestDetail();
    getTopic();
  };

  useEffect(() => {
    getTopic();
  }, [scheduleFrag]);

  const getTopic = async () => {
    try {
      const { data } = await getById(scheduleFrag.id);
      setTopic(data?.result);
      setLevel(sortLevel(data?.result.educationalLevel));
    } catch (e) {
      console.log('error', e);
    }
  };

  const hanldeOpenDelete = (roundId, topicId) => {
    setTopicRoundDelete({ roundId: roundId, topicId: topicId });
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteTopicRound(topicRoundDelete);
      if (data?.result) {
        toast.success('Xóa chủ đề thi thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        //getContestDetail();
        getTopic();
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleOpenCreate = data => {
    setEditRoundData(data);
    console.log(data);
    setType('create');
    setModalShow(true);
  };

  const sortLevel = levels => {
    for (const level of levels) {
      if (level.round && level.round.length > 0) {
        level.round.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime),
        );
      }
    }
    return levels;
  };

  return (
    level && (
      <>
        <ScheduleForm
          modalShow={modalShow}
          onHide={resetDetail}
          roundData={editRoundData}
          type={type}
        />
        <DeleteModal
          show={deleteModalShow}
          setShow={setDeleteModalShow}
          title={'vòng thi'}
          callBack={handleDelete}
        />
        {level.map(dataLevel =>
          dataLevel.round.map(data => (
            <div key={data.id} style={{ padding: '10px' }}>
              <Accordion>
                <AccordionSummary
                  style={{ fontSize: '16px' }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header">
                  <div>
                    {data.name} - {dataLevel.level}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.roundContainer}>
                    <ul className={styles.roundTableResponse}>
                      <li className={styles.roundHeader}>
                        <div className={styles.col}>Giám khảo</div>
                        <div className={styles.col}>Ngày chấm</div>
                        <div className={styles.col}>Mô tả</div>
                        <div className={styles.col}>Trạng thái</div>
                      </li>

                      {data.roundTopic.length === 0 ? (
                        <div className="text-center">
                          <h4>Chưa chọn chủ đề nào</h4>
                        </div>
                      ) : (
                        data.roundTopic?.map((topicData, index) => (
                          <li key={index} className={styles.tableRow}>
                            <div className={styles.col} data-label="Tên chủ đề">
                              {topicData.topic.name}
                            </div>

                            <div className={styles.col} data-label="Mô tả">
                              <div>
                                <>{topicData.topic.description}</>
                              </div>
                            </div>
                            <div className={styles.col} data-label="Mô tả">
                              <div>
                                <>{topicData.topic.description}</>
                              </div>
                            </div>
                            <div className={styles.col} data-label="Tương tác">
                              <IconButton
                                aria-label="delete"
                                size="large"
                                color="error"
                                onClick={() =>
                                  hanldeOpenDelete(
                                    data?.id,
                                    topicData?.topic.id,
                                  )
                                }>
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="flex justify-content-end mt-20">
                    <button
                      className="btn btn-outline-primary btn-lg"
                      onClick={() => handleOpenCreate(data)}>
                      Thêm lịch chấm
                    </button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          )),
        )}
      </>
    )
  );
}

export default ScheduleFragment;
