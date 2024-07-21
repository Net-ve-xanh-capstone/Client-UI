import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteTopic, getAll } from '../../api/topicStaffApi';
import DeleteModal from '../../components/DeleteModal';
import ModalForm from '../../components/ModalForm';
import styles from './style.module.css';
import { toast } from 'react-toastify';
import TopicForm from '../../components/TopicForm';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TopicManagement() {
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [topic, setTopic] = useState([]);
  const [idTopicDelete, setIdTopicDelete] = useState();
  const [selectedTopic, setSelectedTopic] = useState();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    getTopic();
  }, []);

  const getTopic = async () => {
    try {
      const { data } = await getAll();
      setTopic(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleOpenDelete = id => {
    setIdTopicDelete(id);
    setDeleteModalShow(true);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteTopic(idTopicDelete);
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
        getTopic();
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleOpenCreate = () => {
    setSelectedTopic();
    setModalShow(true);
  };

  const handleOpenEdit = id => {
    setSelectedTopic(topic.find(item => item.id === id));
    setModalShow(true);
  };

  const columns = [
    {
      name: 'name',
      label: 'TÊN CHỦ ĐỀ',
      options: {
        customBodyRender: value => (
          <span>
            {value.length > 50 ? value.substring(0, 50) + '...' : value}
          </span>
        ),
      },
    },
    {
      name: 'description',
      label: 'MÔ TẢ',
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
            <IconButton
              aria-label="delete"
              size="large"
              color="info"
              onClick={() => handleOpenEdit(value)}>
              <EditIcon />
            </IconButton>
            {userInfo.role === 'Staff' && (
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={() => handleOpenDelete(value)}>
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
    getTopic();
  };

  return (
    <div>
      <TopicForm
        modalShow={modalShow}
        onHide={handlePostDone}
        topicData={selectedTopic}
      />
      <DeleteModal
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        title={'chủ đề'}
        callBack={handleDelete}
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
              <h2 className={styles.titleHeader}>Quản lí chủ đề</h2>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.btnCreate} onClick={handleOpenCreate}>
                <span>Thêm chủ đề</span>
              </button>
            </div>
          </div>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={getMuiTheme()}>
              <div className="table-contest table-contest-topic">
                <MUIDataTable
                  //title={'Quản lí chủ đề'}
                  data={topic}
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

export default TopicManagement;
