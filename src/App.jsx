import './App.css';
import { Route, Routes } from 'react-router-dom';
import routes from './router/routes';
import React, { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {routes.map((data, index) => (
          <Route
            onUpdate={() => window.scrollTo(0, 0)}
            exact={true}
            path={data.path}
            element={data.component}
            key={index}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
