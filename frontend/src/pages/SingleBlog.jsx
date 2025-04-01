import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/api";

const SingleBlog = () => {
  const { blogId } = useParams(); // Get the blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/user/blog/${blogId}`);
        setBlog(response.data.blog);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog details", err);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found.</p>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img
          src={`http://localhost:7000/uploads/${blog.image}`}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4 text-[#7c0fb3]">{blog.title}</h1>
        <p className="text-gray-500 text-sm mt-1">
          Published on:{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="mt-4 text-gray-700 text-lg">{blog.description}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
