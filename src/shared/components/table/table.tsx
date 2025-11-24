import { flexRender, type Table as TanStackTable } from "@tanstack/react-table";
import TableRow from "./components/tableRow";

interface TableProps<T> {
  tableObject: TanStackTable<T>;
}

function Table<T>({ tableObject }: TableProps<T>) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="sticky top-0 bg-white z-10 h-[15px]">
          {tableObject.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableObject.getRowModel().rows.map((row) => (
            <TableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
