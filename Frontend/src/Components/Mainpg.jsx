import { Link } from "react-router-dom";

function Mainpg() {
  return (
    <div className="text-center">
      <div className="flex justify-center space-x-8 mt-8">
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
      </p>
    </div>
  );
}

export default Mainpg;
