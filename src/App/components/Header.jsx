import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import { ParallaxBanner } from 'react-scroll-parallax';
import backgroundSrc from '@assets/background.png';

export default function Header() {
  const parallaxStyle = { height: 480, aspectRatio: '2/1' };

  const headingStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  return (
    <ParallaxBanner
      style={parallaxStyle}
      layers={[{ image: backgroundSrc, speed: -30 }]}
    >
      <Typography color="inherit" style={headingStyle} variant="h1" component="div" sx={{ flexGrow: 1 }}>
        <Translate text="app.header.title" />
      </Typography>
    </ParallaxBanner>
  );
}