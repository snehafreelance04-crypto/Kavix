import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoK from "./LogoK";
import Navbar from "./Navbar";
import Dashboards from "./Dashboards";

export default function Intro_final() {
  const [stage, setStage] = useState(() => {
    const played = localStorage.getItem("introPlayed");
    return played === "true" ? "done" : "logo";
  });

  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = ["Smarter Analytics", "VISION THAT LEADS", "Invest With Confidence"];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stage !== "done") return;

    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [stage]);

  // INTRO TIMING (unchanged)
  useEffect(() => {
    if (stage === "done") return;

    const timers = [];
    timers.push(setTimeout(() => setStage("kavix"), 1600));
    timers.push(setTimeout(() => setStage("phrases"), 3200));

    const start = 3200;
    const step = 1800;

    phrases.forEach((_, i) =>
      timers.push(setTimeout(() => setPhraseIndex(i), start + i * step))
    );

    timers.push(
      setTimeout(() => {
        setStage("done");
        localStorage.setItem("introPlayed", "true");
      }, start + phrases.length * step + 900)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // ====================== RESPONSIVE FIXES ======================
  const responsiveText = (desktop, tablet, mobile) => {
    return `text-[${desktop}px] sm:text-[${tablet}px] text-[${mobile}px]`;
  };

  const phraseFont = "'Inter', sans-serif";
  const phraseColorClasses = ["#C7B7FF", "#7DE7F9", "#D0B8FF"];

  // ========== Render Phrases Responsively ==========
  const renderPhrase = () => {
    const phrase = phrases[phraseIndex];
    const color = phraseColorClasses[phraseIndex];

    const sharedStyle = {
      fontFamily: phraseFont,
      color,
      textShadow: `0 0 30px ${color}60`,
    };

    // Phrase 1: Letter-by-letter
    if (phraseIndex === 0) {
      return (
        <motion.div
          key={phraseIndex}
          className="flex justify-center flex-wrap px-4 text-center"
        >
          {phrase.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { delay: i * 0.05 },
              }}
              style={{
                ...sharedStyle,
                fontSize: "clamp(28px, 6vw, 54px)", // RESPONSIVE FIX
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    // Phrase 2: Word bouncing left/right
    if (phraseIndex === 1) {
      return (
        <div className="flex flex-wrap justify-center gap-3 px-4 text-center">
          {phrase.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: i % 2 ? -80 : 80 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                ...sharedStyle,
                fontSize: "clamp(32px, 7vw, 64px)", // RESPONSIVE FIX
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      );
    }

    // Phrase 3: Slide-up words
    return (
      <div className="flex flex-wrap justify-center gap-3 px-4 text-center">
        {phrase.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            style={{
              ...sharedStyle,
              fontSize: "clamp(28px, 6vw, 54px)", // RESPONSIVE FIX
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  };

  // ====================== UI ======================
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#160523] to-[#05010a] relative">

      <AnimatePresence mode="wait">
        {/* KAVIX INITIAL LOGO */}
        {stage === "logo" && (
          <motion.div className="fixed inset-0 flex items-center justify-center">
            <div className="scale-[0.6] sm:scale-75 md:scale-100"> {/* responsive scale */}
              <LogoK color="#67e8f9" />
            </div>
          </motion.div>
        )}

        {/* K + KAVIX TEXT */}
        {stage === "kavix" && (
          <motion.div className="fixed inset-0 flex items-center justify-center gap-3 sm:gap-4">
            <motion.div initial={{ x: 0 }} animate={{ x: -40 }}>
              <div className="scale-[0.6] sm:scale-75 md:scale-100">
                <LogoK skipAnimation={true} color="#67e8f9" />
              </div>
            </motion.div>

            {Array.from("KAVIX").map((ch, i) => (
              <motion.span
                key={i}
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-extrabold"
                style={{
                  fontFamily: phraseFont,
                  fontSize: "clamp(42px, 12vw, 88px)", // RESPONSIVE FIX
                  color: "#67e8f9",
                  textShadow: "0 0 40px rgba(103,232,249,0.5)",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* PHRASE ANIMATIONS */}
        {stage === "phrases" && (
          <motion.div className="fixed inset-0 flex items-center justify-center">
            {renderPhrase()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOAD HOMEPAGE */}
      {stage === "done" && <Dashboards />}
    </div>
  );
}
