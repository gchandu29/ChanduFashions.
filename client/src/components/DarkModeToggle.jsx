import { useTheme } from '../context/ThemeContext';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-lg text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <HiOutlineSun className="w-5 h-5" />
      ) : (
        <HiOutlineMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;
