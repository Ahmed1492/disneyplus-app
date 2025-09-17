import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeSlider = ({ data, type }) => {
  let [index, setIndex] = useState(0);
  // console.log("data ", data);
  // console.log("index ", index);
  // console.log(`data [${index}]`, data[index]);

  const handleSlider = (newIndex) => {
    setIndex(newIndex);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev >= 3 ? 0 : prev + 1));
  //   }, 3000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div className="h-screen relative">
      <div
        style={{
          backgroundImage: `
        linear-gradient(
          to top,
          #141415,
          rgba(11, 10, 10, 0.95),
          rgba(11, 10, 10, 0.5),
          rgba(11, 10, 10, 0.2),
          rgba(22, 21, 21, 0.346)
        ),
        url('${data[index]?.background}')
      `,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
        className="w-full h-full flex"
      >
        <div className="text-white z-10 px-[10%] flex flex-col justify-center h-full">
          {/* SERIES HEADER */}
          {type === "series" && (
            <div className="flex items-center gap-4 mb-12">
              <h1 className="text-xl md:text-3xl font-bold">Series</h1>
              <select className="bg-gray-700 py-2 px-3 rounded-md outline-none cursor-pointer">
                <option>test 1</option>
                <option>test 2</option>
                <option>test 3</option>
              </select>
            </div>
          )}

          {/* CONTENT */}
          <div className="flex flex-col gap-4 items-start">
            <img
              className="w-[9rem] md:w-[12rem] xl:w-[19rem]"
              src={data[index]?.logo}
              alt=""
            />
            <p className="max-w-[95%] md:max-w-[70%] lg:max-w-[44%] md:text-lg font-extralight">
              {data[index]?.desc || ""}
            </p>
            <div className="flex items-center mt-8 gap-5">
              <Link
                to={data[index]?.link}
                className="bg-white px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 text-sm rounded-md text-black font-bold"
              >
                <FaPlay />
                WATCH NOW
              </Link>
              <Link
                to={data[index]?.info}
                className="border px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 rounded-md text-sm font-semibold"
              >
                <FaClock />
                MORE INFORMATION
              </Link>
            </div>
          </div>

          {/* DOTS */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {Array(data?.length)
              .fill()
              .map((_, newIndex) => (
                <span
                  key={newIndex}
                  onClick={() => handleSlider(newIndex)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer ${
                    index === newIndex ? "bg-[#02E7F5]" : "bg-gray-600"
                  }`}
                ></span>
              ))}
          </div>

          {/* BRANDS */}
          {type === "hero" && (
            <div className="flex flex-wrap justify-center md:justify-between gap-2 mt-12 pb-5 w-full">
              {[
                "/disneyLogo.svg",
                "/pixarLogo.svg",
                "/marvelLogo.svg",
                "/starwarsLogo.svg",
                "/nationalLogo.svg",
              ].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="brand"
                  className="w-[7rem] h-[4rem] lg:w-[13rem] lg:h-[7rem] object-cover border rounded-md border-gray-800"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
