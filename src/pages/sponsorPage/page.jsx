import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { deleteSponsor, getAllSponsor } from '../../api/sponsorApi.js';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MUIDataTable from 'mui-datatables';
import { toast } from 'react-toastify';
import AddNewSponsor from '../../components/addNewSponsor/page.jsx';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../../components/DeleteModal/index.jsx';

function SponsorManage() {
  const [listSponsor, setListSponsor] = useState([]);
  const [idSponsor, setIdSponsor] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [addPopup, setAddPopup] = useState(false);
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

  // get all category
  const fetchData = async () => {
    await getAllSponsor()
      .then(res => {
        const data = res.data.result;
        const fakeData = res.data.result.list;
        setListSponsor(data ? data : fakeData);
      })
      .catch(err => console.log(err));
  };

  // open new screen for editing
  const triggerEdit = id => {
    setIdSponsor(id);
    setAddPopup(true);
  };

  // close model if user dont want do next action
  const handleCloseModal = () => {
    setOpenModal(false);
    setIdSponsor(null);
  };

  // calling api for deleting
  const triggerDelete = async () => {
    await deleteSponsor(idSponsor)
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

  const columns = [
    {
      name: 'name',
      label: 'ĐƠN VỊ TÀI TRỢ',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'delegate',
      label: 'NGƯỜI ĐẠI DIỆN',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'phoneNumber',
      label: 'SỐ ĐIỆN THOẠI',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'address',
      label: 'ĐỊA CHỈ',
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
            <span style={{ display: 'none' }}>{value}</span>
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => {
                setIdSponsor(value);
                setOpenModal(true);
              }}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              color="info"
              onClick={() => {
                triggerEdit(value, tableData.rowData[0]);
              }}>
              <RemoveRedEyeIcon />
            </IconButton>
          </div>
        ),
      },
    },
  ];

  const options = {
    selectableRows: 'none',
    elevation: 5,
    rowsPerPage: 4,
    rowsPerPageOptions: [4, 10, 20, 30],
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
    // onRowClick: (rowData, rowMeta) => {
    //   const obj = rowData[4]?.props?.children?.find(
    //     item => item.type === 'span',
    //   );
    //   setIdSponsor(obj?.props?.children);
    //   setAddPopup(true);
    // },
  };

  const handlePostDone = () => {
    setAddPopup(false);
    setIdSponsor(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <AddNewSponsor
        modalShow={addPopup}
        onHide={handlePostDone}
        setAddPopup={setAddPopup}
        idSponsor={idSponsor}
        setIdSponsor={setIdSponsor}
        reCallData={fetchData}
      />
      <>
        <div className={styles.buttonContainer}>
          <div>
            <h2 className={styles.titleHeader}>Quản lí nhà tài trợ</h2>
          </div>
          <button
            className={styles.btnCreate}
            onClick={() => setAddPopup(true)}>
            <span>Thêm tài trợ</span>
          </button>
        </div>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={getMuiTheme()}>
            <div className={`${styles.tableContainer} table-contest`}>
              <MUIDataTable
                // title={'Dánh sách tài trợ'}
                data={listSponsor}
                columns={columns}
                options={options}
              />
            </div>
          </ThemeProvider>
        </StyledEngineProvider>
      </>
      <DeleteModal
        show={openModal}
        setShow={setOpenModal}
        title={'giám khảo'}
        callBack={triggerDelete}
      />
    </div>
  );
}

export default SponsorManage;
