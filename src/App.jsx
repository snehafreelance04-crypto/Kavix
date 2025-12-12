import { Routes, Route } from "react-router-dom";
import Intro_final from "../src/components/Intro_final.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import About from "./components/About.jsx";
import InvestmentPlans from "./components/InvestmentPlans";
import Dashboards from "./components/Dashboards"; // ← ADD THIS

export default function App() {
  return (
    <Routes>
      
      {/* ALWAYS PLAY INTRO ONLY HERE */}
      <Route path="/" element={<Intro_final />} />

      {/* NORMAL HOME WITHOUT INTRO */}
      <Route path="/home" element={<Dashboards />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/investment-plans" element={<InvestmentPlans />} />
      
    </Routes>
  );
}
