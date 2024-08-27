import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import ProductPerformance from './components/ProductPerformance';

const Dashboard = () => {
 
  return (
    <PageContainer title="Thống kê" description="Thống kê hàng năm">
      <Grid width={1} container spacing={3}>
        <Grid item lg={12}>
          <SalesOverview />
        </Grid>
        <Grid item lg={12}>
          <ProductPerformance />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
