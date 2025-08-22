'use client'
import React, { useRef } from "react";
import Image from 'next/image'
import styles from "@/styles/home/HomeAbout.module.scss";

const HomeAbout = () => {
	const homeAboutRef = useRef<HTMLDivElement | null>(null);
  return (
	<section
      className={`${styles.container} relative mx-auto w-[min(90vw,1920px)] py-[10vw]`}
      ref={homeAboutRef}
    >
		<div className={`${styles['sticky-holder']} relative w-full h-auto lg:h-[100vh]`}>
			<div className={`relative w-full h-full flex flex-wrap items-center`}>
				<div className={`w-full lg:w-1/2 flex justify-center items-center`}>
					<div className={`${styles.sticky} ${styles['sticky-left']}`}
						data-speed='1.6'>
						<div className={`${styles.pinku}`}>
							<Image
								src="/home/pinku.png"
								alt="Description"
								width={1000}
								height={1000}
							/>
						</div>
					</div>
				</div>
				<div className={`${styles['homeabout-right']} w-full lg:w-1/2 py-[10vw]`}>
					<p data-speed='1'>At DWP Crystals, we're dedicated to more than just crafting beautiful crystal pieces—we're on a mission to make a difference. Established with a deep love for both art and felines, our purpose is to support and care for the local cat community.</p>
				</div>
			</div>
		</div>
		<div className={`${styles['sticky-holder']} relative w-full h-auto lg:h-[100vh]`}>
			<div className={`relative w-full h-full flex flex-wrap flex-row-reverse items-center`}>
				<div className={`w-full h-full lg:w-1/2 flex justify-center items-center`}>
					<div className={`${styles.sticky} ${styles['sticky-right']}`}
						data-speed='1.6'>
						<div className={`${styles.pinku}`}>
							<Image
								src="/home/delta.png"
								alt="Description"
								width={1000}
								height={1000}
							/>
						</div>
					</div>
				</div>
				<div className={`${styles['homeabout-right']} w-full lg:w-1/2 py-[10vw]`}>
					<p data-speed='1'>Every crystal and creation you find here is handcrafted with passion and a purpose. We believe in the power of giving back, which is why a portion of every purchase goes directly towards funding cat rescue, welfare, and care initiatives. By choosing DWP Crystals, you're not only bringing a unique piece into your life, but you're also helping us provide a safe and loving home for cats in need.</p>
				</div>
			</div>
		</div>
	</section>
  )
}

export default HomeAbout