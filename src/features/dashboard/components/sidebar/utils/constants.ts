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
    label: "Dashboard",
    icon: HomeIcon,
    to: ROUTES.DASHBOARD.BASE,
    end: true,
  },
  {
    label: "Transactions",
    icon: TransactionsIcon,
    disabled: true,
    to: "/",
  },
  {
    to: "/",
    label: "Invoices",
    icon: InvoicesIcon,
    disabled: true,
  },
  {
    to: "/",
    label: "My Wallets",
    icon: MyWalletsIcon,
    disabled: true,
  },
  {
    to: ROUTES.DASHBOARD.SETTINGS,
    label: "Settings",
    icon: SettingsIcon,
  },
  {
    to: "/",
    label: "Disabled",
    disabled: true,
    icon: SettingsIcon,
  },
];
