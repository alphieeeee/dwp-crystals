import React from "react";
import HomeSection from "./components/home/HomeSection";
import HeroSection from "./components/HeroSection";
import HomeAbout from "./components/home/HomeAbout";

const Home = () => {
  return (
    <main className={`w-full overflow-x-hidden`}>
      <HeroSection />
      {/* <HomeSection /> */}
      <HomeAbout />
    </main>
  );
};

export default Home;
