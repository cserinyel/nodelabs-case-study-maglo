export type IconSize = "xxs" | "xs" | "small" | "medium" | "large";

export interface IconProps {
  src: React.ComponentType;
  size?: IconSize;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}
