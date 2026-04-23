import React from "react";
import Navbar from "../components/Navbar";
import DraggableSlider from "../components/DraggableSlider";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import DisneyOriginals from "../components/DisneyOriginals";
import {
  actionSeries,
  animationSeries,
  childrenSeries,
  disnyOriginalsSeries,
  docuseriesSeries,
  inTendSeries,
  sliderSeries,
} from "../data/seriesData.js";

const Series = () => {
  return (
    <>
      <div className="min-h-screen bg-[#0f1014]">
        <Navbar />
        <Slider type="series" data={sliderSeries} />
        <main className="flex flex-col gap-14 py-12 stagger">
          <div className="animate-fade-in-up"><DraggableSlider movies={inTendSeries} /></div>
          <div className="animate-fade-in-up"><DisneyOriginals movies={disnyOriginalsSeries} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={actionSeries} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={animationSeries} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={docuseriesSeries} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={childrenSeries} /></div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Series;
