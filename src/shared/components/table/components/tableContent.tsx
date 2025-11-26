import { twMerge } from "tailwind-merge";

interface TableContentProps {
  props: {
    title: string;
    subtitle?: string;
    variant?: "default" | "light";
    image?: string;
    align?: "left" | "center" | "right";
    isBold?: boolean;
    circularImage?: boolean;
    smallImage?: boolean;
  };
}

const TableContent = ({ props }: TableContentProps) => {
  const {
    title,
    subtitle,
    variant = "default",
    image,
    align = "center",
    isBold = false,
    circularImage = false,
    smallImage = false,
  } = props;
  const classes = twMerge(
    "h-full flex flex-row justify-center items-center gap-[14px] min-w-[120px]",
    "pt-[15px] pb-[12px]",
    align === "left" && "justify-start",
    align === "right" && "justify-end"
  );
  const titleClasses = twMerge(
    "flex flex-col gap-[5px]",
    "font-[500] text-[14px]/[17px] text-(--text-color-1) text-center",
    align === "left" && "text-left",
    align === "right" && "text-right",
    variant === "light" && "font-[500] text-(--text-color-2)",
    isBold && "font-[600]"
  );
  const subtitleClasses = twMerge(
    "font-normal text-[12px]/[15px] text-(--text-color-2)",
    variant === "light" && "text-(--text-color-2)"
  );
  const imageClasses = twMerge(
    "w-[40px] h-[40px] rounded-[5px] object-cover",
    smallImage && "w-[33px] h-[33px]",
    circularImage && "rounded-full"
  );
  return (
    <div className={classes}>
      {image && <img src={image} alt={title} className={imageClasses} />}
      <div className={titleClasses}>
        <span>{title}</span>
        {subtitle && <span className={subtitleClasses}>{subtitle}</span>}
      </div>
    </div>
  );
};

export default TableContent;
