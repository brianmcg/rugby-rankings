import { useEffect, useRef } from 'react';

export const useEffectAfterMount = (effect, dependencies) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return effect();
    } else {
      isMounted.current = true;
    }
  }, dependencies);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);
}