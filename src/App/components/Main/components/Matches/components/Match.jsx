import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Breadcrumb from '@components/Breadcrumb';
import { SUCCESS, ERROR } from '@constants/colors';
import { formatDay } from '@utils/date'; 
import { getColor, getMatchResult } from './helpers';

function renderMatchInfo(match) {
  const { time, venue,competition } = match;
  const date = time ? formatDay(time?.millis) : null;
  const country = venue?.country ? `@ ${venue.country}` : null;
  
  return (
    <Stack direction="row" spacing={1} mb={1} justifyContent="flex-start" sx={{ opacity: 0.6 }}>
      <Breadcrumb>
        { competition ? <Typography variant="caption">{competition}</Typography> : null }
        { date ? <Typography variant="caption">{date}</Typography> : null }
        { country ? <Typography variant="caption">{country}</Typography> : null }
      </Breadcrumb>
    </Stack>
  );
}

function renderMatchResult({ match, color }) {
  const { homeTeam, awayTeam } = match;
  return (
    <Stack>
      <Grid container direction="row" gap={1} alignItems="center" justifyContent="flex-start">
        <Typography variant="body1">{homeTeam.name}</Typography>
        <Typography variant="h6" color={color}>
          {getMatchResult(match)}
        </Typography>
        <Typography variant="body1">{awayTeam.name}</Typography>
      </Grid>
    </Stack>
  );
}

function renderButtons(options) {
  return(
    <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
      {options.map(({ icon, action, color }) => (
        <IconButton
          key={color}
          color="primary"
          sx={{ '&:hover': { color }}}
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
    { icon: <EditIcon />, action: () => onSelectMatch(match), color: SUCCESS },
    { icon: <DeleteIcon />, action: () => onRemoveMatch(matchId), color: ERROR },
  ];
  
  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%', borderLeft: `solid 5px ${color}` }} >
      {renderMatchInfo(match)}

      <Grid container direction="row" alignItems="center" justifyContent="space-between">
        {renderMatchResult({ match, color })}
        {renderButtons(options)}
      </Grid>
    </Paper>
  );
}
