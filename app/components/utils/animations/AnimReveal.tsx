"use client";
import React, { useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { useGsapAnim } from "@/hooks/useGsapAnim";

interface AnimRevealProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: RefObject<HTMLElement>;
  delay?: number;
  duration?: number;
  markers?: boolean;
  animOnce?: boolean;
  inViewport?: boolean;
  children?: React.ReactNode;
}

const AnimReveal: React.FC<AnimRevealProps> = ({
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
}) => {
  const { animReveal } = useGsapAnim();
  const customClasses = `${className ? ` ${className}` : ""}`;
  const customStyles = { ...style };
  const elementRef = useRef<HTMLDivElement | null>(null);
  const container = trigger ?? elementRef;

  useGSAP(
    () => {
      animReveal(
        elementRef,
        trigger,
        delay,
        duration,
        markers,
        animOnce,
        inViewport,
      );
    },
    { scope: container },
  );

  return (
    <div
      id={id}
      className={customClasses}
      style={customStyles}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

export default AnimReveal;
