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
import FinalScheduleForm from '../finalScheduleForm/page.jsx';

function ScheduleFragment({ scheduleFrag, getContestDetail, statusOfRound }) {
  const [type, setType] = useState();
  const [schedule, setSchedule] = useState();
  const [listExam, setListExam] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [finalModalShow, setFinalModalShow] = useState(false);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [scheDuleIdDelete, setScheduleIdDelete] = useState();
  const isEditing = checkEditButton(scheduleFrag.startTime);
  const [level, setLevel] = useState();
  const [editRoundData, setEditRoundData] = useState(null);
  const [roundId, setRoundId] = useState(null);

  const [preliminaryList, setPreliminaryList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [orderRound, setOrderRound] = useState([]);

  const isActive = !statusOfRound
    .toLowerCase()
    .includes('Chưa bắt đầu'.toLowerCase());

  // unknow this api make for --- checking this?
  const getLevelRound = async () => {
    try {
      const { data } = await getById(scheduleFrag.id);

      setLevel(sortLevel(data?.result.educationalLevel));
    } catch (e) {
      console.log('error', e);
    }
  };

  // get all schedule by contestid
  const getSchedule = async () => {
    try {
      const { data } = await getScheduleByContestId(scheduleFrag.id);
      setSchedule(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  // delete one schedule in every schedule
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

  // reset all field when user close popup
  const resetDetail = () => {
    setModalShow(false);
    setFinalModalShow(false);
    getLevelRound();
    getSchedule();
  };

  // open the modal confirm delete
  const hanldeOpenDelete = scheduleId => {
    setScheduleIdDelete(scheduleId);
    setDeleteModalShow(true);
  };

  // handle when user click adding more schedule
  const handleOpenCreate = (data, roundSchedule) => {
    if (
      roundSchedule.roundName.toLowerCase().includes('Chung Kết'.toLowerCase())
    ) {
      setRoundId(roundSchedule.roundId);
      setEditRoundData(data);
      setListExam(roundSchedule?.schedules);
      setType('create');
      setFinalModalShow(true);
    } else {
      setRoundId(roundSchedule.roundId);
      setEditRoundData(data);
      setListExam(roundSchedule?.schedules);
      setType('create');
      setModalShow(true);
    }

    // ==> old code for handle the logic checking which popup will open
    // if (roundSchedule.roundName === 'Vòng Sơ Khảo') {
    //   setRoundId(roundSchedule.roundId);
    //   setEditRoundData(data);
    //   setListExam(roundSchedule?.schedules);
    //   setType('create');
    //   setModalShow(true);
    // } else {
    //   setRoundId(roundSchedule.roundId);
    //   setEditRoundData(data);
    //   setListExam(roundSchedule?.schedules);
    //   setType('create');
    //   setFinalModalShow(true);
    // }
    // ==> old code for handle the logic checking which popup will open
  };

  // handle while user click edit schedule
  const handleOpenEdit = (data, scheduleData) => {
    if (data.name.toLowerCase().includes('Chung Kết'.toLowerCase())) {
      setType(scheduleData);
      setRoundId(scheduleData?.id);
      setEditRoundData(data);
      setFinalModalShow(true);
    } else {
      setType(scheduleData);
      setRoundId(scheduleData?.id);
      setEditRoundData(data);
      setModalShow(true);
    }

    // => old code for handle the edit popup will open in which type
    // if (data.name === 'Vòng Sơ Khảo') {
    //   setType(scheduleData);
    //   setRoundId(scheduleData?.id);
    //   setEditRoundData(data);
    //   setModalShow(true);
    // } else {
    //   setType(scheduleData);
    //   setRoundId(scheduleData?.id);
    //   setEditRoundData(data);
    //   setFinalModalShow(true);
    // }
    // => old code for handle the edit popup will open in which type
  };

  //  sorting the level of list schedule to map follow with the level
  const sortLevel = levels => {
    let newPreliminaryList = [];
    let newFinalList = [];
    let orderRound = [];

    for (let level of levels) {
      //checking the level of this round and map each level to each state
      //we do that for sorting the level to appear the level with correct line
      if (level.round && level.round.length > 0) {
        const levelName = level.level;
        for (let round of level.round) {
          if (round?.name.toLowerCase().includes('Sơ Khảo'.toLowerCase())) {
            newPreliminaryList.push({ ...round, levelName });
          } else if (
            round?.name.toLowerCase() === 'Vòng Chung Kết'.toLowerCase()
          ) {
            newFinalList.push({ ...round, levelName });
          } else {
            orderRound.push({ ...round, levelName });
          }
        }
        level.round.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime),
        );
      }
    }

    setPreliminaryList(newPreliminaryList);
    setFinalList(newFinalList);
    setOrderRound(orderRound);
    return levels;
  };

  useEffect(() => {
    getLevelRound();
    getSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleFrag]);

  // this is will render all of schedule follow with the data responding
  const renderRound = data => {
    const roundChedule = schedule?.find(item => item.roundId === data.id);
    console.log('du lieu hien tai', roundChedule);

    const isActive = checkActiveScheduleButton(data.startTime, data.endTime); // unknow this variable makign for --- checking this?
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
                <li
                  className={styles.roundHeader}
                  style={{
                    gridTemplateColumns: roundChedule?.roundName
                      .toLowerCase()
                      .includes('Chung Kết'.toLowerCase())
                      ? 'repeat(9, 1fr)'
                      : 'repeat(6, 1fr)',
                  }}>
                  <div className={styles.col}>Giám khảo</div>
                  <div className={styles.col}>Ngày chấm</div>
                  {roundChedule?.roundName
                    .toLowerCase()
                    .includes('Chung Kết'.toLowerCase()) ? (
                    <>
                      <div className={styles.col}>Tổng bài chấm</div>
                      <div className={styles.col}>Giải Nhất</div>
                      <div className={styles.col}>Giải Nhì</div>
                      <div className={styles.col}>Giải Ba</div>
                      <div className={styles.col}>Giải Khuyến Khích</div>
                    </>
                  ) : (
                    <>
                      <div className={styles.col}>Tổng bài chấm</div>
                      <div className={styles.col}>Đạt giải</div>
                    </>
                  )}
                  <div className={styles.col}>Trạng thái</div>
                  <div className={styles.col}>Tương tác</div>
                </li>
                {roundChedule?.schedules?.length === 0 ? (
                  <div className="text-center">
                    <h4>Chưa có giám khảo</h4>
                  </div>
                ) : (
                  roundChedule?.schedules?.map(scheduleData => (
                    <li
                      key={scheduleData.id}
                      className={styles.tableRow}
                      style={{
                        gridTemplateColumns: roundChedule?.roundName
                          .toLowerCase()
                          .includes('Chung Kết'.toLowerCase())
                          ? 'repeat(9, 1fr)'
                          : 'repeat(6, 1fr)',
                      }}>
                      <div className={styles.col} data-label="Tên giám khảo">
                        {scheduleData?.examinerName}
                      </div>
                      <div className={styles.col} data-label="Ngày chấm">
                        <div>{formatDate(scheduleData?.endDate)}</div>
                      </div>
                      {roundChedule?.roundName
                        .toLowerCase()
                        .includes('Chung Kết'.toLowerCase()) ? (
                        <>
                          <div
                            className={styles.col}
                            data-label="Tổng bài chấm">
                            <div>{scheduleData?.judgeCount}</div>
                          </div>
                          {scheduleData?.awards?.map(val => (
                            <div
                              key={val.id}
                              className={styles.col}
                              data-label={val.rank}>
                              <div>{val.quantity}</div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <div
                            className={styles.col}
                            data-label="Tổng bài chấm">
                            <div>{scheduleData?.judgeCount}</div>
                          </div>
                          {scheduleData?.awards?.map(val => (
                            <div
                              key={val.id}
                              className={styles.col}
                              data-label="Đạt giải">
                              <span>{val.quantity}</span>
                            </div>
                          ))}
                        </>
                      )}

                      {/* this is old logic to handle the round so khao or chung ket for rendering the data match with that */}
                      {/* {roundChedule?.roundName === 'Vòng Sơ Khảo' && (
                        <>
                          <div
                            className={styles.col}
                            data-label="Tổng bài chấm">
                            <div>{scheduleData?.judgeCount}</div>
                          </div>
                          {scheduleData?.awards?.map(val => (
                            <div
                              key={val.id}
                              className={styles.col}
                              data-label="Đạt giải">
                              <span>{val.quantity}</span>
                            </div>
                          ))}
                        </>
                      )}
                      {roundChedule?.roundName === 'Vòng Chung Kết' && (
                        <>
                          <div
                            className={styles.col}
                            data-label="Tổng bài chấm">
                            <div>{scheduleData?.judgeCount}</div>
                          </div>
                          {scheduleData?.awards?.map(val => (
                            <div
                              key={val.id}
                              className={styles.col}
                              data-label={val.rank}>
                              <div>{val.quantity}</div>
                            </div>
                          ))}
                        </>
                      )} */}
                      {/* this is old logic to handle the round so khao or chung ket for rendering the data match with that */}

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
                            aria-label="delete"
                            size="large"
                            color="error"
                            // disabled={scheduleData?.status === 'Done'}
                            disabled={isActive}
                            onClick={() => hanldeOpenDelete(scheduleData?.id)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            size="large"
                            color="primary"
                            // disabled={scheduleData?.status === 'Done'}
                            disabled={isActive}
                            onClick={() => handleOpenEdit(data, scheduleData)}>
                            <EditIcon />
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
                className="btn btn-outline-primary btn-lg"
                disabled={isActive}
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
          roundId={roundId}
        />
        <FinalScheduleForm
          modalShow={finalModalShow}
          onHide={resetDetail}
          roundData={editRoundData}
          scheduleData={listExam}
          type={type}
          roundId={roundId}
        />
        <DeleteModal
          show={deleteModalShow}
          setShow={setDeleteModalShow}
          title={'lịch chấm'}
          callBack={handleDelete}
        />
        {/* this return will map the data follow with the level of the schedule
        in contest */}
        {preliminaryList.map(renderRound)}
        {orderRound.map(renderRound)}
        {finalList.map(renderRound)}
      </>
    )
  );
}

export default ScheduleFragment;
