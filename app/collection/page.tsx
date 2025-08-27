import React from "react";
import CollectionSection from "../components/collection/CollectionSection";
import HeroSection from "../components/HeroSection";

const CollectionPage = () => {
  return (
    <main className={`w-full overflow-x-hidden`}>
      <HeroSection />
      <CollectionSection />
    </main>
  );
};

export default CollectionPage;
