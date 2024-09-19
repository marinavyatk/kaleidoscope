import { useState, useEffect } from 'react';

export const useScreenWidth = (maxWidth: number, minWidth: number = 0) => {
  const [isMatchingBreakpoint, setIsMatchingBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMatchingBreakpoint(window.innerWidth >= minWidth && window.innerWidth <= maxWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [minWidth, maxWidth]);

  return isMatchingBreakpoint;
};
