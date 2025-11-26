import { flexRender, type Row } from "@tanstack/react-table";
import { twMerge } from "tailwind-merge";

interface TableRowProps {
  row: Row<unknown>;
}

const TableRow = ({ row }: TableRowProps) => {
  const classes = twMerge(
    "min-h-[55px] border-b border-(--border-color) last:border-b-0"
  );
  return (
    <tr key={row.id} className={classes}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
