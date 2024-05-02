import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from '@assets/apple-touch-icon.png';

export default function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
{/*        <Box
          component="img"
          sx={{height: 40, marginRight: 1 }}
          alt="Your logo."
          src={Logo}
        />*/}
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          Rugby Rankings
        </Typography>
      </Toolbar>
    </AppBar>
  );
}