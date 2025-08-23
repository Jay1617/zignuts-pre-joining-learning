import React from "react";
import Project1 from "../assets/Project-1.png";
import Project2 from "../assets/Project-2.png";
import Project3 from "../assets/Project-3.png";

const Projects = () => {
  return (
    <div className="my-12 lg:my-20 px-4">
      <div className="text-center mb-8">
        <h2 className="font-[rubik] font-[500] leading-[100%] text-2xl md:text-3xl lg:text-4xl text-[#000000] uppercase">
          OUR PROJECTS
        </h2>
        <div className="flex justify-center items-center mt-2">
          <div className="w-[80px] h-[6px] bg-[#A9A9A9] rounded"></div>
          <div className="w-[190px] h-[2px] bg-[#A9A9A9] rounded"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 max-w-[900px] mx-auto">
        {/* Left Side */}
        <div className="w-full lg:w-[400px] h-[250px] md:h-[300px] lg:h-full">
          <img
            src={Project1}
            alt="Project-1"
            className="w-full h-full object-cover rounded-lg lg:rounded-none"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col lg:flex-col gap-4 w-full lg:w-[400px]">
          <div className="h-[200px] md:h-[250px] lg:h-full">
            <img
              src={Project2}
              alt="Project-2"
              className="w-full h-full object-cover rounded-lg lg:rounded-none"
            />
          </div>
          <div className="h-[200px] md:h-[250px] lg:h-full">
            <img
              src={Project3}
              alt="Project-3"
              className="w-full h-full object-cover rounded-lg lg:rounded-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;