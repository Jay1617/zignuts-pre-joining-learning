import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Services from "./components/Services";
import assets5 from "./assets/assets-5.png";
import assets8 from "./assets/assets-8.png";
import assets9 from "./assets/assets-9.png";
import Team from "./components/Team";
import Projects from "./components/Projects";
import Clients from "./components/Clients";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Home />
      <About />
      <img 
        src={assets5} 
        alt="Assets-5" 
        className="hidden lg:block absolute w-[320px]" 
      />
      <Services />
      <img 
        src={assets5} 
        alt="Assets-5" 
        className="hidden lg:block absolute w-[320px]" 
      />
      <Team />
      <img
        src={assets8}
        alt="Assets-8"
        className="hidden lg:block absolute w-[320px] right-0"
      />
      <Projects />
      <img 
        src={assets9} 
        alt="Assets-9" 
        className="hidden lg:block absolute w-[150px]" 
      />
      <Clients />
      <Footer />
    </>
  );
}

export default App;