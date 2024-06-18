import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce changes in value.
 *
 * @param value The value to be debounced.
 * @param delay The delay in milliseconds before updating the debounced value (default is `500ms`).
 * @returns The debounced value.
 */
const useDebounce = <Type>(value: Type, delay = 500): Type => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Set up side effect to update debounced value after delay
  useEffect(() => {
    // Set a timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up previous timeout if value or delay changes before it fires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
