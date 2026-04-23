import React, { useEffect, useState } from "react";
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight, FaTimes, FaStar } from "react-icons/fa";
import { MdOutlineHd } from "react-icons/md";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/image";

/* ── Trailer Modal ── */
const TrailerModal = ({ url, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsLoaded(true), 10);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#02E7F5]/10 via-transparent to-transparent animate-pulse" />
      
      <div
        className={`relative w-[95vw] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ${
          isLoaded ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#02E7F5]/30 via-purple-500/20 to-pink-500/20 p-[2px]">
          <div className="w-full h-full bg-black rounded-2xl overflow-hidden">
            <iframe
              src={`${url}?autoplay=1&rel=0&modestbranding=1`}
              title="Trailer"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Close button with enhanced styling */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:top-4 md:right-4 w-11 h-11 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#02E7F5] hover:text-black hover:rotate-90 transition-all duration-300 shadow-lg hover:shadow-[#02E7F5]/50 border border-white/10 hover:border-[#02E7F5] group"
          aria-label="Close trailer"
        >
          <FaTimes className="text-base group-hover:scale-110 transition-transform" />
        </button>

        {/* Trailer label */}
        <div className="absolute -top-12 left-0 md:top-4 md:left-4 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#02E7F5]/30 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white text-sm font-semibold tracking-wide">TRAILER</span>
        </div>
      </div>

      {/* Click outside hint */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm transition-opacity duration-500 delay-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-white font-mono text-xs">ESC</kbd> or click outside to close
      </div>
    </div>
  );
};

/* ── Styled Title Logo ── */
const TitleLogo = ({ title }) => {
  if (!title) return null;
  const words = title.split(" ");
  // single word → huge display
  if (words.length === 1) {
    return (
      <h1 className="font-black text-white drop-shadow-2xl leading-none tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 60px rgba(2,231,245,0.15)" }}>
        {title}
      </h1>
    );
  }
  // multi-word → first word big, rest smaller subtitle style
  return (
    <div className="flex flex-col leading-none">
      <span className="text-gray-300 text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-1 drop-shadow-lg">
        {words.slice(0, -1).join(" ")}
      </span>
      <h1
        className="font-black text-white drop-shadow-2xl tracking-tight"
        style={{ fontSize: "clamp(3rem, 9vw, 7rem)", textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 60px rgba(2,231,245,0.15)" }}
      >
        {words[words.length - 1]}
      </h1>
    </div>
  );
};

/* ── Main Slider ── */
const HomeSlider = ({ data, type }) => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const go = (newIndex) => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    setIndex(typeof newIndex === "function" ? newIndex : newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= data.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [data.length]);

  // close trailer on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setTrailer(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const current = data[index] || {};
  const ratingColor = current.vote >= 7 ? "#4ade80" : current.vote >= 5 ? "#facc15" : "#f87171";

  const brands = [
    "/DisneyLogo.svg",
    "/pixarLogo.svg",
    "/marvelLogo.svg",
    "/starwarsLogo.svg",
    "/nationalLogo.svg",
  ];

  return (
    <>
      {trailer && <TrailerModal url={trailer} onClose={() => setTrailer(null)} />}

      <div className="relative h-screen overflow-hidden">
        {/* crossfade backgrounds */}
        {data.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: i === index ? 1 : 0,
              backgroundImage: `url('${getImageUrl(item?.background)}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
            }}
          />
        ))}

        {/* gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014]/90 via-[#0f1014]/30 to-transparent" />

        {/* content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-[5%] md:px-[10%] pb-36 md:pb-44">

          {/* page badge */}
          {type !== "hero" && (
            <div className="mb-5">
              <span className="text-[#02E7F5] text-xs font-bold uppercase tracking-widest border border-[#02E7F5]/40 px-3 py-1 rounded-full bg-[#02E7F5]/10">
                {type === "series" ? "TV Series" : type === "movies" ? "Movies" : "Originals"}
              </span>
            </div>
          )}

          <div className={`transition-all duration-500 ${animating ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"}`}>

            {/* styled title */}
            <div className="mb-4">
              <TitleLogo title={current.title} />
            </div>

            {/* meta */}
            <div className="flex items-center gap-3 mb-4 flex-wrap text-sm">
              {current.vote && (
                <span className="flex items-center gap-1 font-bold" style={{ color: ratingColor }}>
                  <FaStar className="text-xs" /> {Number(current.vote).toFixed(1)}
                </span>
              )}
              {current.year && <span className="text-gray-400">{current.year}</span>}
              <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white font-semibold">
                <MdOutlineHd className="text-base" /> HD
              </span>
            </div>

            {/* description */}
            <p className="max-w-lg text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
              {current.desc}
            </p>

            {/* buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Watch Now - opens video popup if available, otherwise navigates */}
              {current.trailerUrl ? (
                <button
                  onClick={() => setTrailer(current.trailerUrl)}
                  className="relative bg-white text-black px-8 py-3.5 flex items-center gap-2 rounded-xl font-bold text-sm hover:bg-[#02E7F5] transition-all duration-300 shadow-lg hover:shadow-[#02E7F5]/50 overflow-hidden group hover:scale-105 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <FaPlay className="text-xs relative z-10 group-hover:scale-125 transition-transform duration-300" /> 
                  <span className="relative z-10">WATCH NOW</span>
                  <div className="absolute inset-0 rounded-xl bg-[#02E7F5]/0 group-hover:bg-[#02E7F5]/10 transition-colors duration-300" />
                </button>
              ) : (
                <Link
                  to={current.link || "#"}
                  className="relative bg-white text-black px-8 py-3.5 flex items-center gap-2 rounded-xl font-bold text-sm hover:bg-[#02E7F5] transition-all duration-300 shadow-lg hover:shadow-[#02E7F5]/50 overflow-hidden group hover:scale-105 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <FaPlay className="text-xs relative z-10 group-hover:scale-125 transition-transform duration-300" /> 
                  <span className="relative z-10">WATCH NOW</span>
                  <div className="absolute inset-0 rounded-xl bg-[#02E7F5]/0 group-hover:bg-[#02E7F5]/10 transition-colors duration-300" />
                </Link>
              )}

              {/* trailer button - only show if trailerUrl exists */}
              {current.trailerUrl && (
                <button
                  onClick={() => setTrailer(current.trailerUrl)}
                  className="relative border border-white/30 bg-white/10 backdrop-blur-sm px-7 py-3 flex items-center gap-2 rounded-xl text-sm font-semibold text-white hover:bg-white hover:text-black transition-all duration-200 overflow-hidden group shadow-lg hover:shadow-white/30 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#02E7F5]/0 via-[#02E7F5]/20 to-[#02E7F5]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <FaPlay className="text-xs relative z-10 group-hover:scale-110 transition-transform" /> 
                  <span className="relative z-10">TRAILER</span>
                </button>
              )}

              {/* more info → detail page */}
              <Link
                to={current.link || "#"}
                className="border border-white/20 bg-transparent px-7 py-3 flex items-center gap-2 rounded-xl text-sm font-semibold text-gray-300 hover:border-[#02E7F5] hover:text-[#02E7F5] transition-all duration-200"
              >
                <FaInfoCircle className="text-xs" /> MORE INFO
              </Link>
            </div>
          </div>
        </div>

        {/* arrows */}
        <button
          onClick={() => go(index === 0 ? data.length - 1 : index - 1)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#02E7F5] hover:text-black hover:border-[#02E7F5] transition-all duration-200"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <button
          onClick={() => go(index === data.length - 1 ? 0 : index + 1)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#02E7F5] hover:text-black hover:border-[#02E7F5] transition-all duration-200"
        >
          <FaChevronRight className="text-sm" />
        </button>

        {/* progress dots */}
        <div className="absolute bottom-36 md:bottom-44 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${i === index ? "w-6 h-2 bg-[#02E7F5]" : "w-2 h-2 bg-gray-600 hover:bg-gray-400"}`}
            />
          ))}
        </div>

        {/* brand logos — hero only */}
        {type === "hero" && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-[5%] md:px-[8%] z-20">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6">
              {brands.map((logo, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#02E7F5]/60 transition-all duration-500 cursor-pointer bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-[#02E7F5]/30"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#02E7F5]/0 via-purple-500/0 to-pink-500/0 group-hover:from-[#02E7F5]/15 group-hover:via-purple-500/10 group-hover:to-pink-500/15 transition-all duration-700" />
                  
                  {/* Shimmer sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  
                  {/* Logo image */}
                  <div className="relative z-10 p-4 md:p-5 lg:p-6 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="brand"
                      className="w-20 h-11 md:w-32 md:h-16 lg:w-40 lg:h-20 object-contain transition-all duration-500 group-hover:brightness-125 group-hover:contrast-110"
                    />
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#02E7F5] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#02E7F5] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeSlider;
