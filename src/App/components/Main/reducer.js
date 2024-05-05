export const ACTIONS = {
  FETCH_SUCCESS: 'success',
  FETCH_ERROR: 'error',
  RESET_DATA: 'reset',
  OPEN_MODAL: 'open',
  CLOSE_MODAL: 'close',
}

export const initialState = {
  initialData: {},
  rankings: {
    entries: [],
    label: null,
    effective: null,
  },
  matches: [],
  fetchError: null,
  isLoading: true,
  isModalOpen: false,
};

export default function rankingsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_SUCCESS: {
      return {
        ...state,
        initialData: action.payload.rankings,
        rankings: action.payload.rankings,
        matches: action.payload.matches,
        isLoading: false,
      };
    }
    case ACTIONS.FETCH_ERROR: {
      return {
        ...state,
        fetchError: action.payload,
        isLoading: false,
      };
    }
    case ACTIONS.RESET_DATA: {
      return {
        ...state,
        rankings: state.initialData,
      };
    }
    case ACTIONS.OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
      };
    }
    case ACTIONS.CLOSE_MODAL: {
      const updatedEntries = state.rankings.entries.map((entry) => {
        return {
          ...entry,
          pts: entry.pts + action.payload,
        }
      });

      return {
        ...state,
        rankings: { ...state.rankings, entries: updatedEntries },
        isModalOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}