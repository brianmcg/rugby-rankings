import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { formatTime, formatDay } from '@utils/date';
import Translate from '@components/Translate';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MatchListItem({ match, handleUpdateMatch }) {
  const { venue, teams: matchTeams, scores, status, time } = match;
  const [homeTeam, awayTeam] = matchTeams;
  const [homeScore, awayScore] = scores;
  const isComplete = status === 'C';
  const { palette } = useTheme();
  const color = isComplete ? palette.primary.main : palette.secondary.main;

  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, width: '100%', borderLeft: `solid 4px ${color}` }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption">{formatDay(time.millis)}</Typography>
        <Typography variant="caption" align="right">{venue?.name}</Typography>
      </Stack>

      <Grid container sx={{ marginTop: 1 }}>
        <Grid item xs={5} sx={{ paddingRight: 1  }}>
          <Stack direction="row" alignItems="right" justifyContent="right">
            <Typography variant="body1" sx={{ lineHeight: '2' }}>{homeTeam.name}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={2} >
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
        </Grid>

        <Grid item xs={5} sx={{ paddingLeft: 1 }}>
          <Stack direction="row" alignItems="left" justifyContent="left">
            <Typography variant="body1" sx={{ lineHeight: '2' }}>{awayTeam.name}</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="center" sx={{ marginTop: 1 }}>
        <Button
          size="small"
          color={isComplete ? "primary" : "secondary" }
          variant="contained"
          startIcon={<SendIcon />}
          onClick={() => handleUpdateMatch(match)}
        >
          <Translate text={isComplete ? "app.main.matches.update" : "app.main.matches.predict" } />
        </Button>

        <Button
          size="small"
          color={isComplete ? "primary" : "secondary" }
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => {}}
        >
          <Translate text="app.main.matches.remove" />
        </Button>
      </Stack>

    </Paper>
  );
}
