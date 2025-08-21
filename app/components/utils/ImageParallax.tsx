"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface ImageParallaxProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
  lag?: number;
  speed?: string | number;
  style?: React.CSSProperties;
}

const ImageParallax: React.FC<ImageParallaxProps> = ({
  id,
  children,
  className,
  style,
  lag = 0,
  speed = "auto",
}) => {
  const baseClass = id || "parallax";
  const customClasses = `${className ? ` ${baseClass} ${className}` : ""}`;
  const customStyles = { ...style };
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  useGSAP(() => {
    const sSmoother = ScrollSmoother.get();
    if (sSmoother) {
      sSmoother.effects(`.${baseClass}`, { speed: speed, lag: lag });
    }
  }, [lag, speed, baseClass]);

  return (
    <>
      <div className={`w-full h-full relative overflow-hidden`}>
        <div
          id={id}
          className={`absolute${customClasses}`}
          style={customStyles}
          data-speed={speed}
          data-lag={lag}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ImageParallax;
