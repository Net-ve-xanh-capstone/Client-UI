import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import { color } from '../../constant/Color.js';
import { toast } from 'react-toastify';
import { getById } from '../../api/contestStaffApi.js';
import { deleteResource } from '../../api/resourceStaffApi.js';
import { checkEditButton } from '../../utils/checkEditButton';
import DeleteModal from '../DeleteModal';
import ResourceForm from '../ResourceForm';
import styles from './style.module.css';

function CompetitorFragment({ resourceFrag, getContestDetail, statusOfRound }) {
  const [resource, setResource] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [idResourceDelete, setIdResourceDelete] = useState();
  const isEditing = checkEditButton(resourceFrag.startTime);
  const resetDetail = () => {
    setModalShow(false);
    getResource();
  };

  const isActive = !statusOfRound
    .toLowerCase()
    .includes('Chưa bắt đầu'.toLowerCase());

  useEffect(() => {
    getResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceFrag]);

  const getResource = async () => {
    try {
      const { data } = await getById(resourceFrag.id);
      setResource(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleOpenCreate = () => {
    setModalShow(true);
    setType('create');
  };

  const handleOpenEdit = data => {
    setType(data);
    setModalShow(true);
  };

  const hanldeOpenDelete = id => {
    setIdResourceDelete(id);
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteResource(idResourceDelete);
      if (data?.result) {
        toast.success('Xóa nhà tài trợ thành công', {
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
      <ResourceForm
        modalShow={modalShow}
        onHide={resetDetail}
        resourceData={resourceFrag}
        type={type}
      />
      <DeleteModal
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title={'tài trợ'}
        callBack={handleDelete}
      />
      <div className={styles.roundContainer}>
        <ul className={styles.roundTableResponse}>
          <li className={styles.roundHeader}>
            <div className={styles.col}>No.</div>
            <div className={styles.col}>Tài trợ</div>
            <div className={styles.col}>Đơn vị tài trợ</div>
            <div className={styles.col}>Tương tác</div>
          </li>
          {resource?.resource.length === 0 ? (
            <div className="text-center">
              <h4>Chưa có thí sinh nào</h4>
            </div>
          ) : (
            resource?.resource.map((data, index) => (
              <li key={data.id} className={styles.tableRow}>
                <div className={styles.col} data-label="No.">
                  {index + 1}
                </div>
                <div className={styles.col} data-label="Tài trợ">
                  {data.sponsorship}
                </div>
                <div
                  className={styles.col}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  data-label="Đơn vị tài trợ">
                  <div>{data.sponsor.name}</div>
                </div>
                <div className={styles.col}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      color="error"
                      onClick={() => hanldeOpenDelete(data.id)}
                      // disabled={isEditing}
                      disabled={isActive}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      color="info"
                      onClick={() => handleOpenEdit(data)}
                      // disabled={isEditing}
                      disabled={isActive}>
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
          onClick={handleOpenCreate}
          // disabled={isEditing}
          disabled={isActive}>
          Thêm
        </button>
      </div>
    </>
  );
}

export default CompetitorFragment;
