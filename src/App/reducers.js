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
  competition: null,
  isWorldCup: false,
  matchId: null,
  time: null,
  venue: null,
};

const onFetchStart = state => ({
  ...state,
  isLoading: true,
  isError: false,
});

const onFetchSuccess = (state, payload) => {
  const { data } = payload;
  const { rankings, matches, sport } = data;

  return {
    ...state,
    data: { ...data, rankings: calculateRankingChange(rankings, matches) },
    fetchedData: { ...state.fetchedData, [sport]: data },
    isLoading: false,
  };
};

const onCacheFetchSuccess = (state, payload) => ({
  ...state,
  data: payload.data,
  isLoading: false,
});

const onFetchError = state => ({
  ...state,
  isError: true,
  isLoading: false,
});

const onChangeSport = (state, payload) => ({
  ...state,
  sport: payload.sport,
});

const onSelectMatch = (state, payload) => ({
  ...state,
  selectedMatch: payload.match,
});

const onCreateMatch = state => ({
  ...state,
  selectedMatch: newMatch,
});

const onUnselectMatch = state => ({
  ...state,
  selectedMatch: null,
});

const onAddMatch = (state, payload) => {
  const { data, fetchedData, sport } = state;

  if (data && fetchedData && sport) {
    const matches = [
      ...data.matches,
      { ...payload.match, matchId: `new-${matchIdCounter++}` },
    ];

    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);

      return {
        ...state,
        data: { ...data, rankings, matches },
        selectedMatch: null,
      };
    }

    return state;
  }

  return state;
};

const onUpdateMatch = (state, payload) => {
  const { data, fetchedData, sport } = state;

  if (data && fetchedData && sport) {
    const matches = data.matches.map(match => {
      if (match.matchId === payload.match?.matchId) {
        return { ...payload.match };
      }

      return match;
    });

    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);

      return {
        ...state,
        data: { ...data, rankings, matches },
        selectedMatch: null,
      };
    }

    return state;
  }

  return state;
};

const onRemoveMatch = (state, payload) => {
  const { data, fetchedData, sport } = state;

  if (data && fetchedData && sport) {
    const matches = data.matches.filter(
      match => match.matchId !== payload.matchId,
    );

    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);

      return { ...state, data: { ...data, rankings, matches } };
    }

    return state;
  }

  return state;
};

const onUpdateMatches = (state, payload) => {
  const { data, fetchedData, sport } = state;
  const { matches } = payload;

  if (data && fetchedData && sport) {
    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);
      return { ...state, data: { ...data, rankings, matches } };
    }
    return state;
  }

  return state;
};

export const rankingsReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.FETCH_START:
      return onFetchStart(state);
    case ACTIONS.FETCH_SUCCESS:
      return onFetchSuccess(state, payload);
    case ACTIONS.CACHE_FETCH_SUCCESS:
      return onCacheFetchSuccess(state, payload);
    case ACTIONS.FETCH_ERROR:
      return onFetchError(state);
    case ACTIONS.ADD_MATCH:
      return onAddMatch(state, payload);
    case ACTIONS.REMOVE_MATCH:
      return onRemoveMatch(state, payload);
    case ACTIONS.UPDATE_MATCH:
      return onUpdateMatch(state, payload);
    case ACTIONS.SELECT_MATCH:
      return onSelectMatch(state, payload);
    case ACTIONS.CREATE_MATCH:
      return onCreateMatch(state);
    case ACTIONS.UNSELECT_MATCH:
      return onUnselectMatch(state);
    case ACTIONS.UPDATE_MATCHES:
      return onUpdateMatches(state, payload);
    case ACTIONS.CHANGE_SPORT:
      return onChangeSport(state, payload);
    default:
      return state;
  }
};
