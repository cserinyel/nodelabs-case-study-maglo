import type { IconProps, IconSize } from "../icon/icon.types";

export type ButtonType = "primary" | "border" | "text";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonType;
  icon?: IconProps["src"];
  iconSize?: IconSize;
}
