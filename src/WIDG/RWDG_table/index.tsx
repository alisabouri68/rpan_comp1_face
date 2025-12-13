/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  Table as FlowbiteTable,
  type TableProps,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import React, { useMemo } from "react";

// Interface for a single table column's header data.
interface ColumnData {
  key: string;
  label: React.ReactNode;
}

// A generic interface for a row's data.
interface RowData {
  id: string | number;
  [key: string]: any;
}

// The props for our main dynamic Table component.
export interface Props extends Omit<TableProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    columns: ColumnData[];
    rows: RowData[];
    striped?: boolean;
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default data for a demo-ready table ---
const defaultColumns: ColumnData[] = [
  { key: "productName", label: "Product Name" },
  { key: "color", label: "Color" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
];

const defaultRows: RowData[] = [
  {
    id: 1,
    productName: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    id: 2,
    productName: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: "$1999",
  },
  {
    id: 3,
    productName: "Magic Mouse 2",
    color: "Black",
    category: "Accessories",
    price: "$99",
  },
  {
    id: 4,
    productName: "Google Pixel Phone",
    color: "Gray",
    category: "Phone",
    price: "$799",
  },
];

export const defaultLogic = {
  columns: defaultColumns,
  rows: defaultRows,
  striped: true, // Let's make it striped by default
};

const Table: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default product list is used.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // These styles will be applied to the root <FlowbiteTable> element.
  const componentCss: CSSObject = useMemo(
    () => ({
      width: geometric.width,
      height: geometric.height,
      ...style,
    }),
    [geometric, style]
  );

  // ✨  Destructuring for cleaner access
  const { columns, rows, striped } = logic;

  return (
    <FlowbiteTable
      {...props}
      css={componentCss}
      // ✨  The `striped` prop is now functional!
      striped={striped}
    >
      <TableHead>
        {columns.map((column) => (
          <TableHeadCell key={column.key}>{column.label}</TableHeadCell>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={`${row.id}-${column.key}`}>
                {/* This mapping logic is perfect. */}
                {row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </FlowbiteTable>
  );
};

export default Table;
