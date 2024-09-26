import React, { useEffect, useState } from 'react';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import Select from 'react-select';
import EditIcon from '@mui/icons-material/Edit';
import PageContainer from '../../components/container/PageContainer';
import { getAll, getById } from '../../../../api/contestStaffApi';
import { getRoundById, adminEdit } from '../../../../api/roundStaffApi';
import styles from './style.module.css';
import { useSelector } from 'react-redux';

const getMuiTheme = () =>
  createTheme({
    typography: { fontSize: 20 },
    palette: {
      background: { default: '#0f172a' },
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

const CustomPage = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [contests, setContests] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingRound, setEditingRound] = useState(null);

  const statusOptions = [
    { value: 'NotStarted', label: 'Chưa bắt đầu' },
    { value: 'InProcess', label: 'Đang tiến hành' },
    { value: 'Complete', label: 'Hoàn thành' },
    { value: 'Delete', label: 'Đã xóa' }
  ];

  useEffect(() => {
    fetchContests();
  }, []);

  useEffect(() => {
    if (selectedContest) {
      fetchContestDetails(selectedContest.value);
    }
  }, [selectedContest]);

  const fetchContests = async () => {
    try {
      const { data } = await getAll();
      const contestOptions = data?.result?.map(contest => ({
        value: contest.id,
        label: contest.name
      })) || [];
      setContests(contestOptions);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  const fetchContestDetails = async (contestId) => {
    setLoading(true);
    try {
      const { data } = await getById(contestId);
      const roundData = [];
      data.result.educationalLevel.forEach(level => {
        level.round.forEach(round => {
          roundData.push({
            id: round.id,
            name: `${level.level} - ${round.name}`,
            startTime: new Date(round.startTime).toLocaleDateString(),
            endTime: new Date(round.endTime).toLocaleDateString(),
            status: round.status,
            location: round.location || 'N/A',
            topic: round.roundTopic[0]?.topic?.name || 'N/A'
          });
        });
      });
      setRounds(roundData);
    } catch (error) {
      console.error('Error fetching contest details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContestChange = (selectedOption) => {
    setSelectedContest(selectedOption);
  };

  const handleEditClick = async (roundId) => {
    try {
      const { data } = await getRoundById(roundId);
      setEditingRound({
        ...data.result,
        status: data.result.status || 'NotStarted' // Ensure status always has a value
      });
      setOpenEditModal(true);
    } catch (error) {
      console.error('Error fetching round details:', error);
    }
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditingRound(null);
  };

  const handleInputChange = (e) => {
    setEditingRound({
      ...editingRound,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusChange = (event) => {
    setEditingRound({
      ...editingRound,
      status: event.target.value
    });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedRound = {
        id: editingRound.id,
        name: editingRound.name,
        startTime: editingRound.startTime,
        endTime: editingRound.endTime,
        location: editingRound.location,
        description: editingRound.description,
        currentUserId: userInfo.Id,
        status: editingRound.status,
        deadlineSubmissionDate: editingRound.deadlineSubmissionDate,
        resultAnnouncementDate: editingRound.resultAnnouncementDate
      };
      
      await adminEdit(updatedRound);
      handleCloseEditModal();
      if (selectedContest) {
        fetchContestDetails(selectedContest.value);
      }
    } catch (error) {
      console.error('Error saving round edit:', error);
    }
  };

  const translateStatus = (status) => {
    const statusMap = {
      NotStarted: 'Chưa bắt đầu',
      InProcess: 'Đang tiến hành',
      Complete: 'Hoàn thành',
      Delete: 'Đã xóa'
    };
    return statusMap[status] || status;
  };

  const roundColumns = [
    { name: 'name', label: 'Tên Vòng Thi' },
    { name: 'startTime', label: 'Ngày Bắt Đầu' },
    { name: 'endTime', label: 'Ngày Kết Thúc' },
    {
      name: 'status',
      label: 'Tình Trạng',
      options: {
        customBodyRender: (value) => translateStatus(value)
      }
    },
    { name: 'location', label: 'Địa Điểm' },
    { name: 'topic', label: 'Chủ Đề' },
    {
      name: 'actions',
      label: 'Thao Tác',
      options: {
        customBodyRender: (value, tableMeta) => (
          <IconButton onClick={() => handleEditClick(rounds[tableMeta.rowIndex].id)}>
            <EditIcon />
          </IconButton>
        )
      }
    }
  ];

  const tableOptions = {
    searchPlaceholder: 'Tìm kiếm vòng thi',
    selectableRows: 'none',
    elevation: 5,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 15, 20],
    responsive: 'standard',
    print: false,
    download: false,
    filter: false,
    textLabels: {
      body: { noMatch: 'Không có dữ liệu' },
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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'transparent',
      margin: '20px 0px 20px 0px',
      border: 0,
      borderRadius: state.isFocused ? '2rem' : '2rem',
      color: '#070F2B',
      borderColor: 'none !important',
      boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
      height: '5rem',
      minWidth: '20rem',
      fontSize: '1.5rem !important',
      '&:hover': { borderColor: 'none' },
    }),
    menu: base => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      padding: 0,
    }),
  };

  return (
    <PageContainer title="Quản lý" description="Quản lý vòng thi">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={getMuiTheme()}>
          <h2>Quản lý vòng thi</h2>
          <div className={styles.filterContainer}>
            <div className="col-md-3">
              <Select
                value={selectedContest}
                onChange={handleContestChange}
                options={contests}
                placeholder="Chọn cuộc thi"
                isClearable
                styles={customStyles}
              />
            </div>
          </div>
          <div className="table-contest">
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <MUIDataTable
                data={rounds}
                columns={roundColumns}
                options={tableOptions}
              />
            )}
          </div>

          <Dialog open={openEditModal} onClose={handleCloseEditModal}>
            <DialogTitle>Chỉnh sửa vòng thi</DialogTitle>
            <DialogContent>
              {editingRound && (
                <>
                  <TextField
                    margin="dense"
                    label="Tên vòng thi"
                    type="text"
                    fullWidth
                    name="name"
                    value={editingRound.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="dense"
                    label="Ngày bắt đầu"
                    type="datetime-local"
                    fullWidth
                    name="startTime"
                    value={editingRound.startTime.split('.')[0]}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    margin="dense"
                    label="Ngày kết thúc"
                    type="datetime-local"
                    fullWidth
                    name="endTime"
                    value={editingRound.endTime.split('.')[0]}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    margin="dense"
                    label="Địa điểm"
                    type="text"
                    fullWidth
                    name="location"
                    value={editingRound.location}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="dense"
                    label="Mô tả"
                    type="text"
                    fullWidth
                    name="description"
                    value={editingRound.description}
                    onChange={handleInputChange}
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="status-select-label">Tình trạng</InputLabel>
                    <MuiSelect
                      labelId="status-select-label"
                      value={editingRound.status}
                      onChange={handleStatusChange}
                      label="Tình trạng"
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  </FormControl>
                  <TextField
                    margin="dense"
                    label="Hạn nộp bài"
                    type="datetime-local"
                    fullWidth
                    name="deadlineSubmissionDate"
                    value={editingRound.deadlineSubmissionDate.split('.')[0]}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    margin="dense"
                    label="Ngày công bố kết quả"
                    type="datetime-local"
                    fullWidth
                    name="resultAnnouncementDate"
                    value={editingRound.resultAnnouncementDate.split('.')[0]}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditModal}>Hủy</Button>
              <Button onClick={handleSaveEdit}>Lưu</Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </StyledEngineProvider>
    </PageContainer>
  );
};

export default CustomPage;