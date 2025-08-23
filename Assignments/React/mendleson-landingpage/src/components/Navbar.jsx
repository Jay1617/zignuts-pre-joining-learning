import React, { useState } from "react";
import logo from "../assets/logo.png";
import assets1 from "../assets/assets-1.png";
import assets2 from "../assets/assets-2.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 py-4 h-[110px] md:h-[110px] lg:h-[110px]">
      {/* Logo */}
      <img
        src={assets1}
        alt="Assets-1"
        className="absolute top-0 left-0 w-[60px] h-[56px] md:w-[90px] md:h-[84px] lg:w-[119px] lg:h-[111px] -z-10"
      />
      <div className="flex items-center pl-8 md:pl-12 lg:pl-20">
        <img
          src={logo}
          alt="Mendleson Communication"
          className="w-[180px] h-[52px] md:w-[220px] md:h-[64px] lg:w-[295px] lg:h-[85px]"
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex space-x-8 text-gray-800 font-medium pr-18 font-[roboto]">
          <li>
            <a href="#about" className="hover:text-blue-500 transition">
              About Us
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-blue-500 transition">
              Services
            </a>
          </li>
          <li>
            <a href="#team" className="hover:text-blue-500 transition">
              Team
            </a>
          </li>
          <li>
            <a href="#clients" className="hover:text-blue-500 transition">
              Clients
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-500 transition">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`lg:hidden absolute top-[110px] left-0 w-full bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ul className="flex flex-col text-gray-800 font-medium font-[roboto] py-4">
          <li>
            <a 
              href="#about" 
              className="block px-6 py-3 hover:text-blue-500 hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              className="block px-6 py-3 hover:text-blue-500 hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#team" 
              className="block px-6 py-3 hover:text-blue-500 hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </a>
          </li>
          <li>
            <a 
              href="#clients" 
              className="block px-6 py-3 hover:text-blue-500 hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Clients
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="block px-6 py-3 hover:text-blue-500 hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      <img
        src={assets2}
        alt="Assets-2"
        className="absolute top-0 right-0 w-[125px] h-[125px] md:w-[180px] md:h-[180px] lg:w-[250px] lg:h-[250px] -z-10"
      />
    </div>
  );
};

export default Navbar;