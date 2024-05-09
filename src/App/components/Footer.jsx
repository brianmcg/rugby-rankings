import Container from '@mui/material/Container';
import Translate from '@components/Translate';
import Divider from '@mui/material/Divider';
import { colors } from '@constants/colors';

function Footer() {
  const { primary, secondary, success } = colors;

  const style = {
    color: 'white',
    marginTop: 20,
    backgroundImage: `linear-gradient(${primary}, ${secondary})`,
    borderTop: `solid 4px ${success}`,
  }

  return (
    <div style={style}>
      <Container>
        <p>Rankings and algorithm are the property of World Rugby</p>
        <Divider />
        <p><Translate text="app.footer.author" /></p>
        <Divider />
        <p>Copyright © 2024</p>
      </Container>
    </div>
  );
}

export default Footer;
