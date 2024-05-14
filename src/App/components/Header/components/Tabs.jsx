import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { default as MuiTabs } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import { VALUES } from '@constants/sports';

function renderTab({ value, disabled }) {
  return (
    <Tab
      key={value}
      value={value}
      disabled={disabled}
      label={
        <Typography color="inherit" variant="h6" align="center">
          <Translate text={`app.main.tabs.${value}`} />
        </Typography>
      }
    />
  );
}

export default function Tabs({ sport, disabled, onChangeSport }) {
  const options = [VALUES.MENS, VALUES.WOMENS];

  return (
    <Box sx={{ width: '100%', backgroundColor: 'white' }}>
      <Container>
        <MuiTabs
          variant="fullWidth"
          value={sport}
          onChange={(e, value) => onChangeSport(value)}
          textColor="primary"
          indicatorColor="primary"
        >
          {options.map(value => renderTab({ value, disabled }))}
        </MuiTabs>
      </Container>
    </Box>
  );
}
