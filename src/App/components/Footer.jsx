import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Translate from '@components/Translate';
import { colors } from '@constants/colors';

const { primary, secondary, success } = colors;

const options = [{
  icon: <SportsRugbyIcon />,
  label: 'app.footer.rankings',
  href: 'https://www.world.rugby/rankings',
}, {
  icon: <GitHubIcon />,
  label: 'app.footer.github',
  href: 'https://github.com/brianmcg/rugby-rankings',
}, {
  icon: <AccountCircleIcon />,
  label: 'app.footer.author',
  href: 'http://www.bmcgrath.net',
}];

const renderOption = ({ icon, label, href }) => (
  <Stack direction="row" alignItems="center" gap={1}>
    {icon}
    <Link
      href={href}
      target="_blank"
      sx={{
        color: 'white',
        opacity: 0.5,
          '&:hover': {
            opacity: 0.75,
          },
      }}
    >
      <Typography variant="body2">
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
      backgroundImage: `linear-gradient(${primary}, ${secondary})`,
      borderTop: `solid 4px ${success}`,
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
