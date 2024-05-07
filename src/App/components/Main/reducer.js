export const ACTIONS = {
  FETCH_SUCCESS: 'success',
  FETCH_ERROR: 'error',
  RESET_DATA: 'reset',
  OPEN_MODAL: 'open',
  CLOSE_MODAL: 'close',
  UPDATE_RANKINGS: 'update',
}

export const initialState = {
  initialRankings: {},
  rankings: {
    entries: [],
    label: null,
    effective: null,
  },
  matches: [],
  initialMatches: [],
  fetchError: null,
  isLoading: true,
  isModalOpen: false,
  selectedMatch: null,
};

export default function rankingsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_SUCCESS: {
      return {
        ...state,
        initialRankings: action.payload.rankings,
        initialMatches: action.payload.matches,
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
        matches: state.initialMatches,
        rankings: state.initialRankings,
      };
    }
    case ACTIONS.OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
      };
    }
    case ACTIONS.CLOSE_MODAL: {
      // const updatedEntries = state.rankings.entries.map((entry) => {
      //   return {
      //     ...entry,
      //     pts: entry.pts + action.payload,
      //   }
      // });

      return {
        ...state,
        // rankings: { ...state.rankings, entries: updatedEntries },
        isModalOpen: false,
      };
    }
    case ACTIONS.UPDATE_RANKINGS: {
      console.log('UPDATE_RANKINGS', JSON.stringify(action.payload));
      return state;
    }
    default: {
      return state;
    }
  }
}