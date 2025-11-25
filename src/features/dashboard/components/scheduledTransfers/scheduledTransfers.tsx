import { useEffect, useState } from "react";
import { useFinancialScheduledTransfers } from "../../../../hooks/useFinancialData";
import Button from "../../../../shared/components/button/button";
import Skeleton from "../../../../shared/components/skeleton/skeleton";
import type { FinancialTransfer } from "../../../../types/financial";
import { twMerge } from "tailwind-merge";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableContent from "../../../../shared/components/table/components/tableContent";
import { getCurrencyWithSymbol } from "../../../finance/utils/helpers";
import { formatDate } from "../../../../utils/helpers";
import { scheduledTransfersColumnHelper } from "./utils/helpers";
import { ArrowDownIcon } from "../../../../assets/icons/icons";
import Table from "../../../../shared/components/table/table";

const scheduledTransfersTableColumns = [
  scheduledTransfersColumnHelper.accessor("name", {
    cell: (info) => {
      return (
        <TableContent
          props={{
            title: info.getValue(),
            subtitle: formatDate(info.row.original.date),
            image: info.row.original.image,
            align: "left",
            circularImage: true,
          }}
        />
      );
    },
  }),
  scheduledTransfersColumnHelper.accessor("amount", {
    cell: (info) => (
      <TableContent
        props={{
          title: getCurrencyWithSymbol({
            currency: info.row.original.currency,
            value: info.getValue(),
          }),
          isBold: true,
          align: "right",
        }}
      />
    ),
  }),
];

const ScheduledTransfers = () => {
  const { scheduledTransfers, isLoading, error, refetchScheduledTransfers } =
    useFinancialScheduledTransfers();

  const [data, setData] = useState<FinancialTransfer[]>([]);

  useEffect(() => {
    if (scheduledTransfers?.transfers) {
      setData(scheduledTransfers.transfers);
    }
  }, [scheduledTransfers]);

  const scheduledTransfersTable = useReactTable<FinancialTransfer>({
    data,
    columns: scheduledTransfersTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const widgetClasses = twMerge(
    "flex flex-col flex-1 gap-[10px] min-h-0",
    "w-full"
  );

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error.message}</p>
        <Button
          variant="border"
          onClick={refetchScheduledTransfers}
          disabled={isLoading}
          className="mt-4 w-auto"
        >
          Retry
        </Button>
      </div>
    );
  }
  if (isLoading || !scheduledTransfers) {
    return (
      <div className={twMerge("w-full h-full flex-1 min-h-[300px] xl:min-h-0")}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
    );
  }
  return (
    <div className={widgetClasses}>
      <div className="flex flex-row justify-between items-center gap-[20px] w-full shrink-0 h-[22px]">
        <h1 className="widget-header-title">Scheduled Transfers</h1>
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
      <div className="w-full flex-1 overflow-y-auto relative ">
        <Table<FinancialTransfer>
          tableObject={scheduledTransfersTable}
          showHeader={false}
        />
      </div>
    </div>
  );
};

export default ScheduledTransfers;
