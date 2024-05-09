import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { ParallaxProvider } from 'react-scroll-parallax';
import { CssBaseline } from '@mui/material/';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import i18n from '@utils/i18n';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'UNIVERSIDAD',
    },
    // h2: {
    //   fontFamily: 'UNIVERSIDAD',
    // },
    // h3: {
    //   fontFamily: 'UNIVERSIDAD',
    // },
    // h4: {
    //   fontFamily: 'UNIVERSIDAD',
    // },
    // h5: {
    //   fontFamily: 'UNIVERSIDAD',
    // },
    // h6: {
      
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          // margin: 10,
        },
      }, 
    }, 
    MuiIconButton: {
      styleOverrides: {
        root: {
            "&:hover": {
          // color: "red",
          // border: 'solid white 4px'
        }
        }
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
