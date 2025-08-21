"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/collection/CollectionSection2.module.scss";
import Image from "next/image";
import ImageParallax from "@/app/components/utils/ImageParallax";
import AnimPanning from "@/app/components/utils/animations/AnimPanning";
import AnimWidth from "@/app/components/utils/animations/AnimWidth";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CollectionSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const productImgRef = useRef<HTMLElement | null>(null);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const projects = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    title: `Bracelet ${i + 1}`,
    desc: `This is a beautiful bracelet ${i + 1}`,
  }));

  return (
    <section
      className={`${styles.container} mx-auto w-[min(90vw,1400px)]  pb-[5vh]`}
      ref={containerRef}
    >
      <div className={`${styles.header} flex justify-between items-center mb-[2rem]`}>
        <div className={`${styles.divider} w-[28vw]`}></div>
        <h2 className="font-bold">Collection</h2>
        <div className={`${styles.divider} w-[28vw]`}></div>
      </div>
      <div
        className={`mx-auto w-[85%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[3vw]`}
      >
        {projects.map((project, index) => (
          <div className={`${styles.cards} flex flex-col`} key={project.id}>
            <div className={`${styles['product-image']} relative w-full aspect-[2/1] mb-[1rem]`}>
              <Image
                src="/images/collection/product1.jpg"
                alt={project.title}
                fill
                sizes="100%"
                priority
                className="object-cover"
              />
            </div>
            <div className={`${styles["product-name"]}`}>{project.title}</div>
            <div className={`${styles["product-desc"]}`}>{project.desc}</div>
            <div className={`${styles["product-price"]}`}>$29.00</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
