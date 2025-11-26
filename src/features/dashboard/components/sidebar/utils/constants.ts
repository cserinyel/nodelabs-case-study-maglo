import {
  ErrorIcon,
  HomeIcon,
  InvoicesIcon,
  MyWalletsIcon,
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
    ariaLabel: "Dashboard",
  },
  {
    label: "Transactions",
    icon: TransactionsIcon,
    disabled: true,
    to: "/",
    ariaLabel: "Transactions",
  },
  {
    to: "/",
    label: "Invoices",
    icon: InvoicesIcon,
    disabled: true,
    ariaLabel: "Invoices",
  },
  {
    to: "/",
    label: "My Wallets",
    icon: MyWalletsIcon,
    disabled: true,
    ariaLabel: "My Wallets",
  },
  {
    to: "/",
    label: "Disabled",
    icon: ErrorIcon,
    disabled: true,
    ariaLabel: "Disabled item",
  },
];
