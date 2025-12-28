import { createSignal, createEffect } from 'solid-js';
import { LightModeIcon, DarkModeIcon } from './Icons';

export function ThemeToggle() {
  const darkModeLS = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = createSignal(darkModeLS);

  createEffect(() => {
    document.body.classList.toggle('dark', darkMode());
    localStorage.setItem('darkMode', darkMode());
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode());
  }

  return (
    <button
      className="fixed top-6 right-6 p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      onClick={() => toggleDarkMode()}
    >
      {darkMode() ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
}
