"use client";
import React, { useRef, useState } from "react";
import styles from "@/styles/collection/CollectionSection.module.scss";
import Image from "next/image";
// GSAP
import { gsap } from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const CollectionSection: React.FC = () => {
  const [isGrid, setIsGrid] = useState(true);
  // const [animGrid, setAnimGrid] = useState(true)
  const containerRef = useRef<HTMLElement | null>(null);
  // const { contextSafe } = useGSAP({ scope: containerRef })

  const projects = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    title: `Project ${i + 1}`,
    desc: `This is project number ${i + 1}`,
  }));

  const handleToggle = (toGrid: boolean) => {
    if (isGrid === toGrid) return;
    const state = Flip.getState(".card");
    setIsGrid(toGrid);

    requestAnimationFrame(() => {
      Flip.from(state, {
        absolute: true,
        duration: 0.4,
        stagger: 0.01,
        ease: "sine.inOut",
      });
    });
  };

  return (
    <section className={`${styles.container} px-[5vw]`} ref={containerRef}>
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => handleToggle(true)}
          className={`px-3 py-1 rounded border ${
            isGrid ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => handleToggle(false)}
          className={`px-3 py-1 rounded border ${
            !isGrid ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          List
        </button>
      </div>

      {/* Projects Container */}
      <div
        className={`cards py-6 ${
          isGrid
            ? "grid grid-cols-3 md:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }`}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={`card border rounded p-4 bg-white ${
              isGrid ? "min-h-fit" : "flex items-center gap-4 min-h-[150px]"
            }`}
          >
            <div
              className={`relative overflow-hidden rounded ${
                isGrid ? "w-full aspect-square" : "w-[100px] aspect-[4/3]"
              }`}
            >
              <Image
                src={`/images/collection/product1.jpg`}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
