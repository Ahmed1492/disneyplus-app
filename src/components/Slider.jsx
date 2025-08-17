import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

const HomeSlider = ({ data, type }) => {
  let [index, setIndex] = useState(0);
  console.log("data ", data);
  console.log("index ", index);
  console.log(`data [${index}]`, data[index]);

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
    <div className="">
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
        }}
        className=" backgroundHero flex  w-[100vw] h-[100vh]  "
      >
        <div className="text-white z-10 px-[10%] flex flex-col  items-start  h-full">
          <div className="flex flex-col gap-3 self-end h-full  justify-center">
            {type === "series" && (
              <div className="flex items-center gap-4 mb-[11rem] self-start">
                <h1 className="text-3xl font-bold">Series</h1>
                <select
                  className="bg-gray-700 py-2 px-6 rounded-md outline-none cursor-pointer"
                  name=""
                  id=""
                >
                  <option value="">test 1</option>
                  <option value="">test 1</option>
                  <option value="">test 1</option>
                  <option value="">test 1</option>
                </select>
              </div>
            )}

            {/* SERIES OPTION */}

            <img className="w-[19rem]" src={data[index]?.logo} alt="" />
            <p className="max-w-[44%] text-lg font-extralight">
              {data[index]?.desc || " "}
            </p>
            <div className="flex items-center mt-[2rem] gap-5">
              <button className="bg-white px-6 flex items-center gap-4 py-3 text-sm rounded-md text-black font-bold">
                <span>
                  <FaPlay />
                </span>
                WATCH NOW
              </button>
              <button className="bg-transparent text-sm px-6 flex items-center gap-4 py-3 border rounded-md  font-semibold">
                <FaClock />
                MORE INFORMATION
              </button>
            </div>
          </div>
          {/* SERIES OPTION */}

          {/* Drag */}

          <div className="flex items-center justify-end w-full mb-4 gap-3">
            <div className="flex items-center justify-end w-full mb-4 gap-2">
              {Array(4)
                .fill()
                .map((_, newIndex) => (
                  <span
                    key={newIndex}
                    onClick={() => handleSlider(newIndex)}
                    className={`w-[10px] h-[10px] rounded-full ${
                      index === newIndex ? "bg-[#02E7F5]" : "bg-gray-600"
                    } cursor-pointer relative`}
                  ></span>
                ))}
            </div>

            {/* 
            <span
              onClick={() => setIndex(1)}
              className="w-[10px] cursor-pointer h-[10px] rounded-full bg-gray-600 relative"
            ></span>
            <span
              onClick={() => setIndex(2)}
              className="w-[10px] cursor-pointer h-[10px] rounded-full bg-gray-600 relative"
            ></span>
            <span
              onClick={() => setIndex(3)}
              className="w-[10px] cursor-pointer h-[10px] rounded-full bg-gray-600 relative"
            ></span> */}
          </div>

          {/* PRANSD */}
          {type === "hero" && (
            <div className=" flex items-center mt-[3rem] pb-5 w-full justify-between gap-2">
              <img
                className="w-[13rem] object-cover h-[7rem] border rounded-md border-gray-800 bg-z"
                src="/disneyLogo.svg"
                alt=""
              />
              <img
                className="w-[13rem] object-cover h-[7rem] border rounded-md border-gray-800 bg-z"
                src="/pixarLogo.svg"
                alt=""
              />
              <img
                className="w-[13rem] object-cover h-[7rem] border rounded-md border-gray-800 bg-z"
                src="/marvelLogo.svg"
                alt=""
              />
              <img
                className="w-[13rem] object-cover h-[7rem] border rounded-md border-gray-800 bg-z"
                src="/starwarsLogo.svg"
                alt=""
              />
              <img
                className="w-[13rem] object-cover h-[7rem] border rounded-md border-gray-800 bg-z"
                src="/nationalLogo.svg"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
