import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPlay, FaStar, FaHeart, FaArrowLeft, FaCheck, FaShareAlt, FaTimes, FaClock, FaCalendar, FaGlobe, FaAward, FaTv } from "react-icons/fa";
import { MdOutlineHd } from "react-icons/md";
import SimilarSection from "../components/SimilarSection";
import { Seasons } from "../components/Seasons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { similarSingleSeries, similarSingleSeries2 } from "../data/singleTvShow";

import airingToday from "../mocks/TV SERIES/Airing Today.json";
import onTheAir from "../mocks/TV SERIES/On The Air.json";
import popular from "../mocks/TV SERIES/Popular.json";
import topRated from "../mocks/TV SERIES/Top Rated.json";

const TMDB = "https://image.tmdb.org/t/p/original";
const ALL_SERIES = [...popular, ...topRated, ...onTheAir, ...airingToday];
const slugify = (str) => str?.replace(/\s+/g, "-").toLowerCase();

// Video Player Modal Component
const VideoPlayerModal = ({ onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 10);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const trailerUrl = "https://www.youtube.com/embed/BwShMDn8FMk"; // Arcane trailer

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gradient-radial from-[#02E7F5]/10 via-transparent to-transparent animate-pulse-glow" />
      
      <div
        className={`relative w-[95vw] max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ${
          isLoaded ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#02E7F5]/30 via-purple-500/20 to-pink-500/20 p-[2px]">
          <div className="w-full h-full bg-black rounded-2xl overflow-hidden">
            <iframe
              src={`${trailerUrl}?autoplay=1&rel=0&modestbranding=1`}
              title="Series Player"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:top-4 md:right-4 w-11 h-11 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#02E7F5] hover:text-black hover:rotate-90 transition-all duration-300 shadow-lg hover:shadow-[#02E7F5]/50 border border-white/10 hover:border-[#02E7F5] group"
          aria-label="Close player"
        >
          <FaTimes className="text-base group-hover:scale-110 transition-transform" />
        </button>

        <div className="absolute -top-12 left-0 md:top-4 md:left-4 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#02E7F5]/30 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white text-sm font-semibold tracking-wide">NOW PLAYING</span>
        </div>
      </div>

      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm transition-opacity duration-500 delay-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-white font-mono text-xs">ESC</kbd> or click outside to close
      </div>
    </div>
  );
};

// Mock data
const mockCast = [
  { name: "Hailee Steinfeld", role: "Vi", avatar: "HS" },
  { name: "Ella Purnell", role: "Jinx", avatar: "EP" },
  { name: "Kevin Alejandro", role: "Jayce", avatar: "KA" },
  { name: "Katie Leung", role: "Caitlyn", avatar: "KL" },
  { name: "Jason Spisak", role: "Silco", avatar: "JS" },
  { name: "Toks Olagundoye", role: "Mel", avatar: "TO" },
];

const mockReviews = [
  { author: "Alex Turner", rating: 10, text: "Absolutely stunning animation and storytelling. One of the best animated series ever made!", date: "2024-01-20", avatar: "AT" },
  { author: "Maria Garcia", rating: 9, text: "The character development is incredible. Every episode leaves you wanting more.", date: "2024-01-18", avatar: "MG" },
  { author: "James Chen", rating: 10, text: "A masterpiece in every sense. The art style, music, and story are all perfect.", date: "2024-01-15", avatar: "JC" },
];

const mockGenres = ["Animation", "Action", "Adventure", "Drama", "Fantasy"];

const mockProductionInfo = {
  creators: ["Christian Linke", "Alex Yee"],
  studio: "Riot Games, Fortiche Production",
  seasons: "2 Seasons",
  episodes: "18 Episodes",
  runtime: "40 min per episode",
};

export const SingleTvShow = () => {
  const { title } = useParams();
  const [added, setAdded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title]);

  const show = ALL_SERIES.find(
    (s) => slugify(s.name) === title?.toLowerCase()
  ) || ALL_SERIES[0];

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setAdded(!!favs.find((f) => f.title === show.name));
  }, [show.name]);

  // Close player on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setShowPlayer(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const already = favs.find((f) => f.title === show.name);
    if (already) {
      const updated = favs.filter((f) => f.title !== show.name);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setAdded(false);
    } else {
      favs.push({ path: `${TMDB}${show.poster_path}`, title: show.name, cat: "series" });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setAdded(true);
    }
  };

  const ratingColor = show.vote_average >= 7 ? "text-green-400" : show.vote_average >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="bg-[#0f1014] min-h-screen text-white">
      <Navbar />

      {/* Video Player Modal */}
      {showPlayer && <VideoPlayerModal onClose={() => setShowPlayer(false)} />}

      {/* ── HERO ── */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={`${TMDB}${show.backdrop_path}`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014]/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-[5%] md:px-[10%] pb-16">
          <Link
            to="/series"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm"
          >
            <FaArrowLeft /> Back to Series
          </Link>

          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight drop-shadow-2xl">
            {show.name}
          </h1>

          <div className="flex items-center gap-3 mb-5 flex-wrap text-sm">
            <span className={`flex items-center gap-1 font-bold text-base ${show.vote_average >= 7 ? "text-green-400" : show.vote_average >= 5 ? "text-yellow-400" : "text-red-400"}`}>
              <FaStar /> {show.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-300">{show.first_air_date?.split("-")[0]}</span>
            <span className="text-gray-400">·</span>
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur px-2 py-0.5 rounded text-xs font-semibold">
              <MdOutlineHd className="text-base" /> HD
            </span>
            <span className="bg-white/10 backdrop-blur px-2 py-0.5 rounded text-xs font-semibold">
              TV Series
            </span>
            <span className="bg-white/10 backdrop-blur px-2 py-0.5 rounded text-xs font-semibold">
              {show.vote_count?.toLocaleString()} votes
            </span>
          </div>

          <p className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
            {show.overview}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button 
              onClick={() => setShowPlayer(true)}
              className="relative bg-white text-black px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#02E7F5] transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-[#02E7F5]/50 overflow-hidden group hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <FaPlay className="relative z-10" /> 
              <span className="relative z-10">WATCH NOW</span>
            </button>
            <button
              onClick={toggleFavorite}
              className={`px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 text-sm md:text-base border shadow-lg hover:scale-105 ${
                added
                  ? "bg-[#02E7F5] border-[#02E7F5] text-black hover:shadow-[#02E7F5]/50"
                  : "border-white/50 hover:border-[#02E7F5] bg-white/10 backdrop-blur hover:bg-white/20"
              }`}
            >
              {added ? <FaCheck /> : <FaHeart />}
              {added ? "In Favorites" : "Add to Favorites"}
            </button>
            <button className="w-12 h-12 rounded-xl border border-white/30 bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 hover:border-[#02E7F5] transition-all duration-300 hover:scale-105">
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>

      {/* ── DETAILS SECTION ── */}
      <div className="px-[5%] md:px-[10%] py-20 flex flex-col md:flex-row gap-12">
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#02E7F5]/20 via-purple-500/10 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={`${TMDB}${show.poster_path}`}
              alt={show.name}
              className="relative w-48 md:w-64 rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 group-hover:ring-[#02E7F5]/50 transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{show.name}</h2>
            <p className="text-[#02E7F5] text-base font-semibold flex items-center gap-2">
              <FaTv className="text-sm" />
              {show.first_air_date?.split("-")[0]} · TV Series
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed text-base max-w-3xl">
            {show.overview}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {mockGenres.map((genre, i) => (
              <span key={i} className="px-4 py-2 bg-gradient-to-r from-[#02E7F5]/20 to-purple-500/20 border border-[#02E7F5]/30 rounded-full text-sm font-semibold text-white hover:from-[#02E7F5]/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer">
                {genre}
              </span>
            ))}
          </div>

          {/* stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Rating", value: `${show.vote_average?.toFixed(1)} / 10`, icon: FaStar, color: "text-yellow-400" },
              { label: "First Air", value: show.first_air_date, icon: FaCalendar, color: "text-[#02E7F5]" },
              { label: "Votes", value: show.vote_count?.toLocaleString(), icon: FaAward, color: "text-purple-400" },
              { label: "Language", value: show.original_language?.toUpperCase(), icon: FaGlobe, color: "text-green-400" },
              { label: "Popularity", value: show.popularity?.toFixed(0), icon: FaStar, color: "text-pink-400" },
              { label: "Status", value: "Ongoing", icon: FaTv, color: "text-orange-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#02E7F5]/50 transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`text-sm ${color}`} />
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{label}</p>
                </div>
                <p className="text-white font-bold text-base">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CAST SECTION ── */}
      <div className="px-[5%] md:px-[10%] py-16 bg-gradient-to-b from-transparent via-[#1a1d29]/30 to-transparent">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
            <h2 className="text-3xl font-bold">Voice Cast</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {mockCast.map((person, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-3 aspect-[2/3] bg-gradient-to-br from-[#02E7F5]/20 to-purple-500/20 border border-white/10 group-hover:border-[#02E7F5]/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#02E7F5]/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-3xl font-bold text-white">
                  {person.avatar}
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#02E7F5] transition-colors">{person.name}</h3>
              <p className="text-gray-400 text-xs">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTION INFO ── */}
      <div className="px-[5%] md:px-[10%] py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
          <h2 className="text-3xl font-bold">Series Information</h2>
        </div>
        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Creators</p>
              <p className="text-white font-semibold text-lg">{mockProductionInfo.creators.join(", ")}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Studio</p>
              <p className="text-white font-semibold text-lg">{mockProductionInfo.studio}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Seasons</p>
              <p className="text-[#02E7F5] font-bold text-xl">{mockProductionInfo.seasons}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Episodes</p>
              <p className="text-[#02E7F5] font-bold text-xl">{mockProductionInfo.episodes}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Runtime</p>
              <p className="text-white font-semibold text-lg">{mockProductionInfo.runtime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEASONS ── */}
      <div className="px-[5%] md:px-[10%] py-16 bg-gradient-to-b from-transparent via-[#1a1d29]/30 to-transparent">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
          <h2 className="text-3xl font-bold">Episodes</h2>
        </div>
        <Seasons />
      </div>

      {/* ── REVIEWS SECTION ── */}
      <div className="px-[5%] md:px-[10%] py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
            <h2 className="text-3xl font-bold">User Reviews</h2>
          </div>
          <button className="text-[#02E7F5] hover:text-white text-sm font-semibold transition-colors">Write a Review →</button>
        </div>
        <div className="space-y-6">
          {mockReviews.map((review, i) => (
            <div key={i} className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#02E7F5]/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#02E7F5] to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold text-lg">{review.author}</h3>
                      <p className="text-gray-400 text-sm">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1.5 rounded-full">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-yellow-400 font-bold text-sm">{review.rating}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SIMILAR ── */}
      <div className="flex flex-col gap-12 pb-16">
        <SimilarSection items={similarSingleSeries} label="Similar Series" />
        <SimilarSection items={similarSingleSeries2} label="More Like This" />
      </div>

      <Footer />
    </div>
  );
};
