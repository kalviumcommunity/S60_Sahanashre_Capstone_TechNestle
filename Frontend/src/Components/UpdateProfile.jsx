import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../Utils/GetCookie" 

function UpdateProfile() {
  const navigate = useNavigate();
  const { profilename } = useParams();
  const [user, setUser] = useState({
    email: "",
    age: 0,
    skills: "",
    linkedin: "",
    github: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("access_token");
        const response = await axios.get(`http://localhost:8080/api/user/${profilename}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userData = response.data;
        console.log(userData)
        setUser({
          email: userData.email || "",
          age: userData.age || 0,
          skills: userData.skills ? userData.skills.join(", ") : "",
          linkedin: userData.socialMedia.linkedin || "",
          github: userData.socialMedia.github || "",
        });
      }
       catch (error) {
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
      let photoUrl = getCookie("photo");
      if (profilePhoto) {
        const formData = new FormData();
        formData.append("file", profilePhoto);
        formData.append("upload_preset", "lfv0xwf1");

        const photoResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/deilbvy6o/image/upload",
          formData
        );
        photoUrl = photoResponse.data.secure_url;
        document.cookie = `photo=${photoUrl}`;
      }
      const token = getCookie("access_token");

      const userResponse = await axios.put(
        `http://localhost:8080/api/updateuser/${profilename}`,
        {
          username: username,
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

      if (userResponse.status === 200) {
        navigate("/user");
      } 
      else {
        console.log("Error updating user");
      }
    } 
    catch (error) {
      console.error("Error updating user:", error);
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
          <input
            type="file"
            id="profilePhoto"
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handlePhotoChange}
          />
          <br />
          <button className="bg-gray-100 rounded-md font-bold p-2 text-blue-600 text-l focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
