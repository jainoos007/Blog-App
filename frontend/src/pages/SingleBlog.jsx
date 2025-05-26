import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../service/api";

const SingleBlog = () => {
  const { blogId } = useParams(); // Get the blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#7c0fb3] border-t-transparent"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold text-red-500">Blog not found</h2>
        <Link
          to="/blogs"
          className="rounded-lg bg-[#7c0fb3] px-6 py-2 text-white hover:bg-[#9215d2]"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-xl bg-white shadow-xl">
          {/* Header Image */}
          <div className="relative h-80 w-full overflow-hidden rounded-t-xl">
            {blog.image && (
              <img
                src={`http://localhost:7000/uploads/${blog.image}`}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
          </div>

          {/* Content Container */}
          <div className="relative p-8">
            {/* Author Info - Positioned to overlap the image */}
            <div className="absolute -top-16 left-8 flex items-center gap-4 rounded-xl bg-white p-4 shadow-lg">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
                {blog.author?.image ? (
                  <img
                    src={`http://localhost:7000/uploads/${blog.author.image}`}
                    alt={blog.author.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#7c0fb3] text-xl font-bold text-white">
                    {blog.author?.name
                      ? blog.author.name.charAt(0).toUpperCase()
                      : "A"}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {blog.author?.name || "Anonymous"}
                </h3>
                <p className="text-sm text-gray-600">
                  {blog.author?.email || "Contributor"}
                </p>
              </div>
            </div>

            {/* Blog Metadata */}
            <div className="mb-6 mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
              <div>
                <span className="rounded-full bg-[#7c0fb3]/10 px-4 py-1 text-sm font-medium text-[#7c0fb3]">
                  {blog.category || "Blog"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Blog Title and Content */}
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              {blog.title}
            </h1>
            <div className="prose prose-lg max-w-none text-gray-700">
              {/* If blog content has paragraphs, split and display them properly */}
              {blog.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Social Share Options */}
            <div className="mt-12 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">
                    Share:
                  </span>
                  <button className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="rounded-full bg-blue-800 p-2 text-white hover:bg-blue-900">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                  <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </button>
                </div>
                <Link
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-sm font-medium text-[#7c0fb3] hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
