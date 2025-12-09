import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoK from "./LogoK";
import Navbar from "./Navbar";
import Dashboards from "./Dashboards";


export default function Intro_final() {
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

  // ------ Animations ------
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    })
  };

  const phraseColorClasses = ["#C7B7FF", "#7DE7F9", "#D0B8FF"];
  const phraseFont = "'Inter', sans-serif";

  const slideLeftK = {
    initial: { x: 0 },
    animate: {
      x: -40,
      transition: { type: "spring", stiffness: 40, damping: 20 }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.5 }
    }
  };

  // Render phrase based on index
  const renderPhrase = () => {
    const phrase = phrases[phraseIndex];
    const color = phraseColorClasses[phraseIndex];

    // Phrase 0: "Smarter Analytics" - Letter by letter typewriter with glow pulse
    if (phraseIndex === 0) {
      const letters = phrase.split("");
      return (
        <motion.div
          key={phraseIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex"
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }
              }}
              style={{
                fontFamily: phraseFont,
                fontWeight: 500,
                fontSize: "54px",
                color: color,
                textShadow: `0 0 30px ${color}80, 0 0 60px ${color}40`,
                display: letter === " " ? "inline-block" : "inline",
                width: letter === " " ? "0.3em" : "auto"
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    // Phrase 1: "VISION THAT LEADS" - Word by word from left/right
    if (phraseIndex === 1) {
      const words = phrase.split(" ");
      return (
        <motion.div
          key={phraseIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex gap-4"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.5 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }
              }}
              style={{
                fontFamily: phraseFont,
                fontWeight: 700,
                fontSize: "64px",
                color: color,
                textShadow: `0 0 30px ${color}40`
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    // Phrase 2: "Invest With Confidence" - Sequential from bottom
    if (phraseIndex === 2) {
      const words = phrase.split(" ");
      return (
        <motion.div
          key={phraseIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex gap-4"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }}
              style={{
                fontFamily: phraseFont,
                fontWeight: 500,
                fontSize: "54px",
                color: color,
                textShadow: `0 0 30px ${color}40`
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    }
  };

  // -------------- UI ---------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#160523] to-[#05010a] relative">
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
                  marginInline: "2px",
                  textShadow: "0 0 40px rgba(103, 232, 249, 0.5)"
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
            {renderPhrase()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. HOME PAGE */}
      {stage === "done" && <Dashboards />}
    </div>
  );
}