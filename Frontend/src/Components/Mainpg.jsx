import { useNavigate } from "react-router-dom";
// import techlogo from "../assets/schoolbg.png";
import nest1 from "../assets/nest1.png"
import nest2 from "../assets/nest2.png"
import nest3 from "../assets/nest3.png"
import nest4 from "../assets/nest4.png"
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Mainpg() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    nest1,
    nest2,
    nest3,
    nest4
  ];

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => {
      clearTimeout(intervalId);
    };
  }, [currentIndex, images.length]);
  return (
    <div>
      <br />
      <Navbar/>
      <div>
        <div className="flex items-center justify-center mt-8">
          <h1 className="font-bold text-5xl">Tech Nestle</h1>
        </div>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <p>Your gateway to Skill Mastery</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-[60%] h-[470px] p-10 items-center justify-center">
         <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="w-7/12 h-5/6"
      />
      </div>
      </div>
      <div className="flex items-center justify-center">
      <button
            className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-sky-500 group px-8 py-2"
            onClick={() => {
              navigate(`/register`);
            }}
          >
            <span className="relative z-10 text-sky-500 group-hover:text-white text-xl duration-500">
              Get Started
            </span>
            <span className="absolute w-full h-full bg-sky-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-sky-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </button>
      </div>
    </div>
  );
}

export default Mainpg;
