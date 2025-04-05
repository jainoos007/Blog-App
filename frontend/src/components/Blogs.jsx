import React, { useEffect, useState } from "react";
import axios from "../service/api";
import { Link } from "react-router-dom";
import BlogCard from "./common/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 6;

  const fetchBlogs = async (pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/user/blogs?page=${pageNum}&limit=${blogsPerPage}`
      );

      if (pageNum === 1) {
        setBlogs(response.data.blogs);
      } else {
        setBlogs((prev) => [...prev, ...response.data.blogs]);
      }

      setTotalBlogs(response.data.total || response.data.blogs.length);
      setHasMore(response.data.blogs.length === blogsPerPage);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching blogs", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-center mb-12 text-4xl md:text-5xl font-bold text-[#7c0fb3]">
        Recent Blogs
      </h1>

      {/* Blog grid */}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-7xl">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : !loading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No blogs found.</p>
              <p className="text-gray-400 mt-2">
                Check back later for new content!
              </p>
            </div>
          ) : null}
        </div>

        {/* Loading state */}
        {loading && page === 1 && (
          <div className="flex justify-center w-full my-12">
            <div className="w-12 h-12 rounded-full border-4 border-[#7c0fb3] border-t-transparent animate-spin"></div>
          </div>
        )}

        {/* Load more button */}
        {blogs.length > 0 && hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-[#7c0fb3] text-white rounded-lg flex items-center justify-center transition-all hover:bg-[#9215d2] focus:ring-2 focus:ring-[#7c0fb3]/50"
              disabled={loading}
            >
              {loading && page > 1 ? (
                <>
                  <span className="w-5 h-5 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

        {/* Show count of displayed blogs */}
        {blogs.length > 0 && (
          <div className="mt-4 text-gray-500 text-sm">
            Showing {blogs.length} of {totalBlogs} blogs
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
