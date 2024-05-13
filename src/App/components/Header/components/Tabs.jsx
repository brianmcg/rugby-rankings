import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { default as MuiTabs } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import { VALUES } from '@constants/sports';

export default function Tabs({ sport, disabled, changeSport }) {
  return (
    <Box sx={{ width: '100%', backgroundColor: 'white' }}>
      <Container>
        <MuiTabs
          variant="fullWidth"
          value={sport}
          onChange={(e, value) => changeSport(value)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            value={VALUES.MENS}
            disabled={disabled}
            label={
              <Typography color="inherit" variant="h6" align="center">
                <Translate text="app.main.tabs.mru" />
              </Typography>
            }
          />
          <Tab
            value={VALUES.WOMENS}
            disabled={disabled}
            label={
              <Typography color="inherit" variant="h6" align="center">
                <Translate text="app.main.tabs.wru" />
              </Typography>
            }
          />
        </MuiTabs>
      </Container>
    </Box>
  );
}
