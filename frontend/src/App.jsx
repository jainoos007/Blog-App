import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <Blogs />
      {/* <Login /> */}
      <Footer />
    </>
  );
}

export default App;
