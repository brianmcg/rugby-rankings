import { useState, useCallback } from 'react';
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
import TeamInput from './components/TeamInput';
import ScoreInput from './components/ScoreInput';

const inputStyle = { fontSize: '0.875rem'  };

export default function MatchListItem({ match: initialMatch, teams, onRemove, onChange }) {
  const { palette } = useTheme();

  const [match, setMatch] = useState(initialMatch);

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
  } = match;

  const homeTeamOptions = teams.filter(team => team.id !== awayTeam?.id);
  const awayTeamOptions = teams.filter(team => team.id !== homeTeam?.id);
  const infoLabel = [formatDay(time.millis), venue?.name].filter(item => item).join(' | ');
  const isValid = !!(homeTeam && awayTeam && homeScore && awayScore);
  const color = isValid ? palette.success.main : palette.error.main;

  const safeCallback = useCallback(onChange, [onChange]);
  
  useEffectAfterMount(() => safeCallback(match), [match]);

  const handleHomeTeamChange = (e, value) => {
    setMatch({ ... match, homeTeam: value });
  };

  const handleAwayTeamChange = (e, value) => {
    setMatch({ ... match, awayTeam: value });
  }

  const handleHomeScoreChange = (e) => {
    const value = e.target.value;
    setMatch({ ... match, homeScore: value });
  };

  const handleAwayScoreChange = (e) => {
    const value = e.target.value;
    setMatch({ ... match, awayScore: isNumeric(value) ? parseInt(value, 10) : null });
  };

  const handleNeutralVenueChange = (e, value) => {
    setMatch({ ... match, isNeutralVenue: value });
  }

  const handleWorldCupChange = (e, value) => {
    setMatch({
      ... match,
      isWorldCup: value,
      isNeutralVenue: value || match.isNeutralVenue,
    });
  }

  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, width: '100%', borderLeft: `solid 4px ${color}` }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="caption" color={palette.grey[500]}>{infoLabel}</Typography>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => onRemove(matchId)}
          aria-label="Example"
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TeamInput
          inputStyle={inputStyle}
          options={homeTeamOptions}
          value={homeTeam}
          onChange={handleHomeTeamChange}
          label={<Translate text="app.main.matches.team" />}
        />
        <ScoreInput
          value={homeScore}
          handleChange={handleHomeScoreChange}
          inputStyle={inputStyle}
        />
        <ScoreInput
          value={awayScore}
          handleChange={handleAwayScoreChange}
          inputStyle={inputStyle}
        />
        <TeamInput
          inputStyle={inputStyle}
          options={awayTeamOptions}
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
