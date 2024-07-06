import React from 'react';

function ContestFragment({ contest }) {
  return (
    <>
      <div className="flex row">
        <p className="col-md-3">Thời gian bắt đầu: </p>
        <p className="col-md-9">{contest.startTime}</p>
      </div>
      <div className="flex row">
        <p className="col-md-3">Thời gian kết thúc: </p>
        <p className="col-md-9">{contest.endTime}</p>
      </div>

      <div className="flex row">
        <p className="col-md-3">Mô tả ngắn: </p>
        <p className="col-md-9">{contest.description}</p>
      </div>
      <button className="btn btn-success">Tạo mới</button>
    </>
  );
}

export default ContestFragment;
