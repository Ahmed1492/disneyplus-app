import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import DraggableSlider from "../components/DraggableSlider";
import Footer from "../components/Footer";

const Originals = () => {
  const sliderData = [
    {
      logo: "/originalLogo.svg",
      background: "/bg-originals.png",
      desc: `Following the fall of the Galactic Empire, anarchy has spread across the galaxy. A lone gunfighter makes his way through the Outer Rims, earning his place as a bounty hunter earning his place as a bounty hunter earning his place as a bounty hunter.`,
      select: "",
    },
    {
      logo: "/heroLogo.svg",
      background: "/d7.jpg",
      desc: `The Disney and Pixar film "Luca" is set in a town on the Italian
              coast and tells the story of a teenager who spends an
              unforgettable summer full of adventures with his new friend
              Alberto. summer full of adventures with his new friend Alberto.`,
      select: "",
    },
    {
      logo: "/originalLogo.svg",
      background: "/d3.jpg",
      desc: `Following the fall of the Galactic Empire, anarchy has spread across the galaxy. A lone gunfighter makes his way through the Outer Rims, earning his place as a bounty hunter earning his place as a bounty hunter earning his place as a bounty hunter.`,
      select: "",
    },
    {
      logo: "/originalLogo.svg",
      background: "/d9.jpg",
      desc: `Following the fall of the Galactic Empire, anarchy has spread across the galaxy. A lone gunfighter makes his way through the Outer Rims, earning his place as a bounty hunter earning his place as a bounty hunter earning his place as a bounty hunter.`,
      select: "",
    },
    {
      logo: "/originalLogo.svg",
      background: "/d6.jpg",
      desc: `Following the fall of the Galactic Empire, anarchy has spread across the galaxy. A lone gunfighter makes his way through the Outer Rims, earning his place as a bounty hunter earning his place as a bounty hunter earning his place as a bounty hunter.`,
      select: "",
    },
  ];

  const draggbleSlierData = [
    "/movie1.png",
    "/movie2.png",
    "/movie3.png",
    "/movie4.png",
    "/movie5.png",
    "/movie6.png",
    "/movie7.png",
    "/movie8.png",
    "/movie9.png",
    "/movie10.png",
    "/movie11.png",
    "/movie12.png",
    "/movie13.png",
    "/movie14.png",
    "/movie15.png",
    "/movie16.png",
    "/movie17.png",
    "/movie18.png",
    "/movie19.png",
    "/movie20.png",
    "/movie21.png",
    "/movie22.png",
    "/movie23.png",
    "/movie24.png",
    "/movie1.png",
    "/movie2.png",
    "/movie3.png",
    "/movie4.png",
    "/movie5.png",
    "/movie6.png",
    "/movie7.png",
    "/movie8.png",
    "/movie9.png",
    "/movie10.png",
    "/movie11.png",
    "/movie12.png",
  ];
  const series = [
    { path: "orginalSeries1.png", title: "Original Series 1" },
    { path: "/orginalSeries2.png", title: "Original Series 2" },
    { path: "/orginalSeries3.png", title: "Original Series 3" },
    { path: "/orginalSeries4.png", title: "Original Series 4" },
    { path: "/orginalSeries5.png", title: "Original Series 5" },
    { path: "/movie17.png", title: "Movie 17" },
    { path: "/movie7.png", title: "Movie 7" },
    { path: "/movie8.png", title: "Movie 8" },
    { path: "/movie9.png", title: "Movie 9" },
    { path: "/movie10.png", title: "Movie 10" },
    { path: "/movie11.png", title: "Movie 11" },
    { path: "/movie12.png", title: "Movie 12" },
    { path: "/movie13.png", title: "Movie 13" },
    { path: "/movie14.png", title: "Movie 14" },
    { path: "/movie15.png", title: "Movie 15" },
    { path: "movie16.png", title: "Movie 16" },
    { path: "movie18.png", title: "Movie 18" },
    { path: "movie19.png", title: "Movie 19" },
    { path: "movie20.png", title: "Movie 20" },
    { path: "movie21.png", title: "Movie 21" },
    { path: "movie22.png", title: "Movie 22" },
    { path: "movie23.png", title: "Movie 23" },
    { path: "movie24.png", title: "Movie 24" },
    { path: "movie1.png", title: "Movie 1" },
    { path: "movie2.png", title: "Movie 2" },
    { path: "movie3.png", title: "Movie 3" },
    { path: "movie4.png", title: "Movie 4" },
    { path: "movie5.png", title: "Movie 5" },
    { path: "movie6.png", title: "Movie 6" },
    { path: "movie7.png", title: "Movie 7" },
    { path: "movie8.png", title: "Movie 8" },
    { path: "movie9.png", title: "Movie 9" },
    { path: "movie10.png", title: "Movie 10" },
    { path: "movie11.png", title: "Movie 11" },
    { path: "movie12.png", title: "Movie 12" },
  ];

  const movies = [
    { path: "orginalMovies1.png", title: "Original Movie 1" },
    { path: "orginalMovies2.png", title: "Original Movie 2" },
    { path: "orginalMovies3.png", title: "Original Movie 3" },
    { path: "orginalMovies4.png", title: "Original Movie 4" },
    { path: "orginalMovies5.png", title: "Original Movie 5" },
    { path: "movie8.png", title: "Movie 8" },
    { path: "movie9.png", title: "Movie 9" },
    { path: "movie10.png", title: "Movie 10" },
    { path: "movie11.png", title: "Movie 11" },
    { path: "movie12.png", title: "Movie 12" },
    { path: "movie13.png", title: "Movie 13" },
    { path: "movie14.png", title: "Movie 14" },
    { path: "movie15.png", title: "Movie 15" },
    { path: "movie7.png", title: "Movie 7" },
    { path: "movie16.png", title: "Movie 16" },
    { path: "movie17.png", title: "Movie 17" },
    { path: "movie18.png", title: "Movie 18" },
    { path: "movie19.png", title: "Movie 19" },
    { path: "movie20.png", title: "Movie 20" },
    { path: "movie21.png", title: "Movie 21" },
    { path: "movie22.png", title: "Movie 22" },
    { path: "movie23.png", title: "Movie 23" },
    { path: "movie24.png", title: "Movie 24" },
    { path: "movie1.png", title: "Movie 1" },
    { path: "movie2.png", title: "Movie 2" },
    { path: "movie3.png", title: "Movie 3" },
    { path: "movie4.png", title: "Movie 4" },
    { path: "movie5.png", title: "Movie 5" },
    { path: "movie6.png", title: "Movie 6" },
    { path: "movie7.png", title: "Movie 7" },
    { path: "movie8.png", title: "Movie 8" },
    { path: "movie9.png", title: "Movie 9" },
    { path: "movie10.png", title: "Movie 10" },
    { path: "movie11.png", title: "Movie 11" },
    { path: "movie12.png", title: "Movie 12" },
  ];

  const shorts = [
    { path: "orginalShort1.png", title: "Original Short 1" },
    { path: "orginalShort2.png", title: "Original Short 2" },
    { path: "orginalShort3.png", title: "Original Short 3" },
    { path: "orginalShort4.png", title: "Original Short 4" },
    { path: "orginalShort5.png", title: "Original Short 5" },
    { path: "movie9.png", title: "Movie 9" },
    { path: "movie10.png", title: "Movie 10" },
    { path: "movie7.png", title: "Movie 7" },
    { path: "movie8.png", title: "Movie 8" },
    { path: "movie11.png", title: "Movie 11" },
    { path: "movie12.png", title: "Movie 12" },
    { path: "movie13.png", title: "Movie 13" },
    { path: "movie14.png", title: "Movie 14" },
    { path: "movie15.png", title: "Movie 15" },
    { path: "movie16.png", title: "Movie 16" },
    { path: "movie17.png", title: "Movie 17" },
    { path: "movie18.png", title: "Movie 18" },
    { path: "movie19.png", title: "Movie 19" },
    { path: "movie20.png", title: "Movie 20" },
    { path: "movie21.png", title: "Movie 21" },
    { path: "movie22.png", title: "Movie 22" },
    { path: "movie23.png", title: "Movie 23" },
    { path: "movie24.png", title: "Movie 24" },
    { path: "movie1.png", title: "Movie 1" },
    { path: "movie2.png", title: "Movie 2" },
    { path: "movie3.png", title: "Movie 3" },
    { path: "movie4.png", title: "Movie 4" },
    { path: "movie5.png", title: "Movie 5" },
    { path: "movie6.png", title: "Movie 6" },
    { path: "movie7.png", title: "Movie 7" },
    { path: "movie8.png", title: "Movie 8" },
    { path: "movie9.png", title: "Movie 9" },
    { path: "movie10.png", title: "Movie 10" },
    { path: "movie11.png", title: "Movie 11" },
    { path: "movie12.png", title: "Movie 12" },
  ];

  return (
    <>
      <div className=" flex flex-col bg-[#121214]">
        <Navbar />

        <main className="flex-grow flex flex-col gap-[2rem]">
          <Slider data={sliderData} />
          <DraggableSlider time={3000} type="Series" movies={series} />
          <DraggableSlider time={4000} type="Movies" movies={movies} />
          <DraggableSlider time={5000} type="Short" movies={shorts} />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Originals;
