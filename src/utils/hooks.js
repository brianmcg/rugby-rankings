import { useReducer, useEffect } from 'react';
import { asyncReducer } from './reducers';

export function useAsync(asyncCallback, initialState, dependencies) {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  useEffect(() => {
    const promise = asyncCallback();

    if (!promise) {
      return;
    }

    dispatch({type: 'pending'});

    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
    // too bad the eslint plugin can't statically analyze this :-(
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
