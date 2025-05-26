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

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && (showDropdown || showMobileMenu)) {
        setShowDropdown(false);
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showDropdown, showMobileMenu]);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`transition-all duration-200 ease-in-out font-semibold cursor-pointer border-b-2 py-1 ${
        isActive(to)
          ? "border-purple-700 text-purple-800"
          : "border-transparent hover:text-purple-600 hover:border-purple-400"
      }`}
      onClick={() => setShowMobileMenu(false)}
    >
      {children}
    </Link>
  );

  return (
    <div className="bg-primary drop-shadow-md relative z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-3xl text-primary cursor-pointer transition-colors hover:text-purple-600"
        >
          BlogNest
        </Link>

        {/* Mobile Profile Icon for toggling menu */}
        {token && (
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
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
          </button>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/about">About</NavLink>
          {token ? (
            <>
              <NavLink to="/blog/create">Create Blog</NavLink>
              {/* Profile dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  ref={dropdownButtonRef}
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                  className="flex items-center gap-2 text-primary font-semibold hover:text-purple-600 focus:outline-none px-2 py-1"
                >
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
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b flex items-center gap-3">
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-700"
                        onClick={() => setShowDropdown(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="md:hidden flex flex-col px-4 pb-4 space-y-2 absolute rounded-md top-16 right-2 w-40 bg-white shadow-lg z-30"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/about">About</NavLink>
          {token ? (
            <>
              <NavLink to="/blog/create">Create Blog</NavLink>
              <NavLink to={`/dashboard/${user?._id || ""}`}>Dashboard</NavLink>
              <button
                onClick={handleLogout}
                className="block text-left w-full font-semibold text-purple-700"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
