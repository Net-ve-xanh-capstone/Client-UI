import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { getById } from '../../../../api/contestStaffApi.js';
import { formatDate } from '../../../../utils/formatDate.js';
import RoundForm from '../../../../components/RoundForm/index.jsx';
import styles from './style.module.css';

function CustomPage({ roundFrag, getContestDetail }) {
  const [modalShow, setModalShow] = useState(false);
  const [round, setRound] = useState();
  const [editRoundData, setEditRoundData] = useState();



  const resetDetail = () => {
    setModalShow(false);
    getContestDetail();
    getRound();
  };

  const getRound = async () => {
    try {
      console.log('checka');
      const { data } = await getById(roundFrag.id);
      setRound(sortRoundsByStartTime(data?.result.educationalLevel));
    } catch (e) {
      console.log('err', e);
    }
  };


  const handleOpenCreate = () => {
    setEditRoundData();
    setModalShow(true);
  };

  const handleOpenEdit = id => {
    const foundRound = round.find(item =>
      item.round.find(ele => ele.id === id),
    );
    const roundData = foundRound.round.find(ele => ele.id === id);
    setEditRoundData(roundData);
    setModalShow(true);
  };
  const sortRoundsByStartTime = data => {
    let sorted = [];
    data.forEach(level => {
      if (level.round && level.round.length > 0) {
        sorted.push({
          ...level,
          round: level.round.sort(
            (a, b) => new Date(a.startTime) - new Date(b.startTime),
          ),
        });
      }
    });
    return sorted;
  };

  useEffect(() => {
    getRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundFrag]);
  return (
    round && (
      <>
        <RoundForm
          modalShow={modalShow}
          onHide={resetDetail}
          roundData={editRoundData}
          contestData={roundFrag}
        />
        <p style={{ padding: '20px', fontSize: '16px', color: '#FFD35A' }}>
          *Vui lòng nhập địa điểm thi nếu có
        </p>
        <div className={styles.roundContainer}>
          <ul className={styles.roundTableResponse}>
            <li className={styles.roundHeader}>
              <div className={styles.col}>Đối tượng</div>
              <div className={styles.col}>Vòng thi</div>
              <div className={styles.col}>Bắt đầu</div>
              <div className={styles.col}>Kết thúc</div>
              <div className={styles.col}>Nộp bản cứng</div>
              <div className={styles.col}>Công bố kết quả</div>
              <div className={styles.col}>Địa điểm</div>
              <div className={styles.col}>Mô tả</div>
              <div className={styles.col}>Trạng thái</div>
              <div className={styles.col}>Tương tác</div>
            </li>
            {round.map(dataRound =>
              dataRound.round?.map(data => (
                <li key={data.id} className={styles.tableRow}>
                  <div className={styles.col} data-label="Đối tượng">
                    {dataRound.level}
                  </div>
                  <div className={styles.col} data-label="Tên vòng thi">
                    {data.name?.length > 100
                      ? data.name.slice(0, 99) + '...'
                      : data.name}
                  </div>
                  <div className={styles.col} data-label="Ngày bắt đầu">
                    {formatDate(data?.startTime)}
                  </div>
                  <div className={styles.col} data-label="Ngày kết thúc">
                    {formatDate(data?.endTime)}
                  </div>
                  <div className={styles.col} data-label="Ngày nộp bản cứng">
                    {formatDate(data?.deadlineSubmissionDate)}
                  </div>
                  <div className={styles.col} data-label="Ngày công bố kết quả">
                    {formatDate(data?.resultAnnouncementDate)}
                  </div>
                  <div className={styles.col} data-label="Địa điểm">
                    {data.location?.length > 100
                      ? data.location.slice(0, 99) + '...'
                      : data.location}

                    {data.location?.length > 100 && (
                      <div className={styles.tooltip}>{data.location}</div>
                    )}
                  </div>
                  <div className={styles.col} data-label="Mô tả">
                    {data.description?.length > 100
                      ? data.description.slice(0, 99) + '...'
                      : data.description}

                    {data.description?.length > 100 && (
                      <div className={styles.tooltip}>{data.description}</div>
                    )}
                  </div>
                  <div className={styles.col} data-label="Trạng thái">
                    {/* <>
                      <Switch
                        checked={checkActiveDate(data)}
                        color="success"
                        disabled
                      />
                    </> */}
                    {data?.status}
                  </div>
                  <div className={styles.col} data-label="Tương tác">
                    <IconButton
                      sx={{ paddingRight: '0 !important' }}
                      aria-label="edit"
                      size="large"
                      color="info"
                      onClick={() => handleOpenEdit(data.id)}>
                      <EditIcon />
                    </IconButton>
                    
                  </div>
                </li>
              )),
            )}
          </ul>
          <div className="flex justify-content-end mt-20">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => handleOpenCreate()}>
              Thêm
            </button>
          </div>
        </div>
      </>
    )
  );
}

export default CustomPage;
