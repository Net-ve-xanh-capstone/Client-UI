import React, { useEffect, useState } from 'react';
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from '../../components/container/PageContainer';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import styles from '../../../ContestManagement/style.module.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete.js';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye.js';
import { useSelector } from 'react-redux';
import Role from '../../../../constant/Role.js';
import { getAllAccount } from '../../../../api/adminApi.js';
import { formatDate } from '../../../../utils/formatDate.js';
import { accountStatusMap } from '../../../../constant/Status.js';

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

const ExaminerManagementPage = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [accountant, setAccountant] = useState([]);

  const options = {
    searchPlaceholder: 'Tìm kiếm theo họ và tên, email, số điện thoại',
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
    onRowClick: (rowData, rowMeta) => {
    },
  };

  const columns = [
    {
      name: 'username',
      label: 'HỌ VÀ TÊN',
      options: {
        customBodyRender: value => (
          <span>
            {value && value.length > 50
              ? value.substring(0, 50) + '...'
              : value}
          </span>
        ),
      },
    },
    {
      name: 'email',
      label: 'EMAIL',
      options: {
        customBodyRender: value => (
          <span>
            {value && value.length > 20
              ? value.substring(0, 20) + '...'
              : value}
          </span>
        ),
      },
    },
    {
      name: 'phone',
      label: 'SỐ ĐIỆN THOẠI',
      textAlign: 'left',

    },
    {
      name: 'birthday',
      label: 'NGÀY SINH',
      options: {
        customBodyRender: value => formatDate(value),
      },
    },
    {
      name: 'gender',
      label: 'GIỚI TÍNH',
      options: {
        customBodyRender: value => <span>{value ? 'Nữ' : 'Nam'}</span>,
      },
    },
    {
      name: 'accountFullName',
      label: 'VAI TRÒ',
    },
    {
      name: 'status',
      label: 'TRẠNG THÁI',
      options: {
        customBodyRender: value => <span>{accountStatusMap[value] || value}</span>,
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
            {userInfo.role === Role.ADMIN && (
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={e => {
                  e.stopPropagation();
                  // handleOpenDelete(value);
                }}
                // disabled={handleActiveDelete(tableData)}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="delete"
              size="small"
              color="info"
              // onClick={() => handleOpenDetail(value)}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </span>
        ),
      },
    },
  ];

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await getAllAccount();
        const result = data?.result.map(val => {
          return {
            id: val.id,
            username: val.username,
            birthday: val.birthday,
            fullName: val.fullName,
            email: val.email,
            address: val.address,
            phone: val.phone,
            gender: val.gender,
            role: val.role,
            status: val.status,
          };
        });
        setAccountant(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccount();
  }, []);
  return (
    <PageContainer title="Quản lý giám khảo" description="Quản lý giám khảo">
      <DashboardCard title="Quản lý giám khảo">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={getMuiTheme()}>
                <span className="table-contest table-contest-detail">
                  <MUIDataTable
                    data={accountant}
                    columns={columns}
                    options={options}
                  />
                </span>
          </ThemeProvider>
        </StyledEngineProvider>
      </DashboardCard>
    </PageContainer>
  );
};

export default ExaminerManagementPage;
