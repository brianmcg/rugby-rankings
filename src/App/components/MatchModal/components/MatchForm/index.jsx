import { useReducer } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Translate from '@components/Translate';
import LabelSwitch from '@components/LabelSwitch';
import { isNumeric } from '@utils/number';
import { ACTIONS } from './actions';
import { matchReducer } from './reducers';
import { useTranslation } from 'react-i18next';
import EntryInput from './components/EntryInput';

export default function MatchForm({ match, teams, endDate, onCreate, onUpdate }) {
  const [state, dispatch] = useReducer(matchReducer, match);
  const { homeTeam, awayTeam, homeScore, awayScore, isNeutralVenue, isWorldCup, isComplete } = state;
  const { t } = useTranslation();

  const onHomeTeamChange = (e, homeTeam) => dispatch({
    type: ACTIONS.CHANGE_HOME_TEAM,
    payload: { homeTeam },
  });

  const onAwayTeamChange = (e, awayTeam) => dispatch({
    type: ACTIONS.CHANGE_AWAY_TEAM,
    payload: { awayTeam },
  });

  const onHomeScoreChange = e => {
    const value = e.target.value;
    const homeScore = isNumeric(value) ? parseInt(value, 10) : null;

    dispatch({ type: ACTIONS.CHANGE_HOME_SCORE, payload: { homeScore } });
  };

  const onAwayScoreChange = e => {
    const value = e.target.value;
    const awayScore = isNumeric(value) ? parseInt(value, 10) : null;

    dispatch({ type: ACTIONS.CHANGE_AWAY_SCORE, payload: { awayScore } });
  };

  const onNeutralVenueChange = (e, isNeutralVenue) => dispatch({
    type: ACTIONS.CHANGE_IS_NEUTRAL_VENUE,
    payload: { isNeutralVenue },
  });

  const onWorldCupChange = (e, isWorldCup) => dispatch({
    type: ACTIONS.CHANGE_IS_WORLD_CUP,
    payload: { isWorldCup },
  });

  const onClickConfirm = match => {
    if (match.matchId) {
      onUpdate({ ...match, isCreated: true });
    } else {
      const competition = t('app.main.matches.created');
      const time = { millis: endDate };
      const country = isNeutralVenue ? t('app.main.matches.neutral') : homeTeam?.name;

      onCreate({ ...match, time, competition, venue: { country }, isCreated: true });
    }
  };

  return (
    <Stack direction="column" spacing={4}>

      <EntryInput
        team={homeTeam}
        score={homeScore}
        otherTeam={awayTeam}
        teams={teams}
        onTeamChange={onHomeTeamChange}
        onScoreChange={onHomeScoreChange}
        label={
          <Translate text={isNeutralVenue ? 'app.main.modal.team' : 'app.main.modal.home'} />
        }
      />

      <EntryInput
        team={awayTeam}
        score={awayScore}
        otherTeam={homeTeam}
        teams={teams}
        onTeamChange={onAwayTeamChange}
        onScoreChange={onAwayScoreChange}
        label={
          <Translate text={isNeutralVenue ? 'app.main.modal.team' : 'app.main.modal.away'} />
        }
      />

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start">
        <LabelSwitch
          disabled={isWorldCup}
          label={<Translate text="app.main.modal.neutral" />}
          onChange={onNeutralVenueChange}
          checked={isNeutralVenue}
        />
        <LabelSwitch
          label={<Translate text="app.main.modal.rwc" />}
          onChange={onWorldCupChange}
          checked={isWorldCup}
        />
      </Stack>

      <Button
        variant="contained"
        disabled={!isComplete}
        startIcon={<SendIcon />}
        onClick={() => onClickConfirm(state)}
      >
        <Translate text="app.main.modal.confirm" />
      </Button>

    </Stack>
  );
}
