import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../service/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout, updateUser } from "../redux/features/authSlice";

const Dashboard = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // State for active tab
  const [activeTab, setActiveTab] = useState("profile");

  // State for user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //state for my my blogs
  const [myBlogs, setMyBlogs] = useState([]);

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

  //Fetch all blogs by user
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
    // API call to update the profile
    try {
      const updatedData = {
        name: userData.name,
        email: userData.email,
      };

      // Only add password if it's not empty
      if (userData.password.trim() !== "") {
        updatedData.password = userData.password;
      }

      const response = await axios.put(`/user/update/${userId}`, updatedData);
      if (response.status == 200) {
        alert("Profile updated successfully!");

        //update local component state
        setUserData({
          name: response.data.user.name,
          email: response.data.user.email,
          password: "",
        });

        // Update Redux store
        dispatch(updateUser(response.data.user));
      }
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Failed to update profile!");
    }
  };

  // Handle account deletion
  const handleDeleteProfile = async () => {
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
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  type="text"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Change your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProfile}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete Profile
                </button>
              </div>
            </form>
          </div>
        );
      case "blogs":
        return (
          <div className="p-6 bg-slate-400 rounded-lg shadow-md">
            <div className="text-center mt-8 text-5xl font-bold primary">
              My Blogs({myBlogs.length})
            </div>
            {/* blog cards*/}
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-20 mt-15 mb-15">
                {/*single blog card */}

                {myBlogs.length > 0 ? (
                  myBlogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="relative flex w-80  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                    >
                      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                        <img
                          src={`http://localhost:7000/uploads/${blog.image}`} // Fallback image}
                          alt={blog.title}
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between ">
                          <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-[#7c0fb3] antialiased blog-title">
                            {blog.title}
                          </h5>
                          <h6 className="text-xs text-slate-400">
                            {new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </h6>
                        </div>
                        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased blog-description">
                          {blog.description}
                        </p>
                      </div>
                      <div className="p-6 pt-0 flex justify-between">
                        <Link
                          to={`/blog/${blog._id}`}
                          data-ripple-light="true"
                          type="button"
                          className="select-none rounded-lg bg-[#7c0fb3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#C1BFFF] shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                        >
                          Read Blog
                        </Link>
                        <Link
                          to={`/blog/update/${blog._id}`}
                          data-ripple-light="true"
                          type="button"
                          className="select-none rounded-lg bg-[#7c0fb3] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#C1BFFF] shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                        >
                          Edit Blog
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-3">
                    No blogs found.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Vertical Navigation Bar */}
      <div className="w-64 bg-gray-800">
        <div className="p-4">
          <h1 className="text-white font-bold text-xl mb-6">Dashboard</h1>
          <nav className="mt-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  activeTab === "profile"
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("blogs")}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  activeTab === "blogs"
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                My Blogs
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
