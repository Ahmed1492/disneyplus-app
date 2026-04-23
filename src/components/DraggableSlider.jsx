import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaHeart, FaCheck, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { getImageUrl } from "../utils/image";

const MovieCard = ({ movie, cat }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return !!favs.find((f) => f.title === movie.title);
  });

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const already = favs.find((f) => f.title === movie.title);
    if (already) {
      localStorage.setItem("favorites", JSON.stringify(favs.filter((f) => f.title !== movie.title)));
      setAdded(false);
    } else {
      favs.push({ path: movie.path, title: movie.title, cat });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setAdded(true);
    }
  };

  return (
    <Link
      to={`/${cat}/${movie.title?.replace(/\s+/g, "-")}`}
      className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-[#02E7F5]/60 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#02E7F5]/20 group-hover:scale-105 group-hover:-translate-y-2">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#02E7F5]/0 via-purple-500/0 to-pink-500/0 group-hover:from-[#02E7F5]/20 group-hover:via-purple-500/10 group-hover:to-pink-500/20 transition-all duration-700 pointer-events-none" />
        
        {/* poster */}
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={getImageUrl(movie?.path)}
          alt={movie.title}
        />

        {/* always-on bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* rating badge */}
        {movie.vote && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-yellow-400 border border-yellow-400/20 shadow-lg">
            <FaStar className="text-[10px]" />
            {Number(movie.vote).toFixed(1)}
          </div>
        )}

        {/* fav button */}
        <button
          onClick={toggleFav}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg ${
            added ? "bg-[#02E7F5] text-black scale-100" : "bg-black/70 backdrop-blur-md text-white hover:bg-[#02E7F5] hover:text-black hover:scale-110"
          }`}
        >
          {added ? <FaCheck className="text-xs" /> : <FaHeart className="text-xs" />}
        </button>

        {/* hover actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="space-y-2">
            <button className="w-full bg-white text-black py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#02E7F5] transition-all duration-300 shadow-lg hover:scale-105">
              <FaPlay className="text-xs" /> Watch Now
            </button>
          </div>
        </div>
      </div>

      {/* title below */}
      <p className="text-gray-400 text-sm mt-3 truncate px-1 group-hover:text-white transition-colors duration-300 font-medium">
        {movie.title}
      </p>
    </Link>
  );
};

const DraggableSlider = ({ movies, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const cat = movies[0]?.cat || "movies";

  const go = (dir) => {
    const next = currentIndex + dir;
    if (next >= 0 && next < totalPages) setCurrentIndex(next);
  };

  return (
    <div ref={sliderRef} tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }} className="px-4 lg:px-[10%] outline-none">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-7 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
          <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">{movies[0]?.type}</h2>
        </div>
        {movies.length > itemsPerPage && (
          <div className="flex items-center gap-3">
            <button onClick={() => go(-1)} disabled={currentIndex === 0} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-[#02E7F5] hover:bg-[#02E7F5]/20 disabled:opacity-30 transition-all duration-300 hover:scale-110">
              <FaChevronLeft className="text-sm" />
            </button>
            <div className="flex gap-2">
              {Array(totalPages).fill().map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)} className={`rounded-full transition-all duration-300 ${currentIndex === i ? "w-6 h-2 bg-[#02E7F5] shadow-lg shadow-[#02E7F5]/50" : "w-2 h-2 bg-gray-600 hover:bg-gray-400"}`} />
              ))}
            </div>
            <button onClick={() => go(1)} disabled={currentIndex === totalPages - 1} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-[#02E7F5] hover:bg-[#02E7F5]/20 disabled:opacity-30 transition-all duration-300 hover:scale-110">
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        )}
      </div>

      {/* carousel */}
      <div className="overflow-hidden w-full">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} cat={cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraggableSlider;
