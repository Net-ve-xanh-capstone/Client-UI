import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './router/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DotLoaderCustom from './components/dotLoader/DotLoader.jsx';
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<DotLoaderCustom />}>
                <Routes>
                    {routes.map((data, index) => (
                        <Route
                            path={data.path}
                            element={data.component}
                            key={index}>
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
            </Suspense>
        </QueryClientProvider>
    );
}

export default App;
