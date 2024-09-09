import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, CircularProgress, Box } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import { getConmpetitors, getRounds } from '../../api/competitorApi.js';
import ResourceForm from '../ResourceForm';
import styles from './style.module.css';

function CompetitorFragment({ resourceFrag, statusOfRound }) {
  const [resource, setResource] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm state loading
  const [modalShow, setModalShow] = useState(false);
  const [selectedRound, setSelectedRound] = useState('');
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    fetchRounds();
  }, []);

  useEffect(() => {
    if (selectedRound) {
      getResource(selectedRound);
    } else {
      // Load all competitors if no round is selected
      getResource();
    }
  }, [selectedRound]);

  const fetchRounds = async () => {
    try {
      const { data } = await getRounds(resourceFrag.id);
      const flattenedRounds = data?.result?.educationalLevel.flatMap(level =>
        level.round.map(round => ({
          id: round.id,
          name: `${level.description} - ${round.name}`,
        }))
      );
      setRounds(flattenedRounds);
    } catch (e) {
      console.error('Error fetching rounds:', e);
    }
  };

  const prizePriority = {
    'Giải Nhất': 1,
    'Giải Nhì': 2,
    'Giải Ba': 3,
    'Giải Khuyến Khích': 4,
    null: 6,  // null sẽ được xếp cuối cùng
  };

  // Hàm để lấy và sắp xếp dữ liệu
  const getResource = async (roundId = '') => {
    setLoading(true); // Bắt đầu loading
    try {
      const { data } = await getConmpetitors(roundId);
      let resourceData = data?.result || [];

      // Sắp xếp dữ liệu dựa trên prizePriority
      resourceData.sort((a, b) => {
        const prizeA = a.prize || null;
        const prizeB = b.prize || null;

        const priorityA = prizePriority[prizeA] !== undefined ? prizePriority[prizeA] : 5; // Nếu không có trong prizePriority, xếp vào "other"
        const priorityB = prizePriority[prizeB] !== undefined ? prizePriority[prizeB] : 5;

        return priorityA - priorityB;
      });

      setResource(resourceData);
    } catch (e) {
      console.error('Error fetching competitors:', e);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  // Columns for the table remain unchanged
  const columns = [
    { name: 'code', label: 'Mã Thí Sinh' },
    { name: 'fullName', label: 'Họ và tên' },
    { name: 'age', label: 'Tuổi' },
    { name: 'gender', label: 'Giới tính' },
    { name: 'status', label: 'Tình trạng' },
    {
      name: 'prize',
      label: 'Giải Thưởng',
      options: {
        customBodyRender: value => (value ? value : 'Chưa có'),
      },
    },
    {
      name: 'round',
      label: 'Vòng thi',
      options: {
        customBodyRender: (value, tableMeta) => (
          <span>{value ? value.name : 'Không có vòng thi'}</span>
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
    print: false, // Ẩn nút print nếu bạn muốn tùy chỉnh
    download: true, // Bật nút download
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
    
    // Custom Download behavior
    onDownload: async (buildHead, buildBody, columns, data) => {
      // Thay vì dùng cơ chế mặc định, bạn gọi API của bạn
      try {
        const response = await myCustomApiForDownloadingData();
        if (response.status === 200) {
          // Thực hiện download với dữ liệu từ API của bạn
          const blob = new Blob([response.data], { type: 'text/csv' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'data.csv';
          link.click();
        }
      } catch (error) {
        console.error('Lỗi khi tải xuống:', error);
      }
      return false; // Không sử dụng cơ chế tải xuống mặc định của MUIDataTable
    },
  
    // Tương tự bạn có thể tùy chỉnh chức năng print nếu cần
    onPrint: () => {
      // Gọi API của bạn hoặc thực hiện hành động tùy chỉnh
      console.log("Thực hiện hành động tùy chỉnh khi in");
      return false; // Ngăn hành vi print mặc định
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
    <>
      <ResourceForm
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
        resourceData={resourceFrag}
      />

      {/* Dropdown Filter for Rounds */}
      <div className={styles.filterContainer}>
        <FormControl fullWidth>
          <InputLabel id="round-filter-label">Lọc theo vòng thi</InputLabel>
          <Select
            labelId="round-filter-label"
            id="round-filter"
            value={selectedRound}
            label="Lọc theo vòng thi"
            onChange={handleRoundChange}
          >
            <MenuItem value="">
              <em>Tất cả các vòng</em>
            </MenuItem>
            {rounds.map((round) => (
              <MenuItem key={round.id} value={round.id}>
                {round.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Competitor Table */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={getMuiTheme()}>
          <div className="table-contest">
            {loading ? ( // Hiển thị spinner khi dữ liệu đang được tải
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <MUIDataTable
                data={resource}
                columns={columns}
                options={options}
              />
            )}
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default CompetitorFragment;
