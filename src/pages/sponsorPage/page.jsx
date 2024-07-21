import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { deleteSponsor, getAllSponsor } from '../../api/sponsorApi.js';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddNewSponsor from '../../components/addNewSponsor/page.jsx';

function SponsorManage() {
  const [listSponsor, setListSponsor] = useState([]);
  const [idSponsor, setIdSponsor] = useState('');
  const [openModal, setOpenModal] = useState(null);
  const [addPopup, setAddPopup] = useState(null);
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

  // get all category
  const fetchData = async () => {
    await getAllSponsor()
      .then((res) => {
        const data = res.data.result;
        setListSponsor(data);
      })
      .catch((err) => console.log(err));
  };

  // open new screen for editing
  const triggerEdit = (id) => {
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
          theme: 'light'
        });
        fetchData();
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: 'name',
      label: 'ĐƠN VỊ TÀI TRỢ',
      options: {
        customBodyRender: (value) => <span>{value}</span>
      }
    },
    {
      name: 'delegate',
      label: 'NGƯỜI ĐẠI DIỆN',
      options: {
        customBodyRender: (value) => <span>{value}</span>
      }
    },
    {
      name: 'phoneNumber',
      label: 'SỐ ĐIỆN THOẠI',
      options: {
        customBodyRender: (value) => <span>{value}</span>
      }
    },
    {
      name: 'address',
      label: 'ĐỊA CHỈ',
      options: {
        customBodyRender: (value) => <span>{value}</span>
      }
    },
    {
      name: 'id',
      label: 'TƯƠNG TÁC',
      options: {
        customBodyRender: (value, tableData) => (
          <div className={styles.btnAction}>
            <button
              className="btn btn-info btn-lg"
              onClick={() => {
                triggerEdit(value, tableData.rowData[0]);
              }}
            >
              Sửa
            </button>
            <button
              onClick={() => {
                setIdSponsor(value);
                setOpenModal(true);
              }}
              className="btn btn-danger btn-lg"
            >
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {addPopup ? (
        <AddNewSponsor
          setAddPopup={setAddPopup}
          idSponsor={idSponsor}
          setIdSponsor={setIdSponsor}
          reCallData={fetchData}
        />
      ) : (
        <>
          <div className={styles.buttonContainer}>
            <button className={styles.btnCreate} onClick={() => setAddPopup(true)}>
              <span>Thêm tài trợ</span>
            </button>
          </div>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={getMuiTheme()}>
              <div className={styles.tableContainer}>
                <MUIDataTable
                  title={'Dánh sách tài trợ'}
                  data={listSponsor}
                  columns={columns}
                  options={options}
                />
              </div>
            </ThemeProvider>
          </StyledEngineProvider>
        </>
      )}
      <Modal show={openModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc là sẽ xoá thể loại này không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={triggerDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SponsorManage;
