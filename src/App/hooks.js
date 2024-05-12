import { useReducer, useEffect } from 'react';
import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';

export function useAsync(asyncCallback, initialState, cache) {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { sport } = state;

  useEffect(() => {
    // if (!isLoading) return;

    const data = cache.get(sport);

    if (data) {
       dispatch({ type: ACTIONS.CACHE_FETCH_SUCCESS, payload: { data } });
       return;
    }

    dispatch({ type: ACTIONS.FETCH_START });

    asyncCallback(sport).then(
      data => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } }),
      error => dispatch({ type: ACTIONS.FETCH_ERROR, payload: { error } }),
    );
  }, [sport, asyncCallback, cache]);

  return [state, dispatch];
}

export function useUpdateCache(cache, data) {
  useEffect(() => {
    const { cacheKey } = data ?? {};

    if (cacheKey) {
      cache.set(cacheKey, data);
    }
  }, [data, cache]);
}
