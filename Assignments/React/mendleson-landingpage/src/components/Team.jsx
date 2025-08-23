import React from "react";
import Person1 from "../assets/person-1.png";
import Person2 from "../assets/person-2.png";
import Person3 from "../assets/person-3.png";

const Team = () => {
  return (
    <div className="my-16 lg:my-38 px-4">
      <div className="text-center mb-8">
        <h2 className="font-[rubik] font-[500] leading-[100%] text-2xl md:text-3xl lg:text-4xl text-[#000000] uppercase">
          OUR TEAM
        </h2>
        <div className="flex justify-center items-center mt-2">
          <div className="w-[75px] h-[6px] bg-[#A9A9A9] rounded"></div>
          <div className="w-[100px] h-[2px] bg-[#A9A9A9] rounded"></div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-24">
        <div className="text-center">
          <img 
            src={Person1} 
            alt="Person-1 Image" 
            className="w-[200px] md:w-auto mx-auto"
          />
          <p className="font-[rubik] font-[400] leading-[100%] text-md text-[#000000] text-center mt-6 lg:mt-8">
            Jessica D'suza
          </p>
        </div>
        <div className="text-center">
          <img 
            src={Person2} 
            alt="Person-2 Image" 
            className="w-[200px] md:w-auto mx-auto"
          />
          <p className="font-[rubik] font-[400] leading-[100%] text-md text-[#000000] text-center mt-6 lg:mt-8">
            Johny Williams
          </p>
        </div>
        <div className="text-center">
          <img 
            src={Person3} 
            alt="Person-3 Image" 
            className="w-[200px] md:w-auto mx-auto"
          />
          <p className="font-[rubik] font-[400] leading-[100%] text-md text-[#000000] text-center mt-6 lg:mt-8">
            Sanya R,
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;