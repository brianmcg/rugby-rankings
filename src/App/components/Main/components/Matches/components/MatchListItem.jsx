import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getColor } from './helpers';
import { colors } from '@constants/colors';

export default function MatchListItem({ match, onClickEdit, onClickRemove }) {
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    matchId,
    isComplete,
  } = match;

  const color = getColor(match);

  return (
    <Paper elevation={3} sx={{ padding: 2, width: '100%', borderLeft: `solid 5px ${color}` }} >
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        {/* Render match result */}
        <Stack
          spacing={1}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          display="flex"
          justifyContent="flex-start"
        >
          <Typography>{homeTeam.name}</Typography>
          <Typography sx={{ fontWeight: 900, color }}>
            {isComplete ? `${homeScore} - ${awayScore}` : 'vs'}
          </Typography>
          <Typography>{awayTeam.name}</Typography>
        </Stack>
 

        {/* Render option buttons */}
        <Stack
          spacing={1}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          display="flex"
          justifyContent="flex-end"
        >
          <IconButton
            color="primary"
            sx={{ '&:hover': { color: colors.success }}}
            onClick={() => onClickEdit(match)}
            size="large"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            sx={{ '&:hover': { color: colors.error }}}
            onClick={() => onClickRemove(matchId)}
            size="large"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>

      </Grid>
    </Paper>
  );
}
