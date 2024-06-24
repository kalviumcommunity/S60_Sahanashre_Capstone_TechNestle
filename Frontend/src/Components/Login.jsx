import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_SERVER } from "../Utils/constants";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setLogin({
      ...login,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_SERVER}/login`, {
        email: login.email,
        password: login.password,
      })
      .then((response) => {
        if (response.status === 201) {
          document.cookie=`username=${response.data._doc.username}`
          document.cookie=`photo=${response.data.photo}`
          document.cookie=`access_token=${response.data["token"]}`
          navigate("/user");
        }
      })
      .catch((error) => {
        console.log("Error in login", error);
        setLogin({
          ...login,
          error: "User details don't match, unable to login.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={login.email}
              onChange={handleChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={login.password}
              onChange={handleChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              required
              autoComplete="current-password"
            />
          </div>
          <p className="text-white mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
        {login.error && <p className="text-red-500 mt-2">{login.error}</p>}
      </div>
    </div>
  );
}

export default Login;
