import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import Skeleton from "../skeleton/skeleton";
import ErrorOverlay from "../errorOverlay/errorOverlay";
import { fadeInUp, fadeInUpTransition } from "../../../utils/animations";

interface WidgetProps {
  children: ReactNode;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
  className?: string;
  animationDelay?: number;
  ariaLabelledBy?: string;
  errorOrientation?: "vertical" | "horizontal";
}

const Widget = ({
  children,
  isLoading,
  error,
  onRetry,
  className,
  animationDelay = 0,
  ariaLabelledBy,
  errorOrientation = "vertical",
}: WidgetProps) => {
  const skeletonClasses = twMerge(
    "w-full h-full flex-1 min-h-[300px] xl:min-h-0"
  );

  const widgetClasses = twMerge(
    "flex flex-col flex-1 gap-[20px] min-h-0",
    "w-full",
    className
  );

  if (error) {
    return (
      <ErrorOverlay
        error={error}
        onClick={onRetry}
        buttonText="Retry"
        orientation={errorOrientation}
      />
    );
  }

  if (isLoading) {
    return (
      <div className={skeletonClasses}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
    );
  }

  return (
    <motion.section
      className={widgetClasses}
      aria-labelledby={ariaLabelledBy}
      {...fadeInUp}
      transition={fadeInUpTransition(animationDelay)}
    >
      {children}
    </motion.section>
  );
};

export default Widget;
