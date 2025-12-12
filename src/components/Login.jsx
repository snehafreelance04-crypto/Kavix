import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoK from "./LogoK";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [show, setShow] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Login validation
  const handleLogin = () => {
    if (!email || !password) {
      setError("⚠ Please fill all fields");
      return;
    }
    setError("");
    setOpenPopup(true);
  };

  // Auto redirect after popup
  useEffect(() => {
    if (openPopup) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [openPopup, navigate]);

  return (
    <div className="relative min-h-screen flex md:flex-row flex-col bg-white">

      {/* LEFT WHITE SIDE — DESKTOP ONLY */}
      <div className="hidden md:block w-1/2 bg-white"></div>

      {/* RIGHT IMAGE SIDE — DESKTOP ONLY */}
      <div
        className="hidden md:flex w-1/2 h-screen 
        bg-[url('https://img.freepik.com/free-photo/abstract-background-with-dark-blue-grunge-texture_1048-20452.jpg?w=740')] 
        bg-cover bg-center items-center justify-center"
      >
        <div className="max-w-xl text-center text-white px-10">
          <h1 className="text-7xl font-bold leading-tight">
            Every Stock <br /> Has a Story
          </h1>
          <p className="mt-8 text-4xl font-semibold">Free stock research</p>
          <p className="mt-6 text-sm text-white/80 leading-relaxed">
            Explore curated expert insights to master smart investing.
          </p>
        </div>
      </div>

      {/* LOGIN CARD */}
      <div
        className="
          absolute md:left-1/2 md:top-6 
          md:-translate-x-[90%] 
          w-full max-w-md mx-auto
          md:w-[600px]
          min-h-[94vh]
          bg-white border border-gray-300 rounded-2xl shadow-2xl 
          z-10 px-6 sm:px-10 md:px-14 py-10
        "
      >
        {/* HOME — CENTERED ON MOBILE */}
        <button
          onClick={() => navigate("/")}
          className="
            text-gray-700 font-serif hover:text-black text-lg mb-6
            block mx-auto md:mx-0
          "
        >
          ← Home
        </button>

        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#160523] rounded-xl flex items-center justify-center">
            <LogoK skipAnimation />
          </div>
          <span className="text-cyan-600 font-bold text-2xl tracking-wide">
            KAVIX
          </span>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-blue-950">Log In</h2>

        {/* EMAIL */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Your Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-cyan-400"
          />
          <span
            className="absolute right-4 top-[42px] text-gray-500 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </span>
        </div>

        {/* Remember */}
        <div className="flex justify-between font-normal items-center text-md mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Remember me
          </label>
          <span className="cursor-pointer">Forgot Password</span>
        </div>

        {/* Terms */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          By creating account, I accept the{" "}
          <span className="text-black font-bold cursor-pointer">Terms of Conditions</span>{" "}
          and have read and accept the{" "}
          <span className="text-black font-bold cursor-pointer">Terms</span> and{" "}
          <span className="text-black font-bold cursor-pointer">Privacy Policy</span>.
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-full font-semibold"
        >
          LOG IN
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}

        {/* Divider */}
        <div className="flex items-center text-sm text-gray-600 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3">Or login with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Social */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 border border-black rounded-full py-3 flex justify-center hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
          </button>
          <button className="flex-1 border border-black rounded-full py-3 flex justify-center hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1877F2"
              width="20"
              height="20"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.64c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.925-1.953 1.874v2.247h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
            </svg>
          </button>
        </div>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span className="font-semibold cursor-pointer">Create an account</span>
        </p>
      </div>

      {/* Popup */}
      {openPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-[420px] rounded-2xl shadow-2xl px-8 py-10 text-center relative">
            <div className="w-14 h-14 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold mb-2">Login Successful</h3>
            <p className="text-sm text-gray-600">
              Redirecting you to dashboard…
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
