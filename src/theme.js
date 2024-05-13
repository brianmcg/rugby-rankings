import { createTheme  } from '@mui/material/styles';

import {
  PRIMARY,
  SECONDARY,
  BACKGROUND,
  INFO,
  WARNING,
  SUCCESS,
  ERROR,
} from '@constants/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Webb Ellis Cup',
    h1: {
      fontWeight: 900,
      fontSize: 48,
    },
    h5: {
      fontWeight: 900,
    },
    h6: {
      fontWeight: 900,
    },
    body2: {
      fontWeight: 900,
    },
    button: {
      fontWeight: 900,
      textTransform: 'none',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transitionBehavior :'normal',
          transitionDelay: '0s',
          transitionDuration: '0.2s',
          transitionProperty: 'all',
          transitionTimingFunction: 'linear',
        },
      }, 
    },
    MuiStack: {
      styleOverrides: {
        root: {
          transitionBehavior :'normal',
          transitionDelay: '0s',
          transitionDuration: '0.2s',
          transitionProperty: 'all',
          transitionTimingFunction: 'linear',
        },
      }, 
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transitionBehavior :'normal',
          transitionDelay: '0s',
          transitionDuration: '0.2s',
          transitionProperty: 'all',
          transitionTimingFunction: 'linear',
        },
      }, 
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundColor: PRIMARY,
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
        indicator: {
          backgroundColor: SUCCESS,
          height: 5,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root:{
          textTransform: 'none',
          color: PRIMARY,
          // '&.Mui-selected': {
          //   opacity: 1,
          // }
        }
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transitionBehavior :'normal',
          transitionDelay: '0s',
          transitionDuration: '0.2s',
          transitionProperty: 'all',
          transitionTimingFunction: 'linear',
          textDecoration: 'none',
          '&:hover': {
            color: INFO,
          },
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
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: BACKGROUND,
    },
    info: {
      main: INFO,
    },
    success: {
      main: SUCCESS,
    },
    warning: {
      main: WARNING,
    },
    error: {
      main: ERROR,
    },
  },
});

export default theme;
