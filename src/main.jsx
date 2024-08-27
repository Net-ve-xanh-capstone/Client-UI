import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/vi';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/lib/integration/react';
import '../public/assets/css/style.css';
import App from './App.jsx';
import DotLoaderCustom from './components/dotLoader/DotLoader.jsx';
import { persistor, store } from './store/configureStore.js';
import ScrollToTop from './utils/ScrollToTop.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<DotLoaderCustom />}>
    <Provider store={store}>
      <PersistGate loading={<div>Waiting</div>} persistor={persistor}>
        <HashRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <ScrollToTop />
            <App></App>
            <ToastContainer />
          </LocalizationProvider>
        </HashRouter>
      </PersistGate>
    </Provider>
  </Suspense>,
);
