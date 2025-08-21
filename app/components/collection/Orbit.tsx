'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import styles from '@/styles/collection/Orbit.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const STAR_COUNT = 14

const Orbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const stars = gsap.utils.toArray<HTMLElement>('.orbit-star')

      stars.forEach((el) => {
        gsap.to(el, {
          scale: () => gsap.utils.random(0.1, 0.2, 0.01),
          duration: () => gsap.utils.random(1, 1.6, 0.01),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 1.2, 0.01),
          repeatRefresh: true,
          transformOrigin: '50% 50%',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={`${styles.container} relative w-full h-full`}>
      {/* Orbit guide */}
      {/* <div className={`${styles['orbit-guide']} absolute w-full h-full`}>
        <Image
          src="/images/orbit-guide.png"
          alt="ORBIT GUIDE"
          width={1000}
          height={929}
          className="absolute right-0 top-0 select-none pointer-events-none"
          priority
        />
      </div> */}

      {/* Orbit */}
      <div className={`${styles.orbit} absolute w-full h-full`}>
        <Image
          src="/images/orbit.png"
          alt="ORBIT"
          width={1000}
          height={929}
          className="absolute right-0 top-0 select-none pointer-events-none"
          priority
        />
      </div>

      {/* Stars with pre-defined positioning via SCSS */}
      {Array.from({ length: STAR_COUNT }).map((_, i) => (
        <div key={i} className={`orbit-star ${styles[`orbit-star${i + 1}`]} absolute`}>
          <Image
            src="/images/orbit-star.png"
            alt={`Star ${i + 1}`}
            width={127}
            height={134}
            className="select-none pointer-events-none"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  )
}

export default Orbit
