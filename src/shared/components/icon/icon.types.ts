export type IconSize = "xxs" | "xs" | "small" | "medium" | "large";

export interface IconProps {
  src: React.ReactNode;
  size?: IconSize;
  className?: string;
}
