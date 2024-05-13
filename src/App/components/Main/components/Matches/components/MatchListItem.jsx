import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getColor, getMatchResult } from './helpers';
import { SUCCESS, ERROR } from '@constants/colors';
import { formatDay } from '@utils/date'; 

function renderMatchInfo({ competition, time, venue }) {
  const rightLabel = [time ? formatDay(time?.millis) : null, venue?.country].filter(Boolean).join(' @ ');
  
  if (competition || rightLabel) {
    return (
      <Stack mb={1} direction="row" justifyContent="space-between" sx={{ opacity: 0.8 }}>
        <Typography variant="caption">{competition}</Typography>
        <Typography variant="caption">{rightLabel}</Typography>
      </Stack>
    )
  }

  return null;
}

export default function MatchListItem({ match, onSelectMatch, onRemoveMatch }) {
  const { homeTeam, awayTeam, matchId } = match;
  const color = getColor(match);
  
  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%', borderLeft: `solid 5px ${color}` }} >

      {renderMatchInfo(match)}

      <Grid container direction="row" alignItems="center" justifyContent="space-between">

        {/* Render match result */}
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-start">
          <Typography variant="body1">{homeTeam.name}</Typography>
          <Typography variant="h6" color={color}>
            {getMatchResult(match)}
          </Typography>
          <Typography variant="body1">{awayTeam.name}</Typography>
        </Stack>
 
        {/* Render option buttons */}
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
          <IconButton
            color="primary"
            sx={{ '&:hover': { color: SUCCESS }}}
            onClick={() => onSelectMatch(match)}
            size="small"
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="primary"
            sx={{ '&:hover': { color: ERROR }}}
            onClick={() => onRemoveMatch(matchId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>

      </Grid>
    </Paper>
  );
}
