import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { ParallaxProvider } from 'react-scroll-parallax';
import { CssBaseline } from '@mui/material/';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import i18n from '@utils/i18n';
import App from './App';
import { colors } from '@constants/colors';

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
    h5: {
      fontWeight: 900,
      // fontFamily: 'CANDY',
    },
    // h6: {
      
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      }, 
    }, 
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: colors.primary,
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          // backgroundColor: colors.secondary,
        }
      }
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
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: colors.warning,
    },
    error: {
      main: colors.error,
    },
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
