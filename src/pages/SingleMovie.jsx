import React from "react";
import { SingleSliderMovies } from "../components/SingleSliderMovies";
import DraggableSlider from "../components/DraggableSlider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  similarSingleMovie,
  similarSingleMovie2,
  sliderSingleMovie,
} from "../data/singleMovie";
export const SingleMovie = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-[#121214]">
        {/* Slider Single Movie */}
        <SingleSliderMovies data={sliderSingleMovie} />
        <div className="flex flex-col gap-6 my-[10rem]">
          {/* Similar Single Movie */}
          <DraggableSlider movies={similarSingleMovie} />
          {/* Similar Single Movie2*/}
          <DraggableSlider movies={similarSingleMovie2} />
        </div>
        <Footer />
      </div>
    </div>
  );
};
