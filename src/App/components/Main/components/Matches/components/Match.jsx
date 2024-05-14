import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Translate from '@components/Translate';
import { getColor } from './helpers';

// function renderMatchInfo(match) {
//   const { time, venue,competition } = match;
//   const date = time ? formatDay(time?.millis) : null;
//   const country = venue?.country ? `@ ${venue.country}` : null;

//   return (
//     <Stack direction="row" spacing={1} mb={1} justifyContent="flex-start" sx={{ opacity: 0.6 }}>
//       <Breadcrumb>
//         { competition ? <Typography variant="caption">{competition}</Typography> : null }
//         { date ? <Typography variant="caption">{date}</Typography> : null }
//         { country ? <Typography variant="caption">{country}</Typography> : null }
//       </Breadcrumb>
//     </Stack>
//   );
// }

function renderMatchResult({ match, color }) {
  const { homeTeam, awayTeam, homeScore, awayScore, isComplete } = match;
  return (
    <Stack>
      <Grid container direction="row" gap={1} alignItems="center" justifyContent="flex-start">
        <Typography variant="body1">{homeTeam.name}</Typography>
        <Typography variant="h6" color={color}>
          {
            isComplete
              ? `${homeScore} - ${awayScore}`
              : <Translate text="app.main.matches.vs"></Translate>
          }
        </Typography>
        <Typography variant="body1">{awayTeam.name}</Typography>
      </Grid>
    </Stack>
  );
}

function renderButtons(options) {
  return(
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
      {options.map(({ icon, action, color }) => (
        <IconButton
          key={color}
          color="primary"
          sx={{ p: 0, '&:hover': { color }}}
          onClick={action}
          size="small"
        >
          {icon}
        </IconButton>
      ))}
    </Stack>
  );
}

export default function Match({ match, onSelectMatch, onRemoveMatch }) {
  const { matchId } = match;
  const color = getColor(match);

  const options = [
    { icon: <EditIcon />, action: () => onSelectMatch(match), color: 'success.main' },
    { icon: <DeleteIcon />, action: () => onRemoveMatch(matchId), color: 'error.main' },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%', borderLeft: `solid 5px ${color}` }} >
      <Grid container direction="row" alignItems="center" justifyContent="space-between">
        {renderMatchResult({ match, color })}
        {renderButtons(options)}
      </Grid>
    </Paper>
  );
}
