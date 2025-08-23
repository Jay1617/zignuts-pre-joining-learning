import React from "react";
import AboutUs from "../assets/about-us.png";
import EngagementIcon from "../assets/engagement-icon.png";
import CommunicationIcon from "../assets/communications-icon.png";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start mt-12 lg:mt-18 gap-8 lg:gap-16 px-4 lg:px-0">
      {/* Left Side  */}
      <div className="flex justify-center lg:justify-start w-full lg:w-auto">
        <img 
          src={AboutUs} 
          alt="About-us" 
          className="w-[300px] md:w-[400px] lg:w-[500px] h-auto mt-8 lg:mt-20" 
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col max-w-full lg:max-w-[650px] px-4 lg:px-0">
        <h2 className="font-[rubik] font-[500] leading-[100%] text-2xl md:text-3xl lg:text-4xl text-[#000000] mb-2 uppercase text-center lg:text-left">
          About us
        </h2>
        <div className="flex flex-row justify-center lg:justify-start">
          <div className="w-[120px] h-[6px] bg-[#A9A9A9] rounded mb-4"></div>
          <div className="w-[50px] h-[2px] bg-[#A9A9A9] rounded mb-4 mt-0.5"></div>
        </div>

        <p className="font-[rubik] font-[400] leading-[148%] text-[#2C2C2C] mb-8 text-center lg:text-left text-sm md:text-base">
          We love what we do and are driven by achieving great results for our
          clients. Our awards and impressive client list are testament to
          our high quality approach. We deliver value, creativity,
          results and exceptional levels of customer service and
          professionalism. We specialise in infrastructure development, energy and natural resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Engagement */}
          <div className="flex flex-col text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <img
                src={EngagementIcon}
                alt="Engagement Icon"
                className="w-8 h-8 mb-5"
              />
            </div>
            <h3 className="font-[rubik] font-[500] text-lg leading-[100%] text-[#000000] mb-2 uppercase">
              Engagement
            </h3>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-sm md:text-base">
              We are engagement specialists, who have led projects at all levels of the IAP2 spectrum.
              <br />
              <span className="text-[#2C2C2C] cursor-pointer uppercase font-medium">
                READ MORE
              </span>
            </p>
          </div>

          {/* Communications */}
          <div className="flex flex-col text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <img
                src={CommunicationIcon}
                alt="Communications Icon"
                className="w-8 h-8 mb-5"
              />
            </div>
            <h3 className="font-[rubik] font-[500] text-lg leading-[100%] text-[#000000] mb-2 uppercase">
              Communications
            </h3>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-sm md:text-base">
              We are award-winning leaders in communications and campaign management.
              <br />
              <span className="text-[#2C2C2C] cursor-pointer uppercase font-medium">
                READ MORE
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;