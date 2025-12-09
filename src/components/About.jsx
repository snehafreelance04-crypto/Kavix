import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    /* ✅ White background + equal padding (responsive) */
    <div className="bg-white p-4 sm:p-6 lg:p-8 min-h-screen">

      {/* ✅ FULL WIDTH PURPLE (NO max-width) */}
      <div className="min-h-full rounded-3xl overflow-hidden
                      bg-gradient-to-r from-[#0f021a] to-[#160523]">

        {/* ✅ Navbar */}
        <Navbar />

        {/* ✅ Breadcrumb */}
        <div className="flex items-center gap-3 pt-10 px-20 text-md text-gray-500">
          <button
            onClick={() => navigate("/")}
            className="font-serif underline"
          >
            Home
          </button>
          <span>›</span>
          <span className="text-purple-300 underline font-serif">
            About Us
          </span>
        </div>

        {/* ✅ Main Content */}
        <div className="pt-8 px-20 text-blue-600">

          <h1 className="text-7xl font-bold mb-6">
            Welcome to <br />
            Kavix, your <br />
            gateway to Indian <br />
            stocks.
          </h1>

          <p className="max-w-3xl text-xl mt-10 text-white/80 leading-relaxed">
            KAVIX brings clarity to the Indian stock market through data-backed
            insights, deep market stories, and intuitive research tools —
            helping everyday investors make confident, informed decisions.
          </p>

          {/* ✅ Our Mission */}
          <div className="pt-16 text-4xl mb-6 text-blue-400">
            Our mission
          </div>

          {/* ✅ Mission Cards */}
          <div className="mt-16 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

              <div>
                <div className="text-6xl font-bold text-purple-400 mb-6">1</div>
                <h3 className="text-2xl text-white mb-4">
                  Make investing knowledge accessible
                </h3>
                <p className="text-pink-200 leading-relaxed">
                  Kavix breaks down complex market concepts into clear,
                  actionable insights anyone can understand.
                </p>
              </div>

              <div>
                <div className="text-6xl font-bold text-purple-400 mb-6">2</div>
                <h3 className="text-2xl text-white mb-4">
                  Deliver research that tells a story
                </h3>
                <p className="text-pink-200 leading-relaxed">
                  We connect data, market trends, and narratives to explain
                  why stocks behave the way they do.
                </p>
              </div>

              <div>
                <div className="text-6xl font-bold text-purple-400 mb-6">3</div>
                <h3 className="text-2xl text-white mb-4">
                  Empower confident decision-making
                </h3>
                <p className="text-pink-200 leading-relaxed">
                  Our insights help investors move from doubt to clarity —
                  regardless of experience level.
                </p>
              </div>

            </div>
          </div>

          {/* ✅ Vision / Proposition */}
          <div className="w-full flex justify-end pb-24">
            <div className="max-w-4xl text-left pr-20">

              <h2 className="text-4xl text-purple-400 mb-6">
                Our vision
              </h2>
              <p className="text-xl text-white/80 mb-20">
                We envision Kavix as a trusted destination for investors at every stage — delivering thoughtful insights, honest analysis, and clear market narratives. Our aim is to cut through noise and complexity with confidence and clarity.
              </p>

              <h2 className="text-4xl text-purple-400 mb-6">
                Our proposition
              </h2>
              <p className="text-xl text-white/80 mb-20">
                Stocks are more than numbers — they reflect decisions, performance, market forces, and future potential. Kavix combines rigorous data with meaningful context to reveal the bigger picture.
              </p>

              <h2 className="text-4xl text-purple-400 mb-6">
                How we came about
              </h2>
              <p className="text-xl text-white/80">
                Kavix was born from a deep passion for the Indian stock market and a belief that quality investing knowledge should be accessible to everyone.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
