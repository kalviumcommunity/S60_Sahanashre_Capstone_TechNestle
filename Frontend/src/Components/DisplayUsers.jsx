import axios from "axios";
import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Navbar from "./Navbar.jsx"

function DisplayUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userFetched = await axios.get("http://localhost:8080/api/user");
        setUsers(userFetched.data);
      } 
      catch (error) {
        console.log("Error in fetching user details", error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-7 mt-24 bg-gray-100 rounded-xl">
          <Navbar/>
      <div className="grid grid-cols-3 gap-6">
        {users.map((user, id) => (
          <div key={id} className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <img
              className="w-36 h-36 rounded-full object-cover"
              src={user.profilePhoto}
              alt={"Profile Photo"}
            />
            <div className="ml-4">
              <p className="font-bold text-lg text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-700">Age: {user.age}</p>
              <p className="text-sm text-gray-700">Skills: {user.skills.join(", ")}</p>
              <div className="flex mt-2">
                <a href={user.socialMedia.github} className="text-gray-700 hover:text-black mr-3">
                  <FaGithub size={30} />
                </a>
                <a href={user.socialMedia.linkedin} className="text-gray-900 hover:text-blue-800">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayUser;
