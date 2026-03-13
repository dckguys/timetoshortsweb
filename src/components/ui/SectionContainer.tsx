import { ReactNode } from "react";
import styles from "./SectionContainer.module.css";

interface SectionContainerProps {
  id?: string;
  align?: "left" | "right" | "center";
  narrow?: boolean;
  scrollable?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionContainer({
  id,
  align = "center",
  narrow = false,
  scrollable = false,
  children,
  className,
  style,
}: SectionContainerProps) {
  return (
    <div
      className={`${styles.section} ${scrollable ? styles.scrollable : ""} ${className ?? ""}`}
      id={id}
      data-section
      style={style}
    >
      <div
        className={`${styles.inner} ${styles[align]} ${
          narrow ? styles.narrow : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
