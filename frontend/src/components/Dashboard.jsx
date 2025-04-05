import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../service/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout, updateUser } from "../redux/features/authSlice";

const Dashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // State for active tab
  const [activeTab, setActiveTab] = useState("profile");

  // State for user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State for my blogs
  const [myBlogs, setMyBlogs] = useState([]);

  // State for sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ref for sidebar to detect outside clicks
  const sidebarRef = useRef(null);

  // Fetch user data on component mount
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  // Fetch all blogs by user
  useEffect(() => {
    const getMyBlogs = async () => {
      try {
        const response = await axios.get(`blog/user/${userId}`);
        setMyBlogs(response.data.blogs.blogs);
      } catch (err) {
        console.error("Error fetching blogs", err);
      }
    };
    getMyBlogs();
  }, [userId]);

  // Close sidebar when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle form submission for profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: userData.name,
        email: userData.email,
      };

      if (userData.password.trim() !== "") {
        updatedData.password = userData.password;
      }

      const response = await axios.put(`/user/update/${userId}`, updatedData);
      if (response.status === 200) {
        alert("Profile updated successfully!");

        setUserData({
          name: response.data.user.name,
          email: response.data.user.email,
          password: "",
        });

        dispatch(updateUser(response.data.user));
      }
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Failed to update profile!");
    }
  };

  // Handle account deletion
  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await axios.delete(`/user/delete/${userId}`);
        if (response.status === 200) {
          dispatch(logout());
          navigate("/login");
          alert("Account deleted successfully!");
        }
      } catch (err) {
        console.error("Error deleting profile", err);
        alert("Failed to delete profile!");
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#7c0fb3]">
              Profile Information
            </h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#7c0fb3b7]"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#7c0fb3b7]"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Change your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#7c0fb3b7]"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-[#7c0fb3] hover:bg-[#7c0fb3b7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProfile}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Delete Profile
                </button>
              </div>
            </form>
          </div>
        );
      case "blogs":
        return (
          <div className="p-6 rounded-lg ">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#7c0fb3]">
                My Blogs ({myBlogs.length})
              </h2>
            </div>
            {/* Blog cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
              {myBlogs.length > 0 ? (
                myBlogs.map((blog) => (
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

                      {/* Button */}
                      <div className="flex justify-between">
                        <Link
                          to={`/blog/${blog._id}`}
                          className="select-none rounded-lg bg-[#7c0fb3] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-[#7c0fb3b7] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none cursor-pointer"
                        >
                          Read Blog
                        </Link>
                        <Link
                          to={`/blog/update/${blog._id}`}
                          className="select-none rounded-lg bg-[#7c0fb3] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-[#7c0fb3b7] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none cursor-pointer"
                        >
                          Edit Blog
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No blogs found.{" "}
                  <Link
                    to="/blog/create"
                    className="text-[#7c0fb3] hover:underline"
                  >
                    Create your first blog
                  </Link>
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Toggle button for sidebar on mobile */}
        <button
          className="md:hidden fixed z-20 top-20 left-4 bg-[#7c0fb3] text-white p-2 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Vertical Navigation Bar */}
        <div
          ref={sidebarRef}
          className={`w-64 bg-white border-r border-gray-200 shadow-md fixed md:sticky top-0 h-screen z-10 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "left-0" : "-left-64 md:left-0"
          }`}
        >
          <div className="p-6">
            <h1 className="text-[#7c0fb3] font-bold text-xl mb-6">Dashboard</h1>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-[#7c0fb3] flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
            <nav className="mt-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "profile"
                      ? "bg-[#7c0fb3] text-white"
                      : "text-gray-700 hover:bg-[#7c0fb3b7] hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "blogs"
                      ? "bg-[#7c0fb3] text-white"
                      : "text-gray-700 hover:bg-[#7c0fb3b7] hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  My Blogs
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#7c0fb3b7] hover:text-white rounded-md transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-0 mt-16 md:mt-0">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
