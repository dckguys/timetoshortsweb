import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "ghost" | "filled";
  size?: "md" | "lg";
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };

type ButtonAsLink = ButtonBaseProps & {
  as: "a";
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children } = props;
  const className = `${styles.btn} ${styles[variant]} ${styles[size]}`;

  if (props.as === "a") {
    return (
      <a href={props.href} className={className} onClick={props.onClick}>
        {children}
      </a>
    );
  }

  const { as, variant: _v, size: _s, ...buttonProps } = props as ButtonAsButton & { as?: "button"; variant?: string; size?: string };
  return (
    <button className={className} {...buttonProps}>
      {children}
    </button>
  );
}
