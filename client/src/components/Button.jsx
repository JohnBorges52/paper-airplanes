import React from "react";
import classNames from "classnames";

export const Button = (props) => {
  const buttonClass = classNames("button", {
    "button-confirm": props.confirm,
    "button-cancel" : props.cancel
  })
  
  return (
    <button className={buttonClass} disabled={props.disabled}  onClick={props.onClick}>
      {props.children}
    </button>
  )
}