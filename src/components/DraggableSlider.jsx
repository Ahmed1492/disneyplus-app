import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DraggableSlider = ({ movies, type, time, path }) => {
  const [shuffledSliderData, setShuffledSliderData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  let hiddentMovie = 5 * currentIndex + 5 || undefined;
  const handleDrag = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  // useEffect(() => {
  //   setShuffledSliderData([...movies].sort(() => Math.random() - 0.5));
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev >= 3 ? 0 : prev + 1));
  //   }, movies[0]?.time || 1000);
  //   console.log("test");

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [currentIndex]);
  return (
    <div className={`px-[10%]  overflow-x-scroll lg:overflow-x-hidden  `}>
      <div className="flex items-center   justify-betweenx ">
        {/* Drag */}
        <div className="flex items-center  justify-end w-full  gap-3">
          <h1 className="text-white text-xl whitespace-nowrap font-bold mb-3">
            {movies[0]?.type}
          </h1>
          <div className="flex items-center justify-end w-full  gap-2">
            {type !== "Similares" &&
              movies?.length > 5 &&
              Array(Math.round(movies?.length / 5))
                .fill()
                .map((_, newIndex) => (
                  <span
                    onClick={() => handleDrag(newIndex)}
                    key={newIndex}
                    className={`w-[5px] h-[5px] md:w-[8px] md:h-[8px] rounded-full ${
                      currentIndex === newIndex ? "bg-[#02E7F5]" : "bg-gray-600"
                    } cursor-pointer relative`}
                  ></span>
                ))}
          </div>
        </div>
      </div>
      <div className=" overflow-x-autqo overflow-x-scroll  scrollbar-hide  w-[100vw] duration-75 transition-all  ">
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
                to={`/${movies[0]?.cat ||'test' }/${movie.title.replace(/\s+/g, "-")}`}
                key={index}
                className="w-[16%]   lg:flex-shrink-0"
              >
                <img
                  className={` md:w-full md:h-full  rounded-md object-cover ${
                    hiddentMovie === index ? "opacity-20" : ""
                  }`}
                  src={
                    movie?.path.startsWith("/")
                      ? movie.path
                      : `/${movie.path}` || "/movie1.png"
                  }
                  alt=""
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DraggableSlider;
