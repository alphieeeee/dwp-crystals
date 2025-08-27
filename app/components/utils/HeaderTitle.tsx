"use client";
import React from "react";
import styles from "@/styles/utils/HeaderTitle.module.scss";

interface HeaderTitleProps {
  title: string;
  leftWidth?: string;
  rightWidth?: string;
  hideLeft?: boolean;
  hideRight?: boolean;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  leftWidth = "w-[25vw]",
  rightWidth = "w-[25vw]",
  hideLeft = false,
  hideRight = false,
}) => {
  return (
    <div className={`${styles.header} flex justify-between items-center`}>
      <div className={`${styles.divider} ${leftWidth} ${hideLeft ? "hidden" : ""}`}></div>
      <h2 className="font-bold">{title}</h2>
      <div className={`${styles.divider} ${rightWidth} ${hideRight ? "hidden" : ""}`}></div>
    </div>
  );
};

export default HeaderTitle;
