import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { ParallaxProvider } from 'react-scroll-parallax';
import { CssBaseline } from '@mui/material/';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
// import { grey } from '@mui/material/colors';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import i18n from '@utils/i18n';
import App from './App';
import './index.css';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          margin: 10,
        },
      }, 
    }, 
    MuiPaper: {
        styleOverrides: {
          rounded: { borderRadius: 0 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        }
      },
    },
  },
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#b05279',
    // },
    // secondary: {
    //   main: '#b05279',
    // },
    background: {
      default: '#e0e0e0',
    },
    // error: {
    //   main: "#e87d3e",
    // },
    // success: {
    //   main: "#b4d273",
    // },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ParallaxProvider>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
    </I18nextProvider>
  </ParallaxProvider>
  // </React.StrictMode>
);
