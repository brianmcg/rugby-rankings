import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Translate from '@components/Translate';

// import Logo from '@assets/apple-touch-icon.png';

export default function NavBar() {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
  {/*        <Box
            component="img"
            sx={{height: 40, marginRight: 1 }}
            alt="Your logo."
            src={Logo}
          />*/}
          {/*<Container>*/}
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <Translate text="app.title" />
            </Typography>
          {/*</Container>*/}
        </Toolbar>
      </AppBar>
    </header>
  );
}