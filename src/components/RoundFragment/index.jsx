import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getById } from '../../api/contestStaffApi.js';
import { deleteRoundLevel } from '../../api/roundStaffApi.js';
import { formatDate } from '../../utils/formatDate.js';
import DeleteModal from '../DeleteModal';
import RoundForm from '../RoundForm/index.jsx';
import styles from './style.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { dowloadExcel } from '../../api/dowloadApi.js';
import MailModal from './modalMail.jsx';

function RoundFragment({ roundFrag, getContestDetail, statusOfRound }) {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [idRoundDelete, setIdRoundDelete] = useState();
  // const isEditing = checkEditButton(roundFrag.startTime);
  const [round, setRound] = useState();
  const [editRoundData, setEditRoundData] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [idLevel, setIdLevel] = useState(null);

  const isActive = !statusOfRound
    .toLowerCase()
    .includes('Chưa bắt đầu'.toLowerCase());
  const openModalConfirm = id => {
    setOpenModal(true);
    setIdLevel(id);
  };

  // fetch sending email
  const sendMail = async id => {
    try {
      await sendMail(id);
    } catch (error) {
      console.log(error);
    }
  };

  // dowload file excel
  const downloadFile = async (levelData, roundData) => {
    try {
      const fileName = levelData?.level + ' - ' + roundData?.name + '.xlsx';
      const response = await dowloadExcel(roundData?.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  const resetDetail = () => {
    setModalShow(false);
    getContestDetail();
    getRound();
  };

  const getRound = async () => {
    try {
      console.log('checka');
      const { data } = await getById(roundFrag.id);
      setRound(sortRoundsByStartTime(data?.result.educationalLevel));
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteRoundLevel(idRoundDelete);
      if (data?.result) {
        toast.success('Xóa vòng thi thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        getRound();
        getContestDetail();
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleOpenCreate = () => {
    setEditRoundData();
    setModalShow(true);
  };

  const handleOpenEdit = id => {
    const foundRound = round.find(item =>
      item.round.find(ele => ele.id === id),
    );
    const roundData = foundRound.round.find(ele => ele.id === id);
    setEditRoundData(roundData);
    setModalShow(true);
  };
  const sortRoundsByStartTime = data => {
    let sorted = [];
    data.forEach(level => {
      if (level.round && level.round.length > 0) {
        sorted.push({
          ...level,
          round: level.round.sort(
            (a, b) => new Date(a.startTime) - new Date(b.startTime),
          ),
        });
      }
    });
    return sorted;
  };

  useEffect(() => {
    getRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundFrag]);
  return (
    round && (
      <>
        <MailModal
          show={openModal}
          setShow={setOpenModal}
          callBack={sendMail}
          idLevel={idLevel}
        />
        <RoundForm
          modalShow={modalShow}
          onHide={resetDetail}
          roundData={editRoundData}
          contestData={roundFrag}
        />
        <DeleteModal
          show={deleteModalShow}
          setShow={setDeleteModalShow}
          title={'vòng thi'}
          callBack={handleDelete}
        />
        <p style={{ padding: '20px', fontSize: '16px', color: '#FFD35A' }}>
          *Vui lòng nhập địa điểm thi nếu có
        </p>
        <div className={styles.roundContainer}>
          <ul className={styles.roundTableResponse}>
            <li className={styles.roundHeader}>
              <div className={styles.col}>Đối tượng</div>
              <div className={styles.col}>Vòng thi</div>
              <div className={styles.col}>bắt đầu</div>
              <div className={styles.col}>kết thúc</div>
              <div className={styles.col}>Địa điểm</div>
              <div className={styles.col}>Mô tả</div>
              <div className={styles.col}>Trạng thái</div>
              <div className={styles.col}>Tương tác</div>
            </li>
            {round.map(dataRound =>
              dataRound.round?.map(data => (
                <li key={data.id} className={styles.tableRow}>
                  <div className={styles.col} data-label="Đối tượng">
                    {dataRound.level}
                  </div>
                  <div className={styles.col} data-label="Tên vòng thi">
                    {data.name?.length > 100
                      ? data.name.slice(0, 99) + '...'
                      : data.name}
                  </div>
                  <div className={styles.col} data-label="Ngày bắt đầu">
                    {formatDate(data.startTime)}
                  </div>
                  <div className={styles.col} data-label="Ngày két thúc">
                    {formatDate(data.endTime)}
                  </div>
                  <div className={styles.col} data-label="Địa điểm">
                    {data.location?.length > 100
                      ? data.location.slice(0, 99) + '...'
                      : data.location}

                    {data.location?.length > 100 && (
                      <div className={styles.tooltip}>{data.location}</div>
                    )}
                  </div>
                  <div className={styles.col} data-label="Mô tả">
                    {data.description?.length > 100
                      ? data.description.slice(0, 99) + '...'
                      : data.description}

                    {data.description?.length > 100 && (
                      <div className={styles.tooltip}>{data.description}</div>
                    )}
                  </div>
                  <div className={styles.col} data-label="Trạng thái">
                    {/* <>
                      <Switch
                        checked={checkActiveDate(data)}
                        color="success"
                        disabled
                      />
                    </> */}
                    {data?.status}
                  </div>
                  <div className={styles.col} data-label="Tương tác">
                    <IconButton
                      sx={{ paddingRight: '0 !important' }}
                      aria-label="edit"
                      size="large"
                      color="info"
                      onClick={() => handleOpenEdit(data.id)}
                      // disabled={checkEditButton(data.startTime)}
                      disabled={isActive}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ paddingRight: '0 !important' }}
                      aria-label="edit"
                      size="large"
                      color="info"
                      onClick={() => downloadFile(dataRound, data)}
                      // disabled={checkEditButton(data.startTime)}
                      disabled={
                        !data?.status
                          .toLowerCase()
                          .includes('hoàn thành'.toLowerCase())
                      }>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      sx={{ paddingRight: '0 !important' }}
                      aria-label="edit"
                      size="large"
                      color="info"
                      onClick={() => openModalConfirm(data.id)}
                      // disabled={checkEditButton(data.startTime)}
                      disabled={
                        !data?.status
                          .toLowerCase()
                          .includes('hoàn thành'.toLowerCase())
                      }>
                      <SendIcon />
                    </IconButton>
                    {/* <IconButton
                        aria-label="delete"
                        size="large"
                        color="error"
                        onClick={() => hanldeOpenDelete(data.id)}
                        disabled={isEditing}>
                        <DeleteIcon />
                      </IconButton> */}
                  </div>
                </li>
              )),
            )}
          </ul>
          <div className="flex justify-content-end mt-20">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => handleOpenCreate()}
              // disabled={isEditing}
              disabled={isActive}>
              Thêm
            </button>
          </div>
        </div>
      </>
    )
  );
}

export default RoundFragment;
