import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

import logo from "../assets/logo1.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showMobileLogout, setShowMobileLogout] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-rose-700 transition ${
              isActive ? "text-rose-700 font-semibold" : "text-gray-800"
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
            `hover:text-rose-700 transition ${
              isActive ? "text-rose-700 font-semibold" : "text-gray-800"
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
            `hover:text-rose-700 transition ${
              isActive ? "text-rose-700 font-semibold" : "text-gray-800"
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
            `hover:text-rose-700 transition ${
              isActive ? "text-rose-700 font-semibold" : "text-gray-800"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `hover:text-rose-700 transition ${
                isActive ? "text-rose-700 font-semibold" : "text-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow sticky top-0 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu icon */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-2xl text-rose-700 p-2 focus:outline-none"
              >
                {isDrawerOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Logo with text and animated MY */}
            <Link
              to="/"
              className="absolute md:static left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 flex items-center gap-2"
            >
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="text-2xl font-extrabold text-rose-700 tracking-wide flex items-center gap-1">
                Find<span className="animate-bounce text-purple-700">My</span>
                Mate
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6 font-medium">
              <ul className="flex space-x-6">{navItems}</ul>

              {/* Auth Buttons */}
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className="px-2 py-1 rounded-lg border-2 border-rose-700 text-rose-700 font-semibold hover:bg-rose-700 hover:text-white transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-2 py-1 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <div className="flex items-center gap-4 relative group">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/32"}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-rose-700 cursor-pointer"
                  />
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 text-sm text-gray-700 rounded shadow opacity-0 group-hover:opacity-100 transition">
                    {user.displayName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg border-2 border-rose-700 text-rose-700 font-semibold hover:bg-rose-700 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Avatar + Logout */}
            <div className="flex md:hidden items-center gap-4 relative">
              {!user ? (
                <NavLink
                  to="/login"
                  className="px-1 py-1 text-sm rounded-lg border-2 border-rose-700 text-rose-700 font-semibold hover:bg-rose-700 hover:text-white"
                >
                  Login
                </NavLink>
              ) : (
                <div className="relative">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/32"}
                    alt="User Avatar"
                    onClick={() => setShowMobileLogout(!showMobileLogout)}
                    className="w-9 h-9 rounded-full border-2 border-rose-700 cursor-pointer"
                    title={user.displayName}
                  />
                  {showMobileLogout && (
                    <div className="absolute top-12 right-0 bg-white border rounded shadow-md px-4 py-2 text-sm">
                      <p className="text-gray-700 mb-2">{user.displayName}</p>
                      <button
                        onClick={handleLogout}
                        className="text-rose-700 font-semibold hover:text-purple-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-1/2 bg-rose-50 shadow-lg transform transition-transform duration-300 z-[1000] ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 p-6 font-medium text-rose-700">
          {navItems}
        </ul>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[998] md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
