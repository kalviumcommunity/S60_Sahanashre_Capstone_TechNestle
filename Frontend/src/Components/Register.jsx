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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        username: user.username,
        email: user.email,
        password: user.password,
      });

      if (res.data && res.data.message) {
        let errorMessage = "";
        switch (res.data.message) {
          case "User with this email already exists":
            errorMessage = "An account with this email already exists. Please use a different email.";
            break;
          case "Username already exists. Please choose another.":
            errorMessage = "This username is already taken. Please choose a different username.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }
        setUser({
          ...user,
          error: errorMessage,
        });
      }
       else if (res.status === 201) {
        setUser({
          ...user,
          error: "",
        });
        document.cookie = `username=${user.username}`;
        navigate("/createuser");
      }
       else {
        setUser({
          ...user,
          error: "An unexpected error occurred. Please try again.",
        });
      }
    } 
    
    catch (err) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }

      setUser({
        ...user,
        error: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Signup Form</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
          >
            Sign Up
          </button>
        </form>
        {user.error && <p className="text-red-500 mt-2">{user.error}</p>}
      </div>
    </div>
  );
}

export default Signup;
