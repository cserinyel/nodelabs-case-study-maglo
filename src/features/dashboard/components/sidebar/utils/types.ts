import type { To } from "react-router";

export interface SidebarMenuItem {
  label: string;
  path?: To;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}
