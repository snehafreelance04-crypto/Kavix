import React from "react";
import LogoK from "./LogoK";
import { motion } from "framer-motion";

export default function Navbar() {

    const navVariant = {
        hidden: { opacity: 0, y: -60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: "easeOut" }
        }
    };

    return (
        <motion.nav
            variants={navVariant}
            initial="hidden"
            animate="visible"
            className="w-[95%] fixed top-0 left-10 z-50 px-10 py-3
                       flex mt-10 items-center justify-between
                        bg-[#160523]/30 "
        >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

                {/* Logo */}
                <motion.div
                    variants={navVariant}
                    className="w-12 h-12 flex items-center justify-center"
                >
                    <LogoK className="w-full h-full" />
                </motion.div>

                {/* KAVIX TEXT */}
                <motion.span
                    variants={navVariant}
                    className="text-cyan-300 font-semibold text-3xl tracking-wide"
                >
                    KAVIX
                </motion.span>

                {/* MENU LINKS */}
                <motion.div
                    variants={navVariant}
                    className="flex items-center gap-6 text-white font-medium text-md ml-6"
                >
                    <button className="hover:text-cyan-300 transition">ABOUT US</button>
                    <button className="hover:text-cyan-300 transition">ARTICLES</button>
                </motion.div>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <motion.div
                variants={navVariant}
                className="flex items-center gap-6 text-md"
            >
                <button className="text-white hover:text-cyan-300 ">
                    LOGIN
                </button>

                <button className="px-5 py-2 rounded-full border border-white/40 text-white
                                   hover:bg-cyan-950 hover:text-white ">
                    CREATE FREE ACCOUNT
                </button>
            </motion.div>

        </motion.nav>
    );
}
