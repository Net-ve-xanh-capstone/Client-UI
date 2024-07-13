import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { formatDate } from '../../utils/formatDate.js';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { checkEditButton } from '../../utils/checkEditButton.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import RoundForm from '../RoundForm/index.jsx';
import { Switch } from '@mui/material';
import { checkActiveDate } from '../../utils/checkActiveDate.js';
import DeleteModal from '../DeleteModal';
function RoundFragment({ roundFrag, getContestDetail }) {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [idRoundDelete, setIdRoundDelete] = useState();
  const isEditing = checkEditButton(roundFrag.startTime);
  const [round, setRound] = useState();
  const [editRoundData, setEditRoundData] = useState();

  const resetDetail = () => {
    setModalShow(false);
    getContestDetail();
  };

  const hanldeOpenDelete = id => {
    setIdRoundDelete(id);
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    axios
      .patch(
        `https://webapp-240702160733.azurewebsites.net/api/educationallevels?id=${idRoundDelete}`,
      )
      .then(res => {
        if (res.result) {
          toast.success('Xóa đối tượng dự thi thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          getContestDetail();
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleOpenCreate = () => {
    setEditRoundData();
    setModalShow(true);
  };

  const handleOpenEdit = id => {
    setEditRoundData(round.find(item => item.id === id));
    setModalShow(true);
  };
  const findRound = levels => {
    for (const level of levels) {
      if (level.round && level.round.length > 0) {
        return level.round.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime),
        );
      }
    }
    return null;
  };

  useEffect(() => {
    try {
      setRound(findRound(roundFrag.educationalLevel));
    } catch (e) {
      console.log('err', e);
    }
  }, []);
  return (
    round && (
      <>
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
              <div className={styles.col}>Vòng thi</div>
              <div className={styles.col}>bắt đầu</div>
              <div className={styles.col}>kết thúc</div>
              <div className={styles.col}>Địa điểm</div>
              <div className={styles.col}>Mô tả</div>
              <div className={styles.col}>Trạng thái</div>
            </li>
            {round.map(data => (
              <li key={data.id} className={styles.tableRow}>
                <div className={styles.col} data-label="Tên vòng thi">
                  {data.name}
                </div>
                <div className={styles.col} data-label="Ngày bắt đầu">
                  {formatDate(data.startTime)}
                </div>
                <div className={styles.col} data-label="Ngày két thúc">
                  {formatDate(data.endTime)}
                </div>
                <div className={styles.col} data-label="Địa điểm">
                  {data.location || 'Chưa có'}
                </div>
                <div className={styles.col} data-label="Mô tả">
                  {data.description || 'Chưa có'}
                </div>
                <div className={styles.col} data-label="Trạng thái">
                  <div style={{ display: 'flex' }}>
                    <>
                      <Switch
                        checked={checkActiveDate(data)}
                        color="success"
                        disabled
                      />
                      <button
                        className={`btn btn-sm ${checkActiveDate(data) ? 'btn-success' : 'btn-secondary'}`}
                        style={{ width: '45px', textAlign: 'center' }}
                        disabled>
                        {checkActiveDate(data) ? 'Active' : 'Inactive'}
                      </button>
                    </>
                    <IconButton
                      aria-label="edit"
                      size="large"
                      color="info"
                      onClick={() => handleOpenEdit(data.id)}
                      disabled={isEditing}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      color="error"
                      onClick={() => hanldeOpenDelete(data.id)}
                      disabled={isEditing}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-content-end mt-20">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => handleOpenCreate()}
              disabled={isEditing}>
              Thêm
            </button>
          </div>
        </div>
      </>
    )
  );
}

export default RoundFragment;
