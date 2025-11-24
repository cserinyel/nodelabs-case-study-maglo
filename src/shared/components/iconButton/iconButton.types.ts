export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: "xs" | "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
