import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_SERVER, firebaseConfig } from "../Utils/constants";
import image from "../assets/t1.png"; 
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

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
      const res = await axios.post(`${BACKEND_SERVER}/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });

      if (res.data && res.data.message) {
        let errorMessage = "";
        switch (res.data.message) {
          case "User with this email already exists":
            errorMessage =
              "An account with this email already exists. Please use a different email.";
            break;
          case "Username already exists. Please choose another.":
            errorMessage =
              "This username is already taken. Please choose a different username.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }
        setUser({
          ...user,
          error: errorMessage,
        });
      } else if (res.status === 201) {
        setUser({
          ...user,
          error: "",
        });
        document.cookie = `username=${user.username}`;
        document.cookie = `access_token=${res.data.token}`;
        navigate("/createuser");
      } else {
        setUser({
          ...user,
          error: "An unexpected error occurred. Please try again.",
        });
      }
    } catch (err) {
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

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const googleIdToken = res.user.accessToken;
        return axios.post(`${BACKEND_SERVER}/register`, {
          username: res.user.displayName,
          email: res.user.email,
          googleIdToken: googleIdToken,
        });
      })
      .then((res) => {
        if (res.status === 201) {
          document.cookie = `username=${res.data.username}`;
          document.cookie = `access_token=${res.data.accessToken}`;
          navigate("/createuser");
        } else {
          setUser({
            ...user,
            error: "An unexpected error occurred. Please try again.",
          });
        }
      })
      .catch((err) => {
        setUser({
          ...user,
          error: "Google sign-in failed. Please try again.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white p-6">
      <div className="flex bg-blue-100 rounded-lg shadow-lg overflow-hidden w-3/4 md:w-2/3 lg:w-1/2 h-5/6 p-8 gap-6">
        <div className="hidden md:block md:w-1/2">
          <img src={image} alt="Signup illustration" className="h-full w-full object-cover rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-center text-2xl font-bold text-black mb-6">Signup Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="w-full flex justify-center">
              <input
                id="username"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                type="text"
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <input
                id="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                type="email"
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <input
                id="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                type="password"
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-2/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-7 flex flex-col items-center">
            <button
              onClick={googleSignIn}
              className="inline-flex h-10 w-4/9 items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-[18px] w-[18px]" />
              Continue with Google
            </button>
          </div>
          {user.error && <p className="text-red-500 mt-2">{user.error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
