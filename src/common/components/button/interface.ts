export type TButton = "primary" | "secondary" | "tertiary" | "danger";

export interface IButtonComponent {
  text: string;
  color: TButton;
  action: () => void;
  disabled?: boolean;
  isIcon?: boolean;
  IconType?: JSX.Element;
}
