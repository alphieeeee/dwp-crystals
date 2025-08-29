"use client";
import React, { useRef, useState } from "react";
import HeaderTitle from '../utils/HeaderTitle'
import styles from '@/styles/collections/ProductSection.module.scss'
import Image from "next/image";

const ProductSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const productImgRef = useRef<HTMLElement | null>(null);

  const projects = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    title: `Bracelet ${i + 1}`,
    desc: `This is a beautiful bracelet ${i + 1}`,
  }));

  return (
    <section className={`${styles.container} relative mx-auto w-[min(90vw,1920px)] overflow-hidden`} ref={containerRef}>
      <div className={`relative`}>
        <HeaderTitle title="Charms" />
      </div>
      <div
        className={`mx-auto w-[100%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] gap-y-[3vw]`}
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
            <div className={`${styles["product-name"]} dwp-shadow text-white`}>{project.title}</div>
            <div className={`${styles["product-desc"]} dwp-shadow text-white`}>{project.desc}</div>
            <div className={`${styles["product-price"]} dwp-shadow text-white`}>$29.00</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
