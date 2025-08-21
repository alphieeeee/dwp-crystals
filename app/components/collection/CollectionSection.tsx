"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/collection/CollectionSection.module.scss";
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

  const projects = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    title: `Bracelet ${i + 1}`,
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
      className={`${styles.container} mx-auto w-[min(90vw,1920px)]  pb-[5vh]`}
      ref={containerRef}
    >
      <div className={`${styles.header} flex justify-between items-center`}>
        <div className={`${styles.divider} w-[28vw]`}></div>
        <h2 className="font-bold">Collection</h2>
        <div className={`${styles.divider} w-[28vw]`}></div>
      </div>
      {projects.map((project, index) => (
        <div className={`${styles.cards} relative w-full`} key={project.id}>
          <div
            className={`relative w-full h-full left-0 top-0 flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
          >
            <div className={`w-full lg:w-[60%]`}>
              <div className={`w-full h-full`}>
                <div
                  className={`${styles["product-image"]} product-image relative w-full h-[40vw]`}
                  ref={productImgRef}
                >
                  <div
                    className={`${styles["image-parallax"]} w-full h-full overflow-hidden`}
                  >
                    <ImageParallax className={`top-0 w-full h-[120%]`}>
                      <Image
                        src="/images/collection/product1.jpg"
                        alt={project.title}
                        fill
                        sizes="100%"
                        priority
                        className="object-cover"
                      />
                    </ImageParallax>
                  </div>
                  {/* <div className={`${styles['product-overlay-bg']} absolute w-full h-full left-0 top-0`}></div> */}
                  <div
                    className={`${styles["product-name"]} absolute right-0 top-0 -translate-y-1/2`}
                  >
                    <AnimPanning
                      duration={1}
                      direction={"left"}
                      from={0}
                      to={-10}
                      fade={"in"}
                    >
                      <div className={``}>{project.title}</div>
                    </AnimPanning>
                  </div>
                  <div
                    className={`${styles["product-name"]} absolute right-0 top-0 -translate-y-1/2`}
                  >
                    <AnimPanning
                      duration={1}
                      direction={"left"}
                      from={0}
                      to={-10}
                      fade={"in"}
                    >
                      <div className={``}>{project.title}</div>
                    </AnimPanning>
                  </div>
                  <div className={`${styles['product-desc']} absolute right-0 bottom-[20%] -translate-x-[15%]`}>
                  <AnimPanning
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
              className={`relative hidden lg:flex flex-1 justify-center items-center `}
            >
              <div className={`${styles["cat-image"]}`} data-speed="0.9">
                <Image
                  src={`/home/pinku.png`}
                  alt={project.title}
                  width={1000}
                  height={1000}
                  className="object-contain"
                  priority
                />
              </div>
              <div
                className={`${styles["cat-image-desc"]} text-center absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2`}
              >
                <p>{project.desc}</p>
              </div>
            </div>
          </div>
          {/* <div className={`relative mx-auto w-[90vw]`}>
          <AnimWidth
            duration={0.5}
            delay={0.5}
            from={0}
            to={1}
            origin={'center center'}
            scale={'up'}>
            <div className={`${styles.line} relative w-full top-[5vw]`}></div>
          </AnimWidth>
        </div> */}
        </div>
      ))}
    </section>
  );
};

export default CollectionSection;
