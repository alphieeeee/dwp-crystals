"use client";
import React from "react";
import styles from "@/styles/VerticalAnimatedBar.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger); // don't register useGSAP

const VerticalAnimatedBar: React.FC = () => {
  const barContainerRef = React.useRef<HTMLDivElement | null>(null);
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;
    const verticalBarSetter = gsap.quickSetter(bar, "scaleY");

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (bar) {
          verticalBarSetter(self.progress);
        }
      },
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      trigger.kill();
    };
  }, { dependencies: [pathname], scope: barContainerRef, revertOnUpdate: true });

  return (
    <div className={styles.container} ref={barContainerRef}>
      <div className={styles["scroll-progress-vertical"]}>
        <div className={styles["scroll-progress-bar"]} ref={barRef} />
      </div>
    </div>
  );
};

export default VerticalAnimatedBar;
