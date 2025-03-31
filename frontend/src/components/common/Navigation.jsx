import React from "react";

const Navigation = () => {
  return (
    <div className="bg-primary drop-shadow-md">
      <div className="container flex justify-between items-center py-4">
        <a href="/" className="font-bold text-3xl primary cursor-pointer">
          BlogNest
        </a>
        <a
          href="/login"
          className="primary font-semibold cursor-pointer hover:text-[#7c0fb3b7]
        "
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Navigation;
