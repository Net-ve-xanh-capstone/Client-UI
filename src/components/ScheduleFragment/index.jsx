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
} from '../../utils/checkEditButton.js';
import { formatDate } from '../../utils/formatDate.js';
import DeleteModal from '../DeleteModal';
import EditSchedule from '../editSchedule/page.jsx';
import ScheduleForm from '../ScheduleForm/index.jsx';
import styles from './style.module.css';
import FinalScheduleForm from '../finalScheduleForm/page.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import { renderWithTooltip } from '../../pages/admin/views/management/StaffManagementPage.jsx';

function ScheduleFragment({ scheduleFrag }) {
  const [type, setType] = useState();
  const [schedule, setSchedule] = useState();
  const [listExam, setListExam] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [editModal, setEditModalShow] = useState(false);
  const [finalModalShow, setFinalModalShow] = useState(false);
  const [editScheduleData, setEditScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);


  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [scheDuleIdDelete, setScheduleIdDelete] = useState();
  const [level, setLevel] = useState();
  const [editRoundData, setEditRoundData] = useState(null);
  const [roundId, setRoundId] = useState(null);

  const [preliminaryList, setPreliminaryList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [orderRound, setOrderRound] = useState([]);

  const getLevelRound = async () => {
    setLoading(true);
    try {
      const { data } = await getById(scheduleFrag.id);
      setLevel(sortLevel(data?.result.educationalLevel));
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  const getSchedule = async () => {
    setLoading(true);
    try {
      const { data } = await getScheduleByContestId(scheduleFrag.id);
      setSchedule(data?.result);
    } catch (e) {
      console.log('err', e);
    } finally {
      setLoading(false);
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
    setEditModalShow(false);
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

  };

  // handle while user click edit schedule
  const handleOpenEdit = (data, scheduleData) => {
    setType('edit');
    setEditRoundData(data);
    setEditModalShow(true);
    // Pass the scheduleData directly to the EditSchedule component
    setEditScheduleData(scheduleData);
  };

  //  sorting the level of list schedule to map follow with the level
  const sortLevel = levels => {
    let newPreliminaryList = [];
    let newFinalList = [];
    let orderRound = [];

    for (let level of levels) {
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

  const renderRound = data => {
    const roundSchedule = schedule?.find(item => item.roundId === data.id);
    // const isActive = checkActiveScheduleButton(data.startTime, data.endTime);
    const isDisable = roundSchedule?.roundStatus !== 'Complete';
    return (
      <>

        {loading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
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
                        gridTemplateColumns: roundSchedule?.roundName
                          .toLowerCase()
                          .includes('Chung Kết'.toLowerCase())
                          ? 'repeat(9, 1fr)'
                          : 'repeat(6, 1fr)',
                      }}>
                      <div className={styles.col}>Giám khảo</div>
                      <div className={styles.col}>Ngày chấm</div>
                      {roundSchedule?.roundName
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
                    {roundSchedule?.schedules?.length === 0 ? (
                      <>
                        {loading ? (
                          <div className={styles.loadingContainer}>
                            <CircularProgress />
                          </div>
                        ) : (<div className="text-center">
                          <h4>Chưa có giám khảo</h4>
                        </div>)}
                      </>
                    ) : (
                      roundSchedule?.schedules?.map(scheduleData => (
                        <li
                          key={scheduleData.id}
                          className={styles.tableRow}
                          style={{
                            gridTemplateColumns: roundSchedule?.roundName
                              .toLowerCase()
                              .includes('Chung Kết'.toLowerCase())
                              ? 'repeat(9, 1fr)'
                              : 'repeat(6, 1fr)',
                          }}>
                          <div className={styles.col} data-label="Tên giám khảo">
                            {renderWithTooltip(scheduleData?.examinerName, 30)}
                          </div>
                          <div className={styles.col} data-label="Ngày chấm">
                            <div>{renderWithTooltip(formatDate(scheduleData?.endDate), 20)}</div>
                          </div>
                          {roundSchedule?.roundName
                            .toLowerCase()
                            .includes('Chung Kết'.toLowerCase()) ? (
                            <>
                              <div
                                className={styles.col}
                                data-label="Tổng bài chấm">
                                <div>{renderWithTooltip(scheduleData?.judgeCount)}</div>
                              </div>
                              {scheduleData?.awards?.map(val => (
                                <div
                                  key={val.id}
                                  className={styles.col}
                                  data-label={val.rank}>
                                  <div>{renderWithTooltip(val.quantity)}</div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              <div
                                className={styles.col}
                                data-label="Tổng bài chấm">
                                <div>{renderWithTooltip(scheduleData?.judgeCount)}</div>
                              </div>
                              {scheduleData?.awards?.map(val => (
                                <div
                                  key={val.id}
                                  className={styles.col}
                                  data-label="Đạt giải">
                                  <span>{renderWithTooltip(val.quantity)}</span>
                                </div>
                              ))}
                            </>
                          )}

                          <div className={styles.col} data-label="Trạng thái">
                            <span>
                              {scheduleData?.status === 'Rating'
                                ? renderWithTooltip('Chưa chấm')
                                : renderWithTooltip('Đã chấm')
                              }
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
                                disabled={isDisable}
                                onClick={() => hanldeOpenDelete(scheduleData?.id)}>
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                aria-label="edit"
                                size="large"
                                color="primary"
                                disabled={isDisable}
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
                    disabled={isDisable}
                    onClick={() => handleOpenCreate(data, roundSchedule)}>
                    Thêm lịch chấm
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>)}
      </>
    );
  };

  return (


    level && (
      <>
        <EditSchedule
          modalShow={editModal}
          onHide={resetDetail}
          scheduleData={editScheduleData}
        />
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
        {preliminaryList.map(renderRound)}
        {orderRound.map(renderRound)}
        {finalList.map(renderRound)}
      </>
    )
  );

}

export default ScheduleFragment;
