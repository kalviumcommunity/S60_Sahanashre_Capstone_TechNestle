import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_SERVER, firebaseConfig } from "../Utils/constants";
import image from "../assets/t1.png"; 
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

initializeApp(firebaseConfig);

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
          document.cookie = `username=${response.data._doc.username}`;
          document.cookie = `photo=${response.data.photo}`;
          document.cookie = `access_token=${response.data["token"]}`;
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

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      const googleIdToken = await res.user.accessToken;
      const googleUserInfo = {
        email: res.user.email,
        googleIdToken: googleIdToken,
      };
      console.log(googleUserInfo)

      const loginResponse = await axios.post(`${BACKEND_SERVER}/login`, googleUserInfo);

      if (loginResponse.status === 201) {
        document.cookie = `username=${loginResponse.data.username}`;
        document.cookie = `access_token=${loginResponse.data.token}`;
        navigate("/user");
      } else {
        setLogin({ ...login, error: "An unexpected error occurred. Please try again." });
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      setLogin({ ...login, error: "Google sign-in failed. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white p-6">
      <div className="flex bg-blue-100 rounded-lg shadow-lg overflow-hidden w-3/4 md:w-2/3 lg:w-1/2 h-5/6 p-8 gap-6">
        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Login illustration"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-center text-2xl font-bold text-black mb-6">
            Log in to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="w-full flex justify-center">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={login.email}
                onChange={handleChange}
                className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                required
              />
            </div>
            <div className="w-full flex justify-center">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={login.password}
                onChange={handleChange}
                className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                required
                autoComplete="current-password"
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-2/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-7 flex flex-col items-center">
            <button
              onClick={handleGoogleSignIn}
              className="inline-flex h-10 w-4/9 items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-[18px] w-[18px]" />
              Continue with Google
            </button>
          </div>
          {login.error && <p className="text-red-500 mt-2">{login.error}</p>}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
