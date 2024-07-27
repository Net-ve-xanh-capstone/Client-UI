import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import {
  activeCompetitor,
  blockCompetitor,
  getAllCompetitor,
  getCompetitorByid,
} from '../../api/competitor.js';
import ModalInforUser from '../../components/ModalInforUser/page.jsx';
import { formatDate } from '../../utils/formatDate';
import styles from './page.module.css';

function CompetitorManage() {
  const [modalShow, setModalShow] = useState(false);
  const [contest, setContest] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [loadingBlock, setLoadingBlock] = useState(false);
  useEffect(() => {
    getContest();
  }, []);

  const getContest = async () => {
    try {
      const { data } = await getAllCompetitor();
      setContest(data?.result);
    } catch (e) {
      console.log('error', e);
    }
  };

  // block user
  const fetchBlockCompetitor = async value => {
    setLoadingBlock(true);
    try {
      await blockCompetitor(value);
      getContest();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBlock(false);
    }
  };

  // unblock user
  const fetchUnBlockCompetitor = async value => {
    setLoadingBlock(true);

    try {
      await activeCompetitor(value);
      getContest();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBlock(false);
    }
  };

  // get user by id
  const handleOpenDetail = async id => {
    try {
      const res = await getCompetitorByid(id);
      const data = res.data.result;
      if (data === null) {
        return;
      }
      setDataUser(data);
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: 'code',
      label: 'MÃ',
      options: {
        customBodyRender: value => (
          <span>
            {value.length > 50 ? value.substring(0, 50) + '...' : value}
          </span>
        ),
      },
    },
    {
      name: 'username',
      label: 'TÊN THÍ SINH',
      options: {
        customBodyRender: value => (
          <span>
            {value.length > 50 ? value.substring(0, 50) + '...' : value}
          </span>
        ),
      },
    },
    {
      name: 'birthday',
      label: 'NGÀY SINH',
      options: {
        customBodyRender: value => formatDate(value),
      },
    },
    {
      name: 'email',
      label: 'EMAIL',
      options: {
        customBodyRender: value => (
          <span>
            {value.length > 50 ? value.substring(0, 50) + '...' : value}
          </span>
        ),
      },
    },
    // {
    //   name: 'status',
    //   label: 'TRẠNG THÁI',
    //   options: {
    //     customBodyRender: (value, _) => {
    //       return (
    //         <>
    //           <Switch
    //             checked={value === 'Active'}
    //             size="small"
    //             color="success"
    //             disabled
    //           />
    //         </>
    //       );
    //     },
    //   },
    // },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <div className={styles.btnAction}>
            {tableData.rowData[4] === 'Active' ? (
              <IconButton
                aria-label="delete"
                size="small"
                color="info"
                disabled={loadingBlock}
                onClick={() => fetchBlockCompetitor(value)}>
                <LockIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                disabled={loadingBlock}
                onClick={() => fetchUnBlockCompetitor(value)}>
                <LockOpenIcon />
              </IconButton>
            )}

            <IconButton
              aria-label="delete"
              size="small"
              color="info"
              disabled={loadingBlock}
              onClick={() => handleOpenDetail(value)}>
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

  const handlePostDone = () => {
    setModalShow(false);
    getContest();
  };

  return (
    <div>
      <ModalInforUser
        modalShow={modalShow}
        onHide={handlePostDone}
        items={dataUser}
      />
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
            <div className={styles.header_title}>
              <h2 className={styles.titleHeader}>Quản lí thí sinh</h2>
            </div>
            <div className={styles.buttonContainer}></div>
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
    </div>
  );
}

export default CompetitorManage;
