import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Translate from '@components/Translate';
import { PRIMARY, SECONDARY, SUCCESS } from '@constants/colors';

const options = [{
  icon: <SportsRugbyIcon sx={{ opacity: 1 }}/>,
  label: 'app.footer.rankings',
  href: 'https://www.world.rugby/rankings',
}, {
  icon: <GitHubIcon sx={{ opacity: 1 }}/>,
  label: 'app.footer.github',
  href: 'https://github.com/brianmcg/rugby-rankings',
}, {
  icon: <AccountCircleIcon sx={{ opacity: 1 }}/>,
  label: 'app.footer.author',
  href: 'http://www.bmcgrath.net',
}];

const renderOption = ({ icon, label, href }) => (
  <Stack key={href} direction="row" alignItems="center" gap={1}>
    {icon}
    <Link href={href} target="_blank" color="inherit">
      <Typography variant="caption">
        <Translate text={label} />
      </Typography>
    </Link>
  </Stack>
);

function Footer() {
  return (
    <Box style={{
      color: 'white',
      marginTop: 20,
      backgroundImage: `linear-gradient(${PRIMARY}, ${SECONDARY})`,
      borderTop: `solid 4px ${SUCCESS}`,
    }}>
      <Container>
        <Box p={8}>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={4}>
            {options.map(option => renderOption(option))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
