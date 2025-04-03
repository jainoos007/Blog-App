import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // check if user is logged in
  const user = useSelector((state) => state.auth.user);

  // State to control dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Ref for dropdown to detect outside clicks
  const dropdownRef = useRef(null);

  //Close dropdown when clocking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(!showDropdown);
    navigate("/login");
  };

  return (
    <div className="bg-primary drop-shadow-md">
      <div className="container flex justify-between items-center py-4">
        <a href="/" className="font-bold text-3xl primary cursor-pointer">
          BlogNest
        </a>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="/"
                className="primary transition ease-in-out font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/blogs"
                className="primary transition ease-in-out font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="primary transition ease-in-out font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
              >
                About
              </a>
            </li>
          </ul>
        </div>
        {token ? (
          <div className="flex gap-3">
            <Link
              to="/blog/create"
              className="primary transition ease-in-out font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
            >
              Create Blog
            </Link>
            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1 primary transition ease-in-out font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
              >
                <span>{user?.name || "User"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
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

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <Link
                      to={`/dashboard/${user._id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <a
            href="/login"
            className="primary transition ease-in-out font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navigation;
