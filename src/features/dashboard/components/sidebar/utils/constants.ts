import {
  HomeIcon,
  InvoicesIcon,
  MyWalletsIcon,
  SettingsIcon,
  TransactionsIcon,
} from "../../../../../assets/icons/icons";
import { ROUTES } from "../../../../../routes/utils/constants";
import type { SidebarMenuItem } from "./types";

export const sidebarMainMenuItems: SidebarMenuItem[] = [
  {
    path: ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/",
    label: "Transactions",
    icon: TransactionsIcon,
  },
  {
    path: "/",
    label: "Invoices",
    icon: InvoicesIcon,
  },
  {
    path: "/",
    label: "My Wallets",
    icon: MyWalletsIcon,
  },
  {
    path: "/",
    label: "Settings",
    icon: SettingsIcon,
  },
  {
    path: "/",
    label: "Disabled",
    disabled: true,
    icon: SettingsIcon,
  },
];
