export const ACTIONS = {
  FETCH_SUCCESS: 'success',
  FETCH_ERROR: 'error',
  RESET_DATA: 'reset',
  OPEN_MODAL: 'open',
  CLOSE_MODAL: 'close',
}

export const initialState = {
  initialData: {},
  data: {},
  fetchError: null,
  isLoading: true,
  isModalOpen: false,
};

export default function rankingsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_SUCCESS: {
      return {
        ...state,
        initialData: action.payload,
        data: action.payload,
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
        data: state.initialData,
      };
    }
    case ACTIONS.OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
      };
    }
    case ACTIONS.CLOSE_MODAL: {
      const updatedEntries = state.data.entries.map((entry) => {
        return {
          ...entry,
          pts: entry.pts + action.payload,
        }
      });

      return {
        ...state,
        data: { ...state.data, entries: updatedEntries },
        isModalOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}