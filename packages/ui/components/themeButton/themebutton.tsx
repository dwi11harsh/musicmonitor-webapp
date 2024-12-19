import * as React from "react";
import Switch from "react-switch";
import { FiMoon, FiSun } from "react-icons/fi";
import useDarkMode from "use-dark-mode";

const MODE_TRANSITION_CLASS_NAME = "dark";

export const ThemeButton: React.FC = () => {
  const { value: hasActiveDarkMode, toggle: activateDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkModeTransition();
    activateDarkMode();
  };

  function setDarkModeTransition() {
    if (hasActiveDarkMode) {
      document.documentElement.classList.remove(MODE_TRANSITION_CLASS_NAME);
    } else document.documentElement.classList.add(MODE_TRANSITION_CLASS_NAME);
  }

  return (
    <div className="object-scale-down">
      <Switch
        onChange={toggleDarkMode}
        checked={hasActiveDarkMode}
        checkedIcon={<FiMoon className="inline-block mx-2 my-1" />}
        uncheckedIcon={<FiSun className="inline-block mx-2 my-1" />}
        onColor="#1a202c"
        offColor="#f7fafc"
        onHandleColor="#f7fafc"
        offHandleColor="#1a202c"
        className="text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-0"
      />
    </div>
  );
};
