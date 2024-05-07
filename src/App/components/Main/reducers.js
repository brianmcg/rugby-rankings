import { ACTIONS } from './actions';

export function rankingsReducer(state, action) {
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
      console.log('UPDATE_RANKINGS', action.payload);
      return state;
    }
    default: {
      return state;
    }
  }
}
