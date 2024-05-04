import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import { useTheme } from '@mui/material/styles';

export default function Header() {

  const { palette } = useTheme();

  const styles = {
    backgroundColor: palette.common.black,
    color: palette.common.white,
  };

  return (
    <header style={styles}>
      <div color="primary">
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          <Translate text="app.header.title" />
        </Typography>
      </div>
    </header>
  );
}