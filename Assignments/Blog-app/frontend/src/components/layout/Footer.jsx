import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { FaSquareGithub } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Context } from "../../main";
import toast from "react-hot-toast";

const Footer = () => {
  const location = useLocation();
  const { mode } = useContext(Context);
  const isDashboard = location.pathname.startsWith("/dashboard");

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
  };

  if (isDashboard) {
    return null; // Hide footer on dashboard
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h3 className="text-2xl font-bold">BlogNest</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Discover amazing stories, insights, and knowledge from our community. 
              Join us in exploring a world of diverse content and connect with fellow enthusiasts.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                <FiMail className="mr-3 text-blue-400 group-hover:text-blue-300" />
                <span>info@blognest.com</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                <FiPhone className="mr-3 text-blue-400 group-hover:text-blue-300" />
                <span>+91-999******9</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                <FiMapPin className="mr-3 text-blue-400 group-hover:text-blue-300" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/blogs" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Blogs
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/authors" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Technology', 'Lifestyle', 'Business', 'Travel', 'Sports', 'Economy'].map((category) => (
                <span 
                  key={category}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Stay Updated</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Get the latest blog articles and updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-2xl font-bold">Blog</span>
              <span className="text-2xl font-bold text-blue-400">Nest</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                title="Instagram"
              >
                <AiFillInstagram className="text-2xl" />
              </Link>
              <Link
                to="https://github.com/Jay1617"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                title="GitHub"
              >
                <FaSquareGithub className="text-2xl" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/jay-thummar-256ba4250"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                title="LinkedIn"
              >
                <AiFillLinkedin className="text-2xl" />
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                title="YouTube"
              >
                <AiFillYoutube className="text-2xl" />
              </Link>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 BlogNest. All rights reserved. Made with ❤️ for the community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;