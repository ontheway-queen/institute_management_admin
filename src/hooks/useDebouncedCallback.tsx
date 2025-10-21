import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const debouncedCallback = useRef<(...args: Parameters<T>) => void>();

  // Create the debounced version of the callback
  debouncedCallback.current = useCallback(
    debounce((...args: Parameters<T>) => {
      callback(...args);
    }, delay),
    [callback, delay]
  );

  // Cleanup the debounce on unmount
  useEffect(() => {
    return () => {
      (debouncedCallback.current as any)?.cancel();
    };
  }, []);

  return debouncedCallback.current!;
}

export default useDebouncedCallback;
