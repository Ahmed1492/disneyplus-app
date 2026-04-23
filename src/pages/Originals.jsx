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
  topRatedMoviesOriginal,
} from "../data/originalData";

const Originals = () => {
  return (
    <>
      <div className="min-h-screen bg-[#0f1014]">
        <Navbar />
        <Slider type="originals" data={sliderOriginal} />
        <main className="flex flex-col gap-14 py-12 stagger">
          <div className="animate-fade-in-up"><DraggableSlider movies={seriesOrignal} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={moviesOriginal} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={shortsOriginal} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={topRatedMoviesOriginal} /></div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Originals;
