import React from "react";

const Signup = () => {
  return (
    <div className="container mt-20 w-100 bg-primary flex flex-col items-center py-10 gap-4 rounded-4xl shadow-2xl border-4 border-purple-500">
      <div className="primary text-3xl font-extrabold mb-4">Sign Up</div>
      <form action="" className="flex flex-col gap-4">
        <input
          type="name"
          placeholder="Name"
          className="w-full bg-white border-none px-6 py-3 rounded-4xl shadow-[0px_10px_10px_-5px_#cff0ff] border-transparent border-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c0fb3]"
          required="true"
        />
        <input
          type="email"
          placeholder="E-mail"
          className="w-full bg-white border-none px-6 py-3 rounded-4xl shadow-[0px_10px_10px_-5px_#cff0ff] border-transparent border-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c0fb3]"
          required="true"
        />
        <input
          type="password"
          placeholder="password"
          className="w-full bg-white border-none px-6 py-3 rounded-4xl shadow-[0px_10px_10px_-5px_#cff0ff] border-transparent border-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c0fb3]"
          required="true"
        />
        {/* Button */}
        <div className="relative group">
          <button className="relative w-full inline-block p-px font-semibold leading-6 text-[#C1BFFF] bg-[#C1BFFF] shadow-2xl cursor-pointer rounded-4xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
            <span className="absolute inset-0 rounded-4xl bg-gradient-to-r from-blue-300 via-fuchsia-700 to-indigo-700 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span className="relative z-10 block px-6 py-3 rounded-4xl bg-[#7c0fb3] place-items-center">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1">
                  Sign Up
                </span>
              </div>
            </span>
          </button>
        </div>
        <span className="text-sm text-gray-500 text-center">
          Already have an account ?{" "}
          <a href="/login" className="text-[#7c0fb3] underline">
            Login
          </a>
        </span>
      </form>
    </div>
  );
};

export default Signup;
