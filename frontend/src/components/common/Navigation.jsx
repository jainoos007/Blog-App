import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // State to control dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Refs for dropdown to detect outside clicks and handle keyboard accessibility
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard accessibility
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showDropdown]);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/login");
  };

  // Check if link is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Link component with active state
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`transition-all duration-200 ease-in-out font-semibold cursor-pointer border-b-2 py-1 ${
        isActive(to)
          ? "border-purple-700 text-purple-800"
          : "border-transparent hover:text-purple-600 hover:border-purple-400"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <div className="bg-primary drop-shadow-md">
      <div className="container flex justify-between items-center py-4">
        <Link
          to="/"
          className="font-bold text-3xl primary cursor-pointer transition-colors hover:text-purple-600"
        >
          BlogNest
        </Link>
        <div>
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
        {token ? (
          <div className="flex gap-5 items-center">
            <NavLink to="/blog/create">Create Blog</NavLink>

            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                ref={dropdownButtonRef}
                onClick={() => setShowDropdown(!showDropdown)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowDropdown(!showDropdown);
                  }
                }}
                aria-haspopup="true"
                aria-expanded={showDropdown}
                aria-controls="user-dropdown"
                className="flex items-center gap-2 primary transition-all duration-200 ease-in-out font-semibold cursor-pointer hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded px-2 py-1"
              >
                {/* Profile Picture */}
                <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-purple-100 border border-purple-300">
                  {user?.image ? (
                    <img
                      src={`http://localhost:7000/uploads/${user.image}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-purple-700 font-medium">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <span>{user?.name || "User"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu with transition */}
              {showDropdown && (
                <div
                  id="user-dropdown"
                  className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="py-1">
                    <div className="px-4 py-3 border-b flex items-center gap-3">
                      {/* Larger Profile Picture in Dropdown */}
                      <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-purple-100 border border-purple-300">
                        {user?.image ? (
                          <img
                            src={`http://localhost:7000/uploads/${user.image}`}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-purple-700 font-medium text-lg">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/dashboard/${user?._id || ""}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#7c0fb3b7] focus:outline-none focus:bg-gray-100 focus:text-[#7c0fb3]"
                      onClick={() => setShowDropdown(false)}
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#7c0fb3b7] focus:outline-none focus:bg-gray-100 focus:text-[#7c0fb3]"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navigation;
