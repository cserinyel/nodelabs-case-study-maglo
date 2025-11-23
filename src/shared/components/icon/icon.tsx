import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon.types";

const Icon = ({ src, size = "small", className }: IconProps) => {
  const sizeClass = {
    xxs: "w-[18px] h-[18px]",
    xs: "w-[20px] h-[20px]",
    small: "w-[24px] h-[24px]",
    medium: "w-[32px] h-[32px]",
    large: "w-[40px] h-[40px]",
  };
  const classes = twMerge(sizeClass[size], "object-cover", className);
  return <div className={classes}>{src}</div>;
};

export default Icon;
