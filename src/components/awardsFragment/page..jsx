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
import styles from './page.module.css';
import FinalScheduleForm from '../finalScheduleForm/page.jsx';
import ListAward from './tableList/page.jsx';

function AwardsFragment({ scheduleFrag, getContestDetail }) {
  const [type, setType] = useState();
  const [schedule, setSchedule] = useState();
  const [listExam, setListExam] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [finalModalShow, setFinalModalShow] = useState(false);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [scheDuleIdDelete, setScheduleIdDelete] = useState();
  const isEditing = checkEditButton(scheduleFrag.startTime);
  const [editRoundData, setEditRoundData] = useState(null);
  const [roundId, setRoundId] = useState(null);

  const [preliminaryList, setPreliminaryList] = useState([]);

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
    getSchedule();
  };

  // open the modal confirm delete
  const hanldeOpenDelete = scheduleId => {
    setScheduleIdDelete(scheduleId);
    setDeleteModalShow(true);
  };

  // handle when user click adding more schedule
  const handleOpenCreate = (data, roundSchedule) => {
    if (roundSchedule.roundName === 'Vòng Sơ Khảo') {
      setRoundId(roundSchedule.roundId);
      setEditRoundData(data);
      setListExam(roundSchedule?.schedules);
      setType('create');
      setModalShow(true);
    } else {
      setRoundId(roundSchedule.roundId);
      setEditRoundData(data);
      setListExam(roundSchedule?.schedules);
      setType('create');
      setFinalModalShow(true);
    }
  };

  // handle while user click edit schedule
  const handleOpenEdit = (data, scheduleData) => {
    if (data.name === 'Vòng Sơ Khảo') {
      setType(scheduleData);
      setRoundId(scheduleData?.id);
      setEditRoundData(data);
      setModalShow(true);
    } else {
      setType(scheduleData);
      setRoundId(scheduleData?.id);
      setEditRoundData(data);
      setFinalModalShow(true);
    }
  };

  useEffect(() => {
    getSchedule();
    console.log('frag', scheduleFrag);
    setPreliminaryList(scheduleFrag.educationalLevel);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleFrag]);

  // this is will render all of schedule follow with the data responding
  const renderRound = data => {
    console.log(data);

    return (
      <div key={data.id} style={{ padding: '10px' }}>
        {/* tạo 1 nested map ở đây để handle việc này nhé */}
        <Accordion>
          <AccordionSummary
            style={{ fontSize: '16px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <div>{data.level}</div>
          </AccordionSummary>
          <AccordionDetails>
            {/* nested table here */}
            {data?.round.map(val => (
              <ListAward key={val.id} items={val} />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  return (
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
    </>
  );
}

export default AwardsFragment;
