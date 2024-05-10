import { createTheme  } from '@mui/material/styles';
import { colors } from '@constants/colors';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'UNIVERSIDAD',
      fontSize: 48,
    },
    h5: {
      fontWeight: 900,
    },
    h6: {
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
          // opacity: 0.5,
          '&.Mui-selected': {
            // backgroundColor: colors.primary,
            // color: 'white',
            opacity: 1,
          }
        }
      },
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
    // MuiAppBar: {
    //   styleOverrides: {
    //     colorPrimary: {
    //       backgroundColor: colors.secondary,
    //     }
    //   }
    // },
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
