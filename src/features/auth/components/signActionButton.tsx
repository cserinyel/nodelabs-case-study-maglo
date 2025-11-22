import React from "react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

interface SignActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: "signIn" | "signUp";
}
const SignActionButton = ({ mode }: SignActionButtonProps) => {
  const swooshSvg = (
    <svg
      width="45"
      height="8"
      viewBox="0 0 45 8"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-(--color-primary)"
    >
      <path d="M21.2676 0.0754437C25.7288 -0.132582 30.3189 0.0756769 34.4248 0.874272C38.5045 1.6678 42.2519 3.07238 44.8867 5.36939L42.916 7.63111C40.8478 5.82797 37.6894 4.56506 33.8516 3.81861C30.0397 3.07725 25.6989 2.8724 21.4072 3.07251C17.1188 3.27249 12.9263 3.87505 9.42188 4.7229C5.86481 5.58351 3.19166 6.6561 1.80273 7.69947L0 5.30103C1.89582 3.87672 5.06457 2.6903 8.71582 1.80689C12.4199 0.910722 16.8032 0.283622 21.2676 0.0754437Z" />
    </svg>
  );

  const classes = twMerge(
    "flex items-center justify-center gap-2",
    "text-[var(--text-color-2)]",
    "text-[14px] font-normal"
  );
  const buttonClass = twMerge(
    "cursor-pointer",
    "text-[var(--text-color-1)]",
    "hover:text-[var(--color-primary-600)]",
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
        <NavLink
          to={mode === "signIn" ? "/auth/signup" : "/auth/signin"}
          className={buttonClass}
        >
          {mode === "signIn" ? "Sign up" : "Sign in"}
        </NavLink>
        <div className={swooshClasses}>{swooshSvg}</div>
      </div>
    </div>
  );
};

export default SignActionButton;
