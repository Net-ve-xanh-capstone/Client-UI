import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
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
import { TablePagination } from '@mui/material';
import { renderWithTooltip } from '../admin/views/management/StaffManagementPage.jsx';

const CustomFooter = ({
                        count,
                        page,
                        rowsPerPage,
                        handlePageChange,
                        handleRowsPerPageChange,
                      }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <TablePagination
        sx={{ width: '100%' }}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[4, 10, 20, 30]}
        count={count}
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} của ${count !== -1 ? count : `nhiều hơn ${to}`}`
        }
        page={page}
        component="div"
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

function ContestManagement() {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [contest, setContest] = useState([]);
  const [contestPaging, setContestPaging] = useState([]);
  const [idContestDelete, setIdContestDelete] = useState();
  const [selectedContest, setSelectedContest] = useState(null); // State để lưu trữ contest được chọn
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    getContest();
  }, []);

  const getContest = async () => {
    try {
      const { data } = await getAll();
      const fetchedContest = data?.result || [];
      setContest(fetchedContest);
    } catch (e) {
      console.log('error', e);
    }
  };

  const getPaginatedData = () => {
    const start = page * rowsPerPage;
    const end = Math.min(start + rowsPerPage, contest.length);
    return contest.slice(start, end);
  };

  useEffect(() => {
    setContestPaging(getPaginatedData());
  }, [page, rowsPerPage, contest]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const handleActiveDelete = data => {
    return (
      data?.rowData[4].toLowerCase().includes('Hoàn thành'.toLowerCase()) ||
      data?.rowData[4].toLowerCase().includes('Đang tiến hành'.toLowerCase()) ||
      data?.rowData[4].toLowerCase().includes('Đã xóa'.toLowerCase())
    );
  };

  // const addEmptyRow = () => {
  //   const emptyRow = {
  //     id: '',
  //     name: '',
  //     startTime: '',
  //     endTime: '',
  //     accountFullName: '',
  //     status: '',
  //   };
  //   setContest([emptyRow, ...contest]);
  // };

  const columns = [
    {
      name: 'name',
      label: 'TÊN CUỘC THI',
      options: {
        customBodyRender: value => (
          <span>
            {value && renderWithTooltip(value, 20)}
          </span>
        ),
      },
    },
    {
      name: 'startTime',
      label: 'THỜI GIAN BẮT ĐẦU',
      options: {
        customBodyRender: value => (
          <span>
            {value && renderWithTooltip(formatDate(value), 20)}
          </span>
        ),
      },
    },
    {
      name: 'endTime',
      label: 'THỜI GIAN KẾT THÚC',
      options: {
        customBodyRender: value => (
          <span>
            {value && renderWithTooltip(formatDate(value), 20)}
          </span>
        ),
      },
    },
    {
      name: 'accountFullName',
      label: 'TÊN NHÂN VIÊN',
      options: {
        customBodyRender: value => (
          <span>
            {value && renderWithTooltip(value, 20)}
          </span>
        ),
      },
    },
    {
      name: 'status',
      label: 'TRẠNG THÁI',
      options: {
        customBodyRender: value => (
          <span>
            {value && renderWithTooltip(value, 20)}
          </span>
        ),
      },
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <span className={styles.btnAction}>
            <span style={{ display: 'none' }} name="id">
              {value}
            </span>
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
            <IconButton
              aria-label="delete"
              size="small"
              color="info"
              onClick={() => handleOpenDetail(value)}>
              <RemoveRedEyeIcon />
            </IconButton>
          </span>
        ),
      },
    },
  ];

  const options = {
    selectableRows: 'none',
    elevation: 5,
    rowsPerPage: rowsPerPage,
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
    customFooter: () => (
      <CustomFooter
        page={page}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        count={contest.length}
      />
    ),
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
                <span className="table-contest table-contest-detail">
                  <MUIDataTable
                    data={contestPaging}
                    columns={columns}
                    options={options}
                  />
                </span>
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
