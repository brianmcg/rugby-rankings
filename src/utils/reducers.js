export function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

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
        modalOpen: true,
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
        modalOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}