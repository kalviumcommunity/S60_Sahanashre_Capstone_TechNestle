import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Register from './Components/Register';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import DisplayUser from './Components/DisplayUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register />} /> 
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createuser" element={<CreateUser />} />
        <Route exact path="/user" element={<DisplayUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
