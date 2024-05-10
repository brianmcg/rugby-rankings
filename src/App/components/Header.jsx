import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Translate from '@components/Translate';
import { ParallaxBanner } from 'react-scroll-parallax';
import backgroundSrc from '@assets/images/header-background.png';

export default function Header() {
  const parallaxStyle = { height: 400, aspectRatio: '3/1' };

  const headingStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  return (
    <ParallaxBanner style={parallaxStyle} layers={[{ image: backgroundSrc, speed: -30 }]}>
      <Stack direction="row" style={headingStyle} sx={{ flexGrow: 1 }}>
        <Typography color="inherit" variant="h1" align="center">
          <Translate text="app.header.title" /> 
        </Typography>
      </Stack>
    </ParallaxBanner>
  );
}
