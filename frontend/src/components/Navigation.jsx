import React from "react";

const Navigation = () => {
  return (
    <div className="bg-primary">
      <div className="container flex justify-between items-center py-4">
        <h1 className="font-bold text-2xl primary cursor-pointer">BlogNest</h1>
        <button
          className="primary font-semibold cursor-pointer
        "
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Navigation;
