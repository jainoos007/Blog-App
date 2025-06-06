import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/common/Layout";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./pages/SingleBlog";
import CreateBlog from "./components/CreateBlog";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/Dashboard";
import UpdateBlog from "./components/UpdateBlog";
import About from "./components/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:blogId" element={<SingleBlog />} />

          {/* Protected route */}
          <Route element={<PrivateRoute />}>
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/blog/update/:blogId" element={<UpdateBlog />} />
            <Route path="/dashboard/:userId" element={<Dashboard />} />
          </Route>
        </Routes>
        {/* Toast Notifications Container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Layout>
    </Router>
  );
}

export default App;
