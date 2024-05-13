import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Translate from '@components/Translate';
import { formatDay } from '@utils/date';

export default function Menu({ effective, disabled, onResetMatches, onClearMatches, onSelectMatch }) {
  const buttonStyle = {
    opacity: 0.6,
    '&:hover': { opacity: 1 } ,
    '&:disabled': { opacity: 0 },
  };
  
  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: 'secondary.main', color: 'common.white'}}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: disabled ? 0 : 1 }}>
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
              sx={buttonStyle}
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={onResetMatches}
            >
              <Translate text="app.main.reset" />
            </Button>
            {/* Clear Button*/}
            <Button
              disabled={disabled}
              sx={buttonStyle}
              color="inherit"
              startIcon={<DeleteIcon />}
              onClick={onClearMatches}
            >
              <Translate text="app.main.clear" />
            </Button>
            {/* Add Button */}
            <Button
              disabled={disabled}
              sx={buttonStyle}
              color="inherit"
              startIcon={<AddIcon />}
              onClick={() => onSelectMatch()}
            >
              <Translate text="app.main.add" />
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}