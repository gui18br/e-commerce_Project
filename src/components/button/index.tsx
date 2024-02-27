import React from "react";
import "./style.css";

interface ButtonProps {
  disabled?: boolean;
  smallButton?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={
        props.disabled
          ? "disabled"
          : props.smallButton
          ? "small-button"
          : "button"
      }
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
