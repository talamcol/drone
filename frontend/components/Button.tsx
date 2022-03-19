import React, { FC } from "react";

import styles from "./Button.module.css";

interface Props {
  label: string;
  onClick: () => void;
  type?: "emergency" | "takeOff" | "land" | "default";
  rowHeight?: number;
}

const Button: FC<Props> = ({
  label,
  onClick,
  type = "default",
  rowHeight = 1,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[styles.button, styles[type], styles[`row${rowHeight}`]].join(
        " "
      )}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
