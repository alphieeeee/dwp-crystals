import React, { ButtonHTMLAttributes } from "react";
import styles from "@/styles/utils/Button.module.scss";

interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
  hoverBg?: string;
  hoverBorder?: string;
  hoverColor?: string;
  btnClick?: () => void;
}

const Button: React.FC<ButtonProps & React.HTMLAttributes<HTMLElement>> = ({
  className,
  style,
  type = "button",
  as = "button",
  href,
  children,
  hoverBg = "inherit",
  hoverBorder = "inherit",
  hoverColor = "inherit",
  btnClick,
  ...props
}) => {
  const customClasses = `${styles.btn}${className ? ` ${className}` : ""}`;
  // const defaultStyles: React.CSSProperties = { width: '158px', height: '46px' };
  // const customStyles = { ...defaultStyles, ...style };
  const customStyles = {
    ...style,
    "--hover-color": hoverColor,
    "--hover-bg": hoverBg,
    "--hover-border": hoverBorder,
  };

  if (as === "a" && href) {
    return (
      <a href={href} className={customClasses} style={customStyles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        className={`${customClasses}`}
        style={customStyles}
        onClick={btnClick}
        type={type}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
