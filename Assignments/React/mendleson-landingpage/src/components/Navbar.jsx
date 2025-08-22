import React from "react";
import logo from "../assets/logo.png";
import assets1 from "../assets/assets-1.png";
import assets2 from "../assets/assets-2.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-4 h-[110px]">
      {/* Logo */}
      <img
        src={assets1}
        alt="Assets-1"
        className="absolute top-0 left-0 w-[119px] h-[111px] -z-10"
      />
      <div className="flex items-center pl-20">
        <img
          src={logo}
          alt="Mendleson Communication"
          className="w-[295px] h-[85px]"
        />
      </div>

      {/* Nav Items */}
      <nav>
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
      <img
        src={assets2}
        alt="Assets-2"
        className="absolute top-0 right-0 w-[250px] h-[250px] -z-10"
      />
    </div>
  );
};

export default Navbar;
