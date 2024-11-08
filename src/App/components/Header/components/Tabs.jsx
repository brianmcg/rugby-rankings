import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { default as MuiTabs } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import { SportEnum } from '@constants/enums';

export default function Tabs({ sport, disabled, changeSport }) {
  const onChange = (_e, value) => changeSport(value);

  return (
    <Box sx={{ width: '100%', bgcolor: 'common.white' }}>
      <Container>
        <MuiTabs
          variant="fullWidth"
          value={sport}
          onChange={onChange}
          textColor="primary"
          indicatorColor="primary"
        >
          {Object.values(SportEnum).map(value => (
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
          ))}
        </MuiTabs>
      </Container>
    </Box>
  );
}
