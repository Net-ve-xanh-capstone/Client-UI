import React, { useState } from 'react';
import CreateLevel from '../CreateLevel';
import { checkEditButton } from '../../utils/checkEditButton';
import DeleteModal from '../DeleteModal';
import axios from 'axios';
import { toast } from 'react-toastify';

function LevelFragment({ levelFrag, getContestDetail }) {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [idLevelDelete, setIdLevelDelete] = useState();
  const isEditing = checkEditButton(levelFrag.startTime);
  const resetDetail = () => {
    setModalShow(false);
    getContestDetail();
  };

  const hanldeOpenDelete = (id) => {
    setIdLevelDelete(id);
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    axios
      .patch(
        `https://webapp-240702160733.azurewebsites.net/api/educationallevels?id=${idLevelDelete}`
      )
      .then((res) => {
        if (res.result) {
          toast.success('Xóa đối tượng dự thi thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
          getContestDetail();
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };
  return (
    <>
      <CreateLevel modalShow={modalShow} onHide={resetDetail} contestId={levelFrag.id} />
      <DeleteModal
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title={'đối tượng dự thi'}
        callBack={handleDelete}
      />
      {levelFrag.educationalLevel.map((data) => (
        <div
          className="flex row pb-10 align-items-center justify-content-center text-center"
          key={data.id}
        >
          <p className="col-md-2">{data.level} :</p>
          <p className="col-md-8">{data.description || 'None'}</p>
          <div className="col-md-2">
            <button
              className="btn btn-danger"
              disabled={isEditing}
              onClick={() => hanldeOpenDelete(data.id)}
            >
              Xóa
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-content-end mt-20">
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => setModalShow(true)}
          disabled={isEditing}
        >
          Thêm
        </button>
      </div>
    </>
  );
}

export default LevelFragment;
