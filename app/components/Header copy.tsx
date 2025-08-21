import React from "react";
import styles from "@/styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  const navBar = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/collection" },
    { name: "About", link: "/about" },
  ];

  return (
    <div className={`${styles.container} fixed top-0 left-0 w-full`}>
      <div className={`${styles["header-bg"]} absolute w-full h-full`}></div>
      <div className="relative w-full grid grid-cols-2 py-6 px-[5vw]">
        <div className={styles.left}>
          <div
            className={`${styles.logo} border border-black p-2 rounded-full`}
          >
            <Image
              src="/images/dwp-header.jpg"
              alt="Logo"
              width={2048}
              height={2048}
              className="rounded-full"
            />
          </div>
        </div>

        <div className={`${styles.right} flex items-center justify-end gap-6`}>
          <ul className={`${styles.menu} flex gap-6`}>
            {navBar.map((menu, index) => (
              <li key={index}>
                <Link
                  href={menu.link}
                  className="hover:underline text-sm font-medium"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
