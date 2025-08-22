import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Services from "./components/Services";
import assets5 from "./assets/assets-5.png";
import Team from "./components/Team";

function App() {
  return (
    <>
      <Home />
      <About />
      <img src={assets5} alt="Assets-5" className="absolute w-[320px]"/>
      <Services />
      <img src={assets5} alt="Assets-5" className="absolute w-[320px]"/>
      <Team />
    </>
  );
}

export default App;
