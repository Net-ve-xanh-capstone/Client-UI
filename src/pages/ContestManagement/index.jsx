import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIDataTable from 'mui-datatables';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteContest, getAll } from '../../api/contestStaffApi';
import ContestDetail from '../../components/ContestDetail';
import DeleteModal from '../../components/DeleteModal';
import ModalForm from '../../components/ModalForm';
import { formatDate } from '../../utils/formatDate';
import styles from './style.module.css';

function ContestManagement() {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [contest, setContest] = useState([]);
  const [idContestDelete, setIdContestDelete] = useState();
  const [selectedContest, setSelectedContest] = useState(null); // State để lưu trữ contest được chọn
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    getContest();
  }, []);

  const getContest = async () => {
    try {
      const { data } = await getAll();
      setContest(data?.result);
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleOpenDetail = id => {
    const contestData = contest.find(item => item.id === id);
    setSelectedContest(contestData);
    setIsOpenDetail(true);
  };

  const handleOpenDelete = id => {
    setIdContestDelete(id);
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteContest(idContestDelete);
      if (data?.result) {
        toast.success('Xóa cuộc thi thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        getContest();
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleActiveDate = data => {
    let currentDate = new Date().toJSON().slice(0, 10);
    const startDate = data.rowData[1].split('T')[0];
    const endDate = data.rowData[2].split('T')[0];

    if (startDate <= currentDate && currentDate <= endDate) return true;

    return false;
  };

  const handleActiveDelete = data => {
    let currentDate = new Date().toJSON().slice(0, 10);
    const startDate = data.rowData[1].split('T')[0];

    if (currentDate < startDate) return false;

    return true;
  };

  const columns = [
    {
      name: 'name',
      label: 'TÊN CUỘC THI',
      options: {
        customBodyRender: value => (
          <span>
            {value.length > 50 ? value.substring(0, 50) + '...' : value}
          </span>
        ),
      },
    },
    {
      name: 'startTime',
      label: 'THỜI GIAN BẮT ĐẦU',
      options: {
        customBodyRender: value => formatDate(value),
      },
    },
    {
      name: 'endTime',
      label: 'THỜI GIAN KẾT THÚC',
      options: {
        customBodyRender: value => formatDate(value),
      },
    },
    {
      name: 'accountFullName',
      label: 'TÊN STAFF',
    },
    {
      name: 'TRẠNG THÁI',
      options: {
        customBodyRender: (value, tableData) => {
          const isActive = handleActiveDate(tableData);

          return (
            <>
              <Switch
                checked={isActive}
                size="small"
                color="success"
                disabled
              />
            </>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <div className={styles.btnAction}>
            <span style={{ display: 'none' }} name="id">
              {value}
            </span>
            <IconButton
              aria-label="delete"
              size="small"
              color="info"
              onClick={() => handleOpenDetail(value)}>
              <RemoveRedEyeIcon />
            </IconButton>
            {userInfo.role === 'Staff' && (
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={e => {
                  e.stopPropagation();
                  handleOpenDelete(value);
                }}
                disabled={handleActiveDelete(tableData)}>
                <DeleteIcon />
              </IconButton>
            )}
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
    onRowClick: rowData => {
      const obj = rowData[5]?.props?.children?.find(
        item => item.type === 'span',
      );
      handleOpenDetail(obj?.props?.children);
    },
  };

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

  const handleBack = () => {
    setIsOpenDetail(false);
    getContest(); 
  };

  const handlePostDone = () => {
    setModalShow(false);
    getContest();
  };

  return (
    <div>
      <ModalForm modalShow={modalShow} onHide={handlePostDone} />
      <DeleteModal
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title={'cuộc thi'}
        callBack={handleDelete}
      />
      {!isOpenDetail && (
        <div className="blur-container">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              overflow: 'hidden',
              padding: '10px 20px 0 20px',
            }}>
            <div className={styles.headerContainer}>
              <div>
                <h2 className={styles.titleHeader}>Quản lí cuộc thi</h2>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.btnCreate}
                  onClick={() => setModalShow(true)}>
                  <span>Tạo cuộc thi</span>
                </button>
              </div>
            </div>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={getMuiTheme()}>
                <div className="table-contest table-contest-detail">
                  <MUIDataTable
                    //title={'Quản lí cuộc thi'}
                    data={contest}
                    columns={columns}
                    options={options}
                  />
                </div>
              </ThemeProvider>
            </StyledEngineProvider>
          </div>
        </div>
      )}
      {isOpenDetail && (
        <div>
          <ContestDetail contest={selectedContest} handleBack={handleBack} />
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ContestManagement);
