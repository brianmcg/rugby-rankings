import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Translate from '@components/Translate';

export default function ControlBar({ label, handleClickPredict, handleClickReset }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {label}
          </Typography>
          <Button
            color="inherit"
            onClick={handleClickPredict}
          >
            <Translate text="app.rankings.predict" />
          </Button>
          <Button
            color="inherit"
            onClick={handleClickReset}
          >
            <Translate text="app.rankings.reset" />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
