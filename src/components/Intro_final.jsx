import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoK from "./LogoK";
import Dashboards from "./Dashboards";

export default function Intro_final() {
  // Detect if intro should play
  const navType = performance.getEntriesByType("navigation")[0]?.type;

  const isInternalNav = sessionStorage.getItem("internalNav") === "true";

  const shouldPlayIntro =
    !isInternalNav && (navType === "reload" || navType === "navigate");

  const [stage, setStage] = useState(shouldPlayIntro ? "logo" : "done");
  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = [
    "Smarter Analytics",
    "VISION THAT LEADS",
    "Invest With Confidence"
  ];

  // Run intro timing
  useEffect(() => {
    if (stage === "done") return;

    const timers = [];

    timers.push(setTimeout(() => setStage("kavix"), 1500));
    timers.push(setTimeout(() => setStage("phrases"), 3000));

    const start = 3000;
    const step = 1800;

    phrases.forEach((_, i) =>
      timers.push(setTimeout(() => setPhraseIndex(i), start + i * step))
    );

    timers.push(
      setTimeout(() => {
        setStage("done");
        // When intro finishes, internal nav allowed
        sessionStorage.setItem("internalNav", "true");
      }, start + phrases.length * step + 900)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Animations
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6 }
    })
  };

  const phraseColors = ["#C7B7FF", "#7DE7F9", "#D0B8FF"];
  const font = "'Inter', sans-serif";

  const slideLeftK = {
    initial: { x: 0 },
    animate: {
      x: -10,
      transition: { type: "spring", stiffness: 35, damping: 18 }
    }
  };

  // Phrase Renderer
  const renderPhrase = () => {
    const phrase = phrases[phraseIndex];
    const color = phraseColors[phraseIndex];

    return (
      <motion.div
        key={phraseIndex}
        className="flex flex-wrap justify-center gap-3 px-4 text-center"
      >
        {phrase.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            style={{
              fontFamily: font,
              fontWeight: 600,
              fontSize: "clamp(28px, 7vw, 60px)",
              color,
              textShadow: `0 0 35px ${color}60`
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#160523] to-[#05010a] relative overflow-hidden">

      <AnimatePresence mode="wait">

        {/* 1. LOGO */}
        {stage === "logo" && (
          <motion.div className="fixed inset-0 flex items-center justify-center">
            <div className="scale-[0.7] sm:scale-90 md:scale-100">
              <LogoK color="#67e8f9" />
            </div>
          </motion.div>
        )}

        {/* 2. K + KAVIX */}
        {stage === "kavix" && (
          <motion.div className="fixed inset-0 flex items-center justify-center gap-2 sm:gap-3">

            <motion.div
              variants={slideLeftK}
              initial="initial"
              animate="animate"
              className="flex items-center"
            >
              <div className="w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] flex items-center justify-center">
                <LogoK skipAnimation={true} color="#67e8f9" />
              </div>
            </motion.div>

            {Array.from("KAVIX").map((ch, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="show"
                style={{
                  fontFamily: font,
                  fontWeight: 900,
                  fontSize: "clamp(38px, 10vw, 85px)",
                  color: "#67e8f9",
                  textShadow: "0 0 45px rgba(103,232,249,0.5)"
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* 3. PHRASES */}
        {stage === "phrases" && (
          <motion.div className="fixed inset-0 flex items-center justify-center px-3">
            {renderPhrase()}
          </motion.div>
        )}

      </AnimatePresence>

      {/* FINAL PAGE */}
      {stage === "done" && <Dashboards />}
    </div>
  );
}
