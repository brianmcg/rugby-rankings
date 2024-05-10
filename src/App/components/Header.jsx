import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Translate from '@components/Translate';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';

const style = {
  width: '100%',
  p: 3,
  bgcolor: 'primary.main',
  color: 'common.white',
  textAlign: 'left',
};

export default function Header() {
  return (
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
  );
}

