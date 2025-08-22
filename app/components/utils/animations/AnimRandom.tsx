'use client'
import React, { useRef, RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
// import useIsomorphicLayoutEffect from "../../../utils/useIsomorphicLayoutEffect";
import { useGsapAnim } from '@/hooks/useGsapAnim';

interface AnimRandomCharsProps {
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
}

const AnimRandomChars: React.FC<AnimRandomCharsProps> = ({
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
  const { animRandomChars } = useGsapAnim();
  const customClasses = `${className ? ` ${className}` : ''}`;
  const customStyles = { ...style };
  const elementRef = useRef<HTMLDivElement | null>(null);
  const container = trigger ?? elementRef;
  
  // useIsomorphicLayoutEffect(() => {
  //   gsap.registerPlugin(useGSAP);
  // }, []);

  useGSAP(() => {
    animRandomChars(elementRef, trigger, delay, duration, markers, animOnce, inViewport);
  }, { scope: container });

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

export default AnimRandomChars;