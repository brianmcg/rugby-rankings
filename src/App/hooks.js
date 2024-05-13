import { useReducer, useEffect } from 'react';
import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';

export function useAsync(asyncCallback, initialState, cacheOptions = {}) {
  const { cache, key } = cacheOptions;
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const cacheKey = state[key]

  useEffect(() => {
    const data = cache?.get?.(cacheKey);

    if (data) {
       dispatch({ type: ACTIONS.CACHE_FETCH_SUCCESS, payload: { data } });
       return;
    }

    dispatch({ type: ACTIONS.FETCH_START });

    asyncCallback(cacheKey).then(
      data => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } }),
      error => dispatch({ type: ACTIONS.FETCH_ERROR, payload: { error } }),
    );
  }, [cacheKey, asyncCallback, cache]);

  return [state, dispatch];
}

export function useUpdateCache(cache, key, value) {
  useEffect(() => {
    if (key) {
      cache.set(key, value);
    }
  }, [key, value, cache]);
}
