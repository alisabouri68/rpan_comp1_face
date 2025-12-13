import {
  Table as FlowbitTable,
  TableProps,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// Interface for a single table column's header data.
interface ColumnData {
  key: string;
  label: React.ReactNode;
}

// A generic interface for a row's data. Each row must have a unique identifier.
interface RowData {
  id: string | number;
  [key: string]: any; // Allows for dynamic keys based on the ColumnData
}

// The props for our main dynamic Table component.
// It accepts all standard TableProps and our custom `columns` and `rows` arrays.
interface Props extends Omit<TableProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    columns: ColumnData[];
    rows: RowData[];
  };
  style?: {
    // Root Container Styles
    root_fontSize?: string;
    root_textColor?: string;

    // Shadow Styles (for the container)
    shadow_rounding?: string;
    shadow_bgColor?: string;
    shadow_shadow?: string;

    // Body Cell Styles
    bodyCell_padding?: string;

    // Head Base Styles
    head_fontSize?: string;
    head_textTransform?: string;
    head_textColor?: string;

    // Head Cell Styles
    headCell_bgColor?: string;
    headCell_padding?: string;
    headCell_rounding?: string;

    // Row States
    row_hover_bgColor?: string;
    rowStriped_odd_bgColor?: string;
    rowStriped_even_bgColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Table.
 * This component accepts an array of column and row data and renders a full table.
 * It simplifies the process of creating tables from a data source,
 * making the component highly reusable and easy to manage.
 *
 * @param {object} props - The component props.
 * @param {ColumnData[]} props.columns - An array of objects for the table headers.
 * @param {RowData[]} props.rows - An array of objects for the table body rows.
 * @param {TableProps} props.rest - All other standard Table props.
 */
const Table: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Root Container Styles
    root_fontSize: "text-sm",
    root_textColor: "text-gray-500",

    // Shadow Styles (for the container)
    shadow_rounding: "rounded-lg",
    shadow_bgColor: "bg-white",
    shadow_shadow: "drop-shadow-md",

    // Body Cell Styles
    bodyCell_padding: "px-6 py-4",

    // Head Base Styles
    head_fontSize: "text-xs",
    head_textTransform: "uppercase",
    head_textColor: "text-gray-700",

    // Head Cell Styles
    headCell_bgColor: "bg-gray-50",
    headCell_padding: "px-6 py-3",
    headCell_rounding:
      "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg",

    // Row States
    row_hover_bgColor: "hover:bg-gray-50",
    rowStriped_odd_bgColor: "odd:bg-white",
    rowStriped_even_bgColor: "even:bg-gray-50",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.table;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Root Container Styles
    root_fontSize: ["root", "base"],
    root_textColor: ["root", "base"],

    // Shadow Styles (for the container)
    shadow_rounding: ["root", "shadow"],
    shadow_bgColor: ["root", "shadow"],
    shadow_shadow: ["root", "shadow"],

    // Body Cell Styles
    bodyCell_padding: ["body", "cell", "base"],

    // Head Base Styles
    head_fontSize: ["head", "base"],
    head_textTransform: ["head", "base"],
    head_textColor: ["head", "base"],

    // Head Cell Styles
    headCell_bgColor: ["head", "cell", "base"],
    headCell_padding: ["head", "cell", "base"],
    headCell_rounding: ["head", "cell", "base"],

    // Row States
    row_hover_bgColor: ["row", "hovered"],
    rowStriped_odd_bgColor: ["row", "striped"],
    rowStriped_even_bgColor: ["row", "striped"],
  };

  /**
   * A helper function to merge a value into a nested property of an object.
   * It traverses the object using the path and merges the value at the destination.
   */
  function mergeNestedProperty(targetObj: any, path: string[], value: string) {
    let current = targetObj;
    // Traverse the path to the second-to-last element
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]] = current[path[i]] || {};
    }
    // Merge the value at the final destination
    const lastKey = path[path.length - 1];
    current[lastKey] = twMerge(current[lastKey], value);
  }

  // Deeply merge the default Flowbite theme with the custom `style` prop.
  // useMemo ensures this expensive operation only runs when the theme or style props change.
  const mergedTheme = useMemo(() => {
    const appearance = style || {};
    const newTheme = JSON.parse(JSON.stringify(defaultTheme));

    // Loop through the keys of the provided appearance object
    for (const key in appearance) {
      // Check if the key is a valid key of AccordionAppearance and has a mapping
      if (Object.prototype.hasOwnProperty.call(themeMap, key)) {
        const path = themeMap[key as keyof typeof style];
        const value = appearance[key as keyof typeof style];

        if (path && value) {
          // Use the helper to merge the value at the correct nested path
          mergeNestedProperty(newTheme, path, value);
        }
      }
    }

    return newTheme;
  }, [defaultTheme, style]);

  const containerClasses = twMerge(
    geometric.width as string,
    geometric.height as string
  );

  return (
    // The main FlowbitTable component accepts all its standard props.
    <FlowbitTable
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      <TableHead>
        <TableRow>
          {logic.columns.map((column) => (
            <TableHeadCell key={column.key}>{column.label}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody className="divide-y">
        {logic.rows.map((row) => (
          <TableRow
            key={row.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            {logic.columns.map((column) => (
              <TableCell key={`${row.id}-${column.key}`}>
                {row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </FlowbitTable>
  );
};

export default Table;
