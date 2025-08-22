import Navbar from "./Navbar";
import assets3 from "../assets/assets-3.png";
import assets4 from "../assets/assets-4.png";
import vectorImg from "../assets/vector-img.png";
import image from "../assets/image.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row items-center justify-between py-10 h-[calc(100vh-110px)]">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-center">
          {/* Background */}
          <img
            src={assets3}
            alt="Assets-3"
            className="absolute bottom-0 left-0 w-[220px] h-auto opacity-70"
          />
          <img
            src={image}
            alt="Image"
            className="absolute bottom-0 left-0 w-[1150px] h-auto opacity-70"
          />

          <img
            src={vectorImg}
            alt="Vector Smart Object"
            className="absolute bottom-0 left-1/12 w-[500px] h-auto"
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center pl-16 pb-24">
          <h1 className="text-5xl font-[500] leading-[100%] text-[#000000] mb-4 font-[rubik]">
            Mendleson <br /> Communication <br /> and Engagement
          </h1>
          <p className="text-[#2C2C2C] font-[400] mb-8 max-w-md font-[rubik]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
            sed ipsum, ut quam volutpat, tortor.
          </p>
          <img src={assets4} alt="Assets-4" className="absolute bottom-0 right-0" />
        </div>
      </div>
    </>
  );
};

export default Home;
