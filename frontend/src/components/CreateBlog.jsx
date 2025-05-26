import React, { useState } from "react";
import axios from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setBlogData({ ...blogData, image: e.target.files[0] });
    } else {
      setBlogData({ ...blogData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("image", blogData.image);

    try {
      const response = await axios.post("/blog/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error("Error creating blog", err);
      setErrorMsg("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-90 sm:w-lg md:w-xl lg:w-3xl mx-auto mt-12 mb-12 px-6 py-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-center text-[#7c0fb3] mb-8">
        Create a New Blog
      </h2>

      {errorMsg && (
        <div className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Image Preview */}
        {blogData.image && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={
                typeof blogData.image === "string"
                  ? blogData.image
                  : URL.createObjectURL(blogData.image)
              }
              alt="Blog Preview"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Content
          </label>
          <textarea
            name="description"
            value={blogData.description}
            onChange={handleChange}
            placeholder="Write something amazing..."
            className="w-full p-3 border rounded-lg min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#7c0fb3] text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
