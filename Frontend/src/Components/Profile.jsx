import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../Utils/GetCookie";
import { BACKEND_SERVER } from "../Utils/constants";
import image1 from "../assets/user1.png";
import image2 from "../assets/user2.png";
import image3 from "../assets/user3.png";

function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    age: "",
    skills: "",
    linkedin: "",
    github: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image2, image1, image3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handlePhotoChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  const token = getCookie("access_token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!profilePhoto) {
      alert("Please select a profile photo.");
      return;
    }
    try {
      let photoUrl = "";
      if (profilePhoto) {
        const formData = new FormData();
        formData.append("file", profilePhoto);
        formData.append("upload_preset", "lfv0xwf1");

        const { data: photoData } = await axios.post(
          "https://api.cloudinary.com/v1_1/deilbvy6o/image/upload",
          formData
        );
        photoUrl = photoData.secure_url;
      }
      const { status } = await axios.post(
        `${BACKEND_SERVER}/users`,
        {
          username: getCookie("username"),
          age: user.age,
          skills:
            user?.skills.length > 0
              ? user?.skills?.split(",").map((skill) => skill.trim())
              : [],
          socialMedia: {
            linkedin: user.linkedin,
            github: user.github,
          },
          profilePhoto: photoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 201) {
        document.cookie = `photo=${photoUrl}`;
        navigate("/user");
      } else {
        console.log("Error creating user");
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate("/login");
      }
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white p-8">
      <div className="flex bg-blue-100 rounded-lg shadow-lg overflow-hidden w-3/4 md:w-2/3 lg:w-1/2 h-[90vh] p-8 gap-6">
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-3/5 object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-center text-2xl font-bold text-black mb-6">
            Create User Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="w-full">
              <label
                htmlFor="age"
                className="block text-gray-700 text-sm font-bold mb-1 text-center"
              >
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center">
                <input
                  type="number"
                  id="age"
                  placeholder="Years of Experience"
                  value={user.age}
                  onChange={handleChange}
                  className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="skills"
                className="block text-gray-700 text-sm font-bold mb-1 text-center"
              >
                Skills
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  id="skills"
                  placeholder="Skills"
                  value={user.skills}
                  onChange={handleChange}
                  className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="linkedin"
                className="block text-gray-700 text-sm font-bold mb-1 text-center"
              >
                LinkedIn Link
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  id="linkedin"
                  placeholder="LinkedIn Link"
                  value={user.linkedin}
                  onChange={handleChange}
                  className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="github"
                className="block text-gray-700 text-sm font-bold mb-1 text-center"
              >
                Github Link
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  id="github"
                  placeholder="Github Link"
                  value={user.github}
                  onChange={handleChange}
                  className="appearance-none block w-4/5 px-4 py-2 border border-blue-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-center"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="profilePhoto"
                className="block text-gray-700 text-sm font-bold mb-1 text-center"
              >
                Profile Photo <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center">
                <input
                  type="file"
                  id="profilePhoto"
                  className="hidden"
                  onChange={handlePhotoChange}
                  required
                />
                <label
                  htmlFor="profilePhoto"
                  className="w-2/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 cursor-pointer text-center"
                >
                  Choose a file
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-3/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-900 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
