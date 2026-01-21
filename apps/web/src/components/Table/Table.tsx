import React from 'react';

type Column<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
};

export function Table<T>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <table
      style={{
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
        width: '100%',
        maxWidth: 900,
      }}
    >
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={i}
              style={{
                border: '1px solid black',

                width: `${100 / columns.length}%`,
              }}
              className="font-labelXL p-1 text-left text-black italic md:p-3 md:text-5xl"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            {columns.map((col, c) => (
              <td
                key={c}
                style={{ border: '1px solid black', padding: 8 }}
                className="text-body md:text-base"
              >
                {col.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
