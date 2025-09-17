import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export default function MoviesSlider({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.ceil(movies.length / 5);

  const sliderRef = useRef(null);

  const handleDrag = (newIndex) => {
    if (newIndex >= 0 && newIndex < totalPages) {
      setCurrentIndex(newIndex);
    }
  };

  // 🎯 Handle keys only when slider is focused
  const handleKey = (e) => {
    if (e.key === "ArrowRight") {
      handleDrag(currentIndex + 1);
    }
    if (e.key === "ArrowLeft") {
      handleDrag(currentIndex - 1);
    }
  };

  // 👉 Auto-fade the 6th visible element
  const fadedIndex = currentIndex * 5 + 5;

  return (
    <div
      ref={sliderRef}
      tabIndex={0} // make it focusable
      onKeyDown={handleKey} // only fires when this slider is focused
      className="px-[10%] overflow-x-hidden outline-none"
    >
      {/* Header + Dots */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-end w-full gap-3">
          <h1 className="text-white text-xl whitespace-nowrap font-bold mb-3">
            {movies[0]?.type}
          </h1>
          <div className="flex items-center justify-end w-full gap-2">
            {Array(totalPages)
              .fill()
              .map((_, newIndex) => (
                <span
                  onClick={() => handleDrag(newIndex)}
                  key={newIndex}
                  className={`w-[5px] h-[5px] md:w-[10px] md:h-[10px] rounded-full ${
                    currentIndex === newIndex ? "bg-[#02E7F5]" : "bg-gray-600"
                  } cursor-pointer`}
                ></span>
              ))}
          </div>
        </div>
      </div>

      {/* Movies */}
      <div className="overflow-x-auto lg:overflow-x-hidden scrollbar-hide w-full duration-75 transition-all">
        <div
          className="flex gap-3 transition-all duration-700"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {movies?.map((movie, index) => (
            <Link
              to={`/${movies[0]?.cat || "test"}/${movie.title.replace(
                /\s+/g,
                "-"
              )}`}
              key={index}
              className="w-[80%] sm:w-[45%] md:w-[30%] lg:w-[18%] flex-shrink-0"
            >
              <img
                className={`w-full rounded-md object-cover transition-opacity duration-300 ${
                  fadedIndex === index ? "opacity-20" : "opacity-100"
                }`}
                src={movie?.path || "/movie1.png"}
                alt={movie.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
