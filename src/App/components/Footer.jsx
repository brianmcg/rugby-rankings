import Container from '@mui/material/Container';
import Translate from '@components/Translate';
import Divider from '@mui/material/Divider';

function Footer() {
  return (
    <footer style={{ marginTop: 20 }}>
      <Container>
        <Divider />
        <p><Translate text="app.footer.author" /></p>
      </Container>
    </footer>
  );
}

export default Footer;
