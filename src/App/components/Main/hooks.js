import { useReducer, useEffect, useRef } from 'react';
import { rankingsReducer } from './reducers';

export function useAsync(asyncCallback, initialState) {
  const [state, dispatch] = useReducer(rankingsReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  useEffect(() => {
    const promise = asyncCallback();

    if (!promise) return;
  
    dispatch({type: 'pending'});

    promise.then(
      data => dispatch({type: 'resolved', data}),
      error => dispatch({type: 'rejected', error}),
    );
    
  }, [asyncCallback]);

  return state;
}

export function useOnMountUnsafe(effect) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effect();
    }
  }, [effect]);
}
