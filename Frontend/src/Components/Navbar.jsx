import { NavLink } from "react-router-dom";

function Navbar() {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  };

  const photoUrl = getCookie("photo");
  const username = getCookie("username");

  return (
    <div>
      <nav className="flex flex-row gap-x-40 inset-x-0 place-content-center top-0 fixed border bg-blue-500 h-14 w-full">
        <NavLink to="/about" className="flex items-center gap-x-2">
          <p className="cursor-pointer">About</p>
        </NavLink>
        {photoUrl ? (
          <img src={photoUrl} alt={username} className="h-12 w-12 rounded-full" />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-white">{username ? username[0].toUpperCase() : 'user'}</span>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
