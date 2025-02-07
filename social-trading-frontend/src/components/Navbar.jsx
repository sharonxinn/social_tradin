import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, LineChart, User, Briefcase, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between bg-gray-900 p-4 text-white">
      <h1 className="text-xl font-bold">Social Trading</h1>
      <div className="flex gap-4 items-center">
        <Link to="/" className="flex items-center gap-1"><Home size={20} /> Home</Link>
        <Link to="/market" className="flex items-center gap-1"><LineChart size={20} /> Market</Link>
        <Link to="/portfolio" className="flex items-center gap-1"><Briefcase size={20} /> Portfolio</Link>
        <Link to="/profile" className="flex items-center gap-1"><User size={20} /> Profile</Link>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
