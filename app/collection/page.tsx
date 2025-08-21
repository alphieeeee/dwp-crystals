import React from "react";
import CollectionSection3 from "../components/collection/CollectionSection3";
import HeroSection from "../components/HeroSection";
import TestScale from "../components/collection/TestScale";

const CollectionPage = () => {
  return (
    <main className={`w-full overflow-x-hidden`}>
      <HeroSection />
      <CollectionSection3 />
      <TestScale />
    </main>
  );
};

export default CollectionPage;
