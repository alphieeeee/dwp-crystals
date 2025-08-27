"use client";
import React from "react";
import styles from "@/styles/Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.container} py-12 mt-12`}>
      <div className="mx-auto w-[min(90vw,1920px)] px-4 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">DWP Crystals</h3>
          <p className="text-md text-white">
            © {new Date().getFullYear()} DWP Crystals. All rights reserved.
          </p>
        </div>

        <div className="relative flex gap-4">
          <div className={`${styles.social} ${styles.fb}`}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg
                className="max-w-full h-auto fill-white hover:fill-[#ffdaed] transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>
          <div className={`${styles.social} ${styles.insta}`}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg
                className="max-w-full h-auto fill-white hover:fill-[#ffdaed] transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1.1.5 1.6 1s.8 1 1 1.6c.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1.1-1 1.6s-1 .8-1.6 1c-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1.1-.5-1.6-1s-.8-1-1-1.6c-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1.1 1-1.6s1-.8 1.6-1c.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.6.2 4.6.4 3.8.7 2.9 1 2.2 1.5 1.5 2.2.8 2.9.3 3.6.1 4.5c-.3.8-.5 1.8-.6 3.2C-.1 8.3-.1 8.7-.1 12s0 3.7.1 4.9c.1 1.4.3 2.4.6 3.2.2.9.7 1.6 1.4 2.3.7.7 1.4 1.2 2.3 1.4.8.3 1.8.5 3.2.6 1.3.1 1.7.1 4.9.1s3.7 0 4.9-.1c1.4-.1 2.4-.3 3.2-.6.9-.2 1.6-.7 2.3-1.4.7-.7 1.2-1.4 1.4-2.3.3-.8.5-1.8.6-3.2.1-1.3.1-1.7.1-4.9s0-3.7-.1-4.9c-.1-1.4-.3-2.4-.6-3.2-.2-.9-.7-1.6-1.4-2.3C21.6.8 20.9.3 20 .1c-.8-.3-1.8-.5-3.2-.6C15.7-.1 15.3-.1 12-.1z" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
