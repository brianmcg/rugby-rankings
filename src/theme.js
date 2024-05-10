import { createTheme  } from '@mui/material/styles';
import { colors } from '@constants/colors';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'UNIVERSIDAD',
    },
    h5: {
      fontWeight: 900,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      }, 
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundColor: colors.secondary,
        }
      }
    },
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       '&:hover': {
    //         color: colors.primary,
    //       }
    //     }
    //   },
    // },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: colors.secondary,
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

export default theme;
