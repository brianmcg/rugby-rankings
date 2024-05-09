import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import Translate from '@components/Translate';

export default function ControlBar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <SportsRugbyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="h6" color="inherit" component="div">
            <Translate text="app.main.control.title" />
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
