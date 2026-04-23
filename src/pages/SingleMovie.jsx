import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPlay, FaStar, FaHeart, FaArrowLeft, FaCheck, FaShareAlt, FaClock, FaCalendar, FaGlobe, FaAward, FaTimes } from "react-icons/fa";
import { MdOutlineHd } from "react-icons/md";
import SimilarSection from "../components/SimilarSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { similarSingleMovie, similarSingleMovie2 } from "../data/singleMovie";

import nowPlaying from "../mocks/MOVIE/Now Playing.json";
import popular from "../mocks/MOVIE/Popular.json";
import topRated from "../mocks/MOVIE/Top Rated.json";
import upcoming from "../mocks/MOVIE/Upcoming.json";

const TMDB = "https://image.tmdb.org/t/p/original";
const ALL_MOVIES = [...nowPlaying, ...popular, ...topRated, ...upcoming];
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

  // Sample trailer URL - replace with actual movie trailer
  const trailerUrl = "https://www.youtube.com/embed/EXeTwQWrcwY"; // The Dark Knight trailer

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
              title="Movie Player"
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

// Mock data for additional sections
const mockCast = [
  { name: "Christian Bale", role: "Bruce Wayne / Batman", image: "https://image.tmdb.org/t/p/w185/vecCvACI2QhSE5fOoLFLLEb1dWH.jpg" },
  { name: "Heath Ledger", role: "Joker", image: "https://image.tmdb.org/t/p/w185/5Y9HnYYa9jF4NunY9lSgJGjSe8E.jpg" },
  { name: "Aaron Eckhart", role: "Harvey Dent", image: "https://image.tmdb.org/t/p/w185/2BKHbGZCmLq2UN7Ey8SWfUxL1Aw.jpg" },
  { name: "Michael Caine", role: "Alfred", image: "https://image.tmdb.org/t/p/w185/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg" },
  { name: "Gary Oldman", role: "Gordon", image: "https://image.tmdb.org/t/p/w185/2v9FVVBUrrkW2m3QOcYkuhq9A6o.jpg" },
  { name: "Morgan Freeman", role: "Lucius Fox", image: "https://image.tmdb.org/t/p/w185/jPsLqiYGSofU4s6BjrxnefMfabb.jpg" },
];

const mockReviews = [
  { author: "John Smith", rating: 10, text: "An absolute masterpiece! The Dark Knight redefined superhero movies with its complex storytelling and phenomenal performances.", date: "2024-01-15", avatar: "JS" },
  { author: "Sarah Johnson", rating: 9, text: "Heath Ledger's Joker is unforgettable. This film transcends the genre and stands as one of the greatest films ever made.", date: "2024-01-10", avatar: "SJ" },
  { author: "Mike Davis", rating: 10, text: "Christopher Nolan's direction is flawless. Every scene is crafted with precision and purpose. A true cinematic achievement.", date: "2024-01-05", avatar: "MD" },
  { author: "Emma Wilson", rating: 9, text: "The action sequences are breathtaking, and the story keeps you on the edge of your seat from start to finish.", date: "2024-01-02", avatar: "EW" },
];

const mockTrivia = [
  "Heath Ledger kept a diary as the Joker to help him get into character.",
  "The film was shot in Chicago, Hong Kong, and London.",
  "It was the first superhero film to earn more than $1 billion worldwide.",
  "Heath Ledger posthumously won the Academy Award for Best Supporting Actor.",
  "The IMAX sequences were shot with the highest resolution cameras available at the time.",
  "Christopher Nolan used minimal CGI, preferring practical effects whenever possible.",
];

const mockAwards = [
  { name: "Academy Awards", award: "Best Supporting Actor", winner: "Heath Ledger" },
  { name: "Academy Awards", award: "Best Sound Editing", winner: "Richard King" },
  { name: "Golden Globe", award: "Best Supporting Actor", winner: "Heath Ledger" },
  { name: "BAFTA", award: "Best Supporting Actor", winner: "Heath Ledger" },
];

const mockGenres = ["Action", "Crime", "Drama", "Thriller"];

const mockProductionInfo = {
  director: "Christopher Nolan",
  writers: ["Jonathan Nolan", "Christopher Nolan", "David S. Goyer"],
  producers: ["Emma Thomas", "Charles Roven", "Christopher Nolan"],
  studio: "Warner Bros. Pictures",
  budget: "$185 million",
  boxOffice: "$1.005 billion",
};

export const SingleMovie = () => {
  const { title } = useParams();
  const [added, setAdded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title]);

  const movie = ALL_MOVIES.find(
    (m) => slugify(m.title) === title?.toLowerCase()
  ) || ALL_MOVIES[0];

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setAdded(!!favs.find((f) => f.title === movie.title));
  }, [movie.title]);

  // Close player on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setShowPlayer(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const already = favs.find((f) => f.title === movie.title);
    if (already) {
      const updated = favs.filter((f) => f.title !== movie.title);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setAdded(false);
    } else {
      favs.push({ path: `${TMDB}${movie.poster_path}`, title: movie.title, cat: "movies" });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setAdded(true);
    }
  };

  const ratingColor = movie.vote_average >= 7 ? "text-green-400" : movie.vote_average >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <div className="bg-[#0f1014] min-h-screen text-white">
      <Navbar />

      {/* Video Player Modal */}
      {showPlayer && <VideoPlayerModal onClose={() => setShowPlayer(false)} />}

      {/* ── HERO ── */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* backdrop */}
        <img
          src={`${TMDB}${movie.backdrop_path}`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014]/80 via-transparent to-transparent" />

        {/* content */}
        <div className="absolute bottom-0 left-0 w-full px-[5%] md:px-[10%] pb-16">
          <Link
            to="/movie"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm"
          >
            <FaArrowLeft /> Back to Movies
          </Link>

          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight drop-shadow-2xl">
            {movie.title}
          </h1>

          {/* meta row */}
          <div className="flex items-center gap-3 mb-5 flex-wrap text-sm">
            <span className={`flex items-center gap-1 font-bold text-base ${ratingColor}`}>
              <FaStar /> {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-300">{movie.release_date?.split("-")[0]}</span>
            <span className="text-gray-400">·</span>
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur px-2 py-0.5 rounded text-xs font-semibold">
              <MdOutlineHd className="text-base" /> HD
            </span>
            <span className="bg-white/10 backdrop-blur px-2 py-0.5 rounded text-xs font-semibold">
              {movie.vote_count?.toLocaleString()} votes
            </span>
          </div>

          <p className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
            {movie.overview}
          </p>

          {/* action buttons */}
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
        {/* poster */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#02E7F5]/20 via-purple-500/10 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={`${TMDB}${movie.poster_path}`}
              alt={movie.title}
              className="relative w-48 md:w-64 rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 group-hover:ring-[#02E7F5]/50 transition-all duration-500"
            />
          </div>
        </div>

        {/* info */}
        <div className="flex flex-col gap-8 flex-1">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{movie.title}</h2>
            <p className="text-[#02E7F5] text-base font-semibold flex items-center gap-2">
              <FaCalendar className="text-sm" />
              {movie.release_date?.split("-")[0]} · Movie
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed text-base max-w-3xl">
            {movie.overview}
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
              { label: "Rating", value: `${movie.vote_average?.toFixed(1)} / 10`, icon: FaStar, color: "text-yellow-400" },
              { label: "Release", value: movie.release_date, icon: FaCalendar, color: "text-[#02E7F5]" },
              { label: "Votes", value: movie.vote_count?.toLocaleString(), icon: FaAward, color: "text-purple-400" },
              { label: "Language", value: movie.original_language?.toUpperCase(), icon: FaGlobe, color: "text-green-400" },
              { label: "Popularity", value: movie.popularity?.toFixed(0), icon: FaStar, color: "text-pink-400" },
              { label: "Runtime", value: "152 min", icon: FaClock, color: "text-orange-400" },
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
            <h2 className="text-3xl font-bold">Cast & Crew</h2>
          </div>
          <button className="text-[#02E7F5] hover:text-white text-sm font-semibold transition-colors">View All →</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {mockCast.map((person, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-3 aspect-[2/3] bg-gradient-to-br from-[#02E7F5]/10 to-purple-500/10 border border-white/10 group-hover:border-[#02E7F5]/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#02E7F5]/20">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { 
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#02E7F5]/20 to-purple-500/20"><div class="text-center"><div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-2 text-2xl font-bold text-white">${person.name.charAt(0)}</div></div></div>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
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
          <h2 className="text-3xl font-bold">Production Details</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-[#02E7F5] font-bold text-lg mb-4">Key Personnel</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-1">Director</p>
                <p className="text-white font-semibold">{mockProductionInfo.director}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Writers</p>
                <p className="text-white font-semibold">{mockProductionInfo.writers.join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Producers</p>
                <p className="text-white font-semibold">{mockProductionInfo.producers.join(", ")}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-[#02E7F5] font-bold text-lg mb-4">Financial Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-1">Studio</p>
                <p className="text-white font-semibold">{mockProductionInfo.studio}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Budget</p>
                <p className="text-white font-semibold">{mockProductionInfo.budget}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Box Office</p>
                <p className="text-green-400 font-bold text-xl">{mockProductionInfo.boxOffice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── AWARDS SECTION ── */}
      <div className="px-[5%] md:px-[10%] py-16 bg-gradient-to-b from-transparent via-[#1a1d29]/30 to-transparent">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
          <h2 className="text-3xl font-bold">Awards & Recognition</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAwards.map((award, i) => (
            <div key={i} className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center group-hover:bg-yellow-500/30 transition-all">
                  <FaAward className="text-yellow-400 text-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-yellow-400 font-bold text-sm">{award.name}</p>
                </div>
              </div>
              <p className="text-white font-semibold text-sm mb-1">{award.award}</p>
              <p className="text-gray-400 text-xs">{award.winner}</p>
            </div>
          ))}
        </div>
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

      {/* ── TRIVIA SECTION ── */}
      <div className="px-[5%] md:px-[10%] py-16 bg-gradient-to-b from-transparent via-[#1a1d29]/30 to-transparent">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
          <h2 className="text-3xl font-bold">Did You Know?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {mockTrivia.map((fact, i) => (
            <div key={i} className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#02E7F5]/30 transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#02E7F5]/20 border border-[#02E7F5]/50 flex items-center justify-center text-[#02E7F5] font-bold text-sm group-hover:bg-[#02E7F5] group-hover:text-black transition-all duration-300">
                  {i + 1}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">{fact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SIMILAR ── */}
      <div className="flex flex-col gap-12 pb-16">
        <SimilarSection items={similarSingleMovie} label="Similar Movies" />
        <SimilarSection items={similarSingleMovie2} label="More Like This" />
      </div>

      <Footer />
    </div>
  );
};
