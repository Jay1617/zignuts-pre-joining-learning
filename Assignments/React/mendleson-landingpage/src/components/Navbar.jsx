import React from "react";
import logo from "../assets/logo.png"; 
import assets1 from "../assets/assets-1.png"; // Blue shape (top-left)
import assets2 from "../assets/assets-2.png"; // Purple shape (top-right)

const Navbar = () => {
  return (
    <div className="relative bg-white">
      {/* Decorative Shapes */}
      <img
        src={assets1}
        alt="Left decoration"
        className="absolute top-0 left-0 w-[120px] h-[120px] -z-10"
      />
      <img
        src={assets2}
        alt="Right decoration"
        className="absolute top-0 right-0 w-[250px] h-[250px] -z-10"
      />

      {/* Navbar Content */}
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Mendleson Communication" className="h-[60px] w-auto" />
        </div>

        {/* Nav Items */}
        <nav>
          <ul className="flex space-x-8 text-gray-800 font-medium">
            <li><a href="#about" className="hover:text-blue-500 transition">About Us</a></li>
            <li><a href="#services" className="hover:text-blue-500 transition">Services</a></li>
            <li><a href="#team" className="hover:text-blue-500 transition">Team</a></li>
            <li><a href="#clients" className="hover:text-blue-500 transition">Clients</a></li>
            <li><a href="#contact" className="hover:text-blue-500 transition">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
