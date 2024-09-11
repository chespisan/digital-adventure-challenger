import { IButtonComponent } from "./interface";

import "./button.scss";

export const ButtonComponent = ({
  action,
  color,
  text,
  disabled,
}: IButtonComponent) => {
  return (
    <button
      className={`button button--${color} ${
        disabled ? "button--disabled" : ""
      }`}
      onClick={action}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
