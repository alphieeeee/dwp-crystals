"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TestScale: React.FC = () => {
  const wrapperRef = useRef(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  const [positions, setPositions] = useState<
    { x: number; y: number; rot: number }[]
  >([]);

  // Generate random styles on client only
  useEffect(() => {
    const newPositions = Array.from({ length: 8 }, () => ({
      x: Math.floor(Math.random() * 1000) - 500,
      y: Math.floor(Math.random() * 600) - 300,
      rot: Math.floor(Math.random() * 60) - 30,
    }));
    setPositions(newPositions);
  }, []);

  useGSAP(() => {
    if (positions.length === 0) return;

    elementsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { scale: 1, opacity: 1 },
        {
          scale: 0.3,
          opacity: 0,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        },
      );
    });
  }, [positions]);

  return (
    <section
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "200vh",
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          ref={(el) => (elementsRef.current[i] = el!)}
          style={{
            position: "absolute",
            width: "200px",
            height: "150px",
            background: "#bde0fe",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg)`,
          }}
        >
          Note {i + 1}
        </div>
      ))}
    </section>
  );
};

export default TestScale;
