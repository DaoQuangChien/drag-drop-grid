import { useState, useEffect } from 'react';

const getSize = () => ({
  width: document.documentElement.clientWidth || 0,
  height: document.documentElement.clientHeight || 0
});

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);
  const handleGetSize = () => setWindowSize(getSize());

  useEffect(() => {
    handleGetSize();
    window.addEventListener('resize', handleGetSize);
    return () => window.removeEventListener('resize', handleGetSize);
  }, []);
  return windowSize;
}
