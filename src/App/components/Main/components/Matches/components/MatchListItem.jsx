import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { formatTime, formatDay } from '@utils/date';
import Translate from '@components/Translate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from '@constants/colors';

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

  const color = isComplete ? colors.primary: colors.secondary;

  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%', borderLeft: `solid 4px ${color}` }} >
      {/* Render date and venue */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography sx={{ opacity: 0.6 }} variant="caption">{formatDay(time.millis)}</Typography>
        <Typography sx={{ opacity: 0.6 }} variant="caption" align="right">{venue?.name}</Typography>
      </Stack>

      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        {/* Render match result */}
        <Stack
          sx={{width: '50%'}}
          spacing={1}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          display="flex"
          justifyContent="flex-start"
        >
          <Typography>{homeTeam.name}</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {isComplete ? `${homeScore} - ${awayScore}` : formatTime(time.millis)}
          </Typography>
          <Typography>{awayTeam.name}</Typography>
        </Stack>
 

      {/* Render option buttons */}
        <Stack
          sx={{width: '50%'}}
          spacing={1}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            size="small"
            color={isComplete ? 'primary' : 'secondary' }
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => onClickEdit(match)}
          >
            <Translate text={isComplete ? "app.main.matches.update" : "app.main.matches.predict" } />
          </Button>
          <Button
            size="small"
            color={isComplete ? 'primary' : 'secondary' }
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => onClickRemove(matchId)}
          >
            <Translate text="app.main.matches.remove" />
          </Button>
        </Stack>

      </Grid>
    </Paper>
  );
}
