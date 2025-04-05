import React, { useEffect, useState } from "react";
import axios from "../service/api";
import { Link } from "react-router-dom";
import BlogCard from "../components/common/BlogCard";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get("/user/blogs");
        setBlogs(response.data.blogs);
      } catch (err) {
        console.log("Error fetching blogs", err);
      }
    };
    getAllBlogs();
  }, []);

  console.log(blogs);

  return (
    <div className="container min-h-screen flex flex-col ">
      <div className="text-center mt-8 text-5xl font-bold primary">
        All Blogs({blogs.length})
      </div>
      {/* blog cards*/}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-20 mt-15 mb-15">
          {/*single blog card */}

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

export default AllBlogs;
