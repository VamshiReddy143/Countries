import React, { useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";

const Button = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`px-4 py-2 rounded-md ${
        isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-gray-200 text-black hover:bg-gray-300"
      } transition duration-300 ease-in-out`}
    >
      {isDarkMode ? <p className="flex items-center gap-2"> <GoSun />Light Mode</p> : <p className="flex items-center gap-2"> <GoMoon />Dark Mode</p>}
    </button>
  );
};

export default Button;
