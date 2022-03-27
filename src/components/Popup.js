import React from "react";
import "../styles/Popup.scss";
import Button from "./Button";

const Popup = ({
  children,
  title,
  positiveText,
  positiveAction,
  negativeAction,
  negativeText,
  className,
}) => {
  return (
    <div className={`popup ${className ? className : ""}`}>
      <div className="header">{title}</div>
      <div className="body">{children}</div>
      <div className="actions">
        <Button buttonType={"positive"} onClick={positiveAction}>
          {positiveText}
        </Button>
        <Button buttonType={"negative"} onClick={negativeAction}>
          {negativeText}
        </Button>
      </div>
    </div>
  );
};

export default Popup;
