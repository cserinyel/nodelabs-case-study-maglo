import { flexRender, type Table as TanStackTable } from "@tanstack/react-table";
import TableRow from "./components/tableRow";

interface TableProps<T> {
  tableObject: TanStackTable<T>;
  showHeader?: boolean;
}

function Table<T>({ tableObject, showHeader = true }: TableProps<T>) {
  return (
    <div className="w-full">
      <table className="w-full">
        {showHeader && (
          <thead className="sticky top-0 bg-white z-1 h-[15px]">
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
        )}
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
