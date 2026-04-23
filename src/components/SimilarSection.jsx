import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaPlay, FaHeart, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SimilarCard = ({ item }) => {
  const [added, setAdded] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return !!favs.find((f) => f.title === item.title);
  });

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const already = favs.find((f) => f.title === item.title);
    if (already) {
      localStorage.setItem("favorites", JSON.stringify(favs.filter((f) => f.title !== item.title)));
      setAdded(false);
    } else {
      favs.push({ path: item.path, title: item.title, cat: item.cat });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setAdded(true);
    }
  };

  const ratingColor =
    item.vote >= 7 ? "text-green-400" : item.vote >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <Link
      to={`/${item.cat}/${item.title?.replace(/\s+/g, "-")}`}
      className="group relative flex-shrink-0 w-[150px] sm:w-[170px] md:w-[190px]"
    >
      {/* poster */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden ring-1 ring-white/5 group-hover:ring-[#02E7F5]/50 transition-all duration-300">
        <img
          src={item.path}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* gradient overlay always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* hover full overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* rating top-left */}
        <div className={`absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold ${ratingColor}`}>
          <FaStar className="text-[9px]" />
          {item.vote?.toFixed(1)}
        </div>

        {/* year top-right */}
        {item.year && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-gray-300">
            {item.year}
          </div>
        )}

        {/* hover action buttons */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full bg-white text-black py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#02E7F5] transition-colors">
            <FaPlay className="text-[9px]" /> Watch Now
          </button>
          <button
            onClick={toggleFav}
            className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
              added
                ? "bg-[#02E7F5] border-[#02E7F5] text-black"
                : "border-white/40 text-white bg-white/10 backdrop-blur-sm hover:border-white"
            }`}
          >
            {added ? <FaCheck className="text-[9px]" /> : <FaHeart className="text-[9px]" />}
            {added ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* title + desc below */}
      <div className="mt-2.5 px-0.5">
        <p className="text-white text-sm font-semibold truncate group-hover:text-[#02E7F5] transition-colors">
          {item.title}
        </p>
        {item.overview && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {item.overview}
          </p>
        )}
      </div>
    </Link>
  );
};

const SimilarSection = ({ items, label }) => {
  const scrollRef = useRef(null);
  const SCROLL_AMOUNT = 600;

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  return (
    <div className="px-[5%] md:px-[10%]">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-[#02E7F5] rounded-full" />
          <h2 className="text-white text-xl font-bold">{label}</h2>
          <span className="text-gray-600 text-sm">{items.length} titles</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#02E7F5] hover:bg-[#02E7F5]/10 transition-all"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#02E7F5] hover:bg-[#02E7F5]/10 transition-all"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, i) => (
          <SimilarCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarSection;
