import { twMerge } from "tailwind-merge";

interface TableHeadingProps {
  heading: string;
  align?: "left" | "center" | "right";
}

const TableHeading = ({ heading, align = "center" }: TableHeadingProps) => {
  const classes = twMerge(
    "font-semibold text-[12px]/[15px] text-(--text-color-2) pb-[5px]",
    align === "left" && "text-left"
  );
  return (
    <div className={classes}>
      <span>{heading}</span>
    </div>
  );
};

export default TableHeading;
