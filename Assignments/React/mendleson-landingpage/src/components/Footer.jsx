import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="py-10">
      <div className="max-w-[1100px] mx-auto flex flex-col bg-[#BFDBFF]  md:flex-row justify-between gap-8 px-22 py-12">
        <div>
          <h4 className="font-[700] font-[rubik] leading-[221%] text-center">
            Social
          </h4>
          <ul>
            <li className="flex items-center gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
              <FaFacebook className="text-blue-800 text-xl" /> Facebook
            </li>
            <li className="flex items-center gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
              <FaLinkedin className="text-blue-700 rounded-full text-xl" /> LinkedIn
            </li>
            <li className="flex items-center gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
              <FcGoogle className="text-xl" /> Google +
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-[700] font-[rubik] leading-[221%] text-center">
            Explore
          </h4>
          <ul className="">
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

        <div>
          <h4 className="font-[700] font-[rubik] leading-[221%] text-left">
            Contact
          </h4>
          <p className="flex items-center gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
            Lorem Ipsum dummy address <br />
            used for display <br />
            1234567890
          </p>
        </div>

        {/* Email */}
        <div>
          <h4 className="font-[700] font-[rubik] leading-[221%] text-left">
            Email
          </h4>
          <p className="flex items-center gap-4 font-[400] font-[rubik] leading-[221%] text-sm">
            mendlesoncommunication@email.com
          </p>
        </div>
      </div>
      <div className="mt-8">
        <p className="font-[400] font-[rubik] leading-[100%] text-center text-md">© Copyright 2018 Mendleson Communication Pty Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
