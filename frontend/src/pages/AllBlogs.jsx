import React, { useEffect, useState } from "react";
import axios from "../service/api";
import { Link } from "react-router-dom";
import BlogCard from "../components/common/BlogCard";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/user/blogs");
        // Ensure we populate author information
        const blogsWithAuthor = response.data.blogs;
        setBlogs(blogsWithAuthor);
        setFilteredBlogs(blogsWithAuthor);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching blogs", err);
        setLoading(false);
      }
    };
    getAllBlogs();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = [...blogs];

    // Apply search filter if there is a search term
    if (searchTerm) {
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (blog.author?.name &&
            blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredBlogs(result);
  }, [searchTerm, sortOrder, blogs]);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-[#7c0fb3] mb-2">
        All Blogs
      </h1>
      <p className="text-center text-gray-500 mb-8">
        {blogs.length} {blogs.length === 1 ? "article" : "articles"} to explore
      </p>

      {/* Search and filter bar */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-md">
          {/* Search input */}
          <div className="relative w-full md:w-auto flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search blogs by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c0fb3]"
            />
          </div>

          {/* Sort selector */}
          <div className="w-full md:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c0fb3] bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count when filtered */}
      {searchTerm && (
        <div className="max-w-7xl mx-auto mb-6">
          <p className="text-gray-600">
            Found {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "result" : "results"} for "
            {searchTerm}"
          </p>
        </div>
      )}

      {/* Blog grid */}
      <div className="flex justify-center">
        {loading ? (
          <div className="flex items-center justify-center h-64 w-full">
            <div className="w-12 h-12 border-4 border-[#7c0fb3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-7xl">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                {searchTerm ? (
                  <>
                    <p className="text-gray-500 text-lg">
                      No blogs matching "{searchTerm}"
                    </p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-4 px-4 py-2 text-[#7c0fb3] border border-[#7c0fb3] rounded-md hover:bg-[#7c0fb3] hover:text-white transition-colors"
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 text-lg">
                    No blogs available yet
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Back to homepage link */}
      <div className="flex justify-center mt-12">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 text-[#7c0fb3] border border-[#7c0fb3] rounded-md hover:bg-[#7c0fb3] hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AllBlogs;
