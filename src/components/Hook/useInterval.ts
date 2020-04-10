import { useEffect, useRef } from 'react';

type Callback = () => any;

export const useInterval = (callback: Callback, delay: number) => {
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback?.current) {
        savedCallback.current();
      }
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
