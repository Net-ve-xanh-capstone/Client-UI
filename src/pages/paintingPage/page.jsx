import AddIcon from '@mui/icons-material/Add';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Pagination, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { paintingApi } from '../../api/paintingApi.js';
import { topicApi } from '../../api/topicApi.js';
import ModalAddPainting from '../../components/addPainting/page.jsx';
import ModalEditPainting from '../../components/editPainting/page.jsx';
import CardPainting from '../../components/paintingCard/page.jsx';
import styles from './page.module.css';

function PaintingPage({ scheduleFrag, getContestDetail, contestId }) {
  const [totalPage, setTotalPage] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);

  const [listPainting, setListPainting] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  // this is when user want to opent edit popup
  const [openEdit, setOpenEdit] = useState(false);
  const [paintingByid, setPaintingByid] = useState(null);

  const [newFilter, setNewFilter] = useState('');

  // this is for searching feature
  const [searching, setSearching] = useState({
    code: '',
    topicName: '',
    level: '',
    roundName: '',
    status: '',
    contestId: contestId,
  });

  // data round and roundtopic
  const [loadingTopic, setLoadingTopic] = useState(true);
  const [clearTopic, setClearTopic] = useState({
    value: '',
    label: 'Chọn chủ đề',
  });
  const [roundTopic, setRoundTopic] = useState([{ val: null, label: null }]);

  // data educationlevel
  const [levelList] = useState([
    { value: 'Bảng A', label: 'Bảng A' },
    { value: 'Bảng B', label: 'Bảng B' },
  ]);

  // data round
  const [roundList] = useState([
    { value: 'Vòng Chung Kết', label: 'Vòng Chung Kết' },
    { value: 'Vòng Sơ Khảo', label: 'Vòng Sơ Khảo' },
  ]);

  // clear all of field in current page
  const clearInput = () => {
    setClearTopic(prev => ({ ...prev, label: 'Chọn chủ đề' }));
    let payload = {};
    for (let index in searching) {
      if (index !== 'contestId') {
        if (index !== 'code') {
          searching[index] = '';
        }
      }
    }
    setNewFilter('');
    payload = { ...searching };
    fetchDataBySearching(payload, 1);
  };

  const handleEditDone = () => {
    setOpenEdit(false);
  };

  const handlePostDone = () => {
    setOpenCreate(false);
  };

  //check if user i already searching
  const isSeaching = () => {
    for (let index in searching) {
      if (index !== 'contestId') {
        if (searching[index] !== '') {
          return true;
        }
      }
    }
    return false;
  };

  const findBySearching = () => {
    if (isSeaching()) {
      fetchDataBySearching(searching, 1);
    } else {
      fetchData(1);
    }
  };

  const handleChange = (_, value) => {
    setPageNumber(value);
    if (isSeaching()) {
      fetchDataBySearching(searching, value);
    } else {
      let payload = {
        code: '',
        topicName: '',
        level: '',
        roundName: '',
        status: '',
        contestId: contestId,
      };
      fetchDataBySearching(payload, value);
    }
  };

  const options = [
    { value: 'Submitted', label: 'Đã nộp' },
    { value: 'Accepted', label: 'Đã chấp nhận' },
    { value: 'Rejected', label: 'Đã từ chối' },
    { value: 'Draft', label: 'Bản nháp' },
    { value: 'Delete', label: 'Đã xóa' },
    { value: 'Pass', label: 'Qua Vòng 1' },
    { value: 'NotPass', label: 'Không qua vòng 1' },
    { value: 'FinalRound', label: 'Vòng chung kết' },
    { value: 'HasPrizes ', label: 'Có giải thưởng' },
  ];

  // styling the topic label
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'transparent',
      border: 0,
      // match with the menu
      borderRadius: state.isFocused ? '2rem' : '2rem',
      color: '#070F2B',
      // Overwrittes the different states of border
      borderColor: 'none !important',
      // Removes weird border around container
      boxShadow:
        'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
      height: '5rem',
      minWidth: '20rem',
      fontSize: '1.5rem !important',
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: 'none',
      },
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  // fetch data by searching
  const fetchDataBySearching = async (payload, pageNumer) => {
    setLoadingPage(true);
    try {
      const res = await paintingApi.filterPainting(
        `paintings/filterpainting?PageSize=8&PageNumber=${pageNumer}`,
        payload,
      );
      const data = res.data.result.list;
      const totalPage = res.data.result.totalPage;

      setTotalPage(totalPage);
      setListPainting(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPage(false);
    }
  };

  // get all topic round
  const fetchAllTopic = async () => {
    setLoadingTopic(true);
    try {
      const res = await topicApi.allTopic('roundtopics/getallroundtopic');
      const data = res.data.result;
      setRoundTopic(data.map(val => ({ value: val.id, label: val.name })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTopic(false);
    }
  };

  const getPaintingByID = async id => {
    try {
      const res = await paintingApi.getPaintingById(`paintings/${id}`);

      setPaintingByid(res.data.result);
      setOpenEdit(true);
    } catch (error) {
      console.log(error);
    }
  };

  // recalling data, if not pass anything in parameter we will calling default value like below
  const recallData = (
    payload = {
      code: '',
      topicName: '',
      level: '',
      roundName: '',
      status: '',
      contestId: contestId,
    },
  ) => {
    fetchDataBySearching(payload, 1);
  };

  useEffect(() => {
    if (isSeaching()) {
      return;
    } else {
      fetchAllTopic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calling first data by contestId
  useEffect(() => {
    if (contestId !== null) {
      let payload = {
        code: '',
        topicName: '',
        level: '',
        roundName: '',
        status: '',
        contestId: contestId,
      };
      recallData(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalAddPainting
        modalShow={openCreate}
        onHide={handlePostDone}
        fetchData={recallData}
        setPageNumber={setPageNumber}
      />
      <ModalEditPainting
        modalShow={openEdit}
        onHide={handleEditDone}
        dataPainting={paintingByid}
        fetchData={recallData}
        setPageNumber={setPageNumber}
        currentSeach={searching}
        currentPage={pageNumber}
      />
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.filter_box}>
            <div className={styles.heros}>
              <div className={styles.searchbox}>
                <input
                  type="text"
                  value={searching.code}
                  placeholder="Mã tranh, tên thí sinh"
                  className={styles.search_field}
                  onChange={e =>
                    setSearching(prev => ({ ...prev, code: e.target.value }))
                  }
                />
              </div>
              <div className={styles.btn_searching}>
                <span
                  className={styles.btn_find}
                  onClick={() => findBySearching()}>
                  <h5>Tìm kiếm</h5>
                </span>
                <span className={styles.btn_find} onClick={() => clearInput()}>
                  <h5>Xoá lọc</h5>
                </span>
              </div>
            </div>
            <div className={styles.filter_body}>
              <Select
                isClearable={true}
                placeholder={<div>Chọn chủ đề</div>}
                // defaultInputValue={{ value: '', label: 'Chọn chủ đề' }}
                styles={customStyles}
                options={roundTopic}
                isLoading={loadingTopic}
                value={clearTopic}
                onChange={val => {
                  setClearTopic(val);
                  setSearching(prev => ({ ...prev, topicName: val?.label }));
                }}
              />
              <Select
                isClearable={true}
                placeholder={<div>Chọn câp bậc</div>}
                // defaultInputValue={{ value: '', label: 'Chọn cấp bậc' }}
                styles={customStyles}
                options={levelList}
                value={{
                  value: '',
                  label: searching.level || 'Chọn cấp bậc',
                }}
                onChange={val =>
                  setSearching(prev => ({
                    ...prev,
                    level: val?.label,
                  }))
                }
              />
              <Select
                isClearable={true}
                placeholder={<div>Chọn vòng thi</div>}
                styles={customStyles}
                options={roundList}
                value={{
                  value: '',
                  label: searching.roundName || 'Chọn vòng thi',
                }}
                onChange={val =>
                  setSearching(prev => ({
                    ...prev,
                    roundName: val?.label,
                  }))
                }
              />
              <Select
                isClearable={true}
                placeholder={<div>Chọn trạng thái</div>}
                styles={customStyles}
                options={options}
                value={{
                  value: '',
                  label: newFilter || 'Chọn trạng thái',
                }}
                onChange={val => {
                  setSearching(prev => ({
                    ...prev,
                    status: val?.value,
                  }));
                  setNewFilter(val?.label);
                }}
              />
            </div>
          </div>
          <div className={styles.expainting}>
            <div className={styles.list_paint}>
              {loadingPage ? (
                Array.from(new Array(8)).map((_, idx) => (
                  <Skeleton
                    className={styles.cared_skeleton}
                    key={idx}
                    variant="rounded"
                  />
                ))
              ) : listPainting?.length ? (
                listPainting.map(val => (
                  <CardPainting
                    key={val.id}
                    items={val}
                    getPaintingByID={getPaintingByID}
                  />
                ))
              ) : (
                <div className={styles.not_found}>
                  <SearchOffIcon sx={{ fontSize: '10rem', color: '#7a798a' }} />
                  <h2 className={`tf-title pb-20 ${styles.notfound_title}`}>
                    Không có bài dự thi nào
                  </h2>
                </div>
              )}
            </div>
            <Pagination
              count={totalPage}
              color="secondary"
              size="large"
              page={pageNumber}
              onChange={handleChange}
              sx={{
                width: '70%',
                display: 'flex',
                justifyContent: 'center',
                '.MuiPaginationItem-text': {
                  fontSize: '1.5rem',
                },
                '.Mui-selected': {
                  backgroundColor: '#5142fc !important', // Customize the selected item background color
                  color: 'white', // Ensure text is readable on selected background
                },
              }}
            />
          </div>
        </div>
        <div className={styles.btn_add} onClick={() => setOpenCreate(true)}>
          <AddIcon
            sx={{
              fontSize: '4rem',
              color: 'white',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PaintingPage;
