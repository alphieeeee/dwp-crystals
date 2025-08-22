"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/AnimatedBG.module.scss";
import Orbit from "@/app/components/collection/Orbit";
import Ufo from "@/app/components/collection/Ufo";


// GSAP
import { gsap } from "gsap";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    const stars: Star[] = [];

    class Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkle: gsap.core.Tween;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.2 + 0.5;
        this.opacity = Math.random();

        // Twinkle with GSAP
        this.twinkle = gsap.to(this, {
          opacity: Math.random(),
          duration: 1.5 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`; // 💖 Pink (Hot Pink)
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(255, 105, 180, 1)"; // Pink glow
        ctx.fill();
      }
    }

    for (let i = 0; i < 150; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => star.draw());
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      stars.forEach((star) => star.twinkle.kill());
    };
  }, []);

  return (
    <div
      className={`${styles.container} fixed canvas-background fixed top-0 left-0 w-full h-[100vh] overflow-hidden flex justify-center items-center`}
    >
      {/* <div className={`${styles.circles}`}></div>
      <div className={`${styles.circles}`}></div>
      <div className={`${styles.circles}`}></div>
      <div className={`${styles.circles}`}></div>
      <div className={`${styles.circles}`}></div>
      <div className={`${styles.circles}`}></div> */}
      {/* <div className={`${styles.logo} relative border border-black p-2 rounded-full`}>
        <Image
            src="/dwp-header.jpg"
            alt="Logo"
            width={2048}
            height={2048}
            className="rounded-full"
        />
      </div> */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      />
      <div className={`${styles.orbit} absolute`}>
        <Orbit />
      </div>
      <div className={`${styles.ufo} absolute`}>
        <Ufo />
      </div>
    </div>
  );
}
