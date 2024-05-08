import { ACTIONS } from './actions';

let matchIdCounter = 0;

const onFetchSuccess = (state, payload) => ({
  ...state,
  initialRankings: payload.rankings,
  initialMatches: payload.matches,
  rankings: payload.rankings,
  matches: payload.matches,
  isLoading: false,
});

const onFetchError = (state, payload) => ({
  ...state,
  fetchError: payload,
  isLoading: false,
});

const onResetMatches = state => ({
  ...state,
  matches: state.initialMatches,
});

const onOpenModal = (state, payload) => ({
  ...state,
  selectedMatch: payload.match,
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
  const match = {
    ...payload.match,
    matchId: `new-${matchIdCounter++}`
  };
  
  return { ...state, selectedMatch: null,  matches: [...state.matches, match] };
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
  console.log('UPDATE_RANKINGS', payload);



  return state;
};


export function rankingsReducer(state, { type, payload }) {
  switch (type) {
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
    default: return state;
  }
}
