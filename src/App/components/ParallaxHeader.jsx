import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Translate from '@components/Translate';
import { ParallaxBanner } from 'react-scroll-parallax';
import backgroundSrc from '@assets/images/background.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';

export default function Header({ onClickScroll }) {
  const parallaxStyle = { height: '100vh', aspectRatio: '2/1' };

  const headingStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'common.white',
    flexGrow: 1,
  };

  return (
    <ParallaxBanner style={parallaxStyle} layers={[{ image: backgroundSrc, speed: -30 }]}>
      <Stack sx={headingStyle}>
        <Typography color="inherit" variant="h1" align="center">
          <Translate text="app.header.title" />
        </Typography>
        <IconButton
          sx={{ border: '2px solid white', color: 'common.white', m: 2 }}
          onClick={onClickScroll}
          size="large"
        >
          <KeyboardArrowDownIcon />
        </IconButton>

      </Stack>
    </ParallaxBanner>
  );
}
