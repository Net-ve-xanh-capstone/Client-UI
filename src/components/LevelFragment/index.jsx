import React, { useState } from 'react';
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
  const resetDetail = () => {
    setModalShow(false);
    getContestDetail();
  };

  const hanldeOpenDelete = id => {
    setIdLevelDelete(id);
    setDeleteModalShow(true);
  };

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
      console.log('err', e);
    }
  };
  return (
    <>
      <CreateLevel
        modalShow={modalShow}
        onHide={resetDetail}
        contestId={levelFrag.id}
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
                {/* <div style={{ display: 'flex' }}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="error"
                    onClick={() => hanldeOpenDelete(data.id)}
                    disabled={isEditing}>
                    <DeleteIcon />
                  </IconButton>
                </div> */}
              </div>
              <div className={styles.col} data-label="Từ tuổi">
                10
              </div>
              <div className={styles.col} data-label="Đến tuổi">
                12
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-content-end mt-20">
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => setModalShow(true)}>
          Thêm
        </button>
      </div>
    </>
  );
}

export default LevelFragment;
