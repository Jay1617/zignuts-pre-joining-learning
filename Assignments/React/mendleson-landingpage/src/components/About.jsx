import React from "react";
import AboutUs from "../assets/about-us.png";
import EngagementIcon from "../assets/engagement-icon.png";
import CommunicationIcon from "../assets/communications-icon.png";

const About = () => {
  return (
    <div className="flex flex-row justify-center items-start mt-18 gap-16">
      {/* Left Side  */}
      <div>
        <img src={AboutUs} alt="About-us" className="w-[500px] h-auto mt-20" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col max-w-[650px]">
        {/* Heading */}
        <h2 className="font-[rubik] font-[500] leading-[100%] text-4xl text-[#000000] mb-2 uppercase">
          About us
        </h2>
        <div className="flex flex-row">
          <div className="w-[120px] h-[6px] bg-[#A9A9A9] rounded mb-4"></div>
          <div className="w-[50px] h-[2px] bg-[#A9A9A9] rounded mb-4 mt-0.5"></div>
        </div>

        <p className="font-[rubik] font-[400] leading-[148%] text-[#2C2C2C] mb-8">
          We love what we do and are driven by achieving great results for our
          clients. <br /> Our awards and impressive client list are testament to
          our high quality <br /> approach. We deliver value, creativity,
          results and exceptional levels of <br /> customer service and
          professionalism. We specialise in infrastructure <br /> development,
          energy and natural resources.
        </p>

        <div className="grid grid-cols-2 gap-10">
          {/* Engagement */}
          <div className="flex flex-col">
            <img
              src={EngagementIcon}
              alt="Engagement Icon"
              className="w-8 h-8 mb-5"
            />
            <h3 className="font-[rubik] font-[500] text-lg leading-[100%] text-[#000000] mb-2 uppercase">
              Engagement
            </h3>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%]">
              We are engagement specialists, <br /> who have led projects at all{" "}
              <br /> levels of the IAP2 spectrum. <br />
              <span className="text-[#2C2C2C] cursor-pointer uppercase">
                READ MORE
              </span>
            </p>
          </div>

          {/* Communications */}
          <div className="flex flex-col">
            <img
              src={CommunicationIcon}
              alt="Communications Icon"
              className="w-8 h-8 mb-5"
            />
            <h3 className="font-[rubik] font-[500] text-lg leading-[100%] text-[#000000] mb-2 uppercase">
              Communications
            </h3>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%]">
              We are award-winning leaders in <br /> communications and campaign{" "}
              <br />
              management.{" "}
              <span className="text-[#2C2C2C] cursor-pointer uppercase">
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
