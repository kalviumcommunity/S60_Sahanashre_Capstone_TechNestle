import { useState } from "react";
import axios from "axios";

function User() {
  const [user, setUser] = useState({
    age: 0,
    skills: "",
    linkedin: "",
    github: "",
    profilePhoto: ""
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  function Submit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/user", {
        name: user.name,
        age: user.age,
        skills: user.skills.split(",").map((skill) => skill.trim()),
        socialMedia: {
          linkedin: user.linkedin,
          github: user.github,
        },
        profilePhoto: user.profilePhoto
      })
      .then((user) => console.log(user))
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-full max-w-md rounded-lg shadow-xl p-7">
        <form onSubmit={Submit}>
          <input
            type="number"
            id="age"
            placeholder="Age"
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
          <p className="text-gray-500 mb-4 text-sm">
            Separate each skill with comma
          </p>
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
            type="text"
            id="profilePhoto"
            placeholder="Profile Photo"
            value={user.profilePhoto}
            className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition"
            onChange={handleChange}
          />
          <br />
          <button className="bg-gray-100 rounded-md font-bold p-2 text-blue-600 text-l focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-700 transition">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default User;
