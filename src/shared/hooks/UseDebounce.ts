import { useCallback, useRef } from "react";

export const useDebounce = (delay = 300, notDelay = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const firstTime = useRef(notDelay);

  const debounce = useCallback((func: () => void) => {
    if (firstTime.current) {
      firstTime.current = false;
      func();
    } else {
    
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }
      debouncing.current = setTimeout(() => {
        func();
      }, delay);
    }
  }, [delay]);

  return { debounce };
};
