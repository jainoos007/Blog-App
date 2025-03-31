import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

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
        {token ? (
          <button
            onClick={handleLogout}
            className="primary font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="primary font-semibold cursor-pointer hover:text-[#7c0fb3b7]"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navigation;
