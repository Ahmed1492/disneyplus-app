import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import DraggableSlider from "../components/DraggableSlider";
import Footer from "../components/Footer";
import {
  moviesOriginal,
  seriesOrignal,
  shortsOriginal,
  sliderOriginal,
} from "../data/originalData";

const Originals = () => {
  return (
    <>
      <div className=" flex flex-col bg-[#121214]">
        <Navbar />

        <main className="flex-grow flex flex-col gap-[2rem]">
          {/* Slider Original */}
          <Slider data={sliderOriginal} />
          {/* Series Orignal */}
          <DraggableSlider movies={seriesOrignal} />
          {/* Movies Orignal */}
          <DraggableSlider movies={moviesOriginal} />
          {/* Shorts Orignal */}
          <DraggableSlider movies={shortsOriginal} />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Originals;
