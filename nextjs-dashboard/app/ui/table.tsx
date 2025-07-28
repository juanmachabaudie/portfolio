import { Column, Header } from "../lib/definitions";

type TableProps<T> = {
  headers: Header[];
  columns: Column<T>[];
  data: T[];
};

const Table = <T,>({ headers, columns, data }: TableProps<T>) => {
  return (
    <table className="hidden md:table min-w-full text-gray-900">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className={header.className ?? ""}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b py-3 text-sm">
            {columns.map((column, colIndex) => {
              const content =
                typeof column.render === "function"
                  ? column.render(row)
                  : (row as any)[column.render];

              return (
                <td key={colIndex} className={column.className ?? ""}>
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
