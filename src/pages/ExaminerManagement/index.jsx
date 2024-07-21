import { RemoveRedEye } from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAll } from '../../api/examinerStaffApi';
import styles from './style.module.css';
import ViewExaminer from '../../components/ViewExaminer';

function ExaminerManagement() {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [examiner, setExaminer] = useState([]);
  const [selectedExaminer, setSelectedExaminer] = useState();
  const { userInfo } = useSelector(state => state.auth);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    getExaminer();
  }, []);

  const resetData = () => {
    setModalShow(false);
    getExaminer();
  };

  const getExaminer = async () => {
    try {
      const { data } = await getAll();
      setExaminer(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleOpenDetail = email => {
    setSelectedExaminer(examiner.find(item => item.email === email));
    setModalShow(true);
  };

  const columns = [
    {
      name: 'code',
      label: 'MÃ',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'fullName',
      label: 'TÊN GIÁM KHẢO',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'email',
      label: 'EMAIL',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'phone',
      label: 'SỐ ĐIỆN THOẠI',
      options: {
        customBodyRender: value => <span>{value}</span>,
      },
    },
    {
      name: 'id',
      label: 'TRẠNG THÁI',
      options: {
        customBodyRender: (value, tableData) => (
          <>
            <Switch checked={isActive} color="success" disabled />
            <button
              className={`btn btn-lg ${isActive ? 'btn-success' : 'btn-secondary'}`}
              disabled>
              {isActive ? 'Active' : 'Inactive'}
            </button>
          </>
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
    },
    onRowClick: (rowData, rowMeta) => {
      handleOpenDetail(rowData[2]?.props?.children);
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

  return (
    <div>
      <ViewExaminer
        modalShow={modalShow}
        onHide={resetData}
        examData={selectedExaminer}
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
            <div>
              <h2 className={styles.titleHeader}>Quản lí giám khảo</h2>
            </div>
          </div>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={getMuiTheme()}>
              <div className="table-contest table-examiner">
                <MUIDataTable
                  //title={'Quản lí chủ đề'}
                  data={examiner}
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

export default ExaminerManagement;
