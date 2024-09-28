import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getById } from '../../api/contestStaffApi.js';
import { deleteRoundLevel, announceResults } from '../../api/roundStaffApi.js';
import { formatDate } from '../../utils/formatDate.js';
import DeleteModal from '../DeleteModal';
import RoundForm from '../RoundForm/index.jsx';
import styles from './style.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { dowloadExcel } from '../../api/dowloadApi.js';
import MailModal from './modalMail.jsx';
import { renderWithTooltip } from '../../pages/admin/views/management/StaffManagementPage.jsx';

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
      const response = await announceResults(id);
      if (response?.data?.result) {
        toast.success('Công bố kết quả thành công', {
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
              <div className={styles.col}>Bắt đầu</div>
              <div className={styles.col}>Kết thúc</div>
              <div className={styles.col}>Nộp bản cứng</div>
              <div className={styles.col}>Công bố kết quả</div>
              <div className={styles.col}>Địa điểm</div>
              <div className={styles.col}>Mô tả</div>
              <div className={styles.col}>Trạng thái</div>
              <div className={styles.col}>Tương tác</div>
            </li>
            {round.map(dataRound =>
              dataRound.round?.map(data => (
                <li key={data.id} className={styles.tableRow}>
                  <div className={styles.col} data-label="Đối tượng">
                    {renderWithTooltip(dataRound.level, 20)}
                  </div>
                  <div className={styles.col} data-label="Tên vòng thi">
                    {renderWithTooltip(data.name, 40)}
                  </div>
                  <div className={styles.col} data-label="Ngày bắt đầu">
                    {renderWithTooltip(formatDate(data?.startTime), 20)}
                  </div>
                  <div className={styles.col} data-label="Ngày kết thúc">
                    {renderWithTooltip(formatDate(data?.endTime), 20)}
                  </div>
                  <div className={styles.col} data-label="Ngày nộp bản cứng">
                    {renderWithTooltip(formatDate(data?.deadlineSubmissionDate), 20)}
                  </div>
                  <div className={styles.col} data-label="Ngày công bố kết quả">
                    {renderWithTooltip(formatDate(data?.resultAnnouncementDate), 20)}
                  </div>
                  <div className={styles.col} data-label="Địa điểm">
                    {renderWithTooltip(data.location, 40)}
                  </div>
                  <div className={styles.col} data-label="Mô tả">
                    {renderWithTooltip(data.description, 40)}
                  </div>
                  <div className={styles.col} data-label="Trạng thái">
                    {renderWithTooltip(data?.status, 20)}
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
