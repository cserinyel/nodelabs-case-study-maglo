import type { NavLinkProps } from "react-router";

export interface SidebarMenuItem extends NavLinkProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}
