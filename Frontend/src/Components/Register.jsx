import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    error: ""
  });

const Navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  function Submit(event) {
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
              error: "User with this email already exists" 
            });
        }
        else if(res.data.message === "Username already exists. Give some other name.."){
          setUser({
            ...user,
            error: "Username already exists. Give some other name.." 
          });
        }
        else if(res.status === 201){
          setUser({
            ...user,
            error: ""
          })
          Navigate("/createuser")
        }
    })
    .catch(err => console.log("Error:", err));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-full max-w-md rounded-lg shadow-xl p-7">
        <form onSubmit={Submit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={user.username}
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
            required
          ></input>
          <br />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={user.email}
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
            required
          />
          <br />
          <button className="bg-gray-100 rounded-md font-bold p-2 text-blue-600 text-l focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p>{user.error && user.error}</p>
      </div>
    </div>
  );
}

export default Signup;
