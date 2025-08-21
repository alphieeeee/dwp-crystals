import React from "react";
import styles from "@/styles/Header.module.scss";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
// import Link from 'next/link'
// import { useAnimationContext } from '@/app/context/AnimationContext'

const Header: React.FC = () => {
  // const { isActive, isPlaying, isBlur, toggleActive, toggleBlur, togglePlaying } = useAnimationContext();
  // const navBar = [
  //   { name: 'Home', link: '/' },
  //   { name: 'Shop', link: '/collection' },
  //   { name: 'About', link: '/about' },
  // ]

  return (
    <div className={`${styles.container} w-full h-full`}>
      <div className="relative top-0 left-0 w-full h-full flex">
        <div className={`${styles.left} w-[50%] h-full`}></div>
        <div className={`${styles.right} w-[50%] h-full`}>
          <div className={`${styles["right-element"]} w-full h-full`}>
            {/* <div className={`${styles['menu-container']} ${styles.active}`}>
              <div className={`${styles['hamburger']}`}>
                <span className={`${styles.line}`}></span>
                <span className={`${styles.line}`}></span>
              </div>
            </div> */}
            {/* <div className={`${styles["brand-name"]} absolute top-[50%]`}>
              <Image
                src="/images/dwp-brand-name.png"
                alt="brand"
                width={1169}
                height={268}
              />
            </div> */}
          </div>
        </div>
      </div>
      <MobileMenu />
    </div>
  );
};

export default Header;
