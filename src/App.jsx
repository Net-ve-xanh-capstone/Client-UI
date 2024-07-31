import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './router/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DotLoader } from 'react-spinners';
import { color } from './constant/Color.js';
import ProtectedRoute from './router/ProtectedRoute.jsx';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="screen-center">
            <DotLoader
              color={color.purple}
              loading={true}
              size={50}
              //display center
              css={
                'display: flex !important; ' +
                'justify-content: center !important; ' +
                'align-items: center !important; ' +
                'height: 100vh !important; ' +
                'width: 100% !important;'
              }
            />
          </div>
        }>
        <Routes>
          {routes.map((data, index) => (
            <Route path={data.path} element={data.component} key={index}>
              {data.children &&
                data.children.map(val => {
                  return (
                    <Route
                      path={val.path}
                      element={val.component}
                      key={val.path}
                    />
                  );
                })}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
