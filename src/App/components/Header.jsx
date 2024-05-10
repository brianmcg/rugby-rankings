import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Translate from '@components/Translate';

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
        <Typography color="inherit" variant="h1" align="left">
          <Translate text="app.header.title" /> 
        </Typography>
      </Container>
    </Box>
  );
}

