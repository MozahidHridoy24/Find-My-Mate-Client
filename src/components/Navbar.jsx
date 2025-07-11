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
        <NavLink to="/" className="hover:text-primary">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/biodatas" className="hover:text-primary">
          Biodatas
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="hover:text-primary">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="hover:text-primary">
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="bg-background text-foreground border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LEFT: Menu Icon (mobile only) */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-2xl"
              >
                {isDrawerOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* CENTER: Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 text-xl font-bold flex items-center gap-2 text-primary"
            >
              💖 FindMyMate
            </Link>

            {/* RIGHT: Theme toggle + login */}
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={toggleTheme}
                className="text-xl hover:text-primary transition"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
              <NavLink
                to="/login"
                className="font-medium text-sm md:text-base hover:text-primary"
              >
                Login
              </NavLink>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex justify-end items-center space-x-6 font-medium">
            {navItems}
            {/* Optional login button for desktop */}
            <li>
              <NavLink to="/login" className="hover:text-primary">
                Login
              </NavLink>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="text-xl hover:text-primary"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer: LEFT side, under navbar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-[40%] bg-background shadow-lg bg-white transform transition-transform duration-300 z-[1000] ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-5 p-6 font-medium">{navItems}</ul>
      </div>

      {/* Overlay for mobile drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0  z-[998] md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
