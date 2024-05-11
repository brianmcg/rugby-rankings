import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Translate from '@components/Translate';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import Tabs from './components/Tabs';
import Menu from './components/Menu';

const style = {
  width: '100%',
  p: 3,
  bgcolor: 'primary.main',
  color: 'common.white',
  textAlign: 'left',
};

export default function Header({
  sport,
  effective,
  disabled,
  changeSport,
  resetMatches,
  clearMatches,
  openModal,
}) {
  return (
    <Box>
      <Box sx={style}>
        <Container>
          <Stack direction="row" spacing={2} alignItems="center">
            <SportsRugbyIcon sx={{ fontSize: 48 }}/>
            <Typography color="inherit" variant="h1" align="left">
              <Translate text="app.header.title" /> 
            </Typography>

          </Stack>
        </Container>
      </Box>

      <Tabs sport={sport} changeSport={changeSport} />
      
      <Menu
        effective={effective}
        disabled={disabled}
        openModal={openModal}
        resetMatches={resetMatches}
        clearMatches={clearMatches}
      />
    </Box>
  );
}
