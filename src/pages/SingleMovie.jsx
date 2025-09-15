import React from "react";
import Slider from "../components/Slider";
import { SingleSliderMovies } from "../components/SingleSliderMovies";
import DraggableSlider from "../components/DraggableSlider";
import { Seasons } from "../components/Seasons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export const SingleMovie = () => {
  const data = [
    {
      logo: "/heroLogo.svg",
      background: "/bg-homePage.png",
      desc: `The Disney and Pixar film "Luca" is set in a town on the Italian
              coast and tells the story of a teenager who spends an
              unforgettable summer full of adventures with his new friend
              Alberto. summer full of adventures with his new friend Alberto.`,
      select: "",
    },
    {
      logo: "/originalLogo.svg",
      background: "/d1.jpg",
      desc: `Following the fall of the Galactic Empire, anarchy has spread across the galaxy. A lone gunfighter makes his way through the Outer Rims, earning his place as a bounty hunter earning his place as a bounty hunter earning his place as a bounty hunter.`,
      select: "",
    },
    {
      logo: "/heroLogo.svg",
      background: "/d3.jpg",
      desc: `The Disney and Pixar film "Luca" is set in a town on the Italian
              coast and tells the story of a teenager who spends an
              unforgettable summer full of adventures with his new friend
              Alberto. summer full of adventures with his new friend Alberto.`,
      select: "",
    },
    {
      logo: "/heroLogo.svg",
      background: "/d3.jpg",
      desc: `The Disney and Pixar film "Luca" is set in a town on the Italian
              coast and tells the story of a teenager who spends an
              unforgettable summer full of adventures with his new friend
              Alberto. summer full of adventures with his new friend Alberto.`,
      select: "",
    },
  ];

  const movies = [
    { path: "orginalMovies1.png", title: "Original Movie 1" },
    { path: "orginalMovies2.png", title: "Original Movie 2" },
    { path: "orginalMovies3.png", title: "Original Movie 3" },
    { path: "orginalMovies4.png", title: "Original Movie 4" },
    { path: "orginalMovies5.png", title: "Original Movie 5" },
  ];
  return (
    <div>
      <Navbar />
      <div className="  flex flex-col bg-[#121214]">
        <SingleSliderMovies type="hero" data={data} />

        <div className="flex flex-col gap-6">
          <DraggableSlider movies={movies} type="Similares" />
          <DraggableSlider movies={movies} />
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
};
