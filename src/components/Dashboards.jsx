// Dashboards.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showPlans, setShowPlans] = useState(false); // moved here
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

  // Modal animation variants (fade + scale)
  const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalBox = {
    hidden: { opacity: 0, scale: 0.92, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.96, y: -6, transition: { duration: 0.18, ease: "easeIn" } },
  };

  return (
    <div className="bg-white w-screen min-h-screen overflow-x-hidden">
      {/* ================= PURPLE HERO SECTION ================= */}
      <div className="p-6 h-screen min-h-[750px] flex justify-center items-start relative">
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <motion.div
          initial={hasAnimated ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onAnimationComplete={() =>
            sessionStorage.setItem("dashboardAnimated", "true")
          }
          className="w-[97%] h-full rounded-3xl bg-gradient-to-b from-[#160523] to-[#05010a] shadow-2xl relative overflow-hidden border border-violet-500/20"
        >
          <Navbar />

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center mt-20 px-4 text-center relative z-20">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white text-5xl md:text-7xl font-extrabold font-mono tracking-tight mb-8"
            >
              WHERE MARKETS MEET{" "}
              <span className="text-violet-400 relative">
                MEANING
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
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
              className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
            >
              Clear, well-researched stories that help you understand markets,
              businesses, and long-term investing — without the noise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-5 flex-wrap justify-center mb-10"
            >
              <button
                onClick={scrollToContent}
                className="group px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium shadow-lg hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Explore Articles</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="px-7 py-3 rounded-full border-2 border-violet-400/50 text-gray-200 hover:bg-violet-500/20 hover:border-violet-400 transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-gray-500"
            >
              Trusted by readers who prefer insight over speculation.
            </motion.p>

            {/* NEW BUTTON ADDED — NOTHING ELSE CHANGED */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6"
            >
              <button
                onClick={() => setShowPlans(true)}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
              >
                View Investment Plans
              </button>
            </motion.div>
          </div>

          {/* ================= POPUP (placed INSIDE the purple card) ================= */}
          <AnimatePresence>
            {showPlans && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-30 p-6 pointer-events-none"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalBackdrop}
              >
                <motion.div
                  className="pointer-events-auto w-full max-w-4xl rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl border border-gray-200"
                  variants={modalBox}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">Investment Plans</h3>
                    <button
                      onClick={() => setShowPlans(false)}
                      className="text-gray-600 hover:text-gray-900 text-2xl"
                      aria-label="Close plans"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                    Choose a plan that fits your investment style. You can always upgrade later.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {/* BASIC */}
                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm bg-white">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Basic</h4>
                        <div className="text-sm text-gray-500">Starter</div>
                      </div>
                      <p className="text-gray-600 mt-3 text-sm">For beginners starting their investment journey.</p>
                      <div className="text-3xl font-bold mt-4">₹199<span className="text-base font-medium text-gray-500">/mo</span></div>
                      <ul className="mt-4 text-gray-600 space-y-2 text-sm">
                        <li>✔ Access to basic articles</li>
                        <li>✔ Beginner guides</li>
                        <li>✔ Weekly insights</li>
                      </ul>
                      <button className="mt-6 w-full py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition">
                        Choose Plan
                      </button>
                    </div>

                    {/* PRO */}
                    <div className="p-5 rounded-xl border border-violet-300 bg-gradient-to-b from-violet-50 to-white shadow-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-violet-700">Pro</h4>
                        <div className="text-sm text-violet-600">Most Popular</div>
                      </div>
                      <p className="text-gray-700 mt-3 text-sm">Perfect for serious long-term investors.</p>
                      <div className="text-3xl font-bold mt-4 text-violet-700">₹499<span className="text-base font-medium text-gray-500">/mo</span></div>
                      <ul className="mt-4 text-gray-700 space-y-2 text-sm">
                        <li>✔ All Basic features</li>
                        <li>✔ Deep market analysis</li>
                        <li>✔ Daily stock insights</li>
                        <li>✔ Priority updates</li>
                      </ul>
                      <button className="mt-6 w-full py-2 bg-violet-700 text-white rounded-full hover:bg-violet-800 transition">
                        Choose Plan
                      </button>
                    </div>

                    {/* PREMIUM */}
                    <div className="p-5 rounded-xl border border-gray-200 shadow-sm bg-white">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Premium</h4>
                        <div className="text-sm text-gray-500">Advanced</div>
                      </div>
                      <p className="text-gray-600 mt-3 text-sm">For professionals and advanced investors.</p>
                      <div className="text-3xl font-bold mt-4">₹999<span className="text-base font-medium text-gray-500">/mo</span></div>
                      <ul className="mt-4 text-gray-600 space-y-2 text-sm">
                        <li>✔ All Pro features</li>
                        <li>✔ Real-time alerts</li>
                        <li>✔ Portfolio support</li>
                        <li>✔ Exclusive research</li>
                      </ul>
                      <button className="mt-6 w-full py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition">
                        Choose Plan
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mouse Reactive Light */}
          <div
            className="pointer-events-none fixed inset-0 z-10"
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
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
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
      <section ref={contentRef} className="bg-gradient-to-b from-white to-gray-50 py-28 px-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent"></div>

        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 max-w-4xl"
          >
            Empowering{" "}
            <span className="text-violet-600 relative inline-block">
              Your Investment Decisions
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
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
            className="mt-8 text-gray-600 max-w-3xl text-lg leading-relaxed"
          >
            We champion financial inclusion by offering everyone, regardless of
            background, free access to comprehensive and engaging articles on
            Indian stocks, emphasizing the importance of narratives alongside
            data.
          </motion.p>

          {/* Features with enhanced cards */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Expert Articles", desc: "Access articles written by experienced and independent finance professionals.", color: "indigo" },
              { num: "2", title: "Free Access", desc: "Enjoy free access to insightful articles, technical analysis, and market data.", color: "indigo" },
              { num: "3", title: "Publish and Earn", desc: "Publish your insights, grow your audience, and earn while contributing to market understanding.", color: "indigo" }
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
                <div className="relative bg-white p-8 rounded-2xl border border-gray-200 group-hover:border-violet-200 transition-all duration-300 shadow-sm group-hover:shadow-xl">
                  <span className={`text-7xl font-bold bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 bg-clip-text text-transparent`}>
                    {item.num}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                  <motion.div
                    className="mt-4 w-12 h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full"
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
      <section ref={howItWorksRef} className="bg-gradient-to-b from-gray-50 via-violet-50/30 to-white py-28 px-6 relative overflow-hidden">
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
            className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4"
          >
            How <span className="text-violet-600">KAVIX</span> Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 mb-20 max-w-2xl mx-auto"
          >
            Three simple steps to transform your investment journey
          </motion.p>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 via-indigo-300 to-purple-200"></div>

            <div className="space-y-32">
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
                  className={`flex flex-col ${step.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 relative`}
                >
                  {/* Number badge */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-violet-500 items-center justify-center text-2xl font-bold text-violet-600 shadow-lg z-10"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {step.num}
                  </motion.div>

                  <div className="flex-1 relative group">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-200 to-indigo-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                      <div className="relative bg-white p-8 rounded-2xl border border-gray-200 group-hover:border-violet-300 transition-all duration-300 shadow-lg">
                        <div className="w-12 h-12 md:hidden rounded-full bg-violet-600 text-white flex items-center justify-center text-xl font-bold mb-6">
                          {step.num}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className={`flex-1 bg-gradient-to-br ${step.gradient} rounded-2xl p-12 h-64 flex items-center justify-center shadow-2xl relative overflow-hidden group`}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <motion.div
                      className="text-7xl relative z-10"
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
      <section className="py-20 px-6 bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500 to-indigo-500 animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-12 text-center relative z-10">
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
                  <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    {stat.static || <><CountUp end={stat.end} duration={stat.duration} />+</>}
                  </div>
                  <div className="mt-3 text-gray-400 text-lg font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-b from-white to-violet-50/30 py-32 px-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
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
            className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Join thousands of investors who trust KAVIX for clear, actionable market insights.
          </motion.p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-b from-gray-950 to-black text-gray-400 py-1 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.span
              className="w-12 h-12 flex items-center justify-center relative top-4"
            >
              <LogoK />
            </motion.span>
            <div className="text-2xl font-bold relative top-4 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              KAVIX
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-gray-400 mb-2"
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
            <p className="text-xs text-gray-500 tracking-wide">
              Crafted with precision by{" "}
              <span className="text-violet-400 font-semibold">Sneha Sharma</span>
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="mt-3 mb-3 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
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
