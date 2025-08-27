import React from "react";
import Image from "next/image";
import styles from "@/styles/HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section
      className={`${styles.container} w-full h-[50vw] lg:h-[100vh] px-[5vw] flex justify-center items-center`}
    >
      <div className={`${styles["brand-name-container"]}`}>
        <div className={`${styles["brand-name"]}`}>
          <Image
            src="/images/dwp-brand-name.png"
            alt="brand"
            width={1169}
            height={268}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
