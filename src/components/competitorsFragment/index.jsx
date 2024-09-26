import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import Select from 'react-select';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import { getConmpetitors, getRounds } from '../../api/competitorApi.js';
import ResourceForm from '../ResourceForm';
import styles from './style.module.css';
import * as XLSX from 'xlsx';
import { renderWithTooltip } from '../../pages/admin/views/management/StaffManagementPage.jsx';

function CompetitorFragment({ resourceFrag }) {
  const [resource, setResource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    fetchRounds();
  }, []);

  useEffect(() => {
    if (selectedRound) {
      getResource(selectedRound.value);
    } else {
      getResource();
    }
  }, [selectedRound]);

  const fetchRounds = async () => {
    try {
      const { data } = await getRounds(resourceFrag.id);
      const flattenedRounds = data?.result?.educationalLevel.flatMap(level =>
        level.round.map(round => ({
          value: round.id,
          label: `${level.description} - ${round.name}`,
        })),
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
    null: 6,
  };

  const getResource = async (roundId = '') => {
    setLoading(true);
    try {
      const { data } = await getConmpetitors(roundId);
      let resourceData = data?.result || [];

      resourceData.sort((a, b) => {
        const prizeA = a.prize || null;
        const prizeB = b.prize || null;
        const priorityA = prizePriority[prizeA] !== undefined ? prizePriority[prizeA] : 5;
        const priorityB = prizePriority[prizeB] !== undefined ? prizePriority[prizeB] : 5;
        return priorityA - priorityB;
      });

      setResource(resourceData);
    } catch (e) {
      console.error('Error fetching competitors:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleRoundChange = (selectedOption) => {
    setSelectedRound(selectedOption);
  };

  const columns = [
    {
      name: 'code', label: 'Mã Thí Sinh', options: {
        customBodyRender: value => (
          <span>
          {renderWithTooltip(value)}
        </span>
        ),
      },
    },
    {
      name: 'fullName', label: 'Họ và tên', options: {
        customBodyRender: value => (
          <span>
          {renderWithTooltip(value)}
        </span>
        ),
      },
    },
    {
      name: 'age', label: 'Tuổi', options: {
        customBodyRender: value => (
          <span>
          {renderWithTooltip(value)}
        </span>
        ),
      },
    },
    {
      name: 'gender', label: 'Giới tính', options: {
        customBodyRender: value => (
          <span>
          {renderWithTooltip(value)}
        </span>
        ),
      },
    },
    {
      name: 'status', label: 'Tình trạng', options: {
        customBodyRender: value => (
          <span>
          {renderWithTooltip(value)}
        </span>
        ),
      },
    },
    {
      name: 'prize',
      label: 'Giải Thưởng',
      options: {
        customBodyRender: value => (
          value ? (
            <span>
          {renderWithTooltip(value)}
          </span>
          ) : (
            <span>
              {renderWithTooltip('Không có giải thưởng')}
            </span>
          )
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
    download: true,
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

    onDownload: (buildHead, buildBody, columns, data) => {
      const ws = XLSX.utils.json_to_sheet(
        data.map(row => ({
          'Mã Thí Sinh': row.data[0],
          'Họ và tên': row.data[1],
          'Tuổi': row.data[2],
          'Giới tính': row.data[3],
          'Tình trạng': row.data[4],
          'Giải Thưởng': row.data[5],
          'Vòng thi': row.data[6]?.props?.children || 'Không có vòng thi',
        })),
      );

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Competitors');

      XLSX.writeFile(wb, 'competitors.xlsx');

      return false;
    },

    onRowClick: (rowData) => {
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

  const handleOpenDetail = (competitorId) => {
    // Implement your logic for opening competitor details
    console.log('Opening details for competitor:', competitorId);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'transparent',
      margin: '20px 0px 20px 0px',
      border: 0,
      // match with the menu
      borderRadius: state.isFocused ? '2rem' : '2rem',
      color: '#070F2B',
      // Overwrittes the different states of border
      borderColor: 'none !important',
      // Removes weird border around container
      boxShadow:
        'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
      height: '5rem',
      minWidth: '20rem',
      fontSize: '1.5rem !important',
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: 'none',
      },
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  return (
    <>
      <ResourceForm
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
        resourceData={resourceFrag}
      />

      <div className={styles.filterContainer}>
        <div className="col-md-3">
          <Select
            value={selectedRound}
            onChange={handleRoundChange}
            options={[{ value: '', label: 'Tất cả vòng thi' }, ...rounds]}
            placeholder="Lọc theo vòng thi"
            isClearable
            styles={customStyles}
          />
        </div>
      </div>

      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={getMuiTheme()}>
          <div className="table-contest">
            {loading ? (
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