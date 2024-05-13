import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SUCCESS, ERROR } from '@constants/colors';
import { formatDay } from '@utils/date'; 
import { getColor, getMatchResult } from './helpers';

function renderMatchInfo(match) {
  const { time, competition, venue } = match;
  const dateLabel = time ? formatDay(time?.millis) : null;
  const venueLabel = venue?.country ? `@ ${venue.country}` : null;
  const topRightLabel = [dateLabel, venueLabel].filter(Boolean).join(', ');
  
  if (competition || topRightLabel) {
    return (
      <Stack mb={1} direction="row" justifyContent="space-between" sx={{ opacity: 0.8 }}>
        <Typography variant="caption">
          {competition}
        </Typography>
        <Typography variant="caption">{topRightLabel}</Typography>
      </Stack>
    );
  }

  return null;
}

function renderMatchResult({ match, color }) {
  const { homeTeam, awayTeam } = match;
  return (
    <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-start">
      <Typography variant="body1">{homeTeam.name}</Typography>
      <Typography variant="h6" color={color}>
        {getMatchResult(match)}
      </Typography>
      <Typography variant="body1">{awayTeam.name}</Typography>
    </Stack>
  );
}

function renderButton({ icon, action, color }) {
  return (
    <IconButton
      key={color}
      color="primary"
      sx={{ '&:hover': { color }}}
      onClick={action}
      size="small"
    >
      {icon}
    </IconButton>
  );
}

export default function MatchListItem({ match, onSelectMatch, onRemoveMatch }) {
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

        {/* Render match result */}
        {renderMatchResult({ match, color })}
 
        {/* Render option buttons */}
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
          {options.map(option => renderButton(option))}
        </Stack>

      </Grid>
    </Paper>
  );
}
