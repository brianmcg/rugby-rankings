import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Translate from '@components/Translate';

// import Logo from '@assets/apple-touch-icon.png';

export default function Header() {
  return (
    <header>
      <Container>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          <Translate text="app.title" />
        </Typography>
      </Container>
    </header>
  );
}