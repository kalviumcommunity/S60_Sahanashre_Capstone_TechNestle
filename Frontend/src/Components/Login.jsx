import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    error: "",
  });

  const Navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setLogin({
      ...login,
      [id]: value,
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/login", {
        email: login.email,
        password: login.password,
      })
      .then((response) => {
        if (response.status === 201) {
          Navigate("/user");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("Error in login", error);
        setLogin({
          ...login,
          error: "User details does'nt match. So unable to login..",
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-full max-w-md rounded-lg shadow-xl p-7">
        <form onSubmit={Submit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={login.email}
              onChange={handleChange}
              className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={login.password}
              onChange={handleChange}
              className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
              required
            />
          </div>
          <button className="bg-gray-100 rounded-md font-bold p-2 text-blue-600 text-l focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition">
            Login
          </button>
        </form>
        <p>{login.error && login.error}</p>
      </div>
    </div>
  );
}

export default Login;
