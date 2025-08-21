"use client";
import "../styles/globals.scss";
import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
// import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";
import { usePageTransition } from "@/hooks/usePageTransition";

interface ScrollSmoothProps {
  children: React.ReactNode;
}

const ScrollSmooth: React.FC<ScrollSmoothProps> = ({ children }) => {
  const { pageTransitionIn } = usePageTransition();
  const smoother = useRef<ScrollSmoother | null>(null);
  const smoothWrapper = useRef<HTMLDivElement | null>(null);

  //   useIsomorphicLayoutEffect(() => {
  //     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  //   }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      smoother.current = ScrollSmoother.create?.({
        smooth: 2, // seconds it takes to "catch up" to native scroll position
        effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
      });
    },
    { scope: smoothWrapper },
  );

  const pathname = usePathname();
  useEffect(() => {
    pageTransitionIn();
  }, [pathname, pageTransitionIn]);

  return (
    <>
      <div id="smooth-wrapper" ref={smoothWrapper}>
        <div id="smooth-content">
          <div id="main-container">{children}</div>
        </div>
      </div>
      <div
        className={`transition-overlays fixed w-full h-full top-0 left-0 z-40 pointer-events-none`}
      >
        <div
          className={`transition-overlay absolute w-full h-full top-0 left-0 pointer-events-auto`}
        ></div>
      </div>
    </>
  );
};

export default ScrollSmooth;
