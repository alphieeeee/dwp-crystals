import React from "react";
import HomeSection from "./components/home/HomeSection";
import HeroSection from "./components/HeroSection";
import HomeAbout from "./components/home/HomeAbout";

const Home = () => {
  return (
    <main className={`pt-[2vw]`}>
      <HeroSection />
      {/* <HomeSection /> */}
      <HomeAbout />
    </main>
  );
};

export default Home;
