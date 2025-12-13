import {
  Pagination as FlowbitPagination,
  PaginationProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic pagination component.
// We extend the base PaginationProps to inherit all its properties like
// `currentPage`, `totalPages`, `onPageChange`, `showIcons`, etc.
interface Props extends Omit<PaginationProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {};
  style?: {
    // Layout Table Text Styles
    layoutTable_fontSize?: string;
    layoutTable_textColor?: string;
    layoutTableSpan_fontWeight?: string;
    layoutTableSpan_textColor?: string;

    // Previous Button Styles
    previousButton_rounding?: string;
    previousButton_borderWidth?: string;
    previousButton_borderColor?: string;
    previousButton_bgColor?: string;
    previousButton_padding?: string;
    previousButton_textColor?: string;
    previousButton_hover_bgColor?: string;
    previousButton_hover_textColor?: string;
    previousButtonIcon_size?: string;

    // Next Button Styles
    nextButton_rounding?: string;
    nextButton_borderWidth?: string;
    nextButton_borderColor?: string;
    nextButton_bgColor?: string;
    nextButton_padding?: string;
    nextButton_textColor?: string;
    nextButton_hover_bgColor?: string;
    nextButton_hover_textColor?: string;
    nextButtonIcon_size?: string;

    // Page Number Button Styles
    pageButton_borderWidth?: string;
    pageButton_borderColor?: string;
    pageButton_bgColor?: string;
    pageButton_padding?: string;
    pageButton_textColor?: string;
    pageButton_hover_bgColor?: string;
    pageButton_hover_textColor?: string;

    // Active Page Button Styles
    pageButtonActive_bgColor?: string;
    pageButtonActive_textColor?: string;
    pageButtonActive_hover_bgColor?: string;
    pageButtonActive_hover_textColor?: string;

    // Disabled Page Button Styles
    pageButtonDisabled_opacity?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Pagination.
 * This component accepts all standard PaginationProps and renders a single
 * pagination control. It simplifies the process of creating pagination
 * by providing a clean, reusable interface for state management in a parent component.
 *
 * @param {object} props - The component props, which are all standard PaginationProps.
 */
const Pagination: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Layout Table Text Styles
    layoutTable_fontSize: "text-sm",
    layoutTable_textColor: "text-gray-700",
    layoutTableSpan_fontWeight: "font-semibold",
    layoutTableSpan_textColor: "text-gray-900",

    // Previous Button Styles
    previousButton_rounding: "rounded-l-lg",
    previousButton_borderWidth: "border",
    previousButton_borderColor: "border-gray-300",
    previousButton_bgColor: "bg-white",
    previousButton_padding: "px-3 py-2",
    previousButton_textColor: "text-gray-500",
    previousButton_hover_bgColor: "enabled:hover:bg-gray-100",
    previousButton_hover_textColor: "enabled:hover:text-gray-700",
    previousButtonIcon_size: "h-5 w-5",

    // Next Button Styles
    nextButton_rounding: "rounded-r-lg",
    nextButton_borderWidth: "border",
    nextButton_borderColor: "border-gray-300",
    nextButton_bgColor: "bg-white",
    nextButton_padding: "px-3 py-2",
    nextButton_textColor: "text-gray-500",
    nextButton_hover_bgColor: "enabled:hover:bg-gray-100",
    nextButton_hover_textColor: "enabled:hover:text-gray-700",
    nextButtonIcon_size: "h-5 w-5",

    // Page Number Button Styles
    pageButton_borderWidth: "border",
    pageButton_borderColor: "border-gray-300",
    pageButton_bgColor: "bg-white",
    pageButton_padding: "py-2",
    pageButton_textColor: "text-gray-500",
    pageButton_hover_bgColor: "enabled:hover:bg-gray-100",
    pageButton_hover_textColor: "enabled:hover:text-gray-700",

    // Active Page Button Styles
    pageButtonActive_bgColor: "bg-cyan-50",
    pageButtonActive_textColor: "text-cyan-600",
    pageButtonActive_hover_bgColor: "hover:bg-cyan-100",
    pageButtonActive_hover_textColor: "hover:text-cyan-700",

    // Disabled Page Button Styles
    pageButtonDisabled_opacity: "opacity-50",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.pagination;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Layout Table Text Styles
    layoutTable_fontSize: ["layout", "table", "base"],
    layoutTable_textColor: ["layout", "table", "base"],
    layoutTableSpan_fontWeight: ["layout", "table", "span"],
    layoutTableSpan_textColor: ["layout", "table", "span"],

    // Previous Button Styles
    previousButton_rounding: ["pages", "previous", "base"],
    previousButton_borderWidth: ["pages", "previous", "base"],
    previousButton_borderColor: ["pages", "previous", "base"],
    previousButton_bgColor: ["pages", "previous", "base"],
    previousButton_padding: ["pages", "previous", "base"],
    previousButton_textColor: ["pages", "previous", "base"],
    previousButton_hover_bgColor: ["pages", "previous", "base"],
    previousButton_hover_textColor: ["pages", "previous", "base"],
    previousButtonIcon_size: ["pages", "previous", "icon"],

    // Next Button Styles
    nextButton_rounding: ["pages", "next", "base"],
    nextButton_borderWidth: ["pages", "next", "base"],
    nextButton_borderColor: ["pages", "next", "base"],
    nextButton_bgColor: ["pages", "next", "base"],
    nextButton_padding: ["pages", "next", "base"],
    nextButton_textColor: ["pages", "next", "base"],
    nextButton_hover_bgColor: ["pages", "next", "base"],
    nextButton_hover_textColor: ["pages", "next", "base"],
    nextButtonIcon_size: ["pages", "next", "icon"],

    // Page Number Button Styles
    pageButton_borderWidth: ["pages", "selector", "base"],
    pageButton_borderColor: ["pages", "selector", "base"],
    pageButton_bgColor: ["pages", "selector", "base"],
    pageButton_padding: ["pages", "selector", "base"],
    pageButton_textColor: ["pages", "selector", "base"],
    pageButton_hover_bgColor: ["pages", "selector", "base"],
    pageButton_hover_textColor: ["pages", "selector", "base"],

    // Active Page Button Styles
    pageButtonActive_bgColor: ["pages", "selector", "active"],
    pageButtonActive_textColor: ["pages", "selector", "active"],
    pageButtonActive_hover_bgColor: ["pages", "selector", "active"],
    pageButtonActive_hover_textColor: ["pages", "selector", "active"],

    // Disabled Page Button Styles
    pageButtonDisabled_opacity: ["pages", "selector", "disabled"],
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
    // The main Pagination component accepts all standard props passed to it.
    <FlowbitPagination
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    />
  );
};

export default Pagination;
