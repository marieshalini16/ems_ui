import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T extends { id: number | string }> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable< T extends { id: number | string } >({
  columns,
  data,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  
    if (data.length === 0) {
    return (

      <div className="px-5">
        <p className="py-10 text-center text-sm text-text-muted">
          {emptyMessage}
        </p>
      </div>

    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-light text-left">
            {columns.map((column) => (
              <th key={column.key} className="px-5 py-3 text-xs font-medium text-text-primary bg-navy-100">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-border-light last:border-0">

              {columns.map((column) => (
                <td key={column.key} className="px-5 py-3.5 text-sm text-text-secondary">
                  {column.render(item)}
                </td>
              ))}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}