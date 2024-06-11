import axios from "axios";
import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Navbar from "./Navbar.jsx";
import defaultProfile from "../assets/nest4.png"

function DisplayUser() {
  const [users, setUsers] = useState([]);
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userFetched = await axios.get("http://localhost:8080/api/user");
        setUsers(userFetched.data);
      } catch (error) {
        console.log("Error in fetching user details", error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleRequest = async (user) => {
    try {
      const emailData = {
        from: "sahusasdi@gmail.com", 
        to: "sahanashre.v@kalvium.community", 
        subject: 'Request to Learn a Skill',
        text: `Hello ${user.username},\n\nI am ${getCookie("username")}. I would like to learn ${user.skills.join(", ")} from you.\n\nWith regards,\n${getCookie("username")}`
      };
      await axios.post("http://localhost:8080/api/email", emailData);
      alert('Email sent successfully!');
    } 
    catch (error) {
      console.log("Error in sending email", error.message);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="container mx-auto p-7 mt-24 bg-gray-100 rounded-xl">
      <Navbar />
      <div className="grid grid-cols-3 gap-6">
        {users.map((user, id) => (
          <div key={id} className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <img
              className="w-36 h-36 rounded-full object-cover"
              src={user.profilePhoto || defaultProfile}
              alt={"Profile Photo"}
            />
            <div className="mt-4 text-center">
              <p className="font-bold text-lg text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-700">Age: {user.age}</p>
              <p className="text-sm text-gray-700">Skills: {user.skills.join(", ")}</p>
              <div className="flex justify-center mt-2">
                {user.socialMedia?.github && (
                  <a href={user.socialMedia.github} className="text-gray-700 hover:text-black mr-3">
                    <FaGithub size={30} />
                  </a>
                )}
                {user.socialMedia?.linkedin && (
                  <a href={user.socialMedia.linkedin} target="_blank" className="text-gray-900 hover:text-blue-800">
                    <FaLinkedin size={30} />
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-4 w-full">
              <button
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600"
                onClick={() => handleRequest(user)}
              >
                Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayUser;
