import {
  Key,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';

export interface Column {
  title?: string;
  dataKey?: string;
  className?: string;
  emptyCellPlaceholder?: string | number | undefined;
  key?: Key;
  isSortable?: boolean;
  sortDirection?: 'none' | 'ascending' | 'descending';
  width?: number;
  truncateOverflow?: boolean;
  render?: (cell?: Cell, row?: Row, index?: number) => ReactNode;
}

export interface SortedColumn {
  id: string;
  sortOrder: 'asc' | 'desc';
}

export type Row = { [key: string]: any; } // eslint-disable-line @typescript-eslint/no-explicit-any
export type Cell = string | number | { [key: string]: unknown; } | unknown[]
export type EventWithColumnKey =
  (
    MouseEvent<HTMLTableHeaderCellElement> |
    KeyboardEvent<HTMLTableHeaderCellElement>
  )
  & { sortedKey: Key | undefined; };
