import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="
                    whitespace-nowrap
                    px-4
                    py-3.5
                    text-left
                    text-xs
                    font-semibold
                    text-text-secondary
                  "
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center"
                >
                  <span className="text-sm text-text-muted">
                    Loading employees...
                  </span>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center"
                >
                  <span className="text-sm text-text-muted">
                    {emptyMessage}
                  </span>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="
                    border-b
                    border-border-light
                    last:border-b-0
                    hover:bg-surface-muted
                  "
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="
                        whitespace-nowrap
                        px-4
                        py-3.5
                        text-sm
                        text-text-secondary
                      "
                    >
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}