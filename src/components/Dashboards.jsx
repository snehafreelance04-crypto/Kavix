import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";


const Dashboards = () => {
      const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
  return (
  <div className="bg-white p-7 w-screen  h-screen min-h-[750px] relative flex justify-center items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full rounded-3xl bg-gradient-to-b from-[#160523] to-[#05010a] shadow-xl relative"
          >
            <Navbar />
            <div className="text-white text-4xl mt-40 text-center">
              Your Home Page Here
            </div>
            {/* Mouse reactive light */}
            <div
              className="pointer-events-none fixed inset-0 z-10"
              style={{
                background: `radial-gradient(
      600px at ${mousePos.x}px ${mousePos.y}px,
      rgba(167, 139, 250, 0.12),
      transparent 45%
    )`,
                transition: "background 0.08s linear"
              }}
            />

          </motion.div>
        </div>
  )
}

export default Dashboards