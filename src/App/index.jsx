import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { CssBaseline } from '@mui/material/';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// import SportsRugbyIcon from '@mui/icons-material/SportsRugby';

const theme = createTheme({
  typography: {
    caption: {
      color: grey[500]
    }
  },
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}

export default App
