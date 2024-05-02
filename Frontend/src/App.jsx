import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Register from './Components/Register';
import Login from './Components/Login';
import User from './Components/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register />} /> 
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
