import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { createTheme, Pagination, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { deleteCate, getAllCategory } from '../../api/categoryApi.js';
import EditIcon from '@mui/icons-material/Edit';
import EditCategory from '../editCategory/page.jsx';
import AddIcon from '@mui/icons-material/Add';
import AddCatePopup from '../addCatePopup/page.jsx';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MUIDataTable from 'mui-datatables';

function CategoryBlog() {
  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [listCate, setListCate] = useState([]);
  const [openEdit, setOpenEdit] = useState(null);
  const [nameCate, setNameCate] = useState('');
  const [showModal, setOpenModal] = useState(null);

  const [addPopup, setAddPopup] = useState(null);
  const [idCategory, setIdCategory] = useState(null);

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontSize: 20
      },
      palette: {
        background: {
          default: '#0f172a'
        },
        mode: 'light'
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 10px',
              fontWeight: 'bold',
              borderBottom: '1px solid black'
            },
            body: {
              color: '#000',
              fontWeight: 'bold',
              borderBottom: '1px solid black'
            }
          }
        }
      }
    });

  const columns = [
    {
      name: 'name',
      label: 'TÊN THỂ LOẠI',
      options: {
        customBodyRender: (value) => <span>{value}</span>
      }
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <div className={styles.btnAction}>
            <button
              className="btn btn-info btn-lg"
              onClick={() => {
                triggerEdit(value, tableData.rowData[0]);
              }}
            >
              Sữa
            </button>
            <button
              onClick={() => {
                setIdCategory(value);
                setOpenModal(true);
              }}
              className="btn btn-danger btn-lg"
            >
              Xóa
            </button>
          </div>
        )
      }
    }
  ];

  const options = {
    selectableRows: 'none',
    elevation: 5,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
    responsive: 'standard',
    print: false,
    download: false,
    filter: false
  };

  // adding id and value name of category to state
  const triggerEdit = (id, value) => {
    setOpenEdit(id);
    setNameCate(value);
  };

  // handle change navigation
  const handleChange = (_, value) => {
    setCurrentPage(value);
  };

  // get all category
  const fetchData = async () => {
    await getAllCategory(currentPage)
      .then((res) => {
        const data = res.data.result;
        setTotalPage(data.totalPage);
        setListCate(data.list);
      })
      .catch((err) => console.log(err));
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
          theme: 'light'
        });
        fetchData();
        handleCloseModal();
      })
      .catch((err) => console.log(err));
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
          {/* <h2 className={`tf-title pb-20 ${styles.main_title}`}>Quản Lý Thể Loại</h2>
          <div className={styles.section}>
            {listCate.length
              ? listCate.map((vl, _) => (
                  <div key={vl.id} className={styles.card}>
                    <h6>{vl.name}</h6>
                    <div className={styles.icon}>
                      <EditIcon
                        sx={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => triggerEdit(vl.id, vl.name)}
                      />
                      <DeleteOutlineIcon
                        sx={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => {
                          setIdCategory(vl.id);
                          setOpenModal(true);
                        }}
                      />
                    </div>
                  </div>
                ))
              : ''}
            <div className={styles.addmore} onClick={() => setAddPopup(true)}>
              <AddIcon sx={{ fontSize: '4rem', color: '#5142fc' }} />
            </div>
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
                fontSize: '1.5rem'
              },
              '.Mui-selected': {
                backgroundColor: '#5142fc !important', // Customize the selected item background color
                color: 'white' // Ensure text is readable on selected background
              }
            }}
          /> */}
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={getMuiTheme()}>
              <div className={styles.tableContainer}>
                <MUIDataTable
                  title={'Quản lý thể loại'}
                  data={listCate}
                  columns={columns}
                  options={options}
                />
              </div>
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      )}
      {addPopup && <AddCatePopup handleClose={setAddPopup} fetchData={fetchData} />}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc là sẽ xoá thể loại này không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={triggerDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryBlog;
