import React from "react";

const Navigation = () => {
  return (
    <div className="bg-primary drop-shadow-md">
      <div className="container flex justify-between items-center py-4">
        <h1 className="font-bold text-3xl primary cursor-pointer">BlogNest</h1>
        <button
          className="primary font-semibold cursor-pointer hover:text-[#7c0fb3b7]
        "
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Navigation;
