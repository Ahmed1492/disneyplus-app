import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

const Hero = () => {
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
  return (
    <div>
      <Navbar />
      <Slider type="hero" data={data} />
    </div>
  );
};

export default Hero;
