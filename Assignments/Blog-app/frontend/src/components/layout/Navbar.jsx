import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleNavbar = () => {
    setShow(!show);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const isDashboard = location.pathname === "/dashboard";

  if (isDashboard) {
    return null; // Hide navbar on dashboard
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">
              Blog<span className="text-gray-800">Nest</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Blogs
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.avatar?.url || '/user.jpg'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {user.role === "Admin" && (
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiSettings className="text-lg" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={(e) => {
                        handleLogout(e);
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FiLogOut className="text-lg" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleNavbar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {show ? (
              <RxCross1 className="text-xl text-gray-700" />
            ) : (
              <RxHamburgerMenu className="text-xl text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {show && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={handleNavbar}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/blogs"
                onClick={handleNavbar}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Blogs
              </Link>
              <Link
                to="/about"
                onClick={handleNavbar}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </Link>

              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2">
                      <img
                        src={user.avatar?.url || '/user.jpg'}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-700 font-medium">{user.name}</span>
                    </div>
                    {user.role === "Admin" && (
                      <Link
                        to="/dashboard"
                        onClick={handleNavbar}
                        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <FiSettings className="text-lg" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={(e) => {
                        handleLogout(e);
                        handleNavbar();
                      }}
                      className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <FiLogOut className="text-lg" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleNavbar}
                    className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;