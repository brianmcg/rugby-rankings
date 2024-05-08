import { ACTIONS } from './actions';

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

const onResetRankings = (state, payload) => {
  // console.log('UPDATE_RANKINGS', payload);
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
    case ACTIONS.UPDATE_RANKINGS: return onResetRankings(state, payload);
    default: return state;
  }
}
