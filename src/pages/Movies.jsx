import React from "react";
import Navbar from "../components/Navbar";
import DraggableSlider from "../components/DraggableSlider";
import DisneyOriginals from "../components/DisneyOriginals";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import {
  sliderMovies,
  childrenMovies,
  inTendMovies,
  docuseriesMovies,
  animationMovies,
  actionMovies,
  disnyOriginalsMovies,
} from "../data/moviesData";
const Movies = () => {
  return (
    <>
      <div className="min-h-[185rem]  flex flex-col bg-[#121214]">
        <Navbar />
        <main className="flex-grow flex flex-col gap-[4rem]">
          {/* Slider Movies */}
          <Slider data={sliderMovies} />
          {/* In trend */}
          <DraggableSlider movies={inTendMovies} />
          {/* ORIGNIAL DISNY */}
          <DisneyOriginals movies={disnyOriginalsMovies} />
          {/* Action/Adventure */}
          <DraggableSlider movies={actionMovies} />
          {/* Animation */}
          <DraggableSlider movies={animationMovies} />
          {/* Docuseries */}
          <DraggableSlider movies={docuseriesMovies} />
          {/* Children */}
          <DraggableSlider movies={childrenMovies} />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
