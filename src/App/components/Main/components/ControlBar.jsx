import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Translate from '@components/Translate';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';

const renderOptions = ({ handleClickInfo, handleClickReset }) => {
  return (
    <div>
      <Button
        color="inherit" variant="outlined"
        size="large"
        startIcon={<InfoIcon />}
        onClick={handleClickInfo}
      >
        <Translate text="app.main.control.info" />
      </Button>
      <Button
        size="large"
        color="inherit" variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={handleClickReset}
      >
        <Translate text="app.main.control.reset" />
      </Button>
    </div>
  );
}

export default function ControlBar({ handleClickInfo, handleClickReset }) {
  return (
    <AppBar sx={{ mt: '-64px' }} position="static">
      <Container>
      <Toolbar style={{ padding: 0 }} sx={{ justifyContent: "space-between" }}>
        <div/>
        {renderOptions({ handleClickInfo, handleClickReset })}
      </Toolbar>
      </Container>
    </AppBar>
  );
}
