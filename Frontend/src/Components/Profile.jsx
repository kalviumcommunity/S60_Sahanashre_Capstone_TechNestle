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
          skills: user.skills.split(",").map((skill) => skill.trim()),
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
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-full max-w-md rounded-lg shadow-xl p-7">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            id="age"
            placeholder="Years of Experience"
            value={user.age}
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            id="skills"
            placeholder="Skills"
            value={user.skills}
            className="bg-gray-100 text-gray-900 rounded-md p-2 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
          />
          <p className="text-gray-500 mb-4 text-sm">Separate each skill with comma</p>
          <input
            type="text"
            id="linkedin"
            placeholder="LinkedIn Link"
            value={user.linkedin}
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            id="github"
            placeholder="Github Link"
            value={user.github}
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
          />
          <br />
          <div className="flex items-center justify-center mb-4">
            <label className="bg-gray-100 text-gray-900 rounded-md p-2 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition cursor-pointer">
              <span>Profile Photo</span>
              <input
                type="file"
                id="profilePhoto"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
            {profilePhoto && (
              <span className="ml-2 text-gray-500 text-sm">
                {profilePhoto.name}
              </span>
            )}
          </div>
          <br />
          <button className="bg-gray-100 rounded-md font-bold p-2 text-blue-600 text-l focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;