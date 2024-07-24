import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { paintingApi } from '../../api/paintingApi.js';
import AddPainting from '../../components/addPainting/page.jsx';
import CardPainting from '../../components/paintingCard/page.jsx';
import styles from './page.module.css';
import ModalAddPainting from '../../components/addPainting/page.jsx';
import ModalEditPainting from '../../components/editPainting/page.jsx';

function PaintingPage() {
  const [totalPage, setTotalPage] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);

  const [listPainting, setListPainting] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  // this is when user want to opent edit popup
  const [openEdit, setOpenEdit] = useState(false);
  const [paintingByid, setPaintingByid] = useState(null);

  // this is for searching feature
  const [pageNumsSearch, setPageNumsSearch] = useState(1);
  const [searching, setSearching] = useState({
    code: '',
    topicName: '',
    startDate: '',
    endDate: '',
    level: '',
    roundName: '',
    status: '',
  });

  const handleEditDone = () => {
    setOpenEdit(false);
  };

  const handlePostDone = () => {
    setOpenCreate(false);
  };

  const handleChange = (_, value) => {
    setPageNumber(value);
    fetchData(value);
  };

  const options = [
    { value: 'chocolate', label: 'Blue' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
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

  // get all painting by current page
  const fetchData = async currPage => {
    try {
      const res = await paintingApi.getAllPaintingByPage(
        `paintings/list?PageSize=6&PageNumber=${currPage}`,
      );
      const data = await res.data.result;
      setListPainting(data.list);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchData(pageNumber);
  }, []);

  return (
    <>
      <ModalAddPainting
        modalShow={openCreate}
        onHide={handlePostDone}
        fetchData={fetchData}
      />
      <ModalEditPainting
        modalShow={openEdit}
        onHide={handleEditDone}
        dataPainting={paintingByid}
        fetchData={fetchData}
      />
      <div className={styles.container}>
        <h2 className={`tf-title pb-20 ${styles.main_title}`}>
          Quản lý bài thi
        </h2>
        <div className={styles.section}>
          <div className={styles.filter_box}>
            <div className={styles.heros}>
              <div className={styles.searchbox}>
                <input
                  type="text"
                  placeholder="Mã tranh, tên thí sinh"
                  className={styles.search_field}
                />
              </div>
            </div>
            <div className={styles.filter_body}>
              <Select
                isClearable={true}
                placeholder={<div>Chọn chủ đề</div>}
                styles={customStyles}
                options={options}
              />
              <div className={styles.date_box}>
                <div className={styles.date_start}>
                  <h5 className={styles.title_date}>Thời gian bắt đầu</h5>
                  <input
                    required
                    type="date"
                    name="startTime"
                    id="startTime"
                    className={styles.formControl}
                  />
                </div>
                <div className={styles.date_end}>
                  <h5 className={styles.title_date}>Thời gian kết thúc</h5>
                  <input
                    required
                    type="date"
                    name="endTime"
                    id="endTime"
                    className={styles.formControl}
                  />
                </div>
              </div>
              <Select
                isClearable={true}
                placeholder={<div>Chọn câp bậc</div>}
                styles={customStyles}
                options={options}
              />
              <Select
                isClearable={true}
                placeholder={<div>Chọn vòng thi</div>}
                styles={customStyles}
                options={options}
              />
              <Select
                isClearable={true}
                placeholder={<div>Chọn trạng thái</div>}
                styles={customStyles}
                options={options}
              />
            </div>
          </div>
          <div className={styles.expainting}>
            <div className={styles.list_paint}>
              {listPainting?.length &&
                listPainting.map(val => (
                  <CardPainting
                    key={val.id}
                    items={val}
                    getPaintingByID={getPaintingByID}
                  />
                ))}
            </div>
            <Pagination
              count={totalPage}
              color="secondary"
              size="large"
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
