import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import axios from "axios";
const Hero = () => {
  let LoginValidations = async (token) => {
    try {
      const res = await axios.post(
        "https://dc77528ae38f.ngrok-free.app/Registers/LogIn",
        token
      );

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(
        "Login validation failed:",
        error.response?.data || error.message
      );
      return null;
    }
  };
  let token = localStorage.getItem("dToken");
  useEffect(() => {
    let tokenObj = {
      token: token,
    };

    if (token) {
      LoginValidations(tokenObj);
    } else {
      console.warn("No token found in localStorage");
    }
  }, []);

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
    <div className="">
      <Navbar />
      <Slider type="hero" data={data} />
    </div>
  );
};

export default Hero;
