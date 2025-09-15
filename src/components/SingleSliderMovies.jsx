import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

export const SingleSliderMovies = ({ data, type }) => {
  let [index, setIndex] = useState(0);

  return (
    <div className="h-[100vh] ">
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
        className=" backgroundHero sm:bg-cover flex h-full  "
      >
        <div className="text-white z-10 px-[10%] flex flex-col  items-start  h-full">
          <div className="flex flex-col gap-3 self-end h-full  justify-center">
            {/* SERIES OPTION */}

            <img className="w-[19rem]" src={data[index]?.logo} alt="" />
            {/* DESCRUPTION MOVIE */}
            <div className="flex items-center gap-4">
              <span className="bg-[#31343E] px-2 py-1 font-bold rounded-md">
                14+
              </span>
              <span className="bg-[#31343E] flex items-center w-max px-2 py-1 font-bold rounded-md">
                <span>AD</span> <span className="font-thin text-sm">)))</span>
              </span>

              <span className="bg-[#31343E] px-2 py-1 font-semibold text-lg rounded-md">
                CC
              </span>
              <span className=" font-medium text-lg rounded-md ">2021</span>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className=" font-medium text-lg rounded-md ">
                  1 Season
                </span>
              </div>
            </div>

            <p className="font-light">
              Science fiction, Fantasy, Action and adventure
            </p>

            <div className="flex items-center mb-[1rem] mt-[1rem] gap-5">
              <button className="bg-white px-3 py-3 md:px-6 md:py-3 flex items-center gap-4  text-sm rounded-md text-black font-bold">
                <span>
                  <FaPlay />
                </span>
                WATCH NOW
              </button>
              <button className="bg-transparent text-sm px-3 py-3 md:px-6 md:py-3 flex items-center gap-4  border rounded-md  font-semibold">
                TRAILER
              </button>
              <button className="bg-transparent flex items-center justify-center w-9 h-9  md:w-12 md:h-12 border rounded-full text-xl  font-medium">
                <img src="/singlePage/plusIcone.svg" alt="" />
              </button>
              <button className="bg-transparent flex items-center justify-center  w-9 h-9  md:w-12 md:h-12 border rounded-full text-xl  font-medium">
                <img src="/singlePage/friendsIcone.svg" alt="" />
              </button>
            </div>
            <p className=" text-lg font-bold">S1:E1 A Glorious Purpose</p>
            <p className="max-w-[96%] md:max-w-[70%] lg:max-w-[44%]  md:text-lg font-extralight">
              {data[index]?.desc || " "}
            </p>
          </div>
          {/* SERIES OPTION */}

          {/* Drag */}

          <div className="flex items-center justify-end w-full mb-4 gap-3"></div>
        </div>
      </div>
    </div>
  );
};
