import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoK from "./LogoK";
import Navbar from "./Navbar";
import Dashboards from "./Dashboards";


export default function Intro() {
  // Decide FIRST stage before component renders anything
  const [stage, setStage] = useState(() => {
    const played = localStorage.getItem("introPlayed");
    return played === "true" ? "done" : "logo";
  });

  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = [
    "Smarter Analytics",
    "VISION THAT LEADS",
    "Invest With Confidence"
  ];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stage !== "done") return;

    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [stage]);


  // Run intro animations ONLY if intro not played before
  useEffect(() => {
    if (stage === "done") return;   // <-- VERY IMPORTANT

    const timers = [];

    timers.push(setTimeout(() => setStage("kavix"), 1600));
    timers.push(setTimeout(() => setStage("phrases"), 3200));

    const start = 3200;
    const step = 1800;

    phrases.forEach((_, i) => {
      timers.push(setTimeout(() => setPhraseIndex(i), start + i * step));
    });

    // Final step → go to homepage + mark intro played
    timers.push(
      setTimeout(() => {
        setStage("done");
        localStorage.setItem("introPlayed", "true");
      }, start + phrases.length * step + 900)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // ------ Animations (unchanged) ------
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" }
    })
  };

  const phraseVariantsSet = [
    { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -14 } },
    { hidden: { opacity: 0, scale: 0.97, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, y: -16 } },
    { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -14 } },
  ];

  const phraseColorClasses = ["#C7B7FF", "#7DE7F9", "#D0B8FF"];
  const phraseFont = "'Inter', sans-serif";

  const slideLeftK = {
    initial: { x: 0 },
    animate: {
      x: -40,
      transition: { type: "spring", stiffness: 40, damping: 20 }
    }
  };

  // -------------- UI ---------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#160523] to-[#05010a]  relative">
      <AnimatePresence mode="wait">

        {/* 1. INTRO LOGO */}
        {stage === "logo" && (
          <motion.div className="fixed inset-0 flex items-center justify-center">
            <LogoK color="#67e8f9" />
          </motion.div>
        )}

        {/* 2. K + KAVIX */}
        {stage === "kavix" && (
          <motion.div className="fixed inset-0 flex items-center justify-center gap-4">
            <motion.div variants={slideLeftK} initial="initial" animate="animate">
              <LogoK skipAnimation={true} color="#67e8f9" />
            </motion.div>

            {Array.from("KAVIX").map((ch, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="show"
                style={{
                  fontFamily: phraseFont,
                  fontWeight: 1000,
                  fontSize: "88px",
                  color: "#67e8f9",
                  marginInline: "2px"
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* 3. PHRASES */}
        {stage === "phrases" && (
          <motion.div className="fixed inset-0 flex items-center justify-center">
            <motion.h2
              key={phraseIndex}
              variants={phraseVariantsSet[phraseIndex]}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                fontFamily: phraseFont,
                fontWeight: 500,
                fontSize: "54px",
                color: phraseColorClasses[phraseIndex],
                textAlign: "center"
              }}
            >
              {phrases[phraseIndex]}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. HOME PAGE */}

      {stage === "done" && <Dashboards/>}
    </div>
  );
}
