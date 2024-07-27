import { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import ConfirmationModal from "./ConfirmationModal";
import getCookie from "../Utils/GetCookie";
import { useNavigate } from "react-router-dom";
import { BACKEND_SERVER } from "../Utils/constants";
import Feedback from "./Comments";
import Footer from "./Footer";

function DisplayUser() {
  const [users, setUsers] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [topDevelopers, setTopDevelopers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loggedInUsername = getCookie("username");
  const navigate = useNavigate();
  const token = getCookie("access_token");

  const fetchUsers = async () => {
    try {
      const token = getCookie("access_token");
      const response = await axios.get(`${BACKEND_SERVER}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
      setLikedUsers(response.data.likedUsers);
      setTopDevelopers(response.data.topDevelopers);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.log("JWT ERROR");
        navigate("/login");
      }
      console.log("Error in fetching user details", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequest = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSendEmail = async (emailData) => {
    try {
      const requestData = {
        ...emailData,
        skills: selectedUser.skills,
      };
      const response = await axios.post(
        `${BACKEND_SERVER}/requests`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("Request sent successfully!");
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        navigate("/login");
      }
      console.log("Error in sending request:", error.message);
      alert("Failed to send request.");
    }
  };

  const handleLike = async (username) => {
    try {
      await axios.post(
        `${BACKEND_SERVER}/users/${username}/toggle-like`,
        { from: loggedInUsername, to: username },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        navigate("/login");
      }
      console.log("Error in liking user", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pt-24 p-7 mt-6">
        <div className="container m-auto pl-7 pr-7 p-1 pt-5 mb-10 bg-blue-100 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Top Developers</h2>
          <div className="grid grid-cols-3 gap-6 mb-12">
            {topDevelopers.map((user, id) => (
              <div
                 key={id}
                 className="bg-white p-6 rounded-lg border-2 shadow-xl flex flex-col items-center transform hover:-translate-y-2 transition-transform hover:border-black">
                <img
                  className="w-36 h-36 rounded-full object-cover"
                  src={user.profilePhoto}
                  alt="Profile Photo"
                />
                <div className="mt-4 text-center">
                  <p className="font-bold text-lg text-gray-900">{user.username}</p>
                  <p className="text-sm text-gray-700">
                    Years of Experience: {user.age}
                  </p>
                  <p className="text-sm text-gray-700">
                    Skills: {user.skills.join(", ")}
                  </p>
                  <div className="flex justify-center mt-2">
                    {user.socialMedia?.github && (
                      <a
                        href={user.socialMedia.github}
                        target="_blank"
                        className="text-gray-700 hover:text-black mr-3"
                      >
                        <FaGithub size={30} />
                      </a>
                    )}
                    {user.socialMedia?.linkedin && (
                      <a
                        href={user.socialMedia.linkedin}
                        target="_blank"
                        className="text-gray-900 hover:text-blue-800"
                      >
                        <FaLinkedin size={30} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4 w-full space-x-4">
                  <button
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                    onClick={() => handleRequest(user)}
                  >
                    Request
                  </button>
                  <div className="flex items-center">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        likedUsers.includes(user.username)
                          ? "bg-red-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } hover:ring-2 hover:ring-green-600 flex items-center space-x-2`}
                      onClick={() => handleLike(user.username)}
                    >
                      <FaHeart size={20} color="white" />
                      <p className="text-sm font-bold">{user.likes}</p>
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <Feedback username={user.username} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container m-auto p-7 pb-12 mb-10 bg-blue-100 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Other Developers</h2>
          <div className="grid grid-cols-3 gap-6">
            {users.map((user, id) => (
              <div
              key={id}
              className="bg-white p-6 rounded-lg border-2 shadow-xl flex flex-col items-center transform hover:-translate-y-2 transition-transform hover:border-black">
                <img
                  className="w-36 h-36 rounded-full object-cover"
                  src={user.profilePhoto}
                  alt="Profile Photo"
                />
                <div className="mt-4 text-center">
                  <p className="font-bold text-lg text-gray-900">{user.username}</p>
                  <p className="text-sm text-gray-700">
                    Years of Experience: {user.age}
                  </p>
                  <p className="text-sm text-gray-700">
                    Skills: {user.skills.join(", ")}
                  </p>
                  <div className="flex justify-center mt-2">
                    {user.socialMedia?.github && (
                      <a
                        href={user.socialMedia.github}
                        target="_blank"
                        className="text-gray-700 hover:text-black mr-3"
                      >
                        <FaGithub size={30} />
                      </a>
                    )}
                    {user.socialMedia?.linkedin && (
                      <a
                        href={user.socialMedia.linkedin}
                        target="_blank"
                        className="text-gray-900 hover:text-blue-800"
                      >
                        <FaLinkedin size={30} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4 w-full space-x-4">
                  <button
                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                    onClick={() => handleRequest(user)}
                  >
                    Request
                  </button>
                  <div className="flex items-center">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        likedUsers.includes(user.username)
                          ? "bg-red-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } hover:ring-2 hover:ring-green-600 flex items-center space-x-2`}
                      onClick={() => handleLike(user.username)}
                    >
                      <FaHeart size={20} color="white" />
                      <p className="text-sm font-bold">{user.likes}</p>
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <Feedback username={user.username} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedUser && (
          <ConfirmationModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            user={selectedUser}
            getCookie={getCookie}
            onSubmit={handleSendEmail}
          />
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default DisplayUser;
