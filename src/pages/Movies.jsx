import React from "react";
import Navbar from "../components/Navbar";
import DraggableSlider from "../components/DraggableSlider";
import DisneyOriginals from "../components/DisneyOriginals";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Movies = () => {
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

  const inTend = [
    { path: "m-tend1.png", title: "InTrend Movie 1" },
    { path: "m-tend2.png", title: "InTrend Movie 2" },
    { path: "m-tend3.png", title: "InTrend Movie 3" },
    { path: "m-tend4.png", title: "InTrend Movie 4" },
    { path: "m-tend5.png", title: "InTrend Movie 5" },
    { path: "movie2.png", title: "InTrend Movie 6" },
    { path: "movie3.png", title: "InTrend Movie 7" },
    { path: "movie4.png", title: "InTrend Movie 8" },
    { path: "movie5.png", title: "InTrend Movie 9" },
    { path: "movie6.png", title: "InTrend Movie 10" },
    { path: "movie7.png", title: "InTrend Movie 11" },
    { path: "movie8.png", title: "InTrend Movie 12" },
    { path: "movie9.png", title: "InTrend Movie 13" },
    { path: "movie10.png", title: "InTrend Movie 14" },
  ];

  const disnyOriginals = [
    { path: "m-od1.png", title: "Disney Original 1" },
    { path: "m-od2.png", title: "Disney Original 2" },
    { path: "m-od3.png", title: "Disney Original 3" },
    { path: "m-od4.png", title: "Disney Original 4" },
    { path: "m-od5.png", title: "Disney Original 5" },
    { path: "do2.png", title: "Disney Original 6" },
    { path: "do3.png", title: "Disney Original 7" },
    { path: "do4.png", title: "Disney Original 8" },
    { path: "do4.png", title: "Disney Original 9" },
    { path: "do1.png", title: "Disney Original 10" },
  ];

  const action = [
    { path: "m-action1.png", title: "Action Movie 1" },
    { path: "m-action2.png", title: "Action Movie 2" },
    { path: "m-action3.png", title: "Action Movie 3" },
    { path: "m-action4.png", title: "Action Movie 4" },
    { path: "m-action5.png", title: "Action Movie 5" },
    { path: "movie2.png", title: "Action Movie 6" },
    { path: "movie3.png", title: "Action Movie 7" },
    { path: "movie4.png", title: "Action Movie 8" },
    { path: "movie5.png", title: "Action Movie 9" },
    { path: "movie6.png", title: "Action Movie 10" },
    { path: "movie7.png", title: "Action Movie 11" },
    { path: "movie8.png", title: "Action Movie 12" },
    { path: "movie9.png", title: "Action Movie 13" },
    { path: "movie10.png", title: "Action Movie 14" },
  ];

  const animation = [
    { path: "m-animation1.png", title: "Animation Movie 1" },
    { path: "m-animation2.png", title: "Animation Movie 2" },
    { path: "m-animation3.png", title: "Animation Movie 3" },
    { path: "m-animation4.png", title: "Animation Movie 4" },
    { path: "m-animation5.png", title: "Animation Movie 5" },
    { path: "movie10.png", title: "Animation Movie 6" },
    { path: "movie9.png", title: "Animation Movie 7" },
    { path: "movie3.png", title: "Animation Movie 8" },
    { path: "movie2.png", title: "Animation Movie 9" },
    { path: "movie5.png", title: "Animation Movie 10" },
    { path: "movie4.png", title: "Animation Movie 11" },
    { path: "movie6.png", title: "Animation Movie 12" },
    { path: "movie7.png", title: "Animation Movie 13" },
    { path: "movie8.png", title: "Animation Movie 14" },
  ];

  const docuseries = [
    { path: "m-docuseries1.png", title: "Docuseries 1" },
    { path: "m-docuseries2.png", title: "Docuseries 2" },
    { path: "m-docuseries3.png", title: "Docuseries 3" },
    { path: "m-docuseries4.png", title: "Docuseries 4" },
    { path: "m-docuseries5.png", title: "Docuseries 5" },
    { path: "movie3.png", title: "Docuseries 6" },
    { path: "movie6.png", title: "Docuseries 7" },
    { path: "movie9.png", title: "Docuseries 8" },
    { path: "movie2.png", title: "Docuseries 9" },
    { path: "movie4.png", title: "Docuseries 10" },
    { path: "movie5.png", title: "Docuseries 11" },
    { path: "movie10.png", title: "Docuseries 12" },
    { path: "movie7.png", title: "Docuseries 13" },
    { path: "movie8.png", title: "Docuseries 14" },
  ];

  const children = [
    { path: "m-children1.png", title: "Children Movie 1" },
    { path: "m-children2.png", title: "Children Movie 2" },
    { path: "m-children3.png", title: "Children Movie 3" },
    { path: "m-children4.png", title: "Children Movie 4" },
    { path: "m-children5.png", title: "Children Movie 5" },
    { path: "movie9.png", title: "Movie 9" },
    { path: "movie2.png", title: "Movie 2" },
    { path: "movie4.png", title: "Movie 4" },
    { path: "movie5.png", title: "Movie 5" },
    { path: "movie3.png", title: "Movie 3" },
    { path: "movie10.png", title: "Movie 10" },
    { path: "movie7.png", title: "Movie 7" },
    { path: "movie6.png", title: "Movie 6" },
    { path: "movie8.png", title: "Movie 8" },
  ];

  const sliderData = [
    {
      logo: "/moviesLogo.svg",
      background: "/bg-movies.png",
      desc: `When Tylor Tuskmon arrives at Monsters, Incorporated after landing his dream job as a scarer, he discovers the scares are over and laughter is the name of the game. er, he discovers the scares are  er, he discovers the scares are `,
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
  return (
    <>
      <div className="min-h-[185rem]  flex flex-col bg-[#121214]">
        <Navbar />

        <main className="flex-grow flex flex-col gap-[4rem]">
          <Slider type="series" data={sliderData} />

          {/* In trend */}
          <DraggableSlider
            path="movie"
            time={3000}
            type="In trend"
            movies={inTend}
          />
          {/* ORIGNIAL DISNY */}  
          <DisneyOriginals
            time={3000}
            path="movie"
            type="Disney+ Originals"
            movies={disnyOriginals}
          />
          {/* Action/Adventure */}
          <DraggableSlider
            path="movie"
            time={4000}
            type="Action/Adventure"
            movies={action}
          />
          {/* Animation */}
          <DraggableSlider
            path="movie"
            time={5000}
            type="Animation"
            movies={animation}
          />

          {/* Docuseries */}
          <DraggableSlider
            path="movie"
            time={5000}
            type="Docuseries"
            movies={docuseries}
          />
          {/* Children */}
          <DraggableSlider
            path="movie"
            time={5000}
            type="Children"
            movies={children}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
