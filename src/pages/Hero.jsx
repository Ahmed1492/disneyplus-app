import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import DraggableSlider from "../components/DraggableSlider";
import DisneyOriginals from "../components/DisneyOriginals";
import Footer from "../components/Footer";
import axios from "axios";
import {
  sliderHome,
  inTrendHome,
  disnyOriginalsHome,
  actionHome,
  animationHome,
  docuseriesHome,
  childrenHome,
  topRatedSeriesHome,
  airingTodayHome,
} from "../data/homeData";

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

  return (
    <>
      <div className="min-h-screen bg-[#0f1014]">
        <Navbar />
        <Slider type="hero" data={sliderHome} />
        <main className="flex flex-col gap-16 md:gap-20 py-16 md:py-20 stagger">
          <div className="animate-fade-in-up"><DraggableSlider movies={inTrendHome} /></div>
          <div className="animate-fade-in-up"><DisneyOriginals movies={disnyOriginalsHome} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={actionHome} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={animationHome} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={docuseriesHome} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={childrenHome} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={topRatedSeriesHome} /></div>
          <div className="animate-fade-in-up"><DraggableSlider movies={airingTodayHome} /></div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
