import React from "react";
import Image from "next/image";
import styles from "@/styles/home/HomeSection.module.scss";

const HomeSection: React.FC = () => {
  return (
    <div
      className={`${styles.container} mx-auto w-[min(90vw,1920px)] h-[100vh] px-[5vw] py-[5vw]`}
    >
      <div className="relative w-full h-full grid grid-cols-5 grid-rows-5 gap-5">
        <div className="relative col-start-1 col-end-6 row-start-1 row-end-4 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-6 bg-red-200">
          <div className={`${styles.pinku} relative w-full h-full`}>
            <Image
              src="/home/pinku.png"
              alt="Pinku"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="relative col-start-1 col-end-3 row-start-4 row-end-6 lg:col-start-4 lg:col-end-6 lg:row-start-1 lg:row-end-3 bg-green-200">
          <div className={`${styles.delta} relative w-full h-full`}>
            <Image
              src="/home/delta.png"
              alt="Delta"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="relative col-start-3 col-end-6 row-start-4 row-end-6 lg:col-start-4 lg:col-end-6 lg:row-start-3 lg:row-end-6 bg-blue-200">
          <div className={`${styles.wynona} relative w-full h-full`}>
            <Image
              src="/home/wynona.png"
              alt="Wynona"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
