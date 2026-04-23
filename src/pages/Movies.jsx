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
      <div className="min-h-screen bg-[#0f1014]">
        <Navbar />
        <Slider type="movies" data={sliderMovies} />
        <main className="flex flex-col gap-14 py-12 stagger">
          <div className="animate-fade-in-up"><DraggableSlider movies={inTendMovies} /></div>
          <div className="animate-fade-in-up"><DisneyOriginals movies={disnyOriginalsMovies} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={actionMovies} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={animationMovies} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={docuseriesMovies} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={childrenMovies} /></div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
