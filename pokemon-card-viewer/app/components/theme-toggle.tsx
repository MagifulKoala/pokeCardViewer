"use client"

import { useState, useEffect } from 'react';

type Theme = 'dark mode' | 'light mode';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark mode');

  useEffect(() => {
    document.body.className = getThemeClasses(theme);
  }, [theme]);

  const getThemeClasses = (currentTheme: Theme) => {
    switch(currentTheme) {
      case 'dark mode':
        return 'bg-darkMode text-white';
      case 'light mode':
        return 'bg-lightMode text-gray-900';
      default:
        return 'bg-darkMode text-white';
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme === 'dark mode' ? 'light mode' : 'dark mode'
    );
  };

  return (
    <button 
      onClick={toggleTheme}
      className="
        fixed top-4 right-4 z-50 
        px-4 py-2 
        bg-blue-500 text-white 
        rounded-md 
        hover:bg-blue-600 
        transition-colors
      "
    >
      {theme === 'dark mode' ? 'light mode' : 'dark mode'}
    </button>
  );
}