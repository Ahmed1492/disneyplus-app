import React from "react";
import Slider from "../components/Slider";
import { SingleSliderMovies } from "../components/SingleSliderMovies";
import DraggableSlider from "../components/DraggableSlider";
import { Seasons } from "../components/Seasons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  similarSingleSeries,
  similarSingleSeries2,
  sliderSingleSeries,
} from "../data/singleTvShow";

export const SingleTvShow = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex flex-col bg-[#121214]">
        {/* Slider Single Series */}
        <SingleSliderMovies type="hero" data={sliderSingleSeries} />
        <Seasons />
        <div className="flex flex-col gap-6 my-[10rem]">
          {/* similar Single Series */}
          <DraggableSlider movies={similarSingleSeries} type="Similares" />
          {/* similar Single Series2 */}
          <DraggableSlider movies={similarSingleSeries2} />
        </div>

        <Footer />
      </div>
    </div>
  );
};
