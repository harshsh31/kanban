import React from "react";
import { get } from "lodash";
import "../styles/Button.scss";

const classNames = {
  positive: "positive",
  negative: "negative",
};

const Button = (props) => {
  const { children, className, buttonType, onClick, type } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className ? className : ""} ${
        buttonType ? classNames[buttonType] : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
