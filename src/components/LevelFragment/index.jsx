import React, { useEffect, useState } from 'react';
import CreateLevel from '../CreateLevel';
import { checkEditButton } from '../../utils/checkEditButton';
import DeleteModal from '../DeleteModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { deleteLevel } from '../../api/levelStaffApi';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './style.module.css';
function LevelFragment({ levelFrag, getContestDetail }) {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [idLevelDelete, setIdLevelDelete] = useState();

  const [type, setType] = useState('');
  const [dataRound, setDataRound] = useState(null);

  const resetDetail = () => {
    setModalShow(false);
    getContestDetail();
    setType('');
    setDataRound(null);
  };

  // open modal confirm delete
  const hanldeOpenDelete = id => {
    setIdLevelDelete(id);
    setDeleteModalShow(true);
  };

  // trigger to delete and post to server
  const handleDelete = async () => {
    try {
      const { data } = await deleteLevel(idLevelDelete);
      if (data?.result) {
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
    } catch (e) {
      toast.error('Xoá không thành công', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  // open popup create
  const openCreate = () => {
    setModalShow(true);
    setType('create');
  };
  // open popup delete
  const openEdit = data => {
    setModalShow(true);
    setType('edit');
    setDataRound(data);
  };

  return (
    <>
      <CreateLevel
        modalShow={modalShow}
        onHide={resetDetail}
        contestId={levelFrag.id}
        startTime={levelFrag.startTime}
        endTime={levelFrag.endTime}
        roundData={dataRound}
        type={type}
      />
      <DeleteModal
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title={'đối tượng dự thi'}
        callBack={handleDelete}
      />
      <div className={styles.roundContainer}>
        <ul className={styles.roundTableResponse}>
          <li className={styles.roundHeader}>
            <div className={styles.col}>Nội dung</div>
            <div className={styles.col}>Mô tả</div>
            <div className={styles.col}>Từ tuổi</div>
            <div className={styles.col}>Đến tuổi</div>
            <div className={styles.col}>Tương tác</div>
          </li>

          {levelFrag.educationalLevel.map(data => (
            <li key={data.id} className={styles.tableRow}>
              <div className={styles.col} data-label="Nội dung">
                {data.level}
              </div>
              <div
                className={styles.col}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                data-label="Mô tả">
                <div>{data.description || 'Chưa có'}</div>
              </div>
              <div className={styles.col} data-label="Từ tuổi">
                {data.minAge}
              </div>
              <div className={styles.col} data-label="Đến tuổi">
                {data.maxAge}
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
                    onClick={() => hanldeOpenDelete(data.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="primary"
                    onClick={() => openEdit(data)}>
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-content-end mt-20">
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => openCreate()}>
          Thêm
        </button>
      </div>
    </>
  );
}

export default LevelFragment;
