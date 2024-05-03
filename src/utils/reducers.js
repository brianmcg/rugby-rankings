export function rankingsReducer(state, action) {
  switch (action.type) {
    case 'success': {
      return {
        ...state,
        initialData: action.payload,
        data: action.payload,
        isLoading: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    case 'reset': {
      return {
        ...state,
        data: state.initialData,
      };
    }
    case 'open': {
      return {
        ...state,
        isModalOpen: true,
      };
    }
    case 'close': {
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