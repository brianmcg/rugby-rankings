import { createTheme  } from '@mui/material/styles';
import { colors } from '@constants/colors';

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
          textDecoration: 'none',
        },
      }, 
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary,
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
        indicator: {
          backgroundColor: colors.success,
          height: 5,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root:{
          textTransform: "none",
          color: colors.primary,
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
            color: colors.info,
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

export default theme;
