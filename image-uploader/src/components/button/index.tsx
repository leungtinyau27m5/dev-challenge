import clsx from "clsx";
import { HTMLProps, ReactNode } from "react";
import "./button.scss";

const Button = (props: ButtonProps) => {
  const { type = "primary", children, ...otherButtonProps } = props;
  return (
    <button
      {...otherButtonProps}
      className={clsx("button", type, otherButtonProps.className)}
    >
      {children}
    </button>
  );
};

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "primary";
  children?: ReactNode;
}

export default Button;
