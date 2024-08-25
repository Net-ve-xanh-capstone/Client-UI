import React, { useState } from 'react';
import { styled, Container, Box, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { baselightTheme } from '../../theme/DefaultColors.js';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>

      <MainWrapper className="mainwrapper">
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper className="page-wrapper">
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          <Header
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <Container
            sx={{
              paddingTop: '20px',
              maxWidth: '1200px',
            }}>
            {/* ------------------------------------------- */}
            {/* Page Route */}
            {/* ------------------------------------------- */}
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <Outlet />
            </Box>
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
        </PageWrapper>
      </MainWrapper>
    </ThemeProvider>
  );
};

export default FullLayout;
