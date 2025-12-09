import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f021a] to-[#160523]">

            {/* ✅ Navbar */}
            <Navbar />

            {/* ✅ home + about */}
            <div className="flex items-center gap-3 pt-10 px-20 text-md text-gray-500">

                <button onClick={() => navigate("/")} className="font-serif underline" >
                    Home
                </button>

                <span>›</span>
                <span className="text-purple-300 underline font-serif">About Us</span>
            </div>

            {/* ✅ About Content (UNCHANGED) */}
            <div className="pt-8 px-20 text-blue-600">
                <h1 className="text-7xl  font-bold mb-6">
                    Welcome to <br />
                    Kavix, your <br />
                    gateway to Indian <br />
                    stocks.
                </h1>

                <p className="max-w-3xl text-xl font-normal mt-10 text-white/80 leading-relaxed">
                    KAVIX brings clarity to the Indian stock market through data-backed insights, deep market stories, and intuitive research tools — helping everyday investors make confident, informed decisions.
                </p>


                {/* ✅Our Mission  */}
                <div className="pt-16 font-normal text-4xl mb-6 text-blue-400">
                    Our mission
                </div>

                {/* ✅ Mission Cards */}
                <div className="mt-16 px-20 pb-20">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

                        {/* Card 1 */}
                        <div>
                            <div className="text-6xl font-bold text-purple-400 mb-6">1</div>
                            <h3 className="text-2xl font-normal text-white mb-4">
                                Make investing knowledge accessible
                            </h3>
                            <p className="text-pink-200 leading-relaxed">
                                At Kavix, we believe smart investing starts with the right knowledge.
                                Our platform is built to break down complex market concepts into
                                clear, actionable insights for everyone.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div>
                            <div className="text-6xl font-bold text-purple-400 mb-6">2</div>
                            <h3 className="text-2xl font-normal text-white mb-4">
                                Deliver research that tells a story
                            </h3>
                            <p className="text-pink-200 leading-relaxed">
                                Stocks are more than numbers. We combine data, market trends,
                                and real narratives to help investors understand *why* a stock
                                behaves the way it does.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div>
                            <div className="text-6xl font-bold text-purple-400 mb-6">3</div>
                            <h3 className="text-2xl font-normal  text-white mb-4">
                                Empower confident decision-making
                            </h3>
                            <p className="text-pink-200 leading-relaxed">
                                Whether you’re just starting out or already experienced,
                                Kavix equips you with insights that turn uncertainty into
                                confident, informed investment decisions.
                            </p>
                        </div>

                        {/* ✅ Our Vision */}
                        {/* ✅ Vision / Proposition / Story Section */}
                    </div>
                </div>
<div className="w-full flex ml-[10%] justify-end py-18">
  <div className="max-w-4xl text-left pr-20">

    {/* Our Vision */}
    <h2 className="text-4xl font-semibold text-purple-400 mb-6">
      Our vision
    </h2>
    <p className="text-xl text-white/80 leading-relaxed mb-20">
      We envision Kavix as a trusted destination for investors at every stage — delivering thoughtful insights, honest analysis, and clear market narratives. Our aim is to cut through noise and complexity, helping investors understand not just what is happening in the Indian stock market, but why it matters — with confidence and clarity.
    </p>

    {/* Our Proposition */}
    <h2 className="text-4xl font-semibold text-purple-400 mb-6">
      Our proposition
    </h2>
    <p className="text-xl text-white/80 leading-relaxed mb-20">
      Stocks are more than numbers — they reflect decisions, performance, market forces, and future potential. Kavix combines rigorous data with meaningful context to reveal the bigger picture behind every stock, empowering investors to make smarter, well-informed decisions.
    </p>

    {/* How we came about */}
    <h2 className="text-4xl font-semibold text-purple-400 mb-6">
      How we came about
    </h2>
    <p className="text-xl text-white/80 leading-relaxed">
      Kavix was born from a deep passion for the Indian stock market and a belief
      that quality investing knowledge should be accessible to everyone.
      By combining market expertise with storytelling, we help investors
      move from confusion to confidence.
    </p>

  </div>
</div>

            </div>
        </div>
    );
}
