import type { IconProps, IconSize } from "../icon/icon.types";

export type ButtonType = "primary" | "border" | "text";
export type ButtonSize = "small" | "default";
export type ButtonIconPosition = "left" | "right";
export type ButtonIconRotation = "0" | "90" | "180" | "270";
export type ButtonTextColor = "primary" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonType;
  buttonSize?: ButtonSize;
  textColor?: ButtonTextColor;
  icon?: IconProps["src"];
  iconSize?: IconSize;
  iconPosition?: ButtonIconPosition;
  iconRotation?: ButtonIconRotation;
}
