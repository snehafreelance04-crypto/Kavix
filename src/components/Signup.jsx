import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoK from "./LogoK";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("⚠ Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("⚠ Passwords do not match");
      return;
    }
    setError("");
    setOpenPopup(true);
  };

  useEffect(() => {
    if (openPopup) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [openPopup, navigate]);

  return (
    <div className="relative min-h-screen flex">

      {/* LEFT */}
      <div className="w-1/2 bg-white"></div>

      {/* RIGHT */}
      <div className="w-1/2 h-screen bg-[url('https://img.freepik.com/free-photo/abstract-background-with-dark-blue-grunge-texture_1048-20452.jpg?w=740')] bg-cover bg-center flex items-center justify-center">
        <div className="max-w-xl text-center text-white px-10">
          <h1 className="text-7xl font-bold leading-tight">
            Every Stock <br /> Has a Story
          </h1>
          <p className="mt-8 text-4xl font-semibold">Free stock research</p>
          <p className="mt-6 text-sm text-white/80">
            Explore curated expert insights to master smart investing.
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="absolute left-1/2 top-6 -translate-x-[90%] w-[600px] min-h-[94vh] bg-white border rounded-2xl shadow-2xl z-10 px-14 py-10">

        <button onClick={() => navigate("/")} className="text-gray-700 text-lg mb-6">
          ← Back
        </button>

        {/* LOGO */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#160523] rounded-xl flex items-center justify-center">
            <LogoK skipAnimation />
          </div>
          <span className="text-cyan-600 font-bold text-2xl">KAVIX</span>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-blue-950">
          Create Account
        </h2>

        {/* FIRST + LAST */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className="text-sm font-semibold">First Name *</p>
            <p className="text-sm mr-40 font-semibold">Last Name *</p>
          </div>
          <div className="flex gap-4">
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg"
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* EMAIL */}
        <p className="text-sm font-semibold mb-2">Your Email Address *</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-4"
          placeholder="Enter email"
        />

        {/* PASSWORD */}
        <p className="text-sm font-semibold mb-2">Create your password *</p>
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border rounded-lg"
            placeholder="Create password"
          />
          <span onClick={() => setShow(!show)} className="absolute right-4 top-4 cursor-pointer">
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </span>
        </div>

        {/* CONFIRM */}
        <p className="text-sm font-semibold mb-2">Confirm password *</p>
        <div className="relative mb-4">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border rounded-lg"
            placeholder="Confirm password"
          />
          <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-4 cursor-pointer">
            <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          By creating account you accept our{" "}
          <span className=" text-black">Terms</span> &{" "}
          <span className=" text-black">Privacy Policy</span>.
        </p>

        {/* BUTTON */}
        <button onClick={handleSignup} className="w-full bg-black text-white py-3 rounded-full font-semibold">
          CREATE ACCOUNT
        </button>

        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}

        {/* DIVIDER */}
        <div className="flex items-center text-sm text-gray-600 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3">Or create account with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* SOCIAL */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 border border-black rounded-full py-3 flex justify-center hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          </button>
          <button className="flex-1 border border-black rounded-full py-3 flex justify-center hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="20" height="20">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.64c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.925-1.953 1.874v2.247h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
            </svg>
          </button>
        </div>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="font-semibold cursor-pointer">
            Log in
          </span>
        </p>
      </div>

      {/* POPUP */}
      {openPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[420px] rounded-2xl px-8 py-10 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold mb-2">Account Created</h3>
            <p className="text-sm text-gray-600">Redirecting you to home…</p>
          </div>
        </div>
      )}

    </div>
  );
}
