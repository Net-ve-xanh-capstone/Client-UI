import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from '@mui/material';
import React, { memo, useState } from 'react';
import AddingModal from '../addingModal/page.jsx';
import styles from '../listAward/page.module.css';
import { deleteAward } from '../../../api/awrdApi.js';
import { toast } from 'react-toastify';
import DeleteModal from '../../DeleteModal/index.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatCurrencyVND, formatNumber } from '../../../utils/formatUtils.js';
import { renderWithTooltip } from '../../../pages/admin/views/management/StaffManagementPage.jsx';

const ListAward = memo(({ items, recallData, statusOfRound }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [awardsId, setAwardId] = useState('');

  const [editModalShow, setEditModal] = useState(false);
  const [infomation, setInfomation] = useState({
    id: '',
    rank: '',
    quantity: '',
    cash: '',
    artifact: '',
  });

  const isActive = !statusOfRound
    .toLowerCase()
    .includes('Chưa bắt đầu'.toLowerCase());

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
    console.log(items);

    for (let index in items) {
      setInfomation(prev => ({
        ...prev,
        [index]: items[index],
      }));
    }
    setEditModal(true);
  };

  // handle hiding modal and clear all field after done
  const triggerHideEdit = () => {
    setEditModal(false);
    for (let index in infomation) {
      infomation[index] = '';
    }
  };

  // open popup
  const triggerOpenPopup = () => {
    setOpenAdd(true);
  };

  // hidden the popup
  const triggerHide = () => {
    setOpenAdd(false);
  };

  const disableAddAward = () => {
    if (
      items?.award?.length > 0 &&
      !items?.name.toLowerCase().includes('Vòng chung kết'.toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <AddingModal
        modalShow={openAdd}
        onHide={triggerHide}
        roundId={items?.id}
        recallData={recallData}
        checkedFinalRound={items.name
          .toLowerCase()
          .includes('vòng chung kết'.toLowerCase())}
      />
      <AddingModal
        modalShow={editModalShow}
        onHide={triggerHideEdit}
        roundId={items?.id}
        recallData={recallData}
        isEdit
        dataEdit={infomation}
        checkedFinalRound={items.name
          .toLowerCase()
          .includes('vòng chung kết'.toLowerCase())}
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
            <div>{items?.name}</div>
          </AccordionSummary>
          <AccordionDetails>
            {/* <ListRoundAward key={val.id} items={val} recallData={recallData} /> */}

            <div className={styles.roundContainer}>
              <ul className={styles.roundTableResponse}>
                <li
                  className={styles.roundHeader}
                  style={{
                    gridTemplateColumns: 'repeat(5, 1fr)',
                  }}>
                  <div className={styles.col}>Giải thưởng</div>
                  <div className={styles.col}>Số lượng</div>
                  <div className={styles.col}>Tiền mặt</div>
                  <div className={styles.col}>Phần thưởng</div>
                  <div className={styles.col}>Tương tác</div>
                </li>
                {items?.award?.length > 0 &&
                  items?.award?.map(val => (
                    <li
                      key={val.id}
                      className={styles.tableRow}
                      style={{
                        gridTemplateColumns: 'repeat(5, 1fr)',
                      }}>
                      <div className={styles.col} data-label="Giải thưởng">
                        {renderWithTooltip(val?.rank)}
                      </div>
                      <div className={styles.col} data-label="Số lượng">
                        <div>{renderWithTooltip(formatNumber(val?.quantity))}</div>
                      </div>
                      <div className={styles.col} data-label="Tiền mặt">
                        <div>{renderWithTooltip(formatCurrencyVND(val?.cash))}</div>
                      </div>
                      <div className={styles.col} data-label="Phần thưởng">
                        <div>{renderWithTooltip(val?.artifact)}</div>
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
                            disabled={isActive || disableAddAward()}
                            onClick={() => {
                              setDeleteModalShow(true);
                              setAwardId(val.id);
                            }}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            size="large"
                            color="primary"
                            disabled={isActive}
                            onClick={() => editModal(val)}>
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
                disabled={isActive || disableAddAward()}
                onClick={() => triggerOpenPopup()}>
                Thêm giải thưởng
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
});

export default ListAward;
