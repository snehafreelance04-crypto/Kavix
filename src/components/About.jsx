import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="min-h-full rounded-3xl overflow-hidden bg-gradient-to-r from-[#0f021a] to-[#160523]">

        <Navbar />

        {/* BREADCRUMB */}
          
        <div className="flex items-center gap-3 pt-10 px-44 text-lg text-gray-500"> <button onClick={() => navigate("/")} className="font-serif underline" ><span>›</span> Home </button>

        </div>

        {/* MAIN CONTENT */}
        <div className="pt-8 
                        px-4 sm:px-10 lg:px-20 
                        text-blue-600">

          {/* HEADING */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                         font-bold mb-6 leading-tight">
            Welcome to <br />
            Kavix, your <br />
            gateway to Indian <br />
            stocks.
          </h1>

          {/* PARAGRAPH */}
          <p className="max-w-3xl 
                        text-base sm:text-lg md:text-xl 
                        mt-6 sm:mt-8 
                        text-white/80 leading-relaxed">
            KAVIX brings clarity to the Indian stock market through data-backed
            insights, deep market stories, and intuitive research tools —
            helping everyday investors make confident, informed decisions.
          </p>

          {/* SECTION TITLE */}
          <div className="pt-16 text-3xl sm:text-4xl mb-6 text-blue-400">
            Our mission
          </div>

          {/* RESPONSIVE CARDS */}
          <div className="mt-10 sm:mt-16 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16">

              {[1, 2, 3].map((num) => (
                <div key={num}>
                  <div className="text-5xl sm:text-6xl font-bold text-purple-400 mb-6">
                    {num}
                  </div>

                  <h3 className="text-xl sm:text-2xl text-white mb-4">
                    {num === 1 && "Make investing knowledge accessible"}
                    {num === 2 && "Deliver research that tells a story"}
                    {num === 3 && "Empower confident decision-making"}
                  </h3>

                  <p className="text-pink-200 leading-relaxed text-sm sm:text-base">
                    {num === 1 &&
                      "Kavix breaks down complex market concepts into clear, actionable insights anyone can understand."}
                    {num === 2 &&
                      "We connect data, market trends, and narratives to explain why stocks behave the way they do."}
                    {num === 3 &&
                      "Our insights help investors move from doubt to clarity — regardless of experience level."}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT-ALIGNED CONTENT */}
          <div className="w-full flex justify-start sm:justify-end pb-24">
            <div className="w-full sm:max-w-4xl text-left sm:pr-10 lg:pr-20 px-4 sm:px-0">

              {/* Vision */}
              <h2 className="text-3xl sm:text-4xl text-purple-400 mb-6">
                Our vision
              </h2>
              <p className="text-base sm:text-xl text-white/80 mb-16">
                We envision Kavix as a trusted destination for investors at every stage — delivering thoughtful insights, honest analysis, and clear market narratives.
              </p>

              {/* Proposition */}
              <h2 className="text-3xl sm:text-4xl text-purple-400 mb-6">
                Our proposition
              </h2>
              <p className="text-base sm:text-xl text-white/80 mb-16">
                Stocks are more than numbers — they reflect decisions, performance, market forces, and future potential. Kavix combines rigorous data with meaningful context.
              </p>

              {/* How we came */}
              <h2 className="text-3xl sm:text-4xl text-purple-400 mb-6">
                How we came about
              </h2>
              <p className="text-base sm:text-xl text-white/80">
                Kavix was born from a deep passion for the Indian stock market and a belief that quality investing knowledge should be accessible to everyone.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
