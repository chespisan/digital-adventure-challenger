import { ChangeEvent } from "react";

export interface IInputComponent {
  label: string;
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  action: (event: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
}
