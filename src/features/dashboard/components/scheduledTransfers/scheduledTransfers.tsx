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
import ErrorOverlay from "../../../../shared/components/errorOverlay/errorOverlay";
import { motion } from "motion/react";

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

  // eslint-disable-next-line react-hooks/incompatible-library
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
      <ErrorOverlay
        error={error}
        onClick={refetchScheduledTransfers}
        buttonText="Retry"
      />
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
    <motion.section
      className={widgetClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
      aria-labelledby="scheduled-transfers-title"
    >
      <header className="flex flex-row justify-between items-center gap-[20px] w-full shrink-0 h-[22px]">
        <h2 id="scheduled-transfers-title" className="widget-header-title">
          Scheduled Transfers
        </h2>
        <nav
          className="flex flex-row items-center justify-end gap-[10px] shrink-0"
          aria-label="Transfer actions"
        >
          <Button
            variant="text"
            buttonSize="small"
            onClick={() => {}}
            textColor="secondary"
            icon={ArrowDownIcon}
            iconSize="xxs"
            iconPosition="right"
            iconRotation="270"
            aria-label="View all scheduled transfers"
            data-tooltip-id="global-tooltip"
            data-tooltip-content="View all scheduled transfers"
          >
            View All
          </Button>
        </nav>
      </header>
      <div className="w-full flex-1 overflow-y-auto relative ">
        <Table<FinancialTransfer>
          tableObject={scheduledTransfersTable}
          showHeader={false}
        />
      </div>
    </motion.section>
  );
};

export default ScheduledTransfers;
