"use client";
import React, { useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { useGsapAnim } from "@/hooks/useGsapAnim";

interface AnimScaleProps {
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
  origin?: string;
  from: number;
  to: number;
  scale: string;
}

const AnimScale: React.FC<AnimScaleProps> = ({
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
  origin,
  from,
  to,
  scale,
}) => {
  const { animScale } = useGsapAnim();
  const customClasses = `${className ? ` ${className}` : ""}`;
  const customStyles = { ...style };
  const elementRef = useRef<HTMLDivElement | null>(null);
  const container = trigger ?? elementRef;

  useGSAP(
    () => {
      animScale(
        elementRef,
        trigger,
        delay,
        duration,
        markers,
        animOnce,
        inViewport,
        origin,
        from,
        to,
        scale,
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

export default AnimScale;
