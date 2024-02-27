import React from "react";
import "./style.css";

interface IndexProps {
  className: string;
  error: boolean;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Input(props: IndexProps) {
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
