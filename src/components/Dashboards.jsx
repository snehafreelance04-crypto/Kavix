
// Dashboards.jsx - Fully Responsive Version
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import your actual components
import Navbar from "./Navbar";
import LogoK from "./LogoK";

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasAnimated, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const Dashboards = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const howItWorksRef = useRef(null);
  const hasAnimated = sessionStorage.getItem("dashboardAnimated");

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white w-full min-h-screen overflow-x-hidden">
      {/* ================= PURPLE HERO SECTION ================= */}
      <div className="p-3 sm:p-4 md:p-6 
     h-[92vh] sm:h-screen md:h-[90vh] 
min-h-[560px] sm:min-h-[700px] md:min-h-[780px] flex justify-center items-start relative">
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <motion.div
          initial={hasAnimated ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onAnimationComplete={() =>
            sessionStorage.setItem("dashboardAnimated", "true")
          }
          className="w-full sm:w-[97%] z-50  rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#160523] to-[#05010a] shadow-2xl relative overflow-hidden border border-violet-500/20 h-[46rem] sm:h-[800px]" 
        >
          <Navbar />

          {/* Hero Content */}
          <div
            className="
flex flex-col items-center justify-center
mt-20 sm:mt-20 md:mt-24 lg:mt-28
px-4 sm:px-6 text-center relative z-20
space-y-6 sm:space-y-7 md:space-y-10 lg:space-y-12
"
          >

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold font-mono tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight"
            >
              WHERE MARKETS MEET{" "}
              <span className="text-violet-400 relative inline-block">
                MEANING
                <motion.div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl md:max-w-2xl leading-relaxed px-4 mb-6 sm:mb-8 md:mb-10 mt-3"
            >
              Clear, well-researched stories that help you understand markets,
              businesses, and long-term investing — without the noise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="
    flex flex-col sm:flex-row 
    gap-6 sm:gap-5 md:gap-8 lg:gap-10
    flex-wrap justify-center 
     sm:mb-12 md:mb-16 
    w-full px-6 
  "
            >

              {/* ==== BUTTON 1: Explore Articles ==== */}
              <button
                onClick={scrollToContent}
                className="group px-7 py-3 rounded-full border-2 border-violet-400/50
                hover:bg-violet-500/20  
             text-white font-medium text-sm
             shadow-lg 
             w-full sm:w-auto 
             relative overflow-hidden"
              >

                <span className="relative z-10">Explore Articles</span>

              
              </button>

              {/* ==== BUTTON 2: Learn More ==== */}
              <button
                onClick={scrollToHowItWorks}
                className="px-7 py-3 rounded-full border-2 border-violet-400/50 
             text-gray-200 text-sm
             hover:bg-violet-500/20 
             w-full sm:w-auto
             transition-all duration-200 backdrop-blur-sm"
              >

                Learn More
              </button>
            </motion.div>

            <motion.p
              initial4={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs sm:text-sm md:text-md relative top-10 mt-4 sm:mb-4 text-gray-500"
            >
              Trusted by readers who prefer insight over speculation.
            </motion.p>

            {/* UPDATED BUTTON - NOW NAVIGATES TO ROUTE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-3 relative bottom-9 sm:mt-4 w-full sm:px-0 sm:w-auto "
            >
              <button
                onClick={() => navigate("/investment-plans")}
                className="
    relative w-full h-24 md:top-12 sm:w-auto 
    px-8 sm:px-12 md:px-14 
    py-4 sm:py-4 md:py-4              /* ⭐ Increased mobile height */
    rounded-full font-semibold 
    text-xl sm:text-lg tracking-wide
    text-[#E8FFF9]
    bg-gradient-to-r from-[#0a261a] via-[rgb(25,29,69)] to-[#0e3921]
    shadow-[0_0_22px_rgba(0,255,170,0.18)]
    border border-[#3cad9e]
    transition-all duration-300 overflow-hidden
    hover:scale-105 sm:hover:scale-[1.08]
    hover:shadow-[0_0_40px_rgba(0,255,200,0.35)]
    hover:border-[#0affc6]
    mt-28 sm:mt-8 md:mt-1
    flex justify-center bottom-5
  "
              >

                <span className="relative text-gray p-5 z-20 flex items-center justify-center gap-2 sm:gap-3">
                  <span className="whitespace-nowrap">View Investment Plans</span>
                  <span className="text-[#6FFFD2] text-xl sm:text-2xl">→</span>
                </span>

                {/* Fintech Shine Animation */}
                <span
                  className="
        absolute inset-0
        bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent
        translate-x-[-130%]
        hover:translate-x-[130%]
        transition-transform duration-900 ease-out
      "
                />
              </button>
            </motion.div>

          </div>

          {/* Mouse Reactive Light - Only on larger screens */}
          <div
            className="pointer-events-none fixed inset-0 z-10 hidden md:block"
            style={{
              background: `radial-gradient(
                600px at ${mousePos.x}px ${mousePos.y}px,
                rgba(167, 139, 250, 0.15),
                transparent 45%
              )`,
              transition: "background 0.08s linear",
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= WHITE SECTION ================= */}
      <section ref={contentRef} className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent"></div>

        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 max-w-4xl leading-tight"
          >
            Empowering{" "}
            <span className="text-violet-600 relative inline-block">
              Your Investment Decisions
              <motion.svg
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.path
                  d="M0,0 Q150,10 300,0"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-violet-400"
                />
              </motion.svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 sm:mt-8 text-gray-600 max-w-3xl text-base sm:text-lg leading-relaxed"
          >
            We champion financial inclusion by offering everyone, regardless of
            background, free access to comprehensive and engaging articles on
            Indian stocks, emphasizing the importance of narratives alongside
            data.
          </motion.p>

          {/* Features with enhanced cards */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { num: "1", title: "Expert Articles", desc: "Access articles written by experienced and independent finance professionals.", color: "indigo" },
              { num: "2", title: "Free Access", desc: "Enjoy free access to insightful articles, technical analysis, and market data.", color: "indigo" },
              { num: "3", title: "Publish and Earn", desc: "Share your insights, build your audience, and earn.", color: "indigo" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-gray-100 p-6 sm:p-8 rounded-2xl border border-gray-200 group-hover:border-violet-200 transition-all duration-300 shadow-sm group-hover:shadow-blue-950">
                  <span className={`text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 bg-clip-text text-transparent`}>
                    {item.num}
                  </span>
                  <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                  <motion.div
                    className=" h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section ref={howItWorksRef} className="bg-gradient-to-b from-gray-50 via-violet-50/30 to-white py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative line above */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-300 to-transparent"></div>

        {/* Background decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="max-w-6xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-gray-900 text-center mb-3 sm:mb-4"
          >
            How <span className="text-violet-600">KAVIX</span> Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-sm sm:text-base md:text-md text-gray-600 mb-12 sm:mb-16 md:mb-20 max-w-2xl mx-auto px-4"
          >
            Three simple steps to transform your investment journey
          </motion.p>

          <div className="relative">
            {/* Connecting line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 via-indigo-300 to-purple-200"></div>

            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {[
                {
                  num: 1,
                  title: "Browse Expert Insights",
                  desc: "Explore our extensive library of well-researched articles covering Indian stocks, market trends, and investment strategies. Each piece is crafted by industry professionals who bring years of experience.",
                  icon: "📚",
                  gradient: "from-violet-400 to-indigo-500",
                  align: "left"
                },
                {
                  num: 2,
                  title: "Learn & Analyze",
                  desc: "Dive deep into technical analysis, fundamental research, and market commentary. Understand the 'why' behind market movements, not just the 'what'. Make informed decisions backed by data and narrative.",
                  icon: "📊",
                  gradient: "from-indigo-400 to-violet-500",
                  align: "right"
                },
                {
                  num: 3,
                  title: "Share Your Voice",
                  desc: "Have insights to share? Become a contributor! Write articles, share your analysis, build your reputation, and earn from your expertise. Join a community of thoughtful investors.",
                  icon: "✍️",
                  gradient: "from-violet-400 to-purple-500",
                  align: "left"
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: step.align === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${step.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 sm:gap-8 md:gap-12 relative`}
                >
                  {/* Number badge - Hidden on mobile, shown on desktop */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-white border-4 border-violet-500 items-center justify-center text-xl sm:text-2xl font-bold text-violet-600 shadow-lg z-10"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {step.num}
                  </motion.div>

                  <div className="flex-1 relative group w-full">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-200 to-indigo-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                      <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 group-hover:border-violet-300 transition-all duration-300 shadow-lg">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:hidden rounded-full bg-violet-600 text-white flex items-center justify-center text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                          {step.num}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className={`flex-1 bg-gradient-to-br ${step.gradient} rounded-2xl p-8 sm:p-10 md:p-12 h-48 sm:h-56 md:h-64 flex items-center justify-center shadow-2xl relative overflow-hidden group w-full`}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <motion.div
                      className="text-5xl sm:text-6xl md:text-7xl relative z-10"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500 to-indigo-500 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 text-center relative z-10">
            {[
              { end: 200, label: "Expert Articles", duration: 1500 },
              { end: 1000, label: "Active Readers", duration: 2000 },
              { end: 100, label: "Contributors", duration: 1500 },
              { label: "Free Access", static: "24/7" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-violet-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                <div className="relative">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    {stat.static || <><CountUp end={stat.end} duration={stat.duration} />+</>}
                  </div>
                  <div className="mt-2 sm:mt-3 text-gray-400 text-sm sm:text-base md:text-lg font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-b from-white to-violet-50/30 py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-5 sm:top-10 right-5 sm:right-10 w-48 sm:w-64 h-48 sm:h-64 bg-violet-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Ready to Make{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Smarter Investments?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4"
          >
            Join thousands of investors who trust KAVIX for clear, actionable market insights.
          </motion.p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-b from-gray-950 to-black text-gray-400 py-8 sm:py-10 md:py-12 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            <motion.span
              className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center relative top-3 sm:top-4"
            >
              <LogoK />
            </motion.span>
            <div className="text-xl sm:text-2xl font-bold relative top-3 sm:top-4 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              KAVIX
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-gray-400 mb-2 px-4"
          >
            © 2025 <span className="font-semibold text-gray-200">KAVIX</span>.
            Every market has a story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <p className="text-xs text-gray-500 tracking-wide px-4">
              Crafted with precision by{" "}
              <span className="text-violet-400 font-semibold">Sneha Sharma</span>
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="mt-3 mb-3 h-px w-48 sm:w-64 mx-auto bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>
      </footer>
    </div>
  );
};

export default Dashboards;
