import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { getAwardContestByYear } from '../../../../../api/adminApi.js';

const ProductPerformance = () => {
  const [year, setYear] = useState(0);
  const [award, setAward] = useState([]);
  const fetchAwardContestByYear = async () => {
    try {
      const { data } = await getAwardContestByYear();
      const result = data?.result.map(val => {
        return { year: val.year, awardQuanity: val.awardQuanity };
      });
      setAward(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAwardContestByYear();
  }, []);

  const handleChange = event => {
    setYear(event.target.value);
  };

  return (
    <DashboardCard title="Giải thưởng hàng năm" action={
      <Select
        MenuProps={{ disablePortal: true, disableScrollLock: true }}
        labelId="year-yy"
        id="year-yy"
        value={year}
        size="small"
        onChange={handleChange}>
        {award.map((val, index) => (
          <MenuItem defaultValue={0} key={index} value={index}>
            {val.year}
          </MenuItem>
        ))}
      </Select>
    }>
      <Box sx={{ overflow: 'auto', width: { xs: 'auto', sm: 'auto' } }}>
        <Table
          aria-label="giải thưởng"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}>
          <TableHead>
            <TableRow sx={{
              '& .MuiTableCell-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
              },
            }}>
              <TableCell>
                <Typography textAlign={'center'} variant="subtitle2" fontWeight={600}>
                  Tên giải
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={'center'} variant="subtitle2" fontWeight={600}>
                  Số lượng
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {award[year]?.awardQuanity.map((val, idx) =>
              (
                <TableRow key={idx}>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: '13px',
                      }}>
                      {val.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      align={'right'}
                      sx={{
                        fontSize: '13px',
                      }}>
                      {val.quantity}
                    </Typography>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
