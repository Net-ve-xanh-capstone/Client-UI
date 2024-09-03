import React, { useCallback, useEffect, useRef, useState } from 'react';
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from '../../components/container/PageContainer';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye.js';
import { useSelector } from 'react-redux';
import Role from '../../../../constant/Role.js';
import {
  activeAccount,
  getAllAccount,
  inactiveAccount,
} from '../../../../api/adminApi.js';
import { formatDate } from '../../../../utils/formatDate.js';
import { accountStatusMap, roleMap } from '../../../../constant/Status.js';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { Loop } from '@mui/icons-material';
import ActiveModal from '../../../../components/ActiveModal/index.jsx';
import styles from './style.module.css';
import AccountForm from './AccountForm.jsx';

const renderWithTooltip = (value, maxLength = 20) => (
  <Tooltip title={value}>
    <span>
      {value && value.length > maxLength
        ? value.substring(0, maxLength) + '...'
        : value}
    </span>
  </Tooltip>
);

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
  const [idDelete, setIdDelete] = useState(null);
  const [status, setStatus] = useState('');
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleOpenRef = useRef(null);
  useEffect(() => {
    fetchAccount();
  }, []);

  const handleOpenDelete = id => {
    const status = accountant.find(val => val.id === id).status;
    setStatus(status);
    setIdDelete(id);
    setDeleteModalShow(true);
  };

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
      name: 'fullName',
      label: 'HỌ VÀ TÊN',
      options: {
        customBodyRender: value => renderWithTooltip(value, 30),
      },
    },
    {
      name: 'email',
      label: 'EMAIL',
      options: {
        customBodyRender: value => renderWithTooltip(value, 20),
      },
    },
    {
      name: 'phone',
      label: 'SỐ ĐIỆN THOẠI',
      textAlign: 'left',
      options: {
        customBodyRender: value => renderWithTooltip(value),
      },
    },
    {
      name: 'birthday',
      label: 'NGÀY SINH',
      options: {
        customBodyRender: value => renderWithTooltip(formatDate(value)),
      },
    },
    {
      name: 'gender',
      label: 'GIỚI TÍNH',
      options: {
        customBodyRender: value => {
          const gender = value ? 'Nữ' : 'Nam';
          return renderWithTooltip(gender);
        },
      },
    },
    {
      name: 'role',
      label: 'VAI TRÒ',
      options: {
        customBodyRender: value => {
          const status = roleMap[value] || value;
          return renderWithTooltip(status);
        },
      },
    },
    {
      name: 'status',
      label: 'TRẠNG THÁI',
      options: {
        customBodyRender: value => {
          const status = accountStatusMap[value] || value;
          return renderWithTooltip(status);
        },
      },
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <span>
            <span style={{ display: 'none' }} name="id">
              {value}
            </span>
            {userInfo && userInfo?.role === Role.ADMIN && (
              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={e => {
                  e.stopPropagation();
                  handleOpenDelete(value);
                }}>
                <Loop />
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

  const handleDelete = async () => {
    try {
      if (status === 'Active') {
        const { data } = await inactiveAccount(idDelete);
        if (data?.result) {
          toast.success('Khóa tài khoản thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          fetchAccount();
        }
      } else {
        const { data } = await activeAccount(idDelete);
        if (data?.result) {
          toast.success('Mở khóa tài khoản thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          fetchAccount();
        }
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const toggleModal = useCallback(() => {
    setModalShow(prevState => !prevState);
  }, []);

  const handleAddAccount = useCallback(() => {
    handleOpenRef.current?.handleOpen();
  }, []);

  return (
    <PageContainer title="Quản lý giám khảo" description="Quản lý giám khảo">
      <DashboardCard title="Quản lý giám khảo" action={
        <div className={styles.buttonContainer}>
          <button className={styles.btnCreate} onClick={handleAddAccount}>
            <span>Tạo tài khoản cho Staff</span>
          </button>
        </div>
      }>
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
        <ActiveModal
          show={deleteModalShow}
          setShow={setDeleteModalShow}
          title={'tài khoản'}
          callBack={handleDelete}
          status={status}
        />
      </DashboardCard>
      <AccountForm
        ref={handleOpenRef}
        modalShow={modalShow}
        toggle={toggleModal}
      />
    </PageContainer>
  );
};

export default ExaminerManagementPage;
