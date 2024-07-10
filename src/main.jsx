import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../public/assets/css/style.css';
import 'dayjs/locale/vi';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './store/configureStore.js';
import { Provider } from 'react-redux';
import ScrollToTop from './utils/ScrollToTop.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div>Waiting</div>} persistor={persistor}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
          <ScrollToTop />
          <App></App>
          <ToastContainer />
        </LocalizationProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
