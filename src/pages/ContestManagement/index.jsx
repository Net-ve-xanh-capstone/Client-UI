import React, { useEffect, useState } from 'react';
import ContestDetail from '../../components/ContestDetail';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import styles from './style.module.css';
import ModalForm from '../../components/ModalForm';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import DeleteModal from '../../components/DeleteModal';

function ContestManagement() {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [contest, setContest] = useState([]);
  const [idContestDelete, setIdContestDelete] = useState();
  const [selectedContest, setSelectedContest] = useState(null); // State để lưu trữ contest được chọn

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
        console.log(res.result);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
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
        customBodyRender: (value) => (
          <button className="btn btn-success btn-lg" disabled>
            Active
          </button>
        )
      }
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value) => (
          <div className={styles.btnAction}>
            <button className="btn btn-info btn-lg" onClick={() => handleOpenDetail(value)}>
              Chi tiết
            </button>
            <button onClick={() => handleOpenDelete(value)} className="btn btn-danger btn-lg">
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

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontSize: 20
      },
      palette: {
        background: {
          paper: '#1d1d1d',
          default: '#0f172a'
        },
        mode: 'dark'
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '15px 10px',
              fontWeight: 'bold'
            },
            body: {
              padding: '20px 10px',
              color: '#fff',
              fontWeight: 'bold'
            }
          }
        }
      }
    });

  const handleBack = () => {
    setIsOpenDetail(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <ModalForm modalShow={modalShow} onHide={() => setModalShow(false)} />
      <DeleteModal
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title={'cuộc thi'}
        callBack={handleDelete}
      />
      {!isOpenDetail && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className={styles.buttonContainer}>
            <button className={styles.btnCreate} onClick={() => setModalShow(true)}>
              <span>Tạo cuộc thi</span>
            </button>
          </div>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={getMuiTheme()}>
              <div className={styles.tableContainer}>
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
