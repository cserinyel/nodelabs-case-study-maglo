import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useFinancialRecentTransactions } from "../../../../hooks/useFinancialData";
import Button from "../../../../shared/components/button/button";
import Skeleton from "../../../../shared/components/skeleton/skeleton";
import {
  columnHelper,
  recentTransactionsTableItemPicker,
} from "./utils/helpers";
import TableHeading from "../../../../shared/components/table/components/tableHeading";
import TableContent from "../../../../shared/components/table/components/tableContent";
import Table from "../../../../shared/components/table/table";
import { useEffect, useState } from "react";
import type { FinancialTransaction } from "../../../../types/financial";
import { twMerge } from "tailwind-merge";
import { ArrowDownIcon } from "../../../../assets/icons/icons";
import { formatDate } from "../../../../utils/helpers";
import { getCurrencyWithSymbol } from "../../../finance/utils/helpers";

const recentTransactionsTableColumns = [
  columnHelper.accessor("name", {
    header: () => <TableHeading heading="NAME/BUSINESS" align="left" />,
    cell: (info) => {
      return (
        <TableContent
          props={{
            title: info.getValue(),
            subtitle: info.row.original.business,
            image: info.row.original.image,
            align: "left",
          }}
        />
      );
    },
  }),
  columnHelper.accessor("type", {
    size: 100,
    header: () => <TableHeading heading="TYPE" />,
    cell: (info) => (
      <TableContent
        props={{ title: info.getValue().toString(), variant: "light" }}
      />
    ),
  }),
  columnHelper.accessor("amount", {
    size: 100,
    header: () => <TableHeading heading="AMOUNT" />,
    cell: (info) => (
      <TableContent
        props={{
          title: getCurrencyWithSymbol(
            info.row.original.currency,
            info.getValue()
          ),
          isBold: true,
        }}
      />
    ),
  }),
  columnHelper.accessor("date", {
    size: 100,
    header: () => <TableHeading heading="DATE" />,
    cell: (info) => (
      <TableContent
        props={{ title: formatDate(info.getValue()), variant: "light" }}
      />
    ),
  }),
];

const RecentTransactions = () => {
  const { recentTransactions, isLoading, error, refetchRecentTransactions } =
    useFinancialRecentTransactions();

  const [data, setData] = useState<FinancialTransaction[]>([]);

  useEffect(() => {
    if (recentTransactions?.transactions) {
      const dashboardTableData = recentTransactionsTableItemPicker(
        recentTransactions.transactions,
        3
      );
      setData(dashboardTableData);
    }
  }, [recentTransactions]);

  const recentTransactionsTable = useReactTable<FinancialTransaction>({
    data,
    columns: recentTransactionsTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const widgetClasses = twMerge(
    "flex flex-col flex-1 gap-[20px] min-h-0",
    "w-full pt-[15px] pb-[5px] pl-[25px] pr-[20px]",
    " border border-gray-200 rounded-md overflow-hidden"
  );

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchRecentTransactions}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }
  if (isLoading || !recentTransactions || !recentTransactions.transactions) {
    return (
      <div className="w-full h-full flex-1">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
    );
  }

  return (
    <div className={widgetClasses}>
      <div className="flex flex-row justify-between items-center gap-[20px] w-full shrink-0 h-[22px]">
        <h1 className="widget-header-title">Recent Transactions</h1>
        <div className="flex flex-row items-center justify-end gap-[10px] shrink-0">
          <Button
            variant="text"
            buttonSize="small"
            onClick={() => {}}
            textColor="secondary"
            icon={ArrowDownIcon}
            iconSize="xxs"
            iconPosition="right"
            iconRotation="270"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="w-full flex-1 overflow-y-auto min-h-0 relative">
        <Table<FinancialTransaction> tableObject={recentTransactionsTable} />
      </div>
    </div>
  );
};

export default RecentTransactions;
