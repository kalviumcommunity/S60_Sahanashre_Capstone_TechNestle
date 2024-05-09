import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/register", {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.data.message === "User with this email already exist") {
          setUser({
            ...user,
            error: "User with this email already exists",
          });
        } else if (
          res.data.message === "Username already exists. Give some other name.."
        ) {
          setUser({
            ...user,
            error: "Username already exists. Give some other name..",
          });
        } else if (res.status === 201) {
          setUser({
            ...user,
            error: "",
          });
          document.cookie = `username=${user.username}`;
          navigate("/createuser");
        }
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Signup Form</h2>
        <form className="flex flex-col">
          <input
            id="username"
            placeholder="Username"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={user.username}
            onChange={handleChange}
          />
          <input
            id="email"
            placeholder="Email"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            id="password"
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
        {user.error && <p className="text-red-500">{user.error}</p>}
      </div>
    </div>
  );
}

export default Signup;
