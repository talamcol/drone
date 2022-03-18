import React, { FC } from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const Button: FC<Props> = ({ label, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

export default Button;
