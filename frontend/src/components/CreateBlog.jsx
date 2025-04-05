import React, { useState } from "react";
import axios from "../service/api";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setBlogData({ ...blogData, image: e.target.files[0] });
    } else {
      setBlogData({ ...blogData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("image", blogData.image);

    try {
      const response = await axios.post("/blog/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Blog created successfully", response.data);
      navigate("/blogs"); // Redirect to All Blogs page
    } catch (err) {
      console.error("Error creating blog", err);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-[#7c0fb3]">
        Create a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={blogData.title}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={blogData.description}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-3 border rounded"
        />
        {/* Image Preview */}
        {blogData.image && (
          <img
            src={
              typeof blogData.image === "string"
                ? blogData.image // Existing image URL
                : URL.createObjectURL(blogData.image) // Preview new uploaded image
            }
            alt="Blog Preview"
            className="w-40 h-40 object-cover mt-4 rounded-lg shadow-md"
          />
        )}

        <button
          type="submit"
          className="bg-[#7c0fb3] text-white p-3 rounded font-bold hover:bg-purple-600 cursor-pointer"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
