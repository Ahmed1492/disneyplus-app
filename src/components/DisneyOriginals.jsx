import React, { useState } from "react";
import { Link } from "react-router-dom";

function DisneyOriginals({ movies, type, path }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  let hiddentMovie = 5 * currentIndex + 5 || undefined;
  const handleDrag = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  // useEffect(() => {
  //   setShuffledSliderData([...movies].sort(() => Math.random() - 0.5));
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev >= 3 ? 0 : prev + 1));
  //   }, time);
  //   console.log("test");

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [currentIndex]);
  return (
    <div className={`px-[10%]   overflow-x-hidden lg:overflow-x-hidden  `}>
      <div className="flex items-center justify-betweenx ">
        {/* Drag */}
        <div className="flex items-center justify-end w-full  gap-3">
          <h1 className="text-white text-xl whitespace-nowrap font-bold mb-3">
            {movies[0]?.type}
          </h1>
          <div className="flex items-center justify-end w-full  gap-2">
            {Array(4)
              .fill()
              .map((_, newIndex) => (
                <span
                  onClick={() => handleDrag(newIndex)}
                  key={newIndex}
                  className={`w-[5px] h-[5px] md:w-[10px] md:h-[10px] rounded-full ${
                    currentIndex === newIndex ? "bg-[#02E7F5]" : "bg-gray-600"
                  } cursor-pointer relative`}
                ></span>
              ))}
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto lg:overflow-x-hidden scrollbar-hide  w-[100vw] duration-75 transition-all  ">
        {/* MOVIES */}

        <div
          className={`flex w-full gap-3  relative duration-700 transition-all`}
          style={{ right: `${currentIndex * 82}%` }}
          // style={{ right: `${currentIndex * 100}%` }}
        >
          {movies?.map((movie, index) => {
            const isLastInGroup = (index + 1) % 5 === 0;

            return (
              <Link
                to={`/${movies[0]?.cat || "test"}/${movie.title.replace(
                  /\s+/g,
                  "-"
                )}`}
                key={index}
                className="w-[16%]    lg:flex-shrink-0"
              >
                <img
                  key={index}
                  className={` w-full  lg:flex-shrink-0 rounded-md object-cover ${
                    hiddentMovie === index ? "opacity-20" : ""
                  }`}
                  src={movie?.path || "/movie1.png"}
                  alt=""
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DisneyOriginals;
