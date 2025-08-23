import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="py-6 lg:py-10">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between gap-6 lg:gap-8 bg-[#BFDBFF] px-6 md:px-12 lg:px-22 py-8 lg:py-12 mx-4 md:mx-auto rounded-lg md:rounded-none">
        {/* Social */}
        <div className="text-center md:text-left">
          <h4 className="font-[700] font-[rubik] leading-[221%] text-center md:text-left mb-2">
            Social
          </h4>
          <ul className="space-y-1">
            <li className="flex items-center justify-center md:justify-start gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
              <FaFacebook className="text-blue-800 text-xl" /> Facebook
            </li>
            <li className="flex items-center justify-center md:justify-start gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
              <FaLinkedin className="text-blue-700 rounded-full text-xl" /> LinkedIn
            </li>
            <li className="flex items-center justify-center md:justify-start gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
              <FcGoogle className="text-xl" /> Google +
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div className="text-center md:text-left">
          <h4 className="font-[700] font-[rubik] leading-[221%] text-center md:text-left mb-2">
            Explore
          </h4>
          <ul className="space-y-1">
            <li className="font-[400] font-[rubik] leading-[221%] text-sm">
              Services
            </li>
            <li className="font-[400] font-[rubik] leading-[221%] text-sm">
              Team
            </li>
            <li className="font-[400] font-[rubik] leading-[221%] text-sm">
              Clients
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h4 className="font-[700] font-[rubik] leading-[221%] text-center md:text-left mb-2">
            Contact
          </h4>
          <p className="font-[400] font-[rubik] leading-[221%] text-sm">
            Lorem Ipsum dummy address <br />
            used for display <br />
            1234567890
          </p>
        </div>

        {/* Email */}
        <div className="text-center md:text-left">
          <h4 className="font-[700] font-[rubik] leading-[221%] text-center md:text-left mb-2">
            Email
          </h4>
          <p className="font-[400] font-[rubik] leading-[221%] text-sm break-words">
            mendlesoncommunication@email.com
          </p>
        </div>
      </div>
      
      <div className="mt-6 lg:mt-8 px-4">
        <p className="font-[400] font-[rubik] leading-[100%] text-center text-sm lg:text-md">
          © Copyright 2018 Mendleson Communication Pty Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;