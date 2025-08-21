import React from "react";
import HomeSection from "./components/home/HomeSection";
import HeroSection from "./components/HeroSection";

const Home = () => {
  return (
    <main className={`pt-[15%]`}>
      <HeroSection />
      <HomeSection />
    </main>
  );
};

export default Home;
