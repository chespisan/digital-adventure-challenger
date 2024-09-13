import { IInputComponent } from "./interface";

import "./input.scss";

export const InputComponent = ({
  label,
  name,
  placeholder,
  type,
  value,
  action,
  isError,
  errorMessage,
}: IInputComponent) => {
  return (
    <div className="container">
      <label className="container__label">{label}</label>
      <input
        className="container__input"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={action}
      />
      {isError && <p className="container__error-message">{errorMessage}</p>}
    </div>
  );
};
