import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../public/assets/css/style.css';
import 'dayjs/locale/vi';
import { BrowserRouter } from 'react-router-dom';
import store from './store/configureStore.js';
import { Provider } from 'react-redux';
import ScrollToTop from './utils/ScrollToTop.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        <ScrollToTop />
        <App></App>
      </LocalizationProvider>
    </BrowserRouter>
  </Provider>
);
