export type IconSize = "small" | "medium" | "large";

export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  size?: IconSize;
  className?: string;
}
