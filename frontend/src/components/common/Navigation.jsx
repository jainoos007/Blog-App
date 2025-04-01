import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // check if user is logged in

  const handleLogout = () => {
    dispatch(logout());
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
            <button
              onClick={handleLogout}
              className="primary transition ease-in-out font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
            >
              Logout
            </button>
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
