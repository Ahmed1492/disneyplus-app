import React from "react";
import Navbar from "../components/Navbar";
import DraggableSlider from "../components/DraggableSlider";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import DisneyOriginals from "../components/DisneyOriginals";
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
  { path: "i1.png", title: "Movie 1" },
  { path: "i2.png", title: "Movie 2" },
  { path: "i3.png", title: "Movie 3" },
  { path: "i4.png", title: "Movie 4" },
  { path: "i5.png", title: "Movie 5" },
  { path: "movie2.png", title: "Movie 6" },
  { path: "movie3.png", title: "Movie 7" },
  { path: "movie4.png", title: "Movie 8" },
  { path: "movie5.png", title: "Movie 9" },
  { path: "movie6.png", title: "Movie 10" },
  { path: "movie7.png", title: "Movie 11" },
  { path: "movie8.png", title: "Movie 12" },
  { path: "movie9.png", title: "Movie 13" },
  { path: "movie10.png", title: "Movie 14" },
];

const disnyOriginals = [
  { path: "do1.png", title: "Disney Original 1" },
  { path: "do2.png", title: "Disney Original 2" },
  { path: "do3.png", title: "Disney Original 3" },
  { path: "do4.png", title: "Disney Original 4" },
  { path: "do5.png", title: "Disney Original 5" },
  { path: "do2.png", title: "Disney Original 6" },
  { path: "do3.png", title: "Disney Original 7" },
  { path: "do4.png", title: "Disney Original 8" },
  { path: "do4.png", title: "Disney Original 9" },
  { path: "do1.png", title: "Disney Original 10" },
];

const action = [
  { path: "a1.png", title: "Action Movie 1" },
  { path: "a2.png", title: "Action Movie 2" },
  { path: "a3.png", title: "Action Movie 3" },
  { path: "a4.png", title: "Action Movie 4" },
  { path: "a5.png", title: "Action Movie 5" },
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
  { path: "an1.png", title: "Animation Movie 1" },
  { path: "an2.png", title: "Animation Movie 2" },
  { path: "an3.png", title: "Animation Movie 3" },
  { path: "an4.png", title: "Animation Movie 4" },
  { path: "an5.png", title: "Animation Movie 5" },
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
  { path: "doc1.png", title: "Docuseries 1" },
  { path: "doc2.png", title: "Docuseries 2" },
  { path: "doc3.png", title: "Docuseries 3" },
  { path: "doc4.png", title: "Docuseries 4" },
  { path: "doc5.png", title: "Docuseries 5" },
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
  { path: "c1.png", title: "Children Movie 1" },
  { path: "c2.png", title: "Children Movie 2" },
  { path: "c3.png", title: "Children Movie 3" },
  { path: "c4.png", title: "Children Movie 4" },
  { path: "c5.png", title: "Children Movie 5" },
  { path: "movie9.png", title: "Children Movie 6" },
  { path: "movie2.png", title: "Children Movie 7" },
  { path: "movie4.png", title: "Children Movie 8" },
  { path: "movie5.png", title: "Children Movie 9" },
  { path: "movie3.png", title: "Children Movie 10" },
  { path: "movie10.png", title: "Children Movie 11" },
  { path: "movie7.png", title: "Children Movie 12" },
  { path: "movie6.png", title: "Children Movie 13" },
  { path: "movie8.png", title: "Children Movie 14" },
];

const sliderData = [
  {
    logo: "/seriesLogo.svg",
    background: "/bg-series.png",
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

const Series = () => {
  return (
    <>
      <div className="min-h-[185rem]  flex flex-col bg-[#121214]">
        <Navbar />

        <main className="flex-grow flex flex-col gap-[4rem]">
          <Slider type="series" data={sliderData} />

          {/* In trend */}
          <DraggableSlider
            path="series"
            time={3000}
            type="In trend"
            movies={inTend}
          />
          {/* ORIGNIAL DISNY */}
          <DisneyOriginals
            time={3000}
            path="series"
            type="Disney+ Originals"
            movies={disnyOriginals}
          />
          {/* Action/Adventure */}
          <DraggableSlider
            path="series"
            time={4000}
            type="Action/Adventure"
            movies={action}
          />
          {/* Animation */}
          <DraggableSlider
            path="series"
            time={5000}
            type="Animation"
            movies={animation}
          />

          {/* Docuseries */}
          <DraggableSlider
            path="series"
            time={5000}
            type="Docuseries"
            movies={docuseries}
          />
          {/* Children */}
          <DraggableSlider
            path="series"
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

export default Series;
