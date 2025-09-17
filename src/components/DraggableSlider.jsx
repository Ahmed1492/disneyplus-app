import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const DraggableSlider = ({ movies, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const totalPages = Math.ceil(movies.length / 5);

  const handleDrag = (newIndex) => {
    if (newIndex >= 0 && newIndex < totalPages) {
      setCurrentIndex(newIndex);
    }
  };

  // 🎯 Handle keyboard only when slider is focused
  const handleKey = (e) => {
    if (e.key === "ArrowRight") {
      handleDrag(currentIndex + 1);
    }
    if (e.key === "ArrowLeft") {
      handleDrag(currentIndex - 1);
    }
  };

  // 6th visible element index
  const fadedIndex = currentIndex * 5 + 5;

  return (
    <div
      ref={sliderRef}
      tabIndex={0}
      onKeyDown={handleKey}
      className="px-4 overflow-x-auto lg:px-[10%] outline-none"
    >
      {/* Header and Dots */}
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center justify-end w-full gap-3">
          <h1 className="text-white text-xl whitespace-nowrap font-bold mb-3">
            {movies[0]?.type}
          </h1>
          <div className="flex items-center justify-end w-full gap-2">
            {type !== "Similares" &&
              movies?.length > 5 &&
              Array(totalPages)
                .fill()
                .map((_, newIndex) => (
                  <span
                    onClick={() => handleDrag(newIndex)}
                    key={newIndex}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                      currentIndex === newIndex ? "bg-[#02E7F5]" : "bg-gray-600"
                    } cursor-pointer`}
                  ></span>
                ))}
          </div>
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="overflow-x-auto scrollbar-hide w-full transition-all duration-75">
        <div
          className="flex gap-3 transition-transform duration-700"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {movies?.map((movie, index) => (
            <Link
              key={index}
              to={`/${movies[0]?.cat || "test"}/${movie.title.replace(
                /\s+/g,
                "-"
              )}`}
              className="min-w-[45%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[22%] xl:min-w-[18%] flex-shrink-0"
            >
              <img
                className={`w-full h-full rounded-md object-cover transition-opacity duration-300 ${
                  fadedIndex === index ? "opacity-40" : "opacity-100"
                }`}
                src={
                  movie?.path?.startsWith("/")
                    ? movie.path
                    : `/${movie.path}` || "/movie1.png"
                }
                alt={movie.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraggableSlider;
