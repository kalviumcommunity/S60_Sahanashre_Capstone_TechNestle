import { NavLink, useNavigate } from 'react-router-dom';
import getCookie from '../Utils/GetCookie';
import techlogo from '../assets/schoolbg.png';

function Navbar() {
  const photoUrl = getCookie('photo');
  const username = getCookie('username');
  const navigate = useNavigate();

  const logout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'photo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <nav className="flex justify-between items-center p-4 shadow-md bg-gray-100 fixed w-full top-0">
      <div className="flex items-center space-x-4">
        <img src={techlogo} alt="TechLogo" className="h-8" />
        <NavLink to="/" className="text-gray-800 font-bold text-xl hover:text-blue-600">Tech Nestle</NavLink>
      </div>
      <div className="flex space-x-6">
        <NavLink to="/about" className="text-gray-800 hover:text-blue-600 text-lg">About</NavLink>
        <NavLink to="/incoming" className="text-gray-800 hover:text-blue-600 text-lg">Awaiting Approval</NavLink>
        <NavLink to="/outgoing" className="text-gray-800 hover:text-blue-600 text-lg">Awaiting Response</NavLink>
        <NavLink to="/frontend" className="text-gray-800 hover:text-blue-600 text-lg">UI Pathway</NavLink>
        <NavLink to="/backend" className="text-gray-800 hover:text-blue-600 text-lg">Server-side Pathway</NavLink>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src={photoUrl}
          onClick={() => navigate(`/updateprofile/${username}`)}
          alt={username}
          className="h-12 w-12 rounded-full cursor-pointer"
        />
        <p onClick={logout} className="text-gray-800 cursor-pointer hover:text-blue-500 text-lg">Logout</p>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
