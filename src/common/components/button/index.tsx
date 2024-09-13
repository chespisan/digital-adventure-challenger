import { IButtonComponent } from "./interface";

import "./button.scss";

export const ButtonComponent = ({
  action,
  color,
  text,
  disabled,
  isIcon,
  IconType,
}: IButtonComponent) => {
  return (
    <button
      className={`button button--${color}  ${
        disabled ? "button--disabled" : ""
      } ${isIcon ? "button--icon" : ""}`}
      onClick={action}
      disabled={disabled}
    >
      {IconType}
      {text}
    </button>
  );
};
