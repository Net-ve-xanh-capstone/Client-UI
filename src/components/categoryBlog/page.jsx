import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  allCategory,
  categoryNotuse,
  deleteCate,
} from '../../api/categoryApi.js';
import AddCatePopup from '../addCatePopup/page.jsx';
import styles from './page.module.css';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../DeleteModal/index.jsx';

function CategoryBlog() {
  const [listCate, setListCate] = useState([]);
  const [openEdit, setOpenEdit] = useState(null);
  const [nameCate, setNameCate] = useState('');
  const [showModal, setOpenModal] = useState(null);

  const [addPopup, setAddPopup] = useState(null);
  const [idCategory, setIdCategory] = useState(null);

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontSize: 20,
      },
      palette: {
        background: {
          default: '#0f172a',
        },
        mode: 'light',
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 10px',
              fontWeight: 'bold',
              borderBottom: '1px solid black',
            },
            body: {
              color: '#000',
              fontWeight: 'bold',
              borderBottom: '1px solid black',
            },
          },
        },
      },
    });

  const columns = [
    {
      name: 'name',
      label: 'TÊN THỂ LOẠI',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <div className={styles.btnAction}>
            <IconButton
              aria-label="delete"
              size="small"
              color="info"
              onClick={() => {
                triggerEdit(value, tableData.rowData[0]);
              }}>
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => {
                setIdCategory(value);
                setOpenModal(true);
              }}>
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    },
  ];

  const options = {
    selectableRows: 'none',
    elevation: 5,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
    responsive: 'standard',
    print: false,
    download: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: 'Không có dữ liệu',
      },
      pagination: {
        rowsPerPage: 'Số hàng mỗi trang:',
        displayRows: 'của',
      },
      toolbar: {
        search: 'Tìm kiếm',
        viewColumns: 'Xem cột',
        filterTable: 'Lọc bảng',
      },
    },
  };

  // adding id and value name of category to state
  const triggerEdit = (id, value) => {
    setOpenEdit(id);
    setNameCate(value);
  };

  // get all category
  const fetchData = async () => {
    await allCategory()
      .then(res => {
        const data = res.data.result;
        const dataEmpty = res.data.result.list;
        setListCate(dataEmpty !== undefined ? dataEmpty : data);
      })
      .catch(err => console.log(err));
  };

  const triggerDelete = async () => {
    await deleteCate(idCategory)
      .then(() => {
        toast.success('Đã xoá thành công !!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        fetchData();
        handleCloseModal();
      })
      .catch(err => console.log(err));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIdCategory(null);
  };

  // call data in first time join page
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {!(addPopup || openEdit !== null) && (
        <>
          <div className={styles.buttonContainer}>
            <div>
              <h2 className={styles.titleHeader}>Quản lí thể loại</h2>
            </div>
            <button
              className={styles.btnCreate}
              onClick={() => setAddPopup(true)}>
              <span>Tạo Thể Loại</span>
            </button>
          </div>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={getMuiTheme()}>
              <div className={`${styles.tableContainer} table-contest`}>
                <MUIDataTable
                  // title={'Quản lý thể loại'}
                  data={listCate}
                  columns={columns}
                  options={options}
                />
              </div>
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      )}
      {addPopup && (
        <AddCatePopup handleClose={setAddPopup} fetchData={fetchData} />
      )}
      {openEdit !== null && (
        <AddCatePopup
          isEdit
          handleClose={setAddPopup}
          fetchData={fetchData}
          idCategory={openEdit}
          textCategory={nameCate}
          setOpenEdit={setOpenEdit}
        />
      )}
      {/* confirm delete button */}
      <DeleteModal
        show={showModal}
        setShow={setOpenModal}
        title={'thể loại'}
        callBack={triggerDelete}
      />
    </div>
  );
}

export default CategoryBlog;
