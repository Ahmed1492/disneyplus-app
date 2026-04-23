import React, { useState } from "react";
import { FaPlay, FaLock } from "react-icons/fa";
import { MdHd } from "react-icons/md";

const seasons = {
  1: [
    { ep: 1, title: "A Glorious Purpose", duration: "50 min", desc: "After stealing the Tesseract, Loki finds himself before the Time Variance Authority — an organization that exists outside of time and space.", thumb: null },
    { ep: 2, title: "The Variant", duration: "45 min", desc: "Mobius puts Loki to work, but not everyone at the TVA is thrilled about the God of Mischief's presence.", thumb: null },
    { ep: 3, title: "Lamentis", duration: "42 min", desc: "Loki and a variant find themselves stranded on a dying planet with no way to escape.", thumb: null },
    { ep: 4, title: "The Nexus Event", duration: "47 min", desc: "A shocking revelation forces Loki and Sylvie to reckon with what they've discovered about the TVA.", thumb: null },
    { ep: 5, title: "Journey into Mystery", duration: "52 min", desc: "Loki navigates a dangerous void at the end of time while Sylvie faces the TVA head-on.", thumb: null },
    { ep: 6, title: "For All Time. Always.", duration: "55 min", desc: "The season finale brings Loki and Sylvie face to face with the man behind the TVA.", thumb: null },
  ],
  2: [
    { ep: 1, title: "Ouroboros", duration: "48 min", desc: "Loki and Mobius race to find Sylvie while the TVA faces an existential threat from within.", thumb: null },
    { ep: 2, title: "Breaking Brad", duration: "44 min", desc: "Loki and Mobius track down a TVA hunter who may hold the key to saving the timeline.", thumb: null },
    { ep: 3, title: "1893", duration: "46 min", desc: "The team travels to the 1893 Chicago World's Fair to find a missing Variant.", thumb: null },
    { ep: 4, title: "Heart of the TVA", duration: "50 min", desc: "Secrets about the TVA's true origins are finally revealed as the stakes grow higher.", thumb: null },
  ],
};

export const Seasons = () => {
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeEp, setActiveEp] = useState(null);

  const episodes = seasons[activeSeason] || [];

  return (
    <div className="w-full">
      {/* Season selector */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {Object.keys(seasons).map((s) => (
          <button
            key={s}
            onClick={() => { setActiveSeason(Number(s)); setActiveEp(null); }}
            className={`relative px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeSeason === Number(s)
                ? "bg-[#02E7F5] text-black shadow-lg shadow-[#02E7F5]/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            Season {s}
            {activeSeason === Number(s) && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#02E7F5]" />
            )}
          </button>
        ))}
      </div>

      {/* Episode list */}
      <div className="flex flex-col gap-3">
        {episodes.map((ep) => {
          const isActive = activeEp === ep.ep;
          return (
            <div
              key={ep.ep}
              onClick={() => setActiveEp(isActive ? null : ep.ep)}
              className={`group flex items-stretch gap-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                isActive
                  ? "border-[#02E7F5]/40 bg-[#02E7F5]/5 shadow-lg shadow-[#02E7F5]/10"
                  : "border-white/5 bg-[#1a1d29] hover:bg-[#22263a] hover:border-white/10"
              }`}
            >
              {/* thumbnail */}
              <div className="relative flex-shrink-0 w-36 md:w-44 bg-[#0f1014]">
                {/* gradient placeholder with ep number */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d29] to-[#0f1014] flex items-center justify-center">
                  <span className="text-4xl font-black text-white/10">{ep.ep}</span>
                </div>

                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-[#02E7F5] shadow-lg shadow-[#02E7F5]/40"
                      : "bg-white/10 group-hover:bg-white/20"
                  }`}>
                    <FaPlay className={`text-xs ml-0.5 ${isActive ? "text-black" : "text-white"}`} />
                  </div>
                </div>

                {/* duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs text-gray-400 flex items-center gap-1">
                  <MdHd className="text-sm text-[#02E7F5]" />
                  {ep.duration}
                </div>
              </div>

              {/* content */}
              <div className="flex-1 px-4 py-4 flex flex-col justify-center gap-2 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                      isActive ? "bg-[#02E7F5] text-black" : "bg-white/10 text-gray-400"
                    }`}>
                      E{ep.ep}
                    </span>
                    <h3 className={`font-semibold text-sm md:text-base truncate transition-colors ${
                      isActive ? "text-[#02E7F5]" : "text-white group-hover:text-white"
                    }`}>
                      {ep.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="hidden sm:block text-gray-600 text-xs">{ep.duration}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isActive ? "border-[#02E7F5] bg-[#02E7F5]/10" : "border-white/20"
                    }`}>
                      <span className={`text-xs transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                        ▾
                      </span>
                    </div>
                  </div>
                </div>

                {/* description — always visible on md+, expandable on mobile */}
                <p className={`text-gray-400 text-xs md:text-sm leading-relaxed transition-all duration-300 ${
                  isActive ? "line-clamp-none" : "line-clamp-2"
                }`}>
                  {ep.desc}
                </p>

                {/* expanded actions */}
                {isActive && (
                  <div className="flex items-center gap-3 mt-2 pt-3 border-t border-white/5">
                    <button className="bg-[#02E7F5] text-black px-5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-white transition-colors">
                      <FaPlay className="text-[9px]" /> Play Episode
                    </button>
                    <button className="bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5">
                      <FaLock className="text-[9px]" /> Trailer
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
