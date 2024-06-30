import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Mainpg from './Components/Mainpg';
import Register from './Components/Register';
import Login from './Components/Login';
import CreateUser from './Components/Profile';
import DisplayUser from './Components/DisplayUsers';
import About from './Components/About';
import UpdateProfile from './Components/UpdateProfile';
import IncomingRequestsPage from './Components/IncomingRequest';
import OutgoingRequestsPage from './Components/OutgoingRequest';
import FrontendRoadmap from './Components/FrontendRoadmap';
import BackendRoadmap from './Components/BackendRoadmap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Mainpg/>} /> 
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createuser" element={<CreateUser />} />
        <Route exact path="/user" element={<DisplayUser/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/updateprofile/:profilename" element={<UpdateProfile/>}/>
        <Route exact path="/incoming" element={<IncomingRequestsPage/>} />
        <Route exact path="/outgoing" element={<OutgoingRequestsPage/>} />
        <Route path="/frontend" element={<FrontendRoadmap />} />
        <Route path="/backend" element={<BackendRoadmap />} />
        <Route path="*" element={<Mainpg/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
