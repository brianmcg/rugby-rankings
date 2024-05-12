import { useReducer, useEffect } from 'react';
import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';

export function useAsync(asyncCallback, initialState, cache) {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { sport } = state;

  useEffect(() => {
    const storedData = cache.get(sport);

    if (storedData) {
       dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: storedData });
       return;
    }

    dispatch({ type: ACTIONS.FETCH_START });

    asyncCallback(sport).then(
      data => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data }),
      error => dispatch({ type: ACTIONS.FETCH_ERROR, error }),
    );
  }, [sport, asyncCallback, cache]);

  return [state, dispatch];
}

export function useUpdateCache(cache, key, value) {
  useEffect(() => {
    cache.set(key, value);
  }, [cache, key, value]);
}
