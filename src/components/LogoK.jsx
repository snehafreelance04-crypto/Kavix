// LogoK.jsx
import React from "react";
import { motion } from "framer-motion";

// same "smooth" variants you had
const smooth = {
  hidden: (dir) => ({
    opacity: 0,
    x: dir.x,
    y: dir.y,
    rotate: dir.rotate,
    scale: 0.85,
  }),

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// helper: convert hex to rgba string
function hexToRgba(hex, alpha = 1) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized.length === 3
    ? normalized.split("").map((c) => c + c).join("")
    : normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function LogoK({ color = "#67e8f9", skipAnimation = false }) {
  // subtle tints/variants of the primary color for layered look
  const main = color;
  const tintLight = hexToRgba(color, 0.38); // lighter fill
  const tintLighter = hexToRgba(color, 0.18); // very faint
  const strokeTint = hexToRgba(color, 0.22); // subtle stroke tint

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      {/* GLASS PANEL (keeps frosted look but with a faint cyan stroke) */}
      <motion.rect
        x="25"
        y="25"
        width="250"
        height="250"
        rx="32"
        fill="rgba(255,255,255,0.06)"
        stroke={strokeTint}
        strokeWidth="10"
        style={{ backdropFilter: "blur(16px)" }}
        initial={skipAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: skipAnimation ? 0 : 1 } }}
        key="glass-panel"
      />

      {/* LEFT BAR — DROPS DOWN */}
      <motion.rect
        x="80"
        y="80"
        width="50"
        height="140"
        rx="14"
        fill={tintLight}            // tint of the cyan
        stroke={main}
        strokeWidth="3"
        custom={{ x: 0, y: -180, rotate: 0 }}
        variants={smooth}
        initial={skipAnimation ? "visible" : "hidden"}
        animate="visible"
        key="left-bar"
      />

      {/* UPPER DIAGONAL */}
      <motion.path
        d="
          M130 150 
          L210 80 
          Q230 70 250 85
          L165 150 
          Z
        "
        fill={hexToRgba(main, 0.9)} // richer main color for top highlight
        stroke={hexToRgba(main, 0.75)}
        strokeWidth="1"
        custom={{ x: 50, y: -80, rotate: -25 }}
        variants={smooth}
        initial={skipAnimation ? "visible" : "hidden"}
        animate="visible"
        key="upper-diagonal"
      />

      {/* LOWER DIAGONAL */}
      <motion.path
        d="
          M130 150 
          L165 150 
          L210 230 
          Q230 245 250 225
          L165 150 
          Z
        "
        fill={tintLighter} // faint tint for the lower piece
        stroke={hexToRgba(main, 0.55)}
        strokeWidth="1"
        custom={{ x: 80, y: 80, rotate: 30 }}
        variants={smooth}
        initial={skipAnimation ? "visible" : "hidden"}
        animate="visible"
        key="lower-diagonal"
      />
    </svg>
  );
}
