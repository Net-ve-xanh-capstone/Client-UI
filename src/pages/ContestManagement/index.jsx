import React, { useEffect, useState } from 'react';
import ContestDetail from '../../components/ContestDetail';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import styles from './style.module.css';
import ModalForm from '../../components/ModalForm';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import DeleteModal from '../../components/DeleteModal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';

function ContestManagement() {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [contest, setContest] = useState([]);
  const [idContestDelete, setIdContestDelete] = useState();
  const [selectedContest, setSelectedContest] = useState(null); // State để lưu trữ contest được chọn
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    getContest();
  }, []);

  const getContest = () => {
    axios
      .get(`https://webapp-240702160733.azurewebsites.net/api/contests/getallcontest`)
      .then((res) => {
        setContest(res?.result);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleOpenDetail = (id) => {
    const contestData = contest.find((item) => item.id === id);
    setSelectedContest(contestData);
    setIsOpenDetail(true);
  };

  const handleOpenDelete = (id) => {
    setIdContestDelete(id);
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    axios
      .patch(`https://webapp-240702160733.azurewebsites.net/api/contests?id=${idContestDelete}`)
      .then((res) => {
        if (res.result) {
          toast.success('Xóa cuộc thi thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
          getContest();
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleActiveDate = (data) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    const startDate = data.rowData[1].split('T')[0];
    const endDate = data.rowData[2].split('T')[0];

    if (startDate <= currentDate && currentDate <= endDate) return true;

    return false;
  };

  const handleActiveDelete = (data) => {
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
        customBodyRender: (value) => (
          <span>{value.length > 50 ? value.substring(0, 50) + '...' : value}</span>
        )
      }
    },
    {
      name: 'startTime',
      label: 'THỜI GIAN BẮT ĐẦU',
      options: {
        customBodyRender: (value) => formatDate(value)
      }
    },
    {
      name: 'endTime',
      label: 'THỜI GIAN KẾT THÚC',
      options: {
        customBodyRender: (value) => formatDate(value)
      }
    },
    {
      name: 'accountFullName',
      label: 'TÊN STAFF'
    },
    {
      name: 'TRẠNG THÁI',
      options: {
        customBodyRender: (value, tableData) => {
          const isActive = handleActiveDate(tableData);

          return (
            <>
              <Switch checked={isActive} color="success" disabled />
              <button
                className={`btn btn-lg ${isActive ? 'btn-success' : 'btn-secondary'}`}
                disabled
              >
                {isActive ? 'Active' : 'Inactive'}
              </button>
            </>
          );
        }
      }
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <div className={styles.btnAction}>
            <button className="btn btn-info btn-lg" onClick={() => handleOpenDetail(value)}>
              Chi tiết
            </button>
            {userInfo.role === 'Staff' && (
              <button
                onClick={() => handleOpenDelete(value)}
                disabled={handleActiveDelete(tableData)}
                className="btn btn-danger btn-lg"
              >
                Xóa
              </button>
            )}
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
        <div className={styles.blurContainer}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              overflow: 'hidden',
              padding: '20px'
            }}
          >
            <div className={styles.buttonContainer}>
              <button className={styles.btnCreate} onClick={() => setModalShow(true)}>
                <span>Tạo cuộc thi</span>
              </button>
            </div>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={getMuiTheme()}>
                <div className="table-contest">
                  <MUIDataTable
                    title={'Quản lí cuộc thi'}
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

export default ContestManagement;
