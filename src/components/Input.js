import React, { useEffect, useRef } from "react";
import "../styles/Input.scss";

const Input = (props) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.focus();
  });
  return (
    <div className="inputWrapper">
      <input
        {...props}
        className={`${props.className || ""} input`}
        ref={ref}
      />
    </div>
  );
};

export default Input;
