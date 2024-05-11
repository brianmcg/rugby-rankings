import { ACTIONS } from './actions';
import { calculateRankingChange } from './helpers';

let matchIdCounter = 0;

const newMatch = {
  awayScore: null,
  awayTeam: null,
  homeScore: null,
  homeTeam: null,
  isComplete: false,
  isNeutralVenue: false,
  isWorldCup: false,
  matchId: null,
  time: null,
  venue: null,
};

const onFetchStart = state => {
  return {
    ...state,
    isLoading: true,
    isError: false,
  };
}

const onFetchSuccess = (state, payload) => ({
  ...state,
  initialRankings: payload.rankings,
  initialMatches: payload.matches,
  rankings: payload.rankings,
  matches: payload.matches,
  isLoading: false,
});

const onFetchError = (state) => ({
  ...state,
  isError: true,
  isLoading: false,
});

const onResetMatches = state => ({
  ...state,
  matches: state.initialMatches,
});

const onOpenModal = (state, payload) => ({
  ...state,
  selectedMatch: payload.match ? payload.match : newMatch,
});

const onCloseModal = state => ({
  ...state,
  selectedMatch: null,
});

const onRemoveMatch = (state, payload) => ({
  ...state,
  matches: state.matches.filter(match => match.matchId !== payload.matchId),
});

const onClearMatches = state => ({
  ...state,
  matches: [],
});

const onAddMatch = (state, payload) => {
  const match = { ...payload.match, matchId: `new-${matchIdCounter++}` };
  
  return {
    ...state, selectedMatch: null,
    matches: [...state.matches, match],
  };
};

const onUpdateMatch = (state, payload) => {
  const matches = state.matches.map(match => {
    if (match.matchId === payload.match.matchId) {
      return { ...payload.match };
    }

    return match;
  });

  return { ...state, selectedMatch: null, matches };
};

const onUpdateRankings = (state, payload) => {
  const entries = calculateRankingChange(state.initialRankings?.entries, payload.matches);

  const rankings = { ...state.rankings, entries };

  return { ...state, rankings };
};

const onChangeSport = (state, payload) => ({ ...state, sport: payload.sport, isLoading: true });

export function rankingsReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_START: return onFetchStart(state, payload);
    case ACTIONS.FETCH_SUCCESS: return onFetchSuccess(state, payload);
    case ACTIONS.FETCH_ERROR: return onFetchError(state, payload);
    case ACTIONS.RESET_MATCHES: return onResetMatches(state, payload);
    case ACTIONS.OPEN_MODAL: return onOpenModal(state, payload);
    case ACTIONS.CLOSE_MODAL: return onCloseModal(state);
    case ACTIONS.REMOVE_MATCH: return onRemoveMatch(state, payload);
    case ACTIONS.CLEAR_MATCHES: return onClearMatches(state);
    case ACTIONS.ADD_MATCH: return onAddMatch(state, payload);
    case ACTIONS.UPDATE_MATCH: return onUpdateMatch(state, payload);
    case ACTIONS.UPDATE_RANKINGS: return onUpdateRankings(state, payload);
    case ACTIONS.CHANGE_SPORT: return onChangeSport(state, payload);
    default: return state;
  }
}
