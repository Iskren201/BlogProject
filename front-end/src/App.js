import "./App.css";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import NavBar from "./Components/Navbar/NavBar";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar /> {/* Display NavBar component outside the Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
