import { createTheme } from '@mui/material/styles';
import typography from './Typography';
import { shadows } from './Shadows';

const baselightTheme = createTheme({
  direction: 'ltr',
  font: {
    fontFamily: 'REM',
  },
  palette: {
    primary: {
      main: '#8a208c',
      light: '#4d4d4d',
      dark: '#4570EA',
    },
    secondary: {
      main: '#181b81',
      light: '#4d4d4d',
      dark: '#23afdb',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#4d4d4d',
    },
    info: {
      main: '#539BFF',
      light: '#4d4d4d',
      dark: '#1682d4',
      contrastText: '#4d4d4d',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#4d4d4d',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#4d4d4d',
    },
    purple: {
      A50: '#4d4d4d',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#4d4d4d',
      200: '#4d4d4d',
      300: '#3c3c3c',
      400: '#1e1e1e',
      500: '#111111',
      600: '#000000',
    },
    text: {
      primary: '#111111',
      secondary: '#1e1e1e',
      white_primary: '#FFFFFF',
      white_secondary: '#F6F6F6',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
  typography,
  shadows,
});

export { baselightTheme };
