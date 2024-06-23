import { NavLink, useNavigate } from "react-router-dom";
import getCookie from "../Utils/GetCookie";

function Navbar() {
  const photoUrl = getCookie("photo");
  const username = getCookie("username");
  const navigate = useNavigate();

  const logout = () => {
    document.cookie = "username=; expires=Thu, 01 Jan 1970";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970";
    document.cookie = "photo=; expires=Thu, 01 Jan 1970";
    navigate("/login");
  };

  return (
    <nav className="flex flex-row gap-x-10 inset-x-0 place-content-center top-0 fixed border bg-blue-500 h-14 w-full items-center">
      <NavLink to="/about" className="flex items-center gap-x-2 hover:text-white">
        <p className="cursor-pointer">About</p>
      </NavLink>
      <NavLink to="/incoming" className="flex items-center gap-x-2 hover:text-white">
        <p className="cursor-pointer">Incoming Requests</p>
      </NavLink>
      <NavLink to="/outgoing" className="flex items-center gap-x-2 hover:text-white">
        <p className="cursor-pointer">Outgoing Requests</p>
      </NavLink>
      <img
        src={photoUrl}
        onClick={() => navigate(`/updateprofile/${username}`)}
        alt={username}
        className="h-12 w-12 rounded-full cursor-pointer"
      />
      <p onClick={logout} className="cursor-pointer hover:text-white">
        Logout
      </p>
    </nav>
  );
}

export default Navbar;