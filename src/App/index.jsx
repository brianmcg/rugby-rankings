import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { CssBaseline } from '@mui/material/';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
// import { green, purple } from '@mui/material/colors';

// Background: (46, 46, 46); #2e2e2e
// Comments: (121, 121, 121); #797979
// White: (214, 214, 214); #d6d6d6
// Yellow: (229, 181, 103); #e5b567
// Green: (180, 210, 115); #b4d273
// Orange: (232, 125, 62); #e87d3e
// Purple: (158, 134, 200); #9e86c8
// Pink: (176, 82, 121); #b05279
// Blue: (108, 153, 187); #6c99bb
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          margin: 10,
        },
      }, 
    }, 
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#b05279',
    },
    secondary: {
      main: '#b05279',
    },
    background: {
      default: '#e0e0e0',
    },
    error: {
      main: "#e87d3e",
    },
    success: {
      main: "#b4d273",
    },
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
