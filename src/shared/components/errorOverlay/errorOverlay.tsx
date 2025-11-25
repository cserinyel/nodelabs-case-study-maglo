import Button from "../button/button";
import Icon from "../icon/icon";
import { ErrorIcon } from "../../../assets/icons/icons";
import { twMerge } from "tailwind-merge";

interface ErrorOverlayProps {
  error: Error;
  onClick: () => void;
  buttonText: string;
  title?: string;
  orientation?: "vertical" | "horizontal";
}

const ErrorOverlay = ({
  error,
  onClick,
  title = "Error",
  buttonText,
  orientation = "vertical",
}: ErrorOverlayProps) => {
  const classes = twMerge(
    "flex flex-col justify-center items-center gap-[20px]",
    "h-full w-full",
    "p-[20px] bg-red-50 border border-red-200 rounded",
    orientation === "horizontal" &&
      "flex-row justify-between items-center gap-[20px]"
  );
  const contentClasses = twMerge(
    "flex flex-col items-center",
    orientation === "horizontal" &&
      "flex-row justify-between items-center gap-[20px] flex-1"
  );
  const textContainerClasses = twMerge(
    "flex flex-col items-center",
    orientation === "horizontal" && "flex-1"
  );

  return (
    <div className={classes}>
      <Icon
        src={<ErrorIcon />}
        size="large"
        className="text-red-600 animate-pulse"
      />
      <div className={contentClasses}>
        <div className={textContainerClasses}>
          <h1 className="text-red-600 text-[14px]/[100%] font-bold mb-[10px]">
            {title}
          </h1>
          <p
            className={twMerge(
              "text-red-600 text-[12px]/[100%] font-regular mb-[20px]",
              orientation === "horizontal" && "mb-0"
            )}
          >
            {error.message}
          </p>
        </div>
        {buttonText && (
          <div className="flex justify-center">
            <Button
              variant="border"
              onClick={onClick}
              className="w-auto"
              textColor="danger"
              buttonSize="small"
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorOverlay;
