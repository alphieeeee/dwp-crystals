"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/collection/CollectionSection3.module.scss";
import Image from "next/image";
import ImageParallax from "@/app/components/utils/ImageParallax";
import AnimPanning from "@/app/components/utils/animations/AnimPanning";
import AnimWidth from "@/app/components/utils/animations/AnimWidth";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CollectionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const productImgRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const projects = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: `Bracelet ${i + 1}`,
    desc: `This is a beautiful bracelet ${i + 1}`,
  }));

  //   useEffect(() => {
  //   const smoother = ScrollSmoother.get()
  //   if (!smoother) return

  //   const clamp = gsap.utils.clamp(-10, 10)
  //   const skewSetter = gsap.utils.toArray<HTMLElement>('.product-image').map((el) =>
  //     gsap.quickSetter(el, 'skewY', 'deg')
  //   )

  //   let timeoutId: ReturnType<typeof setTimeout>

  //   const update = () => {
  //     const velocity = smoother.getVelocity()
  //     skewSetter.forEach((set) => set(clamp(velocity / -50)))

  //     clearTimeout(timeoutId)
  //     timeoutId = setTimeout(() => {
  //       gsap.to('.product-image', {
  //         skewY: 0,
  //         duration: 0.3,
  //         ease: 'power3.out',
  //       })
  //     }, 100)
  //   }

  //   gsap.ticker.add(update)

  //   return () => {
  //     gsap.ticker.remove(update)
  //   }
  // }, [])

  return (
    <section
      className={`${styles.container} mx-auto w-[min(90vw,1920px)] pb-[5vh] overflow-hidden`}
      ref={containerRef}
    >
      <div className={`${styles.header} flex justify-between items-center`}>
        <div className={`${styles.divider} w-[25vw]`}></div>
        <h2 className="font-bold">Collection</h2>
        <div className={`${styles.divider} w-[25vw]`}></div>
      </div>
      {projects.map((project, index) => (
        <div className={`${styles.cards} relative w-full h-[auto] lg:h-[900px] flex items-center`} key={project.id}>
          <div
            className={`relative w-full left-0 top-0 flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
          >
            <div className={`w-full lg:w-[80%]`} ref={triggerRef}>
              <div className={`w-full h-full`}>
                <div
                  className={`${styles["product-image"]} product-image relative w-full h-[40vw]`}
                  ref={productImgRef}
                >
                  <div
                    className={`${styles["image-parallax"]} w-full h-full overflow-hidden`}
                  >
                    <ImageParallax
                      key={`parallax-${index}`}
                      className={`top-0 w-full h-[120%]`}
                    >
                      <Image
                        src="/images/collection/product1.jpg"
                        alt={project.name}
                        fill
                        sizes="100%"
                        priority
                        className="object-cover"
                      />
                    </ImageParallax>
                  </div>
                  <div
                    className={`${styles["product-name"]} absolute right-0 top-0 -translate-y-1/2`}
                  >
                    <AnimPanning
                      key={`name-${index}`}
                      inViewport={index === 0 ? false : true}
                      duration={1}
                      direction={"left"}
                      from={0}
                      to={-10}
                      fade={"in"}
                    >
                      <div>{project.name}</div>
                    </AnimPanning>
                  </div>
                  <div className={`${styles['product-desc']} absolute right-0 bottom-[20%] -translate-x-[15%]`}>
                  <AnimPanning
                    key={`desc-${index}`}
                    duration={1}
                    direction={'left'}
                    from={0}
                    to={10}
                    fade={'in'}>
                    <p>{project.desc}</p>
                  </AnimPanning>
                </div>
                  <div
                    className={`${styles["product-price"]} absolute right-[1%] bottom-[0%]`}
                  >
                    <AnimPanning
                      key={`price-${index}`}
                      duration={1}
                      direction={"left"}
                      from={10}
                      to={0}
                      fade={"in"}
                    >
                      <p>$29.99</p>
                    </AnimPanning>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`relative hidden lg:flex flex-1 justify-center items-center relative right-panel`}
            >
              <AnimPanning
                key={`desc-${index}`}
                duration={1}
                direction={"top"}
                from={100}
                to={-100}
                fade={"none"}
                onScroll={true}
                trigger={triggerRef as React.RefObject<HTMLElement>}
                className={`relative w-full h-full`}
              >
                <div className={`${styles.desc}`}>
                  <p>{project.name}</p>
                </div>
              </AnimPanning>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CollectionSection;
