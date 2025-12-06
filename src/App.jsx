import { Routes, Route } from "react-router-dom";
import Intro_main from "./components/Intro_main.jsx";
import Login from "./components/Login.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro_main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
