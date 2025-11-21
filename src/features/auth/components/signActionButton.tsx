import React from "react";
import { twMerge } from "tailwind-merge";

interface SignActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: "signIn" | "signUp";
}
const SignActionButton = ({ mode, ...props }: SignActionButtonProps) => {
  const swooshSvg = (
    <svg
      width="45"
      height="8"
      viewBox="0 0 45 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.901001 6.5C7.47045 1.56444 34.4948 -1.70074 43.901 6.49999"
        stroke="#C8EE44"
        stroke-width="3"
      />
    </svg>
  );

  const classes = twMerge(
    "flex items-center justify-center gap-2",
    "text-[var(--text-color-3)]",
    "text-[14px] font-normal"
  );
  const buttonClass = twMerge(
    "cursor-pointer",
    "text-[var(--text-color-1)]",
    "hover:text-[var(--color-primary)]",
    "transition-all duration-300"
  );
  const swooshClasses = twMerge(
    "absolute translate-y-[3px] left-0 w-full",
    "flex justify-center",
    "transition-all duration-250 pointer-events-none",
    "group-hover:translate-y-[2px]"
  );
  return (
    <div className={classes}>
      <span>
        {mode === "signIn"
          ? "Don't have an account?"
          : "Already have an account?"}
      </span>
      <div className="relative group">
        <button className={buttonClass} {...props}>
          {mode === "signIn" ? "Sign up" : "Sign in"}
        </button>
        <div className={swooshClasses}>{swooshSvg}</div>
      </div>
    </div>
  );
};

export default SignActionButton;
