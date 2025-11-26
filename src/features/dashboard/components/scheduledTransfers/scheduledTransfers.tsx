import { useEffect, useState } from "react";
import { useFinancialScheduledTransfers } from "../../../../hooks/useFinancialData";
import Button from "../../../../shared/components/button/button";
import type { FinancialTransfer } from "../../../../types/financial";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableContent from "../../../../shared/components/table/components/tableContent";
import { getCurrencyWithSymbol } from "../../../finance/utils/helpers";
import { formatDate } from "../../../../utils/helpers";
import { scheduledTransfersColumnHelper } from "./utils/helpers";
import { ArrowDownIcon } from "../../../../assets/icons/icons";
import Table from "../../../../shared/components/table/table";
import Widget from "../../../../shared/components/widget/widget";
import { WIDGET_DELAYS } from "../../../../utils/animations";

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

  return (
    <Widget
      isLoading={isLoading || !scheduledTransfers}
      error={error}
      onRetry={refetchScheduledTransfers}
      className="gap-[10px]"
      animationDelay={WIDGET_DELAYS.scheduledTransfers}
      ariaLabelledBy="scheduled-transfers-title"
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
    </Widget>
  );
};

export default ScheduledTransfers;
