import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { formatTime, formatDay } from '@utils/date';
import Translate from '@components/Translate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function MatchListItem({ match, onClickEdit, onClickRemove }) {
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    venue,
    time,
    matchId,
    isComplete,
  } = match;

  const { palette } = useTheme();
  const color = isComplete ? palette.info.main : palette.warning.main;

  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%', borderLeft: `solid 4px ${color}` }} >

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography sx={{ opacity: 0.6 }} variant="caption">{formatDay(time.millis)}</Typography>
        <Typography sx={{ opacity: 0.6 }} variant="caption" align="right">{venue?.name}</Typography>
      </Stack>

      <Grid container sx={{ marginTop: 1 }}>

        <Grid item xs={6}>
          <Stack direction="row" spacing={1} alignItems="left" justifyContent="left">
            <Typography variant="body1" sx={{ lineHeight: '2' }}>{homeTeam.name}</Typography>
            { isComplete
              ? <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <Typography variant="h6">{homeScore}</Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="h6">{awayScore}</Typography>
                </Stack>
              : <Stack direction="row" alignItems="center" justifyContent="center">
                  <Typography variant="h6">{formatTime(time.millis)}</Typography>
                </Stack>
            } 
            <Typography variant="body1" sx={{ lineHeight: '2' }}>{awayTeam.name}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="flex-end">
            <Button
              size="small"
              color={isComplete ? "info" : "warning" }
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => onClickEdit(match)}
            >
              <Translate text={isComplete ? "app.main.matches.update" : "app.main.matches.predict" } />
            </Button>
            <Button
              size="small"
              color={isComplete ? "info" : "warning" }
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => onClickRemove(matchId)}
            >
              <Translate text="app.main.matches.remove" />
            </Button>
          </Stack>
        </Grid>

      </Grid>
    </Paper>
  );
}
