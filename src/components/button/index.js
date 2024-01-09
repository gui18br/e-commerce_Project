import React from "react";
import "./style.css";

export function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
