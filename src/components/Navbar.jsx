import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-primary transition ${
              isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/biodatas"
          className={({ isActive }) =>
            `hover:text-primary transition ${
              isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          Biodatas
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-primary transition ${
              isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `hover:text-primary transition ${
              isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="bg-background bg-white text-foreground border-b border-border shadow-sm sticky z-[1000] top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile: Menu Icon (left) */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Toggle menu"
              >
                {isDrawerOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Mobile: Logo centered */}
            <Link
              to="/"
              className="absolute md:hidden left-1/2 -translate-x-1/2 text-xl font-bold flex items-center gap-2 text-primary md:static md:translate-x-0"
            >
              💖 FindMyMate
            </Link>

            {/* Desktop: Left side logo */}
            <div className="hidden md:flex items-center">
              <Link
                to="/"
                className="text-xl font-bold flex items-center gap-2 text-primary"
              >
                💖 FindMyMate
              </Link>
            </div>

            {/* Desktop: Right nav + buttons + theme */}
            <div className="hidden md:flex items-center space-x-4 font-medium">
              <ul className="flex space-x-6">{navItems}</ul>

              {/* Buttons */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-2 py-2 rounded-md border border-primary text-primary font-semibold hover:bg-primary  transition ${
                    isActive ? "bg-primary text-black" : ""
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-2 py-2 rounded-md bg-primary text-black font-semibold hover:bg-primary/90 transition ${
                    isActive ? "opacity-80" : ""
                  }`
                }
              >
                Register
              </NavLink>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="text-xl hover:text-primary transition p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            {/* Mobile: Right theme toggle + login */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={toggleTheme}
                className="text-xl hover:text-primary transition p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
              <NavLink
                to="/login"
                className="font-medium text-sm hover:text-primary"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer: LEFT side, under navbar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-[40%] bg-background shadow-lg transform transition-transform duration-300 z-[1000] ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation drawer"
      >
        <ul className="flex flex-col gap-5 p-6 font-medium">{navItems}</ul>
      </div>

      {/* Overlay for mobile drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-[998] md:hidden"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
