import React, { FunctionComponent } from "react";
import styles from "../../styles/styles.module.css";

export const Arrow: FunctionComponent<ArrowProps> = (props: ArrowProps) => {
  return (
    <div
      className={styles.carouselArrow}
      onClick={props.onClick}
      data-direction={props.direction}
    >
      <span>{props.position === "right"? '>' : '<'}</span>
    </div>
  );
};
export interface ArrowProps {
  onClick?: (...args: any) => any;
  direction: string;
  position: string;
}
