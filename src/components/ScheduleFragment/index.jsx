import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getById } from '../../api/contestStaffApi.js';
import {
  deleteSchedule,
  getScheduleByContestId,
} from '../../api/scheduleStaffApi.js';
import {
  checkActiveScheduleButton,
  checkEditButton,
} from '../../utils/checkEditButton.js';
import { formatDate } from '../../utils/formatDate.js';
import DeleteModal from '../DeleteModal';
import ScheduleForm from '../ScheduleForm/index.jsx';
import styles from './style.module.css';

function ScheduleFragment({ scheduleFrag, getContestDetail }) {
  const [type, setType] = useState();
  const [schedule, setSchedule] = useState();
  const [listExam, setListExam] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [scheDuleIdDelete, setScheduleIdDelete] = useState();
  const isEditing = checkEditButton(scheduleFrag.startTime);
  const [level, setLevel] = useState();
  const [editRoundData, setEditRoundData] = useState();
  const [preliminaryList, setPreliminaryList] = useState([]);
  const [finalList, setFinalList] = useState([]);

  const resetDetail = () => {
    setModalShow(false);
    getLevelRound();
    getSchedule();
  };

  useEffect(() => {
    getLevelRound();
    getSchedule();
  }, [scheduleFrag]);

  const getLevelRound = async () => {
    try {
      const { data } = await getById(scheduleFrag.id);
      setLevel(sortLevel(data?.result.educationalLevel));
    } catch (e) {
      console.log('error', e);
    }
  };

  const getSchedule = async () => {
    try {
      const { data } = await getScheduleByContestId(scheduleFrag.id);
      setSchedule(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const hanldeOpenDelete = scheduleId => {
    setScheduleIdDelete(scheduleId);
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteSchedule(scheDuleIdDelete);
      if (data?.result) {
        toast.success('Xóa lịch chấm thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        resetDetail();
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleOpenCreate = (data, roundSchedule) => {
    setEditRoundData(data);
    setListExam(roundSchedule?.schedules);
    setType('create');
    setModalShow(true);
  };

  const handleOpenEdit = (data, scheduleData) => {
    setType(scheduleData);
    setEditRoundData(data);
    setModalShow(true);
  };
  const sortLevel = levels => {
    const newPreliminaryList = [];
    const newFinalList = [];

    for (const level of levels) {
      if (level.round && level.round.length > 0) {
        const levelName = level.level;
        for (const round of level.round) {
          if (round?.name === 'Vòng Sơ Khảo') {
            newPreliminaryList.push({ ...round, levelName });
          } else if (round?.name === 'Vòng Chung Kết') {
            newFinalList.push({ ...round, levelName });
          }
        }
        level.round.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime),
        );
      }
    }

    setPreliminaryList(newPreliminaryList);
    setFinalList(newFinalList);
    return levels;
  };

  const renderRound = data => {
    const roundChedule = schedule?.find(item => item.roundId === data.id);
    const isActive = checkActiveScheduleButton(data.startTime, data.endTime);

    return (
      <div key={data.id} style={{ padding: '10px' }}>
        <Accordion>
          <AccordionSummary
            style={{ fontSize: '16px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <div>
              {data.name} - {data.levelName}
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
                  <div className={styles.col}>Tương tác</div>
                </li>
                {roundChedule?.schedules?.length === 0 ? (
                  <div className="text-center">
                    <h4>Chưa có giám khảo</h4>
                  </div>
                ) : (
                  roundChedule?.schedules?.map(scheduleData => (
                    <li key={scheduleData.id} className={styles.tableRow}>
                      <div className={styles.col} data-label="Tên giám khảo">
                        {scheduleData?.examinerName}
                      </div>
                      <div className={styles.col} data-label="Ngày chấm">
                        <div>{formatDate(scheduleData?.endDate)}</div>
                      </div>
                      <div className={styles.col} data-label="Mô tả">
                        <div>{scheduleData?.description}</div>
                      </div>
                      <div className={styles.col} data-label="Trạng thái">
                        <span>
                          {scheduleData?.status === 'Rating'
                            ? 'Chưa chấm'
                            : 'Đã chấm'}
                        </span>
                      </div>
                      <div className={styles.col} data-label="Tương tác">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <IconButton
                            aria-label="edit"
                            size="large"
                            color="primary"
                            disabled={scheduleData?.status === 'Done'}
                            onClick={() => handleOpenEdit(data, scheduleData)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="large"
                            color="error"
                            disabled={scheduleData?.status === 'Done'}
                            onClick={() => hanldeOpenDelete(scheduleData?.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="flex justify-content-end mt-20">
              <button
                disabled={isActive}
                className="btn btn-outline-primary btn-lg"
                onClick={() => handleOpenCreate(data, roundChedule)}>
                Thêm lịch chấm
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  return (
    level && (
      <>
        <ScheduleForm
          modalShow={modalShow}
          onHide={resetDetail}
          roundData={editRoundData}
          scheduleData={listExam}
          type={type}
        />
        <DeleteModal
          show={deleteModalShow}
          setShow={setDeleteModalShow}
          title={'lịch chấm'}
          callBack={handleDelete}
        />

        {preliminaryList.map(renderRound)}
        {finalList.map(renderRound)}
      </>
    )
  );
}

export default ScheduleFragment;
