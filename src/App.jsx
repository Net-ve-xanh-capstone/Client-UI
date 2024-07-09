import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './router/routes';

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {routes.map((data, index) => (
          <Route path={data.path} element={data.component} key={index}>
            {data.children &&
              data.children.map((val, _) => (
                <Route path={val.path} element={val.component} key={val.path} />
              ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
