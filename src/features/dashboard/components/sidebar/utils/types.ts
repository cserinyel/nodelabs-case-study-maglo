import type { NavLinkProps, To } from "react-router";

export interface SidebarMenuItem extends Omit<NavLinkProps, "to"> {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ComponentType;
  className?: string;
  to?: To;
}
