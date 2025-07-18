import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import Lottie from "lottie-react";
import heartAnimation from "../assets/Lottie/love.json";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // ⏳ Show spinner while auth state is loading
  if (loading) return <LoadingSpinner />;

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
          Contact Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
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

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow sticky top-0 z-[1000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Icon */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-2xl text-purple-700 p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isDrawerOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Logo */}
            <Link
              to="/"
              className="absolute md:static left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 text-2xl font-extrabold text-rose-700 flex items-center gap-2"
            >
              <span className="tracking-wide">FindMyMate</span>

              {/* Heart Lottie Animation with alignment and bounce */}
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
                <Lottie animationData={heartAnimation} loop={true} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 font-medium">
              <ul className="flex space-x-6">{navItems}</ul>

              {/* Auth Buttons */}
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 rounded-lg border-2 border-rose-700 text-rose-700 font-semibold hover:bg-rose-700 hover:text-white transition"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/32"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-rose-700"
                  />
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg border-2 border-rose-700 text-rose-700 font-semibold hover:bg-rose-700 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Right */}
            <div className="flex md:hidden items-center gap-4">
              {!user ? (
                <NavLink
                  to="/login"
                  className="text-sm font-semibold text-rose-700 hover:text-purple-700"
                >
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-rose-700 hover:text-purple-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-2/3 bg-white shadow-lg transform transition-transform duration-300 z-[1000] ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 p-6 font-medium text-rose-700">
          {navItems}
        </ul>
      </div>

      {/* Overlay for Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-5 z-[998] md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
