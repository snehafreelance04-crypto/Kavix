import React, { useState } from "react";
import LogoK from "./LogoK";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navVariant = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      variants={navVariant}
      initial="hidden"
      animate="visible"
      className="
        w-full max-w-[98%] mx-auto mt-5 px-4 py-3 
        flex items-center justify-between 
        z-50 relative
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <motion.div
          variants={navVariant}
          className="w-12 h-12 flex items-center justify-center"
        >
          <LogoK className="w-full h-full" />
        </motion.div>

        {/* Brand Name */}
        <motion.span
          variants={navVariant}
          className="text-cyan-600 font-semibold text-3xl tracking-wide"
        >
          KAVIX
        </motion.span>

        {/* ABOUT US moved here */}
        <motion.button
          variants={navVariant}
          onClick={() => navigate("/about")}
          className="hidden md:block text-white font-medium hover:text-cyan-300 text-sm"
        >
          ABOUT US
        </motion.button>
      </div>


      {/* DESKTOP MENU */}

      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">

        <button
          onClick={() => navigate("/login")}
          className="hover:text-cyan-300 transition"
        >
          LOGIN
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-5 py-2 rounded-full border border-white/40 text-white
               hover:bg-cyan-900 transition"
        >
          CREATE FREE ACCOUNT
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* MOBILE DROPDOWN */}
      {
        menuOpen && (
          <div
            className="
            absolute top-16 right-3 
            w-44 bg-[#0d0d15] border border-white/10 
            rounded-xl p-4 flex flex-col gap-4
            md:hidden shadow-xl
          "
          >
            <button
              onClick={() => {
                navigate("/about");
                setMenuOpen(false);
              }}
              className="text-white hover:text-cyan-300 transition"
            >
              ABOUT US
            </button>

            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="text-white hover:text-cyan-300 transition"
            >
              LOGIN
            </button>

            <button
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded-full border border-white/40 text-white
                       hover:bg-cyan-900 transition"
            >
              CREATE ACCOUNT
            </button>
          </div>
        )
      }
    </motion.nav >
  );
}
