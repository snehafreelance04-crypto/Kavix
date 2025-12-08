import { Routes, Route } from "react-router-dom";
import Intro_final  from "../src/components/Intro_final.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro_final />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
}
