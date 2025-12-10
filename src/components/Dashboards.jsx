import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import LogoK from "./LogoK";


const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const Dashboards = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);
  const hasAnimated = sessionStorage.getItem("dashboardAnimated");

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const howItWorksRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white w-screen min-h-screen">
      {/* ================= PURPLE HERO SECTION ================= */}
      <div className="p-6 h-screen min-h-[750px] flex justify-center items-start">
        <motion.div
          initial={hasAnimated ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onAnimationComplete={() =>
            sessionStorage.setItem("dashboardAnimated", "true")
          }
          className="w-full h-full rounded-3xl bg-gradient-to-b from-[#160523] to-[#05010a] shadow-xl relative overflow-hidden"
        >
          <Navbar />

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center mt-28 px-4 text-center relative z-20">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white text-5xl md:text-7xl font-extrabold font-mono tracking-tight"
            >
              WHERE MARKETS MEET{" "}
              <span className="text-violet-400">MEANING</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              Clear, well-researched stories that help you understand markets,
              businesses, and long-term investing — without the noise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex gap-5 flex-wrap justify-center"
            >
              <button 
                onClick={scrollToContent}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium shadow-lg hover:scale-105 transition"
              >
                Explore Articles
              </button>

              <button 
                onClick={scrollToHowItWorks}
                className="px-7 py-3 rounded-full border border-white/20 text-gray-200 hover:bg-white/10 transition"
              >
                Learn More
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 text-sm text-gray-500"
            >
              Trusted by readers who prefer insight over speculation.
            </motion.p>
          </div>

          {/* Mouse Reactive Light */}
          <div
            className="pointer-events-none fixed inset-0 z-10"
            style={{
              background: `radial-gradient(
                600px at ${mousePos.x}px ${mousePos.y}px,
                rgba(167, 139, 250, 0.12),
                transparent 45%
              )`,
              transition: "background 0.08s linear",
            }}
          />
        </motion.div>
      </div>

      {/* ================= WHITE SECTION ================= */}
      <section ref={contentRef} className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 max-w-4xl"
          >
            Empowering{" "}
            <span className="text-violet-600">Your Investment Decisions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-gray-600 max-w-3xl text-lg leading-relaxed"
          >
            We champion financial inclusion by offering everyone, regardless of
            background, free access to comprehensive and engaging articles on
            Indian stocks, emphasizing the importance of narratives alongside
            data.
          </motion.p>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-7xl font-bold text-violet-400">1</span>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Expert Articles
              </h3>
              <p className="mt-3 text-gray-600">
                Access articles written by experienced and independent finance
                professionals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-7xl font-bold text-violet-400">2</span>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Free Access
              </h3>
              <p className="mt-3 text-gray-600">
                Enjoy free access to insightful articles, technical analysis,
                and market data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-7xl font-bold text-violet-400">3</span>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Publish and Earn
              </h3>
              <p className="mt-3 text-gray-600">
                Publish your insights, grow your audience, and earn while
                contributing to market understanding.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section ref={howItWorksRef} className="bg-gradient-to-b from-violet-50 to-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 text-center"
          >
            How <span className="text-violet-600">KAVIX</span> Works
          </motion.h2>

          <div className="mt-20 space-y-24">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="flex-1">
                <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Browse Expert Insights
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Explore our extensive library of well-researched articles covering Indian stocks, market trends, and investment strategies. Each piece is crafted by industry professionals who bring years of experience.
                </p>
              </div>
              <div className="flex-1 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-2xl p-12 h-64 flex items-center justify-center shadow-lg">
                <div className="text-6xl">📚</div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row-reverse items-center gap-12"
            >
              <div className="flex-1">
                <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Learn & Analyze
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Dive deep into technical analysis, fundamental research, and market commentary. Understand the 'why' behind market movements, not just the 'what'. Make informed decisions backed by data and narrative.
                </p>
              </div>
              <div className="flex-1 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-2xl p-12 h-64 flex items-center justify-center shadow-lg">
                <div className="text-6xl">📊</div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="flex-1">
                <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Share Your Voice
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Have insights to share? Become a contributor! Write articles, share your analysis, build your reputation, and earn from your expertise. Join a community of thoughtful investors.
                </p>
              </div>
              <div className="flex-1 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl p-12 h-64 flex items-center justify-center shadow-lg">
                <div className="text-6xl">✍️</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-gray-900 py-7 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl font-bold text-violet-400">
                <CountUp end={500} />+
              </div>
              <div className="mt-3 text-gray-400 text-lg">Expert Articles</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-violet-400">
                <CountUp end={50000} duration={2500} />+
              </div>
              <div className="mt-3 text-gray-400 text-lg">Active Readers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-violet-400">
                <CountUp end={100} />+
              </div>
              <div className="mt-3 text-gray-400 text-lg">Contributors</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-5xl font-bold text-violet-400">24/7</div>
              <div className="mt-3 text-gray-400 text-lg">Free Access</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Ready to Make{" "}
            <span className="text-violet-600">Smarter Investments?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-gray-600 text-lg"
          >
            Join thousands of investors who trust KAVIX for clear, actionable market insights.
          </motion.p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 py-2 px-6">
        <div className="max-w-6xl mx-auto text-center ">
          <span className="w-12 ml-[42%] top-10 relative h-12 flex items-center justify-center"><LogoK/></span>
          <div className=" text-2xl font-bold text-blue-400 mb-4">KAVIX</div>
          <p className="text-sm mb-2">
            © 2025 KAVIX. Empowering your investment decisions.
          </p>
          <p className="text-xs text-red-400">
            Website designed by Sneha Sharma
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboards;