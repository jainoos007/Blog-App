import React, { useEffect, useState } from "react";
import axios from "../service/api";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get("/user/blogs");
        setBlogs(response.data.blogs);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching blogs", err);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <div className="container min-h-screen flex flex-col ">
      <div className="text-center mt-8 text-5xl font-bold primary">
        All Blogs
      </div>
      {/* blog cards*/}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-20 mt-15 mb-15">
          {/*single blog card */}

          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              >
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                  <img
                    src={`http://localhost:7000/uploads/${blog.image}`} // Fallback image}
                    alt={blog.title}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-0.5 ">
                    <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-[#7c0fb3] antialiased">
                      {blog.title}
                    </h5>
                    <h6 className="text-xs text-slate-400">
                      -
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h6>
                  </div>
                  <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    {blog.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${blog._id}`}
                    data-ripple-light="true"
                    type="button"
                    className="select-none rounded-lg bg-[#7c0fb3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#C1BFFF] shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                  >
                    Read Blog
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No blogs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
