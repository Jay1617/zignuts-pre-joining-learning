import EngagementImg from "../assets/engagement-vector.png";
import CommunicationsImg from "../assets/communications-research-icon.png";
import FacilitationImg from "../assets/facilitation-icon.png";
import ConsultationImg from "../assets/consultation-icon.png";
import TraningImg from "../assets/training-icon.png";
import assets6 from "../assets/assets-6.png";
import assets7 from "../assets/assets-7.png";
import assets8 from "../assets/assets-8.png";

const Services = () => {
  return (
    <div className="w-full flex flex-col items-center px-10 mt-20 relative">
      {/* BG images */}
      <img
        src={assets6}
        alt="Assets-6"
        className="absolute bottom-1/2 right-0 w-[200px] opacity-100 pointer-events-none"
      />
      <img
        src={assets7}
        alt="Assets-7"
        className="absolute top-1/2 left-0 w-[250px] opacity-100 pointer-events-none"
      />
      <img
        src={assets8}
        alt="Assets-8"
        className="absolute bottom-0 right-0 w-[300px] opacity-100 pointer-events-none"
      />
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="font-[rubik] font-[500] leading-[100%] text-4xl text-[#000000] uppercase">
          Services
        </h2>
        <div className="flex justify-center items-center mt-2">
          <div className="w-[48px] h-[6px] bg-[#A9A9A9] rounded"></div>
          <div className="w-[125px] h-[2px] bg-[#A9A9A9] rounded"></div>
        </div>
      </div>

      <div className="flex flex-col gap-20 w-full max-w-[950px]">
        {/* Engagement */}
        <div className="flex flex-row justify-between items-center">
          <div className="max-w-[600px]">
            <h2 className="font-[rubik] font-[500] text-3xl text-[#000000] mb-4 uppercase text-right">
              Engagement
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-right">
              We love what we do and are driven by achieving great results for
              our <br /> clients. Our awards and impressive client list are
              testament to our high <br /> quality approach. We deliver value,
              creaKvity, results and excepKonal <br /> levels of customer
              service and professionalism. We specialise in <br />{" "}
              infrastructure development, energy and natural resources.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img src={EngagementImg} alt="Engagement" className="w-[350px]" />
          </div>
        </div>

        {/* Communications */}
        <div className="flex flex-row-reverse justify-between items-center gap-10">
          <div className="max-w-[600px]">
            <h2 className="font-[rubik] font-[500] text-3xl text-[#000000] mb-4 uppercase">
              Communications
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />{" "}
              Faucibus quam quis egestas orci. Scelerisque eu, vitae <br />{" "}
              sapien, pellentesque et. Sit ac fames facilisis nibh <br />{" "}
              faucibus.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={CommunicationsImg}
              alt="Communications"
              className="w-[350px]"
            />
          </div>
        </div>

        {/* Facilitation */}
        <div className="flex flex-row justify-between items-center gap-10">
          <div className="max-w-[600px]">
            <h2 className="font-[rubik] font-[500] text-3xl text-[#000000] mb-4 uppercase text-right">
              Facilitation
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-right">
              We love what we do and are driven by achieving great results for
              our <br /> clients. Our awards and impressive client list are
              testament to our high <br /> quality approach. We deliver value,
              creaKvity, results and excepKonal <br /> levels of customer
              service and professionalism. We specialise in <br />{" "}
              infrastructure development, energy and natural resources.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={FacilitationImg}
              alt="Facilitation"
              className="w-[350px]"
            />
          </div>
        </div>

        {/* Consultation */}
        <div className="flex flex-row-reverse justify-between items-center gap-10">
          <div className="max-w-[600px]">
            <h2 className="font-[rubik] font-[500] text-3xl text-[#000000] mb-4 uppercase">
              Consultation and Research
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />{" "}
              Faucibus quam quis egestas orci. Scelerisque eu, vitae <br />{" "}
              sapien, pellentesque et. Sit ac fames facilisis nibh <br />{" "}
              faucibus.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={ConsultationImg}
              alt="Consultation"
              className="w-[350px]"
            />
          </div>
        </div>

        {/* Training */}
        <div className="flex flex-row justify-between items-center gap-10">
          <div className="max-w-[600px]">
            <h2 className="font-[rubik] font-[500] text-3xl text-[#000000] mb-4 uppercase text-right">
              Training & Mentoring
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-right">
              We love what we do and are driven by achieving great results for
              our <br /> clients. Our awards and impressive client list are
              testament to our high <br /> quality approach. We deliver value,
              creaKvity, results and excepKonal <br /> levels of customer
              service and professionalism. We specialise in <br />{" "}
              infrastructure development, energy and natural resources.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img src={TraningImg} alt="Training" className="w-[350px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
