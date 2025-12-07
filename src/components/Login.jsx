import LogoK from "./LogoK";

export default function Login() {
    return (
        <div className="relative min-h-screen flex">

            {/* Left white background */}
            <div className="w-1/2 bg-white"></div>

            {/* Right image section */}
            <div
                className="
          w-1/2
          h-screen
          bg-[url('https://img.freepik.com/free-photo/abstract-background-with-dark-blue-grunge-texture_1048-20452.jpg?w=740')]
          bg-cover bg-center bg-no-repeat
          flex items-center
        "
            >
                <div className="mx-auto max-w-xl text-white text-center">
                    <h1 className="text-7xl font-bold leading-tight">
                        Every Stock <br /> Has a Story
                    </h1>

                    <p className="mt-8 text-4xl font-semibold">
                        Free stock research
                    </p>

                    <p className="mt-6 text-sm text-white/80 leading-relaxed">
                        Explore our curated collection of expert articles tailored to
                        demystify the intricacies of investing in the dynamic Indian market.
                    </p>
                </div>
            </div>

            {/* Login Card */}
            <div
                className="
          absolute
          left-1/2 top-6
          -translate-x-[90%]
          w-[600px]
          bg-white
          border border-gray-300
          rounded-2xl
          shadow-2xl
          z-10
          px-14 py-10
        "
            >
                {/* Back */}
                <button className="text-gray-700 text-lg mb-6">
                    ← Back
                </button>

                {/* Logo + Brand (PERFECT CENTER) */}
                <div className="flex justify-center items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-[#160523] rounded-xl flex items-center justify-center">
                        <LogoK skipAnimation />
                    </div>
                    <span className="text-cyan-600 gap-1 font-serif font-bold text-2xl tracking-wide">
                        KAVIX
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold mb-8 text-blue-950">
                    Log In
                </h2>

                {/* Email */}
                <div className="mb-6">
                    <label className="block text-sm mb-2 font-semibold">
                        Your Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                    <label className="block text-sm mb-2  font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <span className="absolute right-4 top-[42px] text-gray-400 cursor-pointer">
                        👁
                    </span>
                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between items-center text-sm mb-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <span className="text-black cursor-pointer">
                        Forgot Password
                    </span>
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    By creating account, I accept the{" "}
                    <span className="underline cursor-pointer">Terms of Conditions</span> and
                    have read and accept the{" "}
                    <span className="underline cursor-pointer">Terms of Use</span> and{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>

                {/* Login Button */}
                <button className="w-full bg-black text-white py-3 rounded-full font-sans font-semibold mb-6">
                    LOG IN
                </button>

                {/* Divider */}
                <div className="flex items-center text-sm text-gray-700 mb-6">
                    <div className="flex-1 h-px bg-gray-400" />
                    <span className="px-3">Or Login in with</span>
                    <div className="flex-1 h-px bg-gray-400" />
                </div>

                {/* Social */}
                <div className="flex gap-4 mb-6">
                    <button className="flex-1 border border-black rounded-full py-3 flex justify-center hover:bg-gray-100">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
                    </button>
                    <button className="flex-1 border border-black rounded-full py-3 flex justify-center hover:bg-gray-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#1877F2"
                            width="20"
                            height="20"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.64c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.925-1.953 1.874v2.247h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                        </svg>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-md text-center">
                    Don’t have an account?{" "}
                    <span className="font-semibold text-lg cursor-pointer">Create an account</span>
                </p>
            </div>
        </div>
    );
}
