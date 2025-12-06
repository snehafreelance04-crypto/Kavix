import { Routes, Route } from "react-router-dom";
import Intro from "./components/intro.jsx";
import Login from "./components/Login.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
