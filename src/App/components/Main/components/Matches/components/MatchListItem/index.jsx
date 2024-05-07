import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { formatDay } from '@utils/date';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Translate from '@components/Translate';
import LabelSwitch from '@components/LabelSwitch';
import TeamInput from './components/TeamInput';
import ScoreInput from './components/ScoreInput';
import ListItem from '@mui/material/ListItem';

const inputStyle = { fontSize: '0.875rem'  };

const isNumeric = str => {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

export default function MatchListItem({ match, teams, handleClickDelete, updateRankings }) {
  console.log('render:match', match);
  const { venue, teams: matchTeams = [], scores = [], status, competition, time, matchId } = match;
  const isComplete = status === 'C';
  const { palette } = useTheme();

  const [homeTeam, setHomeTeam] = useState(teams.find(team => team.id === matchTeams[0]?.id) || null);
  const [awayTeam, setAwayTeam] = useState(teams.find(team => team.id === matchTeams[1]?.id) || null);
  const [homeScore, setHomeScore] = useState(isComplete ? scores[0] : null);
  const [awayScore, setAwayScore] = useState(isComplete ? scores[1] : null);
  const [isNeutralVenue, setNeutralVenue] = useState(matchTeams.map(({ name }) => name).includes(venue?.country));
  const [isWorldCup, setWorldCup] = useState(!!competition?.toLowerCase().match(/rugby world cup/));

  const homeTeamOptions = teams.filter(team => team.id !== awayTeam?.id);
  const awayTeamOptions = teams.filter(team => team.id !== homeTeam?.id);
  const infoLabel = [formatDay(time.millis), venue?.name].filter(item => item).join(' | ');
  const isValid = !!(homeTeam && awayTeam && homeScore && awayScore);
  const color = isValid ? palette.success.main : palette.error.main;

  // const safeCallback = useCallback(updateRankings, [updateRankings]);

  // useEffect(() => safeCallback(
  //   { homeTeam, awayTeam, homeScore, awayScore, isNeutralVenue, isWorldCup }),
  //   [homeTeam, awayTeam, homeScore, awayScore, isNeutralVenue, isWorldCup, safeCallback],
  // );
  // 
  
  useEffect(() => {

  });
  const handleHomeTeamChange = (e, value) => {
    console.log('handleHomeTeamChange');
    // setHomeTeam(value)
  };

  const handleAwayTeamChange = (e, value) => setAwayTeam(value);

  const handleHomeScoreChange = (e) => {
    const value = e.target.value;
    // setHomeScore(isNumeric(value) ? parseInt(value, 10) : null);
  };

  const handleAwayScoreChange = (e) => {
    const value = e.target.value;
    // setAwayScore(isNumeric(value) ? parseInt(value, 10) : null);
  };

  const handleNeutralVenueChange = (e, value) => setNeutralVenue(value);

  const handleWorldCupChange = (e, value) => {
    if (value) {
      // setNeutralVenue(value);
    }

    // setWorldCup(value);
  }

  return (
    <ListItem key={match.matchId} alignItems="flex-start">
      <Paper
        elevation={3}
        sx={{ padding: 2, width: '100%', borderLeft: `solid 4px ${color}` }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="caption" color={palette.grey[500]}>{infoLabel}</Typography>
          <IconButton
            sx={{ padding: 0 }}
            onClick={() => handleClickDelete(matchId)}
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
            handleChange={handleHomeTeamChange}
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
            handleChange={handleAwayTeamChange}
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
    </ListItem>
  );
}
