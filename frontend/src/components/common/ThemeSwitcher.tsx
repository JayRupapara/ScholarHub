import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = React.useState('scholarlight');

  const toggleTheme = () => {
    const newTheme = theme === 'scholarlight' ? 'scholardark' : 'scholarlight';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input type="checkbox" onChange={toggleTheme} checked={theme === 'scholardark'} />
      <Sun className="swap-on h-5 w-5" />
      <Moon className="swap-off h-5 w-5" />
    </label>
  );
};

export default ThemeSwitcher; 