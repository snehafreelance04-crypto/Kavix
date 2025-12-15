import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const plans = [
    {
        name: "Basic",
        price: "₹199/mo",
        description: "For beginners starting their investing journey.",
        features: ["Basic Articles", "Weekly Insights", "Beginner Guides"],
    },
    {
        name: "Pro",
        price: "₹499/mo",
        description: "For serious long-term investors.",
        features: [
            "All Basic Features",
            "Deep Market Analysis",
            "Daily Stock Insights",
            "Priority Updates",
        ],
    },
    {
        name: "Premium",
        price: "₹999/mo",
        description: "For advanced + professional investors.",
        features: [
            "All Pro Features",
            "Real-Time Alerts",
            "Portfolio Support",
            "Exclusive Reports",
        ],
    },
];

const InvestmentPlans = () => {
    const navigate = useNavigate();

    const handleSelect = (plan) => {
        alert(`Selected Plan → ${plan}`);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#0a0014] to-black py-20 px-6">

            {/* ANIMATED HEADING */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-violet-500 via-purple-400 to-indigo-500 drop-shadow-xl"
            >
                Investment Plans
            </motion.h1>

            {/* TOP LEFT HOME BUTTON */}
            <div className="absolute top-6 left-6 z-50">
                <button
                    onClick={() => navigate("/")}
<<<<<<< HEAD
                    className="relative top-5 hover:text-gray-400 text-2xl font-serif text-white ml-32 "
=======
                    className=" relative top-5  hover:text-gray-400 text-2xl font-serif text-white ml-36 "
>>>>>>> 70b186eebdc9efa68cf6019d6a17721761616412
                >
                    ← Home
                </button>
            </div>


            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
            >
                Choose a plan that fits your investment journey.
            </motion.p>

            {/* PLAN CARDS */}
            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mt-20 px-2">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        onClick={() => handleSelect(plan.name)}
                        whileHover={{ scale: 1.05, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="cursor-pointer p-8 rounded-3xl bg-[#0f0f17] border border-violet-500/20 
            shadow-xl hover:shadow-violet-500/30 hover:border-violet-400
            transition-all group relative overflow-hidden"
                    >
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-700/10 to-indigo-700/10 
            opacity-0 group-hover:opacity-100 blur-2xl transition-all"></div>

                        <h2 className="text-3xl font-bold text-white">{plan.name}</h2>

                        <p className="text-gray-400 mt-3 leading-relaxed">{plan.description}</p>

                        <div className="text-4xl font-extrabold text-violet-400 mt-6">{plan.price}</div>

                        <ul className="mt-6 space-y-2 text-gray-300">
                            {plan.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="text-green-400 text-lg">✔</span> {f}
                                </li>
                            ))}
                        </ul>

                        <button
                            className="mt-8 w-full py-3 rounded-full bg-gradient-to-r 
              from-violet-600 to-indigo-600 text-white font-semibold 
              hover:opacity-90 transition"
                        >
                            Choose Plan
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default InvestmentPlans;
