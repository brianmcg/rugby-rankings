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

const onFetchSuccess = (state, payload) => {
  const { data } = payload;
  const { rankings, matches, cacheKey } = data;

  return {
    ...state,
    data: {
      ...data,
      // Recalculate rankings based on fetched matches.
      rankings: calculateRankingChange(rankings, matches),
    },
    initialData: {
      ...state.initialData,
      [cacheKey]: data,
    },
    isLoading: false,
  }
};

const onCacheFetchSuccess = (state, payload) => {
  const result = {
    ...state,
    data: payload.data,
    isLoading: false,
  }
  
  return result;
};

const onFetchError = (state) => ({
  ...state,
  isError: true,
  isLoading: false,
});

const onResetMatches = state => {
  const initialSportData = state.initialData[state.sport];
  const { rankings, matches } = initialSportData;

  return {
    ...state,
    data: {
      ...initialSportData,
      // Recalculate rankings based on initial data.
      rankings: calculateRankingChange(rankings, matches),
    },
  }
};

const onSelectMatch = (state, payload) => {
  if (payload.match === null) {
    return {
      ...state,
      selectedMatch: null,
    }
  }
  return {
    ...state,
    selectedMatch: payload.match ? payload.match : newMatch,
  }
};

const onRemoveMatch = (state, payload) => {
  const matches = state.data.matches.filter(match => match.matchId !== payload.matchId);
  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);
  
  return { ...state, data: { ...state.data, rankings, matches } };
};

const onClearMatches = state => {
  const matches = [];
  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);

  return { ...state, data: { ...state.data, rankings, matches } };
};

const onAddMatch = (state, payload) => {
  const matches = [...state.data.matches, { ...payload.match, matchId: `new-${matchIdCounter++}` }];
  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);
  
  return { ...state, data: { ...state.data, rankings, matches }, selectedMatch: null };
};

const onUpdateMatch = (state, payload) => {
  const matches = state.data.matches.map(match => {
    if (match.matchId === payload.match.matchId) {
      return { ...payload.match };
    }

    return match;
  });

  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);

  return { ...state, data: { ...state.data, rankings, matches }, selectedMatch: null };
};

const onChangeSport = (state, payload) => ({ ...state, sport: payload.sport });

export function rankingsReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_START: return onFetchStart(state, payload);
    case ACTIONS.FETCH_SUCCESS: return onFetchSuccess(state, payload);
    case ACTIONS.CACHE_FETCH_SUCCESS: return onCacheFetchSuccess(state, payload);
    case ACTIONS.FETCH_ERROR: return onFetchError(state, payload);
    case ACTIONS.ADD_MATCH: return onAddMatch(state, payload);
    case ACTIONS.REMOVE_MATCH: return onRemoveMatch(state, payload);
    case ACTIONS.UPDATE_MATCH: return onUpdateMatch(state, payload);
    case ACTIONS.SELECT_MATCH: return onSelectMatch(state, payload);
    case ACTIONS.RESET_MATCHES: return onResetMatches(state, payload);
    case ACTIONS.CLEAR_MATCHES: return onClearMatches(state);
    case ACTIONS.CHANGE_SPORT: return onChangeSport(state, payload);
    default: return state;
  }
}
