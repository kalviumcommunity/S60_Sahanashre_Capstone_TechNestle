import { useNavigate } from "react-router-dom";
import techlogo from "../assets/schoolbg.png";

function Mainpg() {
  const navigate = useNavigate();
  return (
    <div className="">
      <br />
      <div className="">
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-5xl">Tech Nestle</h1>
        </div>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <p>Your gateway to Skill Mastery</p>
      </div>
      <br />
      <br />
      <div className="flex items-center justify-center">
        <div className=" h-3/5 w-full flex items-center justify-evenly">
          <img src={techlogo} alt="" className="size-1/2" />
        </div>
      </div>
      <div>
        <div className="flex justify-end w-11/12 items-center">
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
    </div>
  );
}

export default Mainpg;

{
  /* <div className="flex justify-center space-x-8 mt-8">
  <Link to="/register">
    <button className="bg-gray-100 rounded-md font-bold p-2 text-blue-600 text-l focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition">
      Register
    </button>
  </Link>
  <Link to="/login">
    <button className="bg-gray-100 rounded-md font-bold p-2 text-blue-600 text-l focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition">
      Login
    </button>
  </Link>
</div>
<p>Welcome to TechNestle✨</p>
<p>Your Gateway to Web Development Mastery!</p>
<p>Learn, Connect, Grow</p>
<p>
  TechNestle is your ultimate destination for mastering web development
  skills, catering to both seasoned developers and enthusiastic beginners.
</p> */
}
