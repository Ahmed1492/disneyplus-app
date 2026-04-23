import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { FaPlay, FaHeart, FaCheck, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { getImageUrl } from "../utils/image";

const OriginalCard = ({ movie, cat }) => {
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
      className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-1.5 group"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl ring-1 ring-white/5 group-hover:ring-[#02E7F5]/40 transition-all duration-300 shadow-lg group-hover:shadow-[#02E7F5]/10 group-hover:shadow-xl">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={getImageUrl(movie?.path)}
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {movie.vote && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-yellow-400">
            <FaStar className="text-[9px]" />
            {Number(movie.vote).toFixed(1)}
          </div>
        )}

        <button
          onClick={toggleFav}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            added ? "bg-[#02E7F5] text-black" : "bg-black/60 backdrop-blur-sm text-white hover:bg-[#02E7F5] hover:text-black"
          }`}
        >
          {added ? <FaCheck className="text-[9px]" /> : <FaHeart className="text-[9px]" />}
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full bg-white text-black py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#02E7F5] transition-colors">
            <FaPlay className="text-[9px]" /> Watch Now
          </button>
        </div>
      </div>
      <p className="text-gray-400 text-xs mt-2 truncate px-0.5 group-hover:text-white transition-colors duration-200">
        {movie.title}
      </p>
    </Link>
  );
};

export default function DisneyOriginals({ movies }) {
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#02E7F5] rounded-full" />
          <h2 className="text-white text-lg font-bold">{movies[0]?.type}</h2>
        </div>
        {movies.length > itemsPerPage && (
          <div className="flex items-center gap-2">
            <button onClick={() => go(-1)} disabled={currentIndex === 0} className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#02E7F5] hover:bg-[#02E7F5]/10 disabled:opacity-30 transition-all">
              <FaChevronLeft className="text-xs" />
            </button>
            <div className="flex gap-1.5">
              {Array(totalPages).fill().map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)} className={`rounded-full transition-all duration-300 ${currentIndex === i ? "w-5 h-2 bg-[#02E7F5]" : "w-2 h-2 bg-gray-600 hover:bg-gray-400"}`} />
              ))}
            </div>
            <button onClick={() => go(1)} disabled={currentIndex === totalPages - 1} className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#02E7F5] hover:bg-[#02E7F5]/10 disabled:opacity-30 transition-all">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        )}
      </div>

      <div className="overflow-hidden w-full">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {movies.map((movie, i) => (
            <OriginalCard key={i} movie={movie} cat={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
