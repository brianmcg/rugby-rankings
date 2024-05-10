import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import Translate from '@components/Translate';

import RefreshIcon from '@mui/icons-material/Refresh';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ParallaxBanner } from 'react-scroll-parallax';
import backgroundSrc from '@assets/images/header-background.png';
const parallaxStyle = { height: 400, aspectRatio: '3/1' };

import { formatDay } from '@utils/date';

import Button from '@mui/material/Button';


const headingStyle = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

export default function ControlBar({ sport, effective, onChangeSport, onReset }) {


  return (
    <AppBar position="static">
      <ParallaxBanner style={parallaxStyle} layers={[{ image: backgroundSrc, speed: -30 }]}>
        <Box direction="row" style={headingStyle} sx={{ flexGrow: 1 }}>
          <Typography color="inherit" variant="h1" align="center">
            <Translate text="app.header.title" /> 
          </Typography>
        </Box>
      </ParallaxBanner>
      {/*<Box sx={{ width: '100%', height: 100 }} />*/}
      <Box sx={{ width: '100%', backgroundColor: 'white' }}>
        <Container sx={{  }}>
          <Tabs
            variant="fullWidth"
            value={sport}
            onChange={onChangeSport}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label={<Typography color="inherit" variant="b1" align="center">Mens</Typography>} value="mru" />
            <Tab label="wru" value="wru" />
          </Tabs>
        </Container>
      </Box>
      <Box sx={{ width: '100%', p: 4 }}>
        <Container>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2"><Translate text="app.header.updated" /></Typography>
            <Typography variant="subtitle2">{formatDay(effective.millis)}</Typography>
          </Stack>

          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onReset}
          >
            <Translate text="app.main.matches.reset" />
          </Button>
        </Container>
      </Box>
    </AppBar>
  );
}
