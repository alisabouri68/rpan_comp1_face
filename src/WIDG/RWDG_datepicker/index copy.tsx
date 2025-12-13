import {
  Datepicker as FlowbiteDatepicker,
  DatepickerProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// Interface for our dynamic datepicker component.
interface Props extends Omit<DatepickerProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {};
  style?: {
    // Popup Styles
    popup_rounding?: string;
    popup_bgColor?: string;
    popup_padding?: string;
    popup_shadow?: string;

    // Header Title Styles
    headerTitle_padding?: string;
    headerTitle_fontWeight?: string;
    headerTitle_textColor?: string;

    // Header Selector Button Styles
    selectorButton_rounding?: string;
    selectorButton_bgColor?: string;
    selectorButton_padding?: string;
    selectorButton_fontSize?: string;
    selectorButton_fontWeight?: string;
    selectorButton_textColor?: string;
    selectorButton_hover_bgColor?: string;
    selectorButton_focus_ringWidth?: string;
    selectorButton_focus_ringColor?: string;

    // View Container Styles
    view_padding?: string;

    // Footer Button Styles
    footerButton_rounding?: string;
    footerButton_padding?: string;
    footerButton_fontSize?: string;
    footerButton_fontWeight?: string;
    footerButton_focus_ringWidth?: string;

    // "Today" Button Styles
    todayButton_bgColor?: string;
    todayButton_textColor?: string;
    todayButton_hover_bgColor?: string;

    // "Clear" Button Styles
    clearButton_borderWidth?: string;
    clearButton_borderColor?: string;
    clearButton_bgColor?: string;
    clearButton_textColor?: string;
    clearButton_hover_bgColor?: string;

    // Days View: Header Styles
    daysHeader_fontSize?: string;
    daysHeader_fontWeight?: string;
    daysHeader_textColor?: string;

    // Days View: Item Styles
    dayItem_rounding?: string;
    dayItem_fontSize?: string;
    dayItem_fontWeight?: string;
    dayItem_textColor?: string;
    dayItem_hover_bgColor?: string;
    dayItemSelected_bgColor?: string;
    dayItemSelected_textColor?: string;
    dayItemSelected_hover_bgColor?: string;
    dayItemDisabled_textColor?: string;

    // Months View: Item Styles
    monthItem_rounding?: string;
    monthItem_fontSize?: string;
    monthItem_fontWeight?: string;
    monthItem_textColor?: string;
    monthItem_hover_bgColor?: string;
    monthItemSelected_bgColor?: string;
    monthItemSelected_textColor?: string;
    monthItemSelected_hover_bgColor?: string;
    monthItemDisabled_textColor?: string;

    // Years View: Item Styles
    yearItem_rounding?: string;
    yearItem_fontSize?: string;
    yearItem_fontWeight?: string;
    yearItem_textColor?: string;
    yearItem_hover_bgColor?: string;
    yearItemSelected_bgColor?: string;
    yearItemSelected_textColor?: string;
    yearItemSelected_hover_bgColor?: string;
    yearItemDisabled_textColor?: string;

    // Decades View: Item Styles
    decadeItem_rounding?: string;
    decadeItem_fontSize?: string;
    decadeItem_fontWeight?: string;
    decadeItem_textColor?: string;
    decadeItem_hover_bgColor?: string;
    decadeItemSelected_bgColor?: string;
    decadeItemSelected_textColor?: string;
    decadeItemSelected_hover_bgColor?: string;
    decadeItemDisabled_textColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Datepicker.
 * This component provides a complete form input with a label, datepicker, and optional helper text.
 * It manages its own internal state and passes the selected date back to the parent via a callback.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the datepicker.
 * @param {string} [props.helperText] - Optional helper text to display below the input.
 * @param {Date} [props.initialDate] - The initial date to set.
 * @param {(date: Date | null) => void} props.onDateChange - Callback function for when the date changes.
 * @param {DatepickerProps} props.rest - All other standard Datepicker props.
 */
const Datepicker: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Popup Styles
    popup_rounding: "rounded-lg",
    popup_bgColor: "bg-white",
    popup_padding: "p-4",
    popup_shadow: "shadow-lg",

    // Header Title Styles
    headerTitle_padding: "px-2 py-3",
    headerTitle_fontWeight: "font-semibold",
    headerTitle_textColor: "text-gray-900",

    // Header Selector Button Styles
    selectorButton_rounding: "rounded-lg",
    selectorButton_bgColor: "bg-white",
    selectorButton_padding: "px-5 py-2.5",
    selectorButton_fontSize: "text-sm",
    selectorButton_fontWeight: "font-semibold",
    selectorButton_textColor: "text-gray-900",
    selectorButton_hover_bgColor: "hover:bg-gray-100",
    selectorButton_focus_ringWidth: "focus:ring-2",
    selectorButton_focus_ringColor: "focus:ring-gray-200",

    // View Container Styles
    view_padding: "p-1",

    // Footer Button Styles
    footerButton_rounding: "rounded-lg",
    footerButton_padding: "px-5 py-2",
    footerButton_fontSize: "text-sm",
    footerButton_fontWeight: "font-medium",
    footerButton_focus_ringWidth: "focus:ring-4",

    // "Today" Button Styles
    todayButton_bgColor: "bg-primary-700",
    todayButton_textColor: "text-white",
    todayButton_hover_bgColor: "hover:bg-primary-800",

    // "Clear" Button Styles
    clearButton_borderWidth: "border",
    clearButton_borderColor: "border-gray-300",
    clearButton_bgColor: "bg-white",
    clearButton_textColor: "text-gray-900",
    clearButton_hover_bgColor: "hover:bg-gray-100",

    // Days View: Header Styles
    daysHeader_fontSize: "text-sm",
    daysHeader_fontWeight: "font-medium",
    daysHeader_textColor: "text-gray-500",

    // Days View: Item Styles
    dayItem_rounding: "rounded-lg",
    dayItem_fontSize: "text-sm",
    dayItem_fontWeight: "font-semibold",
    dayItem_textColor: "text-gray-900",
    dayItem_hover_bgColor: "hover:bg-gray-100",
    dayItemSelected_bgColor: "bg-primary-700",
    dayItemSelected_textColor: "text-white",
    dayItemSelected_hover_bgColor: "hover:bg-primary-600",
    dayItemDisabled_textColor: "text-gray-500",

    // Months View: Item Styles
    monthItem_rounding: "rounded-lg",
    monthItem_fontSize: "text-sm",
    monthItem_fontWeight: "font-semibold",
    monthItem_textColor: "text-gray-900",
    monthItem_hover_bgColor: "hover:bg-gray-100",
    monthItemSelected_bgColor: "bg-primary-700",
    monthItemSelected_textColor: "text-white",
    monthItemSelected_hover_bgColor: "hover:bg-primary-600",
    monthItemDisabled_textColor: "text-gray-500",

    // Years View: Item Styles
    yearItem_rounding: "rounded-lg",
    yearItem_fontSize: "text-sm",
    yearItem_fontWeight: "font-semibold",
    yearItem_textColor: "text-gray-900",
    yearItem_hover_bgColor: "hover:bg-gray-100",
    yearItemSelected_bgColor: "bg-primary-700",
    yearItemSelected_textColor: "text-white",
    yearItemSelected_hover_bgColor: "hover:bg-primary-600",
    yearItemDisabled_textColor: "text-gray-500",

    // Decades View: Item Styles
    decadeItem_rounding: "rounded-lg",
    decadeItem_fontSize: "text-sm",
    decadeItem_fontWeight: "font-semibold",
    decadeItem_textColor: "text-gray-900",
    decadeItem_hover_bgColor: "hover:bg-gray-100",
    decadeItemSelected_bgColor: "bg-primary-700",
    decadeItemSelected_textColor: "text-white",
    decadeItemSelected_hover_bgColor: "hover:bg-primary-600",
    decadeItemDisabled_textColor: "text-gray-500",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.datepicker;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Popup Styles
    popup_rounding: ["popup", "root", "inner"],
    popup_bgColor: ["popup", "root", "inner"],
    popup_padding: ["popup", "root", "inner"],
    popup_shadow: ["popup", "root", "inner"],

    // Header Title Styles
    headerTitle_padding: ["popup", "header", "title"],
    headerTitle_fontWeight: ["popup", "header", "title"],
    headerTitle_textColor: ["popup", "header", "title"],

    // Header Selector Button Styles
    selectorButton_rounding: ["popup", "header", "selectors", "button", "base"],
    selectorButton_bgColor: ["popup", "header", "selectors", "button", "base"],
    selectorButton_padding: ["popup", "header", "selectors", "button", "base"],
    selectorButton_fontSize: ["popup", "header", "selectors", "button", "base"],
    selectorButton_fontWeight: [
      "popup",
      "header",
      "selectors",
      "button",
      "base",
    ],
    selectorButton_textColor: [
      "popup",
      "header",
      "selectors",
      "button",
      "base",
    ],
    selectorButton_hover_bgColor: [
      "popup",
      "header",
      "selectors",
      "button",
      "base",
    ],
    selectorButton_focus_ringWidth: [
      "popup",
      "header",
      "selectors",
      "button",
      "base",
    ],
    selectorButton_focus_ringColor: [
      "popup",
      "header",
      "selectors",
      "button",
      "base",
    ],

    // View Container Styles
    view_padding: ["popup", "view", "base"],

    // Footer Button Styles
    footerButton_rounding: ["popup", "footer", "button", "base"],
    footerButton_padding: ["popup", "footer", "button", "base"],
    footerButton_fontSize: ["popup", "footer", "button", "base"],
    footerButton_fontWeight: ["popup", "footer", "button", "base"],
    footerButton_focus_ringWidth: ["popup", "footer", "button", "base"],

    // "Today" Button Styles
    todayButton_bgColor: ["popup", "footer", "button", "today"],
    todayButton_textColor: ["popup", "footer", "button", "today"],
    todayButton_hover_bgColor: ["popup", "footer", "button", "today"],

    // "Clear" Button Styles
    clearButton_borderWidth: ["popup", "footer", "button", "clear"],
    clearButton_borderColor: ["popup", "footer", "button", "clear"],
    clearButton_bgColor: ["popup", "footer", "button", "clear"],
    clearButton_textColor: ["popup", "footer", "button", "clear"],
    clearButton_hover_bgColor: ["popup", "footer", "button", "clear"],

    // Days View: Header Styles
    daysHeader_fontSize: ["views", "days", "header", "title"],
    daysHeader_fontWeight: ["views", "days", "header", "title"],
    daysHeader_textColor: ["views", "days", "header", "title"],

    // Days View: Item Styles
    dayItem_rounding: ["views", "days", "items", "item", "base"],
    dayItem_fontSize: ["views", "days", "items", "item", "base"],
    dayItem_fontWeight: ["views", "days", "items", "item", "base"],
    dayItem_textColor: ["views", "days", "items", "item", "base"],
    dayItem_hover_bgColor: ["views", "days", "items", "item", "base"],
    dayItemSelected_bgColor: ["views", "days", "items", "item", "selected"],
    dayItemSelected_textColor: ["views", "days", "items", "item", "selected"],
    dayItemSelected_hover_bgColor: [
      "views",
      "days",
      "items",
      "item",
      "selected",
    ],
    dayItemDisabled_textColor: ["views", "days", "items", "item", "disabled"],

    // Months View: Item Styles
    monthItem_rounding: ["views", "months", "items", "item", "base"],
    monthItem_fontSize: ["views", "months", "items", "item", "base"],
    monthItem_fontWeight: ["views", "months", "items", "item", "base"],
    monthItem_textColor: ["views", "months", "items", "item", "base"],
    monthItem_hover_bgColor: ["views", "months", "items", "item", "base"],
    monthItemSelected_bgColor: ["views", "months", "items", "item", "selected"],
    monthItemSelected_textColor: [
      "views",
      "months",
      "items",
      "item",
      "selected",
    ],
    monthItemSelected_hover_bgColor: [
      "views",
      "months",
      "items",
      "item",
      "selected",
    ],
    monthItemDisabled_textColor: [
      "views",
      "months",
      "items",
      "item",
      "disabled",
    ],

    // Years View: Item Styles
    yearItem_rounding: ["views", "years", "items", "item", "base"],
    yearItem_fontSize: ["views", "years", "items", "item", "base"],
    yearItem_fontWeight: ["views", "years", "items", "item", "base"],
    yearItem_textColor: ["views", "years", "items", "item", "base"],
    yearItem_hover_bgColor: ["views", "years", "items", "item", "base"],
    yearItemSelected_bgColor: ["views", "years", "items", "item", "selected"],
    yearItemSelected_textColor: ["views", "years", "items", "item", "selected"],
    yearItemSelected_hover_bgColor: [
      "views",
      "years",
      "items",
      "item",
      "selected",
    ],
    yearItemDisabled_textColor: ["views", "years", "items", "item", "disabled"],

    // Decades View: Item Styles
    decadeItem_rounding: ["views", "decades", "items", "item", "base"],
    decadeItem_fontSize: ["views", "decades", "items", "item", "base"],
    decadeItem_fontWeight: ["views", "decades", "items", "item", "base"],
    decadeItem_textColor: ["views", "decades", "items", "item", "base"],
    decadeItem_hover_bgColor: ["views", "decades", "items", "item", "base"],
    decadeItemSelected_bgColor: [
      "views",
      "decades",
      "items",
      "item",
      "selected",
    ],
    decadeItemSelected_textColor: [
      "views",
      "decades",
      "items",
      "item",
      "selected",
    ],
    decadeItemSelected_hover_bgColor: [
      "views",
      "decades",
      "items",
      "item",
      "selected",
    ],
    decadeItemDisabled_textColor: [
      "views",
      "decades",
      "items",
      "item",
      "disabled",
    ],
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
    <div className="flex flex-col gap-2">
      <FlowbiteDatepicker
        className={containerClasses}
        {...props}
        theme={mergedTheme as any}
      />
    </div>
  );
};

export default Datepicker;
