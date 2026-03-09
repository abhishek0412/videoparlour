import { useState, useEffect, useCallback } from 'react';

function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      darkMode ? 'dark' : 'light',
    );
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
}

export default useDarkMode;
