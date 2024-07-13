import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkEditButton } from '../../utils/checkEditButton.js';
import DeleteModal from '../DeleteModal';
import RoundForm from '../RoundForm/index.jsx';
import styles from './style.module.css';
import CreateTopicRound from '../CreateTopicRound/index.jsx';

function TopicFragment({ topicFrag, getContestDetail }) {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [idRoundDelete, setIdRoundDelete] = useState();
  const isEditing = checkEditButton(topicFrag.startTime);
  const [level, setLevel] = useState();
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

  const sortLevel = levels => {
    for (const level of levels) {
      if (level.round && level.round.length > 0) {
        level.round.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime),
        );
      }
    }
    return levels;
  };

  useEffect(() => {
    try {
      setLevel(sortLevel(topicFrag.educationalLevel));
    } catch (e) {
      console.log('err', e);
    }
  }, []);
  return (
    level && (
      <>
        <CreateTopicRound
          modalShow={modalShow}
          onHide={resetDetail}
          topicName={editRoundData}
        />
        <DeleteModal
          show={deleteModalShow}
          setShow={setDeleteModalShow}
          title={'vòng thi'}
          callBack={handleDelete}
        />
        {level.map(dataLevel =>
          dataLevel.round.map(data => (
            <div key={data.id} style={{ padding: '10px' }}>
              <Accordion>
                <AccordionSummary
                  style={{ fontSize: '16px' }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header">
                  <div>
                    {dataLevel.level} - {dataLevel.description} - {data.name}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.roundContainer}>
                    <ul className={styles.roundTableResponse}>
                      <li className={styles.roundHeader}>
                        <div className={styles.col}>Tên chủ đề</div>
                        <div className={styles.col}>Mô tả</div>
                      </li>

                      <li className={styles.tableRow}>
                        <div className={styles.col} data-label="Tên chủ đề">
                          Biển đảo
                        </div>

                        <div className={styles.col} data-label="Mô tả">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <>Chưa có mô tả</>

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
                    </ul>
                  </div>
                  <div className="flex justify-content-end mt-20">
                    <button
                      className="btn btn-outline-primary btn-lg"
                      onClick={() => handleOpenCreate()}
                      disabled={isEditing}>
                      Thêm
                    </button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          )),
        )}
      </>
    )
  );
}

export default TopicFragment;
