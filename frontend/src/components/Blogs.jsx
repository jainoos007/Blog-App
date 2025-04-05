import React, { useEffect, useState } from "react";
import axios from "../service/api";
import { Link } from "react-router-dom";
import BlogCard from "./common/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getRecentBlogs = async () => {
      try {
        const response = await axios.get("/user/blogs");
        const sortedBlogs = response.data.blogs
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setBlogs(sortedBlogs);
      } catch (err) {
        console.log("Error fetching blogs", err);
      }
    };
    getRecentBlogs();
  }, []);
  return (
    <div className="container min-h-screen ">
      <div className="text-center mt-8 text-5xl font-bold primary">
        Recent Blogs
      </div>
      {/* blog cards*/}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-20 mt-15 mb-15">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
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

export default Blogs;
