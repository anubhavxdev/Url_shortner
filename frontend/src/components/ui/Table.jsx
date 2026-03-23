import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

const Table = ({ headers, data, className, renderRow }) => {
  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-outline-variant/15 bg-surface-container-lowest", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant/15">
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-surface-container transition-colors">
                {renderRow(item, i)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-12 text-center text-on-surface-variant text-sm italic">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
