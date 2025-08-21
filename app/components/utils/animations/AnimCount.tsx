"use client";
import React, { useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { useGsapAnim } from "@/hooks/useGsapAnim";

interface AnimCountProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: RefObject<HTMLElement>;
  delay?: number;
  duration: number;
  markers?: boolean;
  animOnce?: boolean;
  inViewport?: boolean;
  children?: React.ReactNode;
  animTo: number;
  increaseBy: number;
}

const AnimCount: React.FC<AnimCountProps> = ({
  id,
  trigger,
  className,
  style,
  delay,
  duration,
  markers,
  animOnce,
  inViewport,
  children,
  animTo,
  increaseBy,
}) => {
  const { animCount } = useGsapAnim();
  const customClasses = `${className ? ` ${className}` : ""}`;
  const customStyles = { ...style };
  const elementRef = useRef<HTMLDivElement | null>(null);
  const container = trigger ?? elementRef;

  useGSAP(
    () => {
      if (elementRef.current) {
        animCount(
          elementRef,
          trigger,
          delay,
          duration,
          markers,
          animOnce,
          inViewport,
          animTo,
          increaseBy,
        );
      }
    },
    { scope: container },
  );

  return (
    <span
      id={id}
      className={customClasses}
      style={customStyles}
      ref={elementRef}
    >
      {children}
    </span>
  );
};

export default AnimCount;
