export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  label?: string;
  className?: string;
  labelClassName?: string;
  error?: string[];
}
