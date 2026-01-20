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
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} style={{ border: '1px solid black', padding: 8 }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            {columns.map((col, c) => (
              <td key={c} style={{ border: '1px solid black', padding: 8 }}>
                {col.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
