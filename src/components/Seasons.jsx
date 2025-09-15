import React from "react";

export const Seasons = () => {
  return (
    <div className="px-[10%]  overflow-x-hidden lg:overflow-x-hidden">
      <div className="flex items-center gap-7">
        <h1 className="text-white text-3xl">Seasons </h1>
        <span className="px-6 py-2 font-medium bg-blue-600 text-white rounded-md text-lg">
          1
        </span>
      </div>
      <div className="flex justify-center lg:justify-between flex-wrap gap-y-3">
        {Array(6)
          .fill()
          .map((_, newIndex) => (
            <div key={newIndex} className="mt-[2rem] w-[98%] md:w-[70%] lg:w-[49%] flex h-[9rem] items-center">
              <img
                className="object-cover w-[10rem] md:w-[11rem] xl:w-[15rem] rounded-s-xl h-full"
                src="/singlePage/sessons/s1.png"
                alt=""
              />
              <div className="bg-[#30333E] py-4 px-3 rounded-e-xl text-white flex flex-col justify-center gap-4 w-full h-full">
                <div className="flex text-sm md:text-base items-center justify-between">
                  <h2 className="font-medium">1.Un glorioso propósito</h2>
                  <p className=" text-gray-400">50 min</p>
                </div>

                <p className="text-sm md:max-w-[80%] text-gray-400">
                  Tras robar el Teseracto en “Avengers: Endgame”, Loki cae ante
                  la Autoridad de Variación Temporal.
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
