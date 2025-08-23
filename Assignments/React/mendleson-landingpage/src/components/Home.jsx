import Navbar from "./Navbar";
import assets3 from "../assets/assets-3.png";
import assets4 from "../assets/assets-4.png";
import vectorImg from "../assets/vector-img.png";
import image from "../assets/image.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-110px)] px-4 lg:px-0 relative overflow-hidden">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-center relative order-2 lg:order-1 mt-8 lg:mt-0 z-20 mb-8 lg:mb-0"></div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-4 lg:pl-16 pb-6 lg:pb-24 order-1 lg:order-2 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[500] leading-[110%] lg:leading-[100%] text-[#000000] mb-4 font-[rubik] max-w-lg lg:max-w-none">
            Mendleson <br /> Communication <br /> and Engagement
          </h1>
          <p className="text-[#2C2C2C] font-[400] mb-8 max-w-md font-[rubik] text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
            sed ipsum, ut quam volutpat, tortor.
          </p>
        </div>

        {/* Bottom Assets */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end pointer-events-none z-10">
          <img
            src={vectorImg}
            alt="Vector Smart Object"
            className="w-[180px] md:w-[280px] lg:w-[500px] h-auto z-20 absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:left-1/4 lg:-translate-x-1/2"
          />

          <img
            src={image}
            alt="Image"
            className="block w-[300px] md:w-[600px] lg:w-[1150px] h-auto opacity-70 absolute bottom-0 left-0 z-5"
          />

          <img
            src={assets3}
            alt="Assets-3"
            className="block w-[80px] md:w-[140px] lg:w-[220px] h-auto opacity-70 absolute bottom-0 left-0 z-10"
          />

          <img
            src={assets4}
            alt="Assets-4"
            className="block w-[80px] md:w-[140px] lg:w-auto absolute bottom-0 right-0 z-10"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
