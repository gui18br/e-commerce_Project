import React from "react";
import "./style.css";

export function Button(props) {
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
