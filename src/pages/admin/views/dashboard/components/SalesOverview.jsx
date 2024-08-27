import React, { useEffect } from 'react';
import { Avatar, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { getQuantityPaintingByYear } from '../../../../../api/adminApi';
import { IconArrowDownLeft, IconArrowUpLeft } from '@tabler/icons';

const SalesOverview = () => {
  // select
  const [month, setMonth] = React.useState(0);
  const [quantity, setQuantity] = React.useState([]);

  const fetchQuantityCompetitor = async () => {
    try {
      const { data } = await getQuantityPaintingByYear();
      const result = data?.result.map(val => {
        return { year: val.year, quantity: val.quantity };
      });
      setQuantity(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuantityCompetitor();
  }, []);

  const handleChange = event => {
    setMonth(event.target.value);
  };

  const currentQuantity = quantity[month]?.quantity || 0;
  const previousQuantity = quantity[month + 1]?.quantity || 0;

  const percentageChange =
    previousQuantity !== 0
      ? ((currentQuantity - previousQuantity) / previousQuantity) * 100
      : 0; // Tránh chia cho 0

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: '\'REM\', sans-serif;',
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [
    quantity[month]?.quantity || 0, // Số lượng của năm hiện tại
    quantity[month - 1]?.quantity || 0, // Số lượng của năm trước
  ];

  return (
    <DashboardCard
      title="Số lượng thí sinh tham gia từng năm"
      action={
        <Select
          //turn off MuiBackdrop-root
          MenuProps={{ disablePortal: true, disableScrollLock: true }}
          autoWidth={true}
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}>
          {quantity.map((val, index) => (
            <MenuItem defaultValue={0} key={index} value={index}>
              {val.year}
            </MenuItem>
          ))}
        </Select>
      }>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {currentQuantity} thí sinh
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: '#FFFFFF', width: 27, height: 27 }}>
              {previousQuantity > currentQuantity ? (
                <IconArrowDownLeft width={20} color="#ff6961" />
              ) : (
                <IconArrowUpLeft width={20} color="#39B69A" />
              )}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {percentageChange.toFixed(2)}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {previousQuantity > currentQuantity ? 'Giảm' : 'Tăng'} so với năm
              ngoái
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: 'none' },
                }}></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {quantity[month]?.year}
              </Typography>
            </Stack>
            {quantity[month + 1]?.year && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: primarylight,
                    svg: { display: 'none' },
                  }}></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  {quantity[month + 1]?.year ?? ''}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={4} sm={4}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="350px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default SalesOverview;
