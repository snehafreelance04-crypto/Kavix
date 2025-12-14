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

  const initials = (() => {
    if (!user) return '';
    const name = user.name || user.email || '';
    if (!name) return '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  })();


  const googleLogin = () => {
    // allow choosing account
    startLogin(undefined, { promptSelect: true });
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

    // listen to auth changes in same tab and other tabs
    const onAuthChange = () => {
      try {
        const u = JSON.parse(localStorage.getItem('user'));
        setUser(u);
      } catch {
        setUser(null);
      }
    };
    const onStorage = (e) => {
      if (e.key === 'user') {
        try { setUser(e.newValue ? JSON.parse(e.newValue) : null); } catch { setUser(null); }
      }
    };
    window.addEventListener('authChange', onAuthChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('authChange', onAuthChange);
      window.removeEventListener('storage', onStorage);
    };
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
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
              {initials || 'U'}
            </div>
            <span className="font-medium">{user.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
                doLogout();
              }}
              className="hover:text-cyan-300 transition"
            >
              LOGOUT
            </button>
          </div>
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
      <>
        <div className="px-3 py-2 rounded-lg bg-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">{initials || 'U'}</div>
          <div className="text-sm">{user.name}</div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setMenuOpen(false);
            setUser(null);
            doLogout();
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
      </>
    ) : (
      <button
        onClick={() => {
          startLogin(undefined, { promptSelect: true });
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
