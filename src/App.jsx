import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './router/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { baselightTheme } from './pages/admin/theme/DefaultColors.js';

function App() {
  const queryClient = new QueryClient();
  const theme = baselightTheme;
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Routes>
        {routes.map((data, index) => (
          <Route path={data.path} element={data.component} key={index}>
            {data.children &&
              data.children.map((val, _) => (
                <Route
                  path={val.path}
                  element={val.component}
                  key={val.path}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
