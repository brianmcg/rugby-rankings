import Button from '@mui/material/Button';

import RefreshIcon from '@mui/icons-material/Refresh';

import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';

import { formatDay } from '@utils/date';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';
import Translate from '@components/Translate';


export default function Menu({
  effective,
  disabled,
  resetMatches,
  clearMatches,
  selectMatch,
}) {
  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: 'secondary.main', color: 'common.white'}}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
              <Translate text="app.main.updated" />
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
              {effective?.millis ? formatDay(effective.millis) : null}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            {/* Reset Button */}
            <Button
              disabled={disabled}
              sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={resetMatches}
            >
              <Translate text="app.main.reset" />
            </Button>
            {/* Clear Button*/}
            <Button
              disabled={disabled}
              sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
              color="inherit"
              startIcon={<DeleteIcon />}
              onClick={clearMatches}
            >
              <Translate text="app.main.clear" />
            </Button>
            {/* Add Button */}
            <Button
              disabled={disabled}
              sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
              color="inherit"
              startIcon={<AddIcon />}
              onClick={() => selectMatch()}
            >
              <Translate text="app.main.add" />
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}