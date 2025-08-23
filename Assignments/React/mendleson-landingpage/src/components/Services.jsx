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
    <div className="w-full flex flex-col items-center px-4 lg:px-10 mt-12 lg:mt-20 relative">
      {/* BG images */}
      <img
        src={assets6}
        alt="Assets-6"
        className="hidden lg:block absolute bottom-1/2 right-0 w-[200px] opacity-100 pointer-events-none"
      />
      <img
        src={assets7}
        alt="Assets-7"
        className="hidden lg:block absolute top-1/2 left-0 w-[250px] opacity-100 pointer-events-none"
      />
      <img
        src={assets8}
        alt="Assets-8"
        className="hidden lg:block absolute bottom-0 right-0 w-[300px] opacity-100 pointer-events-none"
      />

      <div className="text-center mb-8 lg:mb-16">
        <h2 className="font-[rubik] font-[500] leading-[100%] text-2xl md:text-3xl lg:text-4xl text-[#000000] uppercase">
          Services
        </h2>
        <div className="flex justify-center items-center mt-2">
          <div className="w-[48px] h-[6px] bg-[#A9A9A9] rounded"></div>
          <div className="w-[125px] h-[2px] bg-[#A9A9A9] rounded"></div>
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:gap-20 w-full max-w-[950px]">
        {/* Engagement */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="max-w-full lg:max-w-[600px] order-2 lg:order-1">
            <h2 className="font-[rubik] font-[500] text-xl md:text-2xl lg:text-3xl text-[#000000] mb-4 uppercase text-center lg:text-right">
              Engagement
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-center lg:text-right text-sm md:text-base">
              We love what we do and are driven by achieving great results for
              our clients. Our awards and impressive client list are testament
              to our high quality approach. We deliver value, creativity,
              results and exceptional levels of customer service and
              professionalism. We specialise in infrastructure development,
              energy and natural resources.
            </p>
          </div>
          <div className="flex-shrink-0 order-1 lg:order-2">
            <img
              src={EngagementImg}
              alt="Engagement"
              className="w-[250px] md:w-[300px] lg:w-[350px] mb-4 lg:mb-0 lg:ml-8"
            />
          </div>
        </div>

        {/* Communications */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-10">
          <div className="flex-shrink-0 order-1 lg:order-1">
            <img
              src={CommunicationsImg}
              alt="Communications"
              className="w-[250px] md:w-[300px] lg:w-[350px] mb-4 lg:mb-0 lg:mr-8"
            />
          </div>
          <div className="max-w-full lg:max-w-[600px] order-2 lg:order-2">
            <h2 className="font-[rubik] font-[500] text-xl md:text-2xl lg:text-3xl text-[#000000] mb-4 uppercase text-center lg:text-left">
              Communications
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-center lg:text-left text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
              quam quis egestas orci. Scelerisque eu, vitae sapien, pellentesque
              et. Sit ac fames facilisis nibh faucibus.
            </p>
          </div>
        </div>

        {/* Facilitation */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-10">
          <div className="max-w-full lg:max-w-[600px] order-2 lg:order-1">
            <h2 className="font-[rubik] font-[500] text-xl md:text-2xl lg:text-3xl text-[#000000] mb-4 uppercase text-center lg:text-right">
              Facilitation
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-center lg:text-right text-sm md:text-base">
              We love what we do and are driven by achieving great results for
              our clients. Our awards and impressive client list are testament
              to our high quality approach. We deliver value, creativity,
              results and exceptional levels of customer service and
              professionalism. We specialise in infrastructure development,
              energy and natural resources.
            </p>
          </div>
          <div className="flex-shrink-0 order-1 lg:order-2">
            <img
              src={FacilitationImg}
              alt="Facilitation"
              className="w-[250px] md:w-[300px] lg:w-[350px] mb-4 lg:mb-0 lg:ml-8"
            />
          </div>
        </div>

        {/* Consultation */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-10">
          <div className="flex-shrink-0 order-1 lg:order-1">
            <img
              src={ConsultationImg}
              alt="Consultation"
              className="w-[250px] md:w-[300px] lg:w-[350px] mb-4 lg:mb-0 lg:mr-8"
            />
          </div>
          <div className="max-w-full lg:max-w-[600px] order-2 lg:order-2">
            <h2 className="font-[rubik] font-[500] text-xl md:text-2xl lg:text-3xl text-[#000000] mb-4 uppercase text-center lg:text-left">
              Consultation and Research
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-center lg:text-left text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
              quam quis egestas orci. Scelerisque eu, vitae sapien, pellentesque
              et. Sit ac fames facilisis nibh faucibus.
            </p>
          </div>
        </div>

        {/* Training */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-10">
          <div className="max-w-full lg:max-w-[600px] order-2 lg:order-1">
            <h2 className="font-[rubik] font-[500] text-xl md:text-2xl lg:text-3xl text-[#000000] mb-4 uppercase text-center lg:text-right">
              Training & Mentoring
            </h2>
            <p className="font-[rubik] font-[400] text-[#2C2C2C] leading-[148%] text-center lg:text-right text-sm md:text-base">
              We love what we do and are driven by achieving great results for
              our clients. Our awards and impressive client list are testament
              to our high quality approach. We deliver value, creativity,
              results and exceptional levels of customer service and
              professionalism. We specialise in infrastructure development,
              energy and natural resources.
            </p>
          </div>
          <div className="flex-shrink-0 order-1 lg:order-2">
            <img
              src={TraningImg}
              alt="Training"
              className="w-[250px] md:w-[300px] lg:w-[350px] mb-4 lg:mb-0 lg:ml-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
