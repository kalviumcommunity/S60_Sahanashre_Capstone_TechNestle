import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../Utils/GetCookie";

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

        const photoResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/deilbvy6o/image/upload",
          formData
        );
        photoUrl = photoResponse.data.secure_url;
      }
      const userResponse = await axios.post(
        "http://localhost:8080/api/users",
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

      if (userResponse.status === 201) {
        document.cookie = `photo=${photoUrl}`;
        navigate("/user");
      } else {
        console.log("Error creating user");
      }
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 403) {
        navigate("/login");
      }
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-full max-w-md rounded-lg shadow-xl p-7">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              placeholder="Years of Experience"
              value={user.age}
              className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="skills"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              placeholder="Skills"
              value={user.skills}
              className="bg-gray-100 text-gray-900 rounded-md p-2 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
              onChange={handleChange}
            />
            <p className="text-gray-500 mb-4 text-sm">
              Separate each skill with a comma
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="linkedin"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              LinkedIn Link
            </label>
            <input
              type="text"
              id="linkedin"
              placeholder="LinkedIn Link"
              value={user.linkedin}
              className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="github"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Github Link
            </label>
            <input
              type="text"
              id="github"
              placeholder="Github Link"
              value={user.github}
              className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePhoto"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Profile Photo <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="profilePhoto"
              className="hidden"
              onChange={handlePhotoChange}
              required
            />
            <label
              htmlFor="profilePhoto"
              className="bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded cursor-pointer"
            >
              Choose a file
            </label>
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition-all duration-300">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
