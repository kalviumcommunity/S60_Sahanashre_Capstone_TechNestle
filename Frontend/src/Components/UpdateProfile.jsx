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
        if (error.response.status === 401 || error.response.status === 403) {
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
      if (error.response.status === 401 || error.response.status === 403) {
        navigate("/login");
      }
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-6">
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden bg-blue-100 w-full max-w-md p-8 gap-6">
        {photoUrl && (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-6 w-full text-center">
          <div className="w-full">
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
              className="appearance-none block w-4/6 mx-auto px-4 py-2 border border-blue-900 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
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
              className="appearance-none block w-4/6 mx-auto px-4 py-2 border border-blue-900 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              onChange={handleChange}
            />
            <p className="text-gray-500 text-xs">
              Separate each skill with a comma
            </p>
          </div>
          <div className="w-full">
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
              className="appearance-none block w-4/6 mx-auto px-4 py-2 border border-blue-900 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
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
              className="appearance-none block w-4/6 mx-auto px-4 py-2 border border-blue-900 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
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
              className="bg-green-700 text-white text-xs font-bold py-2 px-4 rounded cursor-pointer"
            >
              Choose a file
            </label>
          </div>
          <div className="w-full flex justify-center">
            <button className="w-2/6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-900 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
