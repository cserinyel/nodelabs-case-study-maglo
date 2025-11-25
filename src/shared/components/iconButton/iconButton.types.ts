import type { IconSize } from "../icon/icon.types";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: IconSize;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
