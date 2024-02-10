import React from "react";
import "./style.css";

export function Input(props) {
  return (
    <div>
      <input
        className={`${props.className} ${props.error ? "invalid" : ""}`}
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
}
