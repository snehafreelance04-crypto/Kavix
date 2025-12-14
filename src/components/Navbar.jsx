import React, { useState, useEffect } from "react";
import LogoK from "./LogoK";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { startLogin, logout as doLogout, getMe } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const googleLogin = () => {
    startLogin('https://kavix-two.vercel.app/login-success');
  }

  useEffect(() => {
    // If a server session exists, populate user
    (async () => {
      const me = await getMe();
      if (me && !user) {
        const u = { name: me.name || me.email };
        localStorage.setItem('user', JSON.stringify(u));
        setUser(u);
      }
    })();
  }, []);

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
        <motion.div variants={navVariant} className="w-12 h-12 flex items-center justify-center">
          <LogoK className="w-full h-full" />
        </motion.div>

        {/* Brand Name */}
        <motion.span variants={navVariant} className="text-cyan-600 font-semibold text-3xl tracking-wide">
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

      {/* DESKTOP RIGHT SIDE MENU */}
      <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
        {user ? (
          <>
            <span className="hidden sm:block">{user.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
                doLogout('https://kavix-two.vercel.app/');
              }}
              className="hover:text-cyan-300 transition"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <button onClick={googleLogin} className="hover:text-cyan-300 transition">LOGIN</button>

            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-full border border-white/40 text-white hover:bg-cyan-900 transition"
            >
              CREATE FREE ACCOUNT
            </button>
          </>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* MOBILE DROPDOWN */}
{menuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.95 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="
      absolute top-16 right-3 w-48
      bg-[#0e0e18]/90 backdrop-blur-lg
      border border-white/10 
      rounded-2xl p-4 flex flex-col gap-4
      md:hidden shadow-2xl
    "
  >

    {/* ITEM 1 */}
    <button
      onClick={() => {
        navigate('/about');
        setMenuOpen(false);
      }}
      className="
        text-white text-sm font-medium 
        py-2 rounded-lg px-3
        hover:bg-white/10 hover:text-cyan-300 
        hover:shadow-[0_0_12px_rgba(0,255,255,0.25)]
        transition-all 
        active:scale-95
      "
    >
      ABOUT US
    </button>

    {/* ITEM 2 */}
    {user ? (
      <button
        onClick={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setMenuOpen(false);
          setUser(null);
          doLogout('https://kavix-two.vercel.app/');
        }}
        className="
          text-white text-sm font-medium 
          py-2 rounded-lg px-3
          hover:bg-white/10 hover:text-cyan-300 
          hover:shadow-[0_0_12px_rgba(0,255,255,0.25)]
          transition-all 
          active:scale-95
        "
      >
        LOGOUT
      </button>
    ) : (
      <button
        onClick={() => {
          startLogin('https://kavix-two.vercel.app/login-success');
          setMenuOpen(false);
        }}
        className="
          text-white text-sm font-medium 
          py-2 rounded-lg px-3
          hover:bg-white/10 hover:text-cyan-300 
          hover:shadow-[0_0_12px_rgba(0,255,255,0.25)]
          transition-all 
          active:scale-95
        "
      >
        LOGIN
      </button>
    )}

    {/* ITEM 3 */}
    <button
      onClick={() => {
        navigate('/signup');
        setMenuOpen(false);
      }}
      className="
        px-4 py-2 rounded-full 
        border border-white/30 
        text-white text-sm
        hover:bg-cyan-900 hover:border-cyan-300 
        hover:shadow-[0_0_16px_rgba(0,255,255,0.35)]
        transition-all 
        active:scale-95
        shadow-md
      "
    >
      CREATE ACCOUNT
    </button>

  </motion.div>
)}
    </motion.nav>
  );
}
