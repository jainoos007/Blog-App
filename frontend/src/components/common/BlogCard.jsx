import React from "react";
import { Link } from "react-router-dom";
import userPic from "../../assets/user.png";

const BlogCard = ({ blog }) => {
  return (
    <div
      key={blog._id}
      className="w-80 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
    >
      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://localhost:7000/uploads/${blog.image}`}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content section */}
      <div className="p-5">
        {/* Date and time */}
        <div className="mb-2 text-xs text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-800 hover:text-[#7c0fb3]">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {blog.description}
        </p>

        {/* Author section */}
        <div className="mb-4 flex items-center">
          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
            <img
              src={
                blog.author?.image
                  ? `http://localhost:7000/uploads/${blog.author.image}`
                  : userPic
              }
              alt="Author"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {blog.author?.name || "Anonymous"}
            </p>
            <p className="text-xs text-gray-500">
              {blog.author?.email || "Contributor"}
            </p>
          </div>
        </div>

        {/* Read Button */}
        <Link
          to={`/blog/${blog._id}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#7c0fb3] px-4 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-[#9215d2] focus:ring-2 focus:ring-[#7c0fb3]/50"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
