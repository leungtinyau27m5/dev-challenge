import clsx from "clsx";
import { HTMLProps, ReactNode } from "react";
import "./container.scss";

const Container = (props: ContainerProps) => {
  const { children, ...otherDivProps } = props;
  return (
    <div
      {...otherDivProps}
      className={clsx(otherDivProps.className, "container")}
    >
      {children}
    </div>
  );
};

export interface ContainerProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

export default Container;
