import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './router/routes';

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {routes.map((data, index) => (
          <Route path={data.path} element={data.component} key={index}></Route>
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
