import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  size?: "small" | "medium" | "large" | "xlarge";
  mode?: "iconOnly" | "coverContent";
}

const Spinner = ({ size = "small", mode = "iconOnly" }: SpinnerProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
    xlarge: "w-10 h-10",
  };
  const classes = twMerge(
    "w-4 h-4 border-2 border-t-transparent rounded-full",
    sizeClasses[size]
  );
  const spinnerClasses = twMerge("w-full h-full", "fill-(--color-primary)");
  const spinnerSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={spinnerClasses}
      aria-hidden="true"
    >
      <defs>
        <filter id="SVGp0LL3caJ">
          <feGaussianBlur in="SourceGraphic" result="y" stdDeviation="1" />
          <feColorMatrix
            in="y"
            result="z"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
          />
          <feBlend in="SourceGraphic" in2="z" />
        </filter>
      </defs>
      <g filter="url(#SVGp0LL3caJ)">
        <circle cx="5" cy="12" r="4">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2s"
            keySplines=".36,.62,.43,.99;.79,0,.58,.57"
            repeatCount="indefinite"
            values="5;8;5"
          />
        </circle>
        <circle cx="19" cy="12" r="4">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2s"
            keySplines=".36,.62,.43,.99;.79,0,.58,.57"
            repeatCount="indefinite"
            values="19;16;19"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </g>
    </svg>
  );

  if (mode === "iconOnly") {
    return (
      <div className={classes} role="status" aria-label="Loading">
        {spinnerSvg}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const coverContentClasses = twMerge(
    "absolute inset-0 z-50",
    "top-0 left-0",
    "w-full h-full",
    "flex flex-1 items-center justify-center",
    "bg-white/80"
  );

  return (
    <div className={coverContentClasses} role="status" aria-busy="true" aria-label="Loading content">
      <Spinner size="xlarge" />
    </div>
  );
};

export default Spinner;
