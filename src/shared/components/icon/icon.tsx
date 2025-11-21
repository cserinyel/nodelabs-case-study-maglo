import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon.types";

const Icon = ({ src, size = "small", className, ...props }: IconProps) => {
  const sizeClass = {
    small: "w-[24px] h-[24px]",
    medium: "w-[32px] h-[32px]",
    large: "w-[40px] h-[40px]",
  };
  const classes = twMerge(sizeClass[size], "object-cover", className);
  return (
    <div>
      <img src={src} alt="icon" className={classes} {...props} />
    </div>
  );
};

export default Icon;
