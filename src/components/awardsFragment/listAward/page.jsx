import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAward } from '../../../api/awrdApi.js';
import DeleteModal from '../../DeleteModal/index.jsx';
import styles from './page.module.css';
import AddingModal from '../addingModal/page.jsx';

const ListRoundAward = ({ items, recallData }) => {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [awardsId, setAwardId] = useState('');

  const [editModalShow, setEditModal] = useState(false);
  const [infomation, setInfomation] = useState({
    rank: '',
    quantity: '',
    cash: '',
    artifact: '',
  });

  // patch delete while click
  const handleDelete = async () => {
    try {
      await deleteAward(awardsId);
      toast.success('Xoá thành công!!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      recallData();
    } catch (error) {
      toast.error(error.response.data.message, {
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

  // handle open edit modal
  const editModal = items => {
    for (let index in items) {
      setInfomation(prev => ({
        ...prev,
        [index]: items[index],
      }));
    }
    setEditModal(true);
  };

  // handle hiding modal and clear all field after done
  const triggerHide = () => {
    setEditModal(false);
    for (let index in infomation) {
      infomation[index] = '';
    }
  };

  return (
    <>
      <AddingModal
        modalShow={editModalShow}
        onHide={triggerHide}
        roundId={items?.id}
        recallData={recallData}
        isEdit
        dataEdit={infomation}
      />
      <DeleteModal
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title={'giải thưởng'}
        callBack={handleDelete}
      />
      <div style={{ padding: '10px' }}>
        <Accordion>
          <AccordionSummary
            style={{ fontSize: '16px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <div>{items.rank}</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.roundContainer}>
              <ul className={styles.roundTableResponse}>
                <li
                  className={styles.roundHeader}
                  style={{
                    gridTemplateColumns: 'repeat(5, 1fr)',
                  }}>
                  <div className={styles.col}>Giải thưởng</div>
                  <div className={styles.col}>Số lượng</div>
                  <div className={styles.col}>Hiện kim</div>
                  <div className={styles.col}>Hiện vật</div>
                  <div className={styles.col}>Tương tác</div>
                </li>

                <li
                  className={styles.tableRow}
                  style={{
                    gridTemplateColumns: 'repeat(5, 1fr)',
                  }}>
                  <div className={styles.col} data-label="Giải thưởng">
                    {items.rank}
                  </div>
                  <div className={styles.col} data-label="Số lượng">
                    <div>{items.quantity}</div>
                  </div>
                  <div className={styles.col} data-label="Hiện kim">
                    <div>{items.cash}</div>
                  </div>
                  <div className={styles.col} data-label="Hiện vật">
                    <div>{items.artifact}</div>
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
                        onClick={() => editModal(items)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        color="error"
                        onClick={() => {
                          setDeleteModalShow(true);
                          setAwardId(items.id);
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default ListRoundAward;
