import Container from '@mui/material/Container';
import Translate from '@components/Translate';

function Footer() {
  return (
    <footer>
      <Container>
        <p><Translate text="app.author" /></p>
      </Container>
    </footer>
  );
}

export default Footer;
