import React from "react";
import Boroondara from "../assets/boroondara.png";
import Port from "../assets/port.png";
import Brigitte from "../assets/brigitte.png";
import Level from "../assets/level.png";
import Bhp from "../assets/bhp.png";
import Victoria from "../assets/victoria.png";
import Pacific from "../assets/pacific.png";
import Vcoss from "../assets/vcoss.png";
import Melbourne from "../assets/melbourne.png";

const Clients = () => {
  return (
    <div className="my-12 lg:my-20 max-w-[1000px] w-full mx-auto flex flex-col justify-center px-4">
      <div className="text-center mb-8">
        <h2 className="font-[rubik] font-[500] leading-[100%] text-2xl md:text-3xl lg:text-4xl text-[#000000] uppercase">
          OUR CLIENTS
        </h2>
        <div className="flex justify-center items-center mt-2">
          <div className="w-[80px] h-[6px] bg-[#A9A9A9] rounded"></div>
          <div className="w-[150px] h-[2px] bg-[#A9A9A9] rounded"></div>
        </div>
      </div>

      {/* Clients Images */}
      <div className="flex flex-col gap-6 lg:gap-10 mt-6">
        {/* Row - 1 */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16">
          <img src={Boroondara} alt="Boroondara" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
          <img src={Port} alt="Port" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
          <img src={Brigitte} alt="Brigitte" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
          <img src={Level} alt="Level" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
          <img src={Bhp} alt="Bhp" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
        </div>

        {/* Row - 2*/}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-18">
          <img src={Victoria} alt="Victoria" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
          <img src={Pacific} alt="Pacific" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
          <img src={Vcoss} alt="Vcoss" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
          <img src={Melbourne} alt="Melbourne" className="max-h-[40px] md:max-h-[50px] lg:max-h-[60px]" />
        </div>
      </div>
    </div>
  );
};

export default Clients;