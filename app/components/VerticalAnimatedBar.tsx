"use client";
import React from "react";
import styles from "@/styles/VerticalAnimatedBar.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VerticalAnimatedBar: React.FC = () => {
  const verticalProgressBarRef = React.useRef<HTMLDivElement | null>(null);
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(() => {
    const verticalBarSetter = gsap.quickSetter(
      verticalProgressBarRef.current,
      "scaleY",
    );
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (verticalProgressBarRef.current) {
          verticalBarSetter(self.progress);
        }
      },
    });
  }, []);
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles["scroll-progress-vertical"]}`}>
        <div
          className={`${styles["scroll-progress-bar"]}`}
          ref={verticalProgressBarRef}
        ></div>
      </div>
    </div>
  );
};

export default VerticalAnimatedBar;
