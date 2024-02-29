import "./App.css";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import NavBar from "./Components/Navbar/NavBar";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./Service/AuthContext";

function App() {
  const login = window.localStorage.getItem("isLogedIn");

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
