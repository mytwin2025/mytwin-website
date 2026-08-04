import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false; // Default to false during SSR
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return; // Exit early during SSR
    }
    const mediaQueryList = window.matchMedia(query);

    const listener = (event) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    // Set the initial value
    setMatches(mediaQueryList.matches);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
