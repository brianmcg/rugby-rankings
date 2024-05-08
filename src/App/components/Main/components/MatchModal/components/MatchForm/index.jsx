import { useReducer } from 'react';
import Stack from '@mui/material/Stack';
import Translate from '@components/Translate';
import LabelSwitch from '@components/LabelSwitch';
import { isNumeric } from '@utils/number';
import TeamInput from './components/TeamInput';
import ScoreInput from './components/ScoreInput';
import { ACTIONS } from './actions';
import { matchReducer } from './reducers';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';

export default function MatchForm({ match: initalMatch, teams, onCreate, onUpdate }) {
  const [match, dispatch] = useReducer(matchReducer, initalMatch);
  
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isNeutralVenue,
    isWorldCup,
    isComplete,
  } = match;

  const onHomeTeamChange = (e, homeTeam) => dispatch({
    type: ACTIONS.CHANGE_HOME_TEAM,
    payload: { homeTeam },
  });

  const handleAwayTeamChange = (e, awayTeam) => dispatch({
    type: ACTIONS.CHANGE_AWAY_TEAM,
    payload: { awayTeam },
  });

  const handleHomeScoreChange = e => {
    const value = e.target.value;
    const homeScore = isNumeric(value) ? parseInt(value, 10) : null;

    dispatch({ type: ACTIONS.CHANGE_HOME_SCORE, payload: { homeScore } });
  };

  const handleAwayScoreChange = e => {
    const value = e.target.value;
    const awayScore = isNumeric(value) ? parseInt(value, 10) : null;

    dispatch({ type: ACTIONS.CHANGE_AWAY_SCORE, payload: { awayScore } });
  };

  const handleNeutralVenueChange = (e, isNeutralVenue) => dispatch({
    type: ACTIONS.CHANGE_IS_NEUTRAL_VENUE,
    payload: { isNeutralVenue },
  });

  const handleWorldCupChange = (e, isWorldCup) => dispatch({
    type: ACTIONS.CHANGE_IS_WORLD_CUP,
    payload: { isWorldCup },
  });

  const onClickConfirm = match => {
    if (match.matchId) {
      onUpdate(match);
    } else {
      onCreate(match);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
        <TeamInput
          options={teams.filter(team => team.id !== awayTeam?.id)}
          value={homeTeam}
          onChange={onHomeTeamChange}
          label={<Translate text="app.main.modal.team" />}
        />
        <ScoreInput
          value={homeScore}
          label={<Translate text="app.main.modal.score" />}
          onChange={handleHomeScoreChange}
        />
        <ScoreInput
          value={awayScore}
          label={<Translate text="app.main.modal.score" />}
          onChange={handleAwayScoreChange}
        />
        <TeamInput
          options={teams.filter(team => team.id !== homeTeam?.id)}
          value={awayTeam}
          onChange={handleAwayTeamChange}
          label={<Translate text="app.main.modal.team" />}
        />
      </Stack>

      <Stack direction="row" justifyContent="left">
        <LabelSwitch
          label={<Translate text="app.main.modal.neutral" />}
          handleChange={handleNeutralVenueChange}
          checked={isNeutralVenue}
        />
        <LabelSwitch
          label={<Translate text="app.main.modal.rwc" />}
          handleChange={handleWorldCupChange}
          checked={isWorldCup}
        />
      </Stack>

      <Stack direction="row" justifyContent="right">
        <Button
          disabled={!isComplete}
          variant="contained"
          startIcon={<SendIcon />}
          onClick={() => onClickConfirm(match)}
        >
          <Translate text="app.main.modal.confirm" />
        </Button>
      </Stack>

    </Box>
  );
}
