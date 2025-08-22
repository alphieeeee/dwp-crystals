"use client";
import React, { useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../styles/MobileMenu.module.scss";
import { useAnimationContext } from "../context/AnimationContext";
import { usePageTransition } from "../../hooks/usePageTransition";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const NavMobile: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const menuMobileRef = useRef<HTMLElement | any>(null);
  const navMobileRef = useRef<HTMLElement | any>(null);
  const bgRef = useRef<HTMLElement | any>(null);
  const navMobileTL = useRef<gsap.core.Timeline | any>(null);
  const { contextSafe } = useGSAP({ scope: menuMobileRef.current });
  const { pageTransitionOut } = usePageTransition();
  const {
    isActive,
    isPlaying,
    isBlur,
    toggleActive,
    toggleBlur,
    togglePlaying,
  } = useAnimationContext();

  gsap.registerPlugin(useGSAP, ScrollSmoother);

  useGSAP(
    () => {
      navMobileTL.current = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          toggleModal(false);
          togglePlaying(false);
        },
      });
      gsap.set(navMobileRef.current.children, { opacity: 0, xPercent: 100 });
      gsap.set(bgRef.current.children, { opacity: 0 });
      navMobileTL.current
        .to(bgRef.current.children, {
          opacity: 1,
          scale: 3,
          stagger: 0.15,
          duration: 0.6,
          force3D: true,
        })
        .to(
          navMobileRef.current.children,
          {
            opacity: 1,
            xPercent: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)",
            force3D: true,
          },
          "-=0.1",
        );
    },
    { scope: menuMobileRef.current },
  );

  useEffect(() => {
    // const handleResize = () => {
    //   if (window.innerWidth >= 1280) {
    //     if (isActive) {
    //       navMobileTL.current!.reverse(true);
    //       toggleActive();
    //     }
    //   }
    // };
    // window.addEventListener('resize', handleResize);
    // handleResize();

    return () => {
      // window.removeEventListener('resize', handleResize);
    };
  }, [isActive, isBlur, toggleActive, toggleBlur, isPlaying, togglePlaying]);

  const navBar = [
    { name: "Home", link: "/" },
    { name: "Collection", link: "/collection" },
  ];
  const toggleMenu = contextSafe(() => {
    if (isPlaying) return;
    if (isActive) {
      navMobileTL.current!.reverse();
    } else {
      toggleModal(true);
      navMobileTL.current.play();
    }
    toggleActive();
  });

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (isPlaying) return;
    if (isActive) {
      // navMobileTL.current!.reverse().then(() => {
      //   changeRoute(link);
      // });
      navMobileTL.current!.reverse();
      setTimeout(() => {
        changeRoute(link);
      }, 1100);
      toggleActive();
      togglePlaying(true);
    }
  };

  const toggleModal = (modal: boolean) => {
    toggleBlur(modal);
    ScrollSmoother.get()?.paused(modal);
  };

  const changeRoute = (link: string) => {
    if (pathname !== link) {
      pageTransitionOut(link, router);
    }
  };

  return (
    <>
      <div
        className={`${styles["menu-mobile"]} fixed w-full h-full top-0 left-0 pointer-events-none ${isActive ? styles.active : ""}`}
        ref={menuMobileRef}
      >
        <div className={`${styles.bg}`} ref={bgRef}>
          <div className={`${styles["bg-overlay"]}`}></div>
          <div className={`${styles["bg-overlay"]}`}></div>
          <div className={`${styles["bg-overlay"]}`}></div>
        </div>
        <div
          className={`${styles["nav-mobile"]} w-full h-full flex justify-end items-center`}
        >
          <nav className={`w-[100vw] lg:w-[50vw] text-right`}>
            <ul className={`grid grid-cols-12 gap-[1vw]`} ref={navMobileRef}>
              {navBar.map((menu, index) => (
                <li
                  key={index}
                  className={`col-span-12 pointer-events-auto`}
                >
                  <a
                    className={`${pathname === menu.link ? styles["active-nav"] : undefined} cursor-pointer`}
                    onClick={(e) => handleLinkClick(e, menu.link)}
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* <div className={`${styles['font-copyright']} absolute bottom-[1vw] right-[1vw]`}>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div> */}
        </div>
        <div
          className={`${styles["nav-menu-mobile"]} absolute flex justify-end align-center`}
          onClick={toggleMenu}
        >
          <div className={`${styles.three}`}>
            <div id="hamburger" className={`${styles.hamburger}`}>
              <span className={`${styles.line}`}></span>
              <span className={`${styles.line}`}></span>
              <span className={`${styles.line}`}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMobile;
