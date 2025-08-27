'use client'
import React, { useRef, RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
// import useIsomorphicLayoutEffect from "../../../utils/useIsomorphicLayoutEffect";
import { useGsapAnim } from "@/hooks/useGsapAnim";

type RefLike<T extends HTMLElement = HTMLElement> =
  | React.RefObject<T | null>
  | { current: T | null };

interface AnimPanningProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: RefLike<HTMLElement>;
  delay?: number;
  duration: number;
  markers?: boolean;
  animOnce?: boolean;
  inViewport?: boolean;
  onScroll?: boolean;
  starting?: string;
  ending?: string;
  children?: React.ReactNode;
  direction: string;
  from: number;
  to: number;
  fade: string;
}

const AnimPanning: React.FC<AnimPanningProps> = ({
  id,
  trigger,
  className,
  style,
  delay,
  duration,
  markers,
  animOnce,
  inViewport,
  onScroll,
  starting,
  ending,
  children,
  direction,
  from,
  to,
  fade,
}) => {
  const { animPanning } = useGsapAnim();
  const customClasses = `${className ? ` ${className}` : ''}`;
  const customStyles = { ...style };
  const elementRef = useRef<HTMLDivElement | null>(null);
  
  // useIsomorphicLayoutEffect(() => {
  //   gsap.registerPlugin(useGSAP);
  // }, []);

  useGSAP(() => {
    const el = elementRef.current;
    const trig = trigger?.current ?? el;
    console.log('el:', elementRef.current);
    console.log('trigger:', trigger?.current);
    if (!el || !trig) return;
    animPanning(elementRef, trigger, delay, duration, markers, animOnce, inViewport, onScroll, starting, ending, direction, from, to, fade);
  }, { scope: elementRef, dependencies: [
    trigger?.current,
    delay, duration, markers, animOnce, inViewport, onScroll,
    starting, ending, direction, from, to, fade
  ] });

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

export default AnimPanning;
