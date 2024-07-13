import React, { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import EditContest from '../EditContest';
import { checkEditButton } from '../../utils/checkEditButton';

function ContestFragment({ contestFrag, getContestDetail }) {
  const [modalShow, setModalShow] = useState(false);
  const isEditing = checkEditButton(contestFrag.startTime);
  const resetDetail = () => {
    getContestDetail();
  };

  return (
    <>
      <EditContest
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
        contestEdit={contestFrag}
        callBack={resetDetail}
      />
      <div className="flex row pb-10">
        <p className="col-md-3">Thời gian bắt đầu: </p>
        <p className="col-md-9">{formatDate(contestFrag.startTime)}</p>
      </div>
      <div className="flex row pb-10">
        <p className="col-md-3">Thời gian kết thúc: </p>
        <p className="col-md-9">{formatDate(contestFrag.endTime)}</p>
      </div>

      <div className="flex row pb-10">
        <p className="col-md-3">Mô tả ngắn: </p>
        <p className="col-md-9">{contestFrag.description}</p>
      </div>
      <div className="flex row pb-10">
        <p className="col-md-3">Nội dung cuộc thi: </p>
        <p className="col-md-9">{contestFrag.content}</p>
      </div>
      <div className="flex justify-content-end">
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => setModalShow(true)}
          disabled={isEditing}>
          Chỉnh sửa
        </button>
      </div>
    </>
  );
}

export default ContestFragment;
