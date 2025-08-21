'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import styles from '@/styles/collection/Ufo.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Ufo: React.FC = () => {
  const ufoContainerRef = useRef<HTMLDivElement | null>(null)
  const ufoRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    // optional: respect reduced-motion
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // main float (up/down) + a tiny tilt
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      
      tl.to(ufoRef.current, {
        y: -18,            // how high it floats (px)
        rotation: -2,      // slight tilt
        duration: 1.6,
        ease: 'sine.inOut' // note: "sine", not "sin"
      })
      .to(ufoRef.current, {
        y: 0,
        rotation: 2,       // tilt the other way on return
        duration: 1.6,
        ease: 'sine.inOut'
      })
      // tl.to(ufoRef.current, { x: 8, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      return () => tl.kill()
    })
    return () => mm.revert()
  }, [])
  // useGSAP(() => {
  //   const tween = gsap.to(ufoRef.current, { y: -18, rotation: -2, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  //   const el = ufoRef.current
  //   const onEnter = () => tween.pause()
  //   const onLeave = () => tween.resume()
  //   el?.addEventListener('mouseenter', onEnter)
  //   el?.addEventListener('mouseleave', onLeave)
  //   return () => {
  //     el?.removeEventListener('mouseenter', onEnter)
  //     el?.removeEventListener('mouseleave', onLeave)
  //     tween.kill()
  //   }
  // }, [])

  return (
    <div ref={ufoContainerRef} className={`${styles.container} relative w-full h-full`}>
      <div ref={ufoRef} className={`${styles.ufo} absolute w-full h-full will-change-transform`}>
        <Image
          src="/images/ufo.png"
          alt="UFO"
          width={996}
          height={580}
          className="absolute right-0 top-0 select-none pointer-events-none"
          priority
        />
      </div>
    </div>
  )
}

export default Ufo
