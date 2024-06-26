import { useNavigate } from "react-router-dom";
import techlogo from "../assets/schoolbg.png";
import tech1 from "../assets/tech1.png";
import tech2 from "../assets/tech2.png";
import tech3 from "../assets/tech3.png";
import tech4 from "../assets/tech4.png";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Mainpg() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [tech1, tech2, tech3, tech4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, images.length]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar>
        <div className="flex items-center space-x-2">
          <img src={techlogo} alt="TechLogo" className="h-8" />
          <h1 className="font-bold text-xl">Tech Nestle</h1>
        </div>
      </Navbar>
      <main className="flex-grow">
        <div className="mt-2 flex items-center justify-center">
          <img src={techlogo} alt="TechLogo" className="h-14" />
          <h1 className="font-bold text-5xl">Tech Nestle</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex w-3/5 h-[480px] p-10 items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-7/12 h-5/6 rounded-2xl"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mb-4">
        <button
  className="cursor-pointer font-semibold overflow-hidden relative z-10 border border-teal-600 group px-8 py-2"
  onClick={() => {
    navigate(`/login`);
  }}
>
  <span className="relative z-20 text-teal-600 group-hover:text-white text-xl duration-500">
    Get Started
  </span>
  <span className="absolute w-full h-full bg-teal-600 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
  <span className="absolute w-full h-full bg-teal-600 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
</button>

        </div>
      </main>
      <Footer>
        <p className="hover:text-green-700">Footer content here</p>
      </Footer>
    </div>
  );
}

export default Mainpg;
