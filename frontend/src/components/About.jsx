import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About BlogNest
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering voices through beautiful and accessible blogging.
            </p>
            <div className="h-1 w-20 bg-purple-600 mx-auto mb-10"></div>
            <p className="text-lg text-gray-700 mb-10">
              BlogNest lets you write, edit, and share posts easily with simple
              tools and a clean design.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
