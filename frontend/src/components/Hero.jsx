import React from "react";
import bgImage from "../assets/cat.jpg";

const Hero = () => {
  return (
    <div
      className="bg-cover h-150"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      <div className="container place-items-center flex flex-col gap-8 py-16">
        <h1 className="text-9xl text-[#C1BFFF]">Stay Curious</h1>
        <p className="text-xl text-[#C1BFFF]">
          Discover stories, thinking, and expertise from writers on any topic
        </p>

        {/* Button */}
        <div className="relative group">
          <button className="relative inline-block p-px font-semibold leading-6 text-white bg-[#C1BFFF] shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span className="relative z-10 block px-6 py-3 rounded-xl bg-[#7c0fb3]">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all text-[#C1BFFF] duration-500 group-hover:translate-x-1">
                  CREATE YOUR BLOG
                </span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
