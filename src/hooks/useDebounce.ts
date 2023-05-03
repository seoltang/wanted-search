import { useEffect, useState } from 'react';

const useDebounce = (input: string, delay = 300) => {
  const [debounceText, setDebounceText] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceText(input);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, delay]);

  return debounceText;
};

export default useDebounce;
