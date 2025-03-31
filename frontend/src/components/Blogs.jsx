import React from "react";

const Blogs = () => {
  return (
    <div className="container h-150 ">
      <div className="text-center mt-8 text-5xl font-bold primary">
        Recent Blogs
      </div>
      {/* blog cards*/}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-20 mt-15">
          <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
              <img
                src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bg-Image"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-0.5 ">
                <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-[#7c0fb3] antialiased">
                  Tailwind card
                </h5>
                <h6 className="text-xs text-slate-400">- July 2, 2025</h6>
              </div>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                felis ligula.
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                data-ripple-light="true"
                type="button"
                className="select-none rounded-lg bg-[#7c0fb3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#C1BFFF] shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
              >
                Read Blog
              </button>
            </div>
          </div>
          <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
              <img
                src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bg-Image"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-0.5 ">
                <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-[#7c0fb3] antialiased">
                  Tailwind card
                </h5>
                <h6 className="text-xs text-slate-400">- July 2, 2025</h6>
              </div>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                felis ligula.
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                data-ripple-light="true"
                type="button"
                className="select-none rounded-lg bg-[#7c0fb3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#C1BFFF] shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
              >
                Read Blog
              </button>
            </div>
          </div>
          <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
              <img
                src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bg-Image"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-0.5 ">
                <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-[#7c0fb3] antialiased">
                  Tailwind card
                </h5>
                <h6 className="text-xs text-slate-400">- July 2, 2025</h6>
              </div>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                felis ligula.
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                data-ripple-light="true"
                type="button"
                className="select-none rounded-lg bg-[#7c0fb3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#C1BFFF] shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
              >
                Read Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
