import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCookie from "../Utils/GetCookie";
import { BACKEND_SERVER } from "../Utils/constants";

function UpdateProfile() {
  const { profilename } = useParams();
  const [user, setUser] = useState({
    email: "",
    age: 0,
    skills: "",
    linkedin: "",
    github: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(getCookie("photo"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("access_token");
        const response = await axios.get(
          `${BACKEND_SERVER}/users/${profilename}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const userData = response.data;
        setUser({
          email: userData.email || "",
          age: userData.age || 0,
          skills: userData.skills ? userData.skills.join(", ") : "",
          linkedin: userData.socialMedia.linkedin || "",
          github: userData.socialMedia.github || "",
        });
        setPhotoUrl(userData.profilePhoto || getCookie("photo") || "");
      } catch (error) {
        if (error.response.status == 401 || error.response.status == 403) {
          console.log("Sessions expired");
          navigate("/login");
        }
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [profilename]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = getCookie("username");
    try {
      let newPhotoUrl = photoUrl;
      if (profilePhoto) {
        const formData = new FormData();
        formData.append("file", profilePhoto);
        formData.append("upload_preset", "lfv0xwf1");

        const photoResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/deilbvy6o/image/upload",
          formData
        );
        newPhotoUrl = photoResponse.data.secure_url;
        document.cookie = `photo=${newPhotoUrl}`;
      }
      const token = getCookie("access_token");

      const userResponse = await axios.put(
        `${BACKEND_SERVER}/users/${profilename}`,
        {
          username: username,
          age: user.age,
          skills:
            user?.skills.length > 0
              ? user?.skills?.split(",").map((skill) => skill.trim())
              : [],
          socialMedia: {
            linkedin: user.linkedin,
            github: user.github,
          },
          profilePhoto: newPhotoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User response:", userResponse);

      if (userResponse.status === 200) {
        navigate("/user");
      } else {
        console.log(
          "Error updating user: Non-200 status code",
          userResponse.status
        );
      }
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 403) {
        navigate("/login");
      }
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-full max-w-md rounded-lg shadow-xl p-4">
        {photoUrl && (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Years of Experience
            </label>
            <input
              type="number"
              id="age"
              placeholder="Years of Experience"
              value={user.age}
              className="bg-gray-100 text-gray-900 rounded-md p-2 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
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
            <p className="text-gray-500 text-xs">
              Separate each skill with comma
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
              className="bg-gray-100 text-gray-900 rounded-md p-2 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
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
              className="bg-gray-100 text-gray-900 rounded-md p-2 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePhoto"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="profilePhoto"
              className="bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded cursor-pointer"
            >
              Choose a file
            </label>
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition-all duration-300">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
