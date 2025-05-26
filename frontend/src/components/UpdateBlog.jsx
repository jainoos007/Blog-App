import axios from "../service/api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { blogId } = useParams();

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });

  // Fetch the blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/user/blog/${blogId}`);
        setBlogData({
          title: response.data.blog.title,
          description: response.data.blog.description,
          image: response.data.blog.image,
        });
      } catch (err) {
        console.error("Error fetching blog details", err);
      }
    };
    fetchBlog();
  }, [blogId]);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setBlogData((prevData) => ({
        ...prevData,
        image: files[0], // Store the File object
      }));
    } else {
      setBlogData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
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
      const response = await axios.put(`/blog/update/${blogId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated successfully");
      navigate("/blogs"); // Redirect to All Blogs page
    } catch (err) {
      console.error("Error creating blog", err);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(`/blog/delete/${blogId}`);
        toast.success("Blog deleted successfully");
        navigate("/blogs"); // Redirect to All Blogs page
      } catch (err) {
        console.error("Error deleting blog", err);
      }
    }
  };

  return (
    <div className="w-90 sm:w-lg md:w-xl lg:w-3xl container mx-auto mt-10 mb-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-[#7c0fb3]">
        Update Blog
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
                ? `http://localhost:7000/uploads/${blogData.image}` // Existing image URL
                : URL.createObjectURL(blogData.image) // Preview new uploaded image
            }
            alt="Blog Preview"
            className="w-40 h-40 object-cover mt-4 rounded-lg shadow-md"
          />
        )}

        {/* <button
          type="submit"
          className="bg-[#7c0fb3] text-white p-3 rounded font-bold hover:bg-purple-600 cursor-pointer"
        >
          Update
        </button> */}

        <div className="flex items-center justify-between mt-10">
          <button
            type="submit"
            className="bg-[#7c0fb3] text-white p-3 rounded font-bold hover:bg-purple-600 cursor-pointer"
          >
            Update Blog
          </button>
          <button
            type="button"
            onClick={handleDeleteBlog}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
