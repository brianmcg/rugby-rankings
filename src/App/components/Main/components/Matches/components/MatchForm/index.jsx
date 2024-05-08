import { useCallback, useReducer } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { formatDay } from '@utils/date';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Translate from '@components/Translate';
import LabelSwitch from '@components/LabelSwitch';
import { useEffectAfterMount } from '@utils/hooks';
import { isNumeric } from '@utils/number';
import { ACTIONS } from './actions';
import { matchReducer } from './reducers';
import TeamInput from './components/TeamInput';
import ScoreInput from './components/ScoreInput';

const inputStyle = { fontSize: '0.875rem'  };

const isMatchComplete = match => {
  const { homeTeam, awayTeam, homeScore, awayScore } = match;
  return !!homeTeam && !!awayTeam && homeScore !== null && awayScore !== null;
};

export default function MatchForm({ match, teams, onRemove, onChange }) {
  const { palette } = useTheme();

  // const [state, dispatch] = useReducer(matchReducer, match);
  
  console.log('render');

  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    venue,
    time,
    matchId,
    isNeutralVenue,
    isWorldCup,
    isComplete,
  } = match;

  const handleHomeTeamChange = (e, homeTeam) => {
    const { awayTeam, homeScore, awayScore } = match;
    const isComplete = isMatchComplete({ homeTeam, awayTeam, homeScore, awayScore });

    onChange({ ...match, homeTeam, isComplete });
  };

  const handleAwayTeamChange = (e, awayTeam) => {
    const { homeTeam, homeScore, awayScore } = match;
    const isComplete = isMatchComplete({ homeTeam, awayTeam, homeScore, awayScore });

    onChange({ ...match, awayTeam, isComplete });
  }

  const handleHomeScoreChange = (e) => {
    const value = e.target.value;
    const homeScore = isNumeric(value) ? parseInt(value, 10) : null;
  };

  const handleAwayScoreChange = (e) => {
    const value = e.target.value;
    const awayScore = isNumeric(value) ? parseInt(value, 10) : null;
    
  };

  const handleNeutralVenueChange = (e, isNeutralVenue) => {
  }

  const handleWorldCupChange = (e, isWorldCup) => {
  }

  // const safeCallback = useCallback(onChange, [onChange]);
  
  // useEffectAfterMount(() => {
  //   if (state.isComplete) {
  //     safeCallback(state)
  //   }
  // }, [state]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        width: '100%',
        borderLeft: `solid 4px ${isComplete ? palette.success.main : palette.error.main}`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="caption" color={palette.grey[500]}>
          {[formatDay(time.millis), venue?.name].filter(item => item).join(' | ')}
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => onRemove(matchId)}
          aria-label="Example"
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
        <TeamInput
          inputStyle={inputStyle}
          options={teams.filter(team => team.id !== awayTeam?.id)}
          value={homeTeam}
          onChange={handleHomeTeamChange}
          label={<Translate text="app.main.matches.team" />}
        />
        <ScoreInput value={homeScore} onChange={handleHomeScoreChange} inputStyle={inputStyle} />
        <ScoreInput value={awayScore} onChange={handleAwayScoreChange} inputStyle={inputStyle} />
        <TeamInput
          inputStyle={inputStyle}
          options={teams.filter(team => team.id !== homeTeam?.id)}
          value={awayTeam}
          onChange={handleAwayTeamChange}
          label={<Translate text="app.main.matches.team" />}
        />
      </Stack>

      <Stack direction="row" justifyContent="left">
        <LabelSwitch
          label={<Translate text="app.main.matches.neutral" />}
          handleChange={handleNeutralVenueChange}
          checked={isNeutralVenue}
        />
        <LabelSwitch
          label={<Translate text="app.main.matches.rwc" />}
          handleChange={handleWorldCupChange}
          checked={isWorldCup}
        />
      </Stack>

    </Paper>
  );
}
