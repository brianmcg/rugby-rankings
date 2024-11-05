import { ACTIONS } from './actions';
import { validateScore, validateTeam } from '@utils/validate';

const isMatchComplete = ({ homeTeam, awayTeam, homeScore, awayScore }) => {
  return (
    validateTeam(homeTeam) &&
    validateTeam(awayTeam) &&
    validateScore(homeScore) &&
    validateScore(awayScore)
  );
};

const onChangeHomeTeam = (match, action) => {
  const changedMatch = { ...match, homeTeam: action.payload.team };
  const isComplete = isMatchComplete(changedMatch);

  return { ...changedMatch, isComplete };
};

const onChangeAwayTeam = (match, action) => {
  const changedMatch = { ...match, awayTeam: action.payload.team };
  const isComplete = isMatchComplete(changedMatch);

  return { ...changedMatch, isComplete };
};

const onChangeHomeScore = (match, action) => {
  const changedMatch = { ...match, homeScore: action.payload.score };
  const isComplete = isMatchComplete(changedMatch);

  return { ...changedMatch, isComplete };
};

const onChangeAwayScore = (match, action) => {
  const changedMatch = { ...match, awayScore: action.payload.score };
  const isComplete = isMatchComplete(changedMatch);

  return { ...changedMatch, isComplete };
};

const onChangeIsNetralVenue = (match, action) => {
  const { isSelected: isNeutralVenue } = action.payload;
  const isComplete = isMatchComplete(match);

  return { ...match, isNeutralVenue, isComplete };
};

const onChangeIsWorldCup = (match, action) => {
  const { isSelected: isWorldCup } = action.payload;
  const isComplete = isMatchComplete(match);

  return { ...match, isWorldCup, isComplete };
};

export const matchReducer = (match, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_HOME_TEAM:
      return onChangeHomeTeam(match, action);
    case ACTIONS.CHANGE_AWAY_TEAM:
      return onChangeAwayTeam;
    case ACTIONS.CHANGE_HOME_SCORE:
      return onChangeHomeScore(match, action);
    case ACTIONS.CHANGE_AWAY_SCORE:
      return onChangeAwayScore(match, action);
    case ACTIONS.CHANGE_IS_NEUTRAL_VENUE:
      return onChangeIsNetralVenue(match, action);
    case ACTIONS.CHANGE_IS_WORLD_CUP:
      return onChangeIsWorldCup(match, action);
    default:
      return match;
  }
};
