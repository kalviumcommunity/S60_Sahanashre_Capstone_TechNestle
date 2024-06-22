import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa';
import Navbar from './Navbar';
import defaultProfile from '../assets/nest4.png';
import ConfirmationModal from './ConfirmationModal';
import getCookie from '../Utils/GetCookie';

function DisplayUser() {
  const [users, setUsers] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loggedInUsername = getCookie('username');

  const fetchUsers = async () => {
    try {
      const token = getCookie('access_token'); 
      const userFetched = await axios.get('http://localhost:8080/api/users', {
        headers: { Authorization: `Bearer ${token}` }  
      });
      setUsers(userFetched.data.users);
      setLikedUsers(userFetched.data.likedUsers);
    } catch (error) {
      console.log('Error in fetching user details', error.message);
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
        skills: selectedUser.skills
      };
      const response = await axios.post('http://localhost:8080/api/requests', requestData);
      if (response.status === 200) {
        alert('Request sent successfully!');
      } else {
        alert('Failed to send request.');
      }
    } catch (error) {
      console.log('Error in sending request:', error.message);
      alert('Failed to send request.');
    }
  };

  const handleLike = async (username) => {
    try {
      const token = getCookie('access_token');
      await axios.post(`http://localhost:8080/api/users/${username}/toggle-like`, { from: loggedInUsername, to: username }, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchUsers();
    } catch (error) {
      console.log('Error in liking user', error.message);
    }
  };

  return (
    <div className="container mx-auto p-7 mt-24 bg-gray-100 rounded-xl">
      <Navbar />
      <div className="grid grid-cols-3 gap-6">
        {users
          .filter(user => user.username !== loggedInUsername && user.skills && user.skills.length > 1)
          .map((user, id) => (
            <div key={id} className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
              <img
                className="w-36 h-36 rounded-full object-cover"
                src={user.profilePhoto || defaultProfile}
                alt="Profile Photo"
              />
              <div className="mt-4 text-center">
                <p className="font-bold text-lg text-gray-900">{user.username}</p>
                <p className="text-sm text-gray-700">Years of Experience: {user.age}</p>
                <p className="text-sm text-gray-700">Skills: {user.skills.join(', ')}</p>
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
              <div className="flex justify-center items-center mt-4 w-full">
                <button
                  className={`px-4 py-2 rounded-lg ${likedUsers.includes(user.username) ? 'bg-red-500' : 'bg-gray-300'} text-white hover:bg-red-600`}
                  onClick={() => handleLike(user.username)}
                >
                  <FaHeart size={20} />
                </button> 
                <p className="ml-2 text-sm text-gray-700 font-bold">{user.likes}</p>
              </div>
            </div>
          ))}
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
  );
}

export default DisplayUser;
