"use client";
import React, { useEffect, useRef } from "react";
import styles from "@/styles/collection/CollectionSection.module.scss";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import Image from "next/image";

const CollectionCarousel: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

  const projects = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Bracelet ${i + 1}`,
    desc: `This is a beautiful bracelet ${i + 1}`,
  }));

  useEffect(() => {
    const carousel = document.querySelector(".carousel") as HTMLElement;
    const images = Array.from(
      document.querySelectorAll<HTMLElement>(".carousel-image"),
    );
    const progress = { value: 0 };

    let radius = 0;
    let imageSize = 0;

    // Tweakables
    const GAP_FACTOR = 0; // each gap = 20% of image size
    const MIN_RADIUS_FACTOR = 1.1; // never smaller than 1.1 * imageSize
    const MAX_IMAGE = 260;
    const MIN_IMAGE = 120;

    const computeRadius = (n: number, img: number) => {
      const gap = img * GAP_FACTOR;
      const circumference = n * (img + gap);
      const rFromPacking = circumference / (2 * Math.PI);
      const rMin = img * MIN_RADIUS_FACTOR;
      return Math.max(rFromPacking, rMin);
    };

    const updateSizes = () => {
      const containerWidth = carousel.offsetWidth;
      imageSize = Math.max(MIN_IMAGE, Math.min(containerWidth / 6, MAX_IMAGE));
      radius = computeRadius(images.length, imageSize);

      // push perspective as a CSS var so deeper rings still look good
      const perspective = Math.max(800, Math.round(radius * 3));
      carousel.style.setProperty("--perspective", `${perspective}px`);

      images.forEach((img) => {
        img.style.width = `${imageSize}px`;
        img.style.height = `${imageSize}px`;
        img.style.margin = `-${imageSize / 2}px 0 0 -${imageSize / 2}px`;
      });
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);

    Observer.create({
      target: carousel,
      type: "wheel,pointer",
      onPress: () => {
        carousel.style.cursor = "grabbing";
      },
      onRelease: () => {
        carousel.style.cursor = "grab";
      },
      onChange: (self) => {
        gsap.killTweensOf(progress);
        const p =
          self.event.type === "wheel"
            ? self.deltaY * -0.0005
            : self.deltaX * 0.05;
        gsap.to(progress, { duration: 2, ease: "power4.out", value: `+=${p}` });
      },
    });

    const animate = () => {
      images.forEach((image, index) => {
        const theta = index / images.length - progress.value;
        const x = -Math.sin(theta * Math.PI * 2) * radius;
        const z = Math.cos(theta * Math.PI * 2) * radius;
        image.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${360 * -theta}deg)`;
        const c = Math.floor((index / images.length) * 360);
        // image.style.background = `hsla(${c}, 90%, 50%, 1)`;
        image.style.background = `#512c6f`;
      });
    };
    gsap.ticker.add(animate);

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  return (
    <section
      className={`${styles.container} w-full max-w-[90vw] mx-auto pb-[5vh]`}
      ref={containerRef}
    >
      <div className={`${styles.header} flex justify-between items-center`}>
        <div className={`${styles.divider} w-[28vw]`}></div>
        <h2 className="font-bold">Collection</h2>
        <div className={`${styles.divider} w-[28vw]`}></div>
      </div>
      <div className="carousel">
        {projects.map((_, index) => (
          <div className="carousel-image" key={`carousel-image-${index + 1}`}>
            {/* {index + 1} */}
            <div className={`w-full h-full`}>
              <Image
                style={
                  {
                    WebkitUserDrag: "none",
                    userSelect: "none",
                  } as React.CSSProperties
                }
                src={`/home/pinku.png`}
                alt={`Bracelet ${index + 1}`}
                width={1000}
                height={1000}
                className="object-contain"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionCarousel;
