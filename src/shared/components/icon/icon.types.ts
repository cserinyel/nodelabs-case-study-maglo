export type IconSize = "xsmall" | "small" | "medium" | "large";

export interface IconProps {
  src: React.ReactNode;
  size?: IconSize;
  className?: string;
}
