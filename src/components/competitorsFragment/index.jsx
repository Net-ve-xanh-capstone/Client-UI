import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import { getConmpetitors, getRounds } from '../../api/competitorApi.js';
import ResourceForm from '../ResourceForm';
import styles from './style.module.css';

function CompetitorFragment({ resourceFrag, statusOfRound }) {
  const [resource, setResource] = useState([]);
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
        })),
      );
      setRounds(flattenedRounds);
    } catch (e) {
      console.error('Error fetching rounds:', e);
    }
  };

  const getResource = async (roundId = '') => {
    try {
      const { data } = await getConmpetitors(roundId);
      setResource(data?.result || []);
    } catch (e) {
      console.error('Error fetching competitors:', e);
    }
  };

  const handleRoundChange = event => {
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
    print: false,
    download: false,
    filter: false,
    responsive: 'standard',
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
            onChange={handleRoundChange}>
            <MenuItem value="">
              <em>Tất cả các vòng</em>
            </MenuItem>
            {rounds.map(round => (
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
          <div className="table-contest table-examiner">
            <MUIDataTable data={resource} columns={columns} options={options} />
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default CompetitorFragment;
