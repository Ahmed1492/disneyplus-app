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
      <div className="min-h-[185rem]  flex flex-col bg-[#121214]">
        <Navbar />
        <main className="flex-grow flex flex-col gap-[4rem]">
          {/* Slider Series */}
          <Slider type="series" data={sliderSeries} />
          {/* In trend */}
          <DraggableSlider movies={inTendSeries} />
          {/* ORIGNIAL DISNY */}
          <DisneyOriginals movies={disnyOriginalsSeries} />
          {/* Action/Adventure */}
          <DraggableSlider movies={actionSeries} />
          {/* Animation */}
          <DraggableSlider movies={animationSeries} />
          {/* Docuseries */}
          <DraggableSlider movies={docuseriesSeries} />
          {/* Children */}
          <DraggableSlider movies={childrenSeries} />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Series;
