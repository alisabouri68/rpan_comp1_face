import {
  Tooltip as FlowbitTooltip,
  TooltipProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<TooltipProps, "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {};
  style?: {
    // Arrow Styles
    arrow_size?: string;
    arrow_styleDark_bgColor?: string;
    arrow_styleLight_bgColor?: string;
    arrow_styleAuto_bgColor?: string;

    // Base Tooltip Container Styles
    base_rounding?: string;
    base_padding?: string;
    base_fontSize?: string;
    base_fontWeight?: string;
    base_shadow?: string;

    // --- Style Variants ---
    // Dark Style
    styleDark_bgColor?: string;
    styleDark_textColor?: string;
    // Light Style
    styleLight_borderWidth?: string;
    styleLight_borderColor?: string;
    styleLight_bgColor?: string;
    styleLight_textColor?: string;
    // Auto Style
    styleAuto_borderWidth?: string;
    styleAuto_borderColor?: string;
    styleAuto_bgColor?: string;
    styleAuto_textColor?: string;
  };
}
/**
 * A dynamic wrapper component for the flowbite-react Tooltip.
 * This component accepts all standard TooltipProps and renders a single
 * tooltip element. It simplifies the process of creating tooltips by
 * providing a clean, reusable interface.
 *
 * @param {object} props - The component props, which are all standard TooltipProps.
 */
const Tooltip: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Arrow Styles
    arrow_size: "h-2 w-2",
    arrow_styleDark_bgColor: "bg-gray-900",
    arrow_styleLight_bgColor: "bg-white",
    arrow_styleAuto_bgColor: "bg-white",

    // Base Tooltip Container Styles
    base_rounding: "rounded-lg",
    base_padding: "px-3 py-2",
    base_fontSize: "text-sm",
    base_fontWeight: "font-medium",
    base_shadow: "shadow-sm",

    // --- Style Variants ---
    // Dark Style
    styleDark_bgColor: "bg-gray-900",
    styleDark_textColor: "text-white",
    // Light Style
    styleLight_borderWidth: "border",
    styleLight_borderColor: "border-gray-200",
    styleLight_bgColor: "bg-white",
    styleLight_textColor: "text-gray-900",
    // Auto Style
    styleAuto_borderWidth: "border",
    styleAuto_borderColor: "border-gray-200",
    styleAuto_bgColor: "bg-white",
    styleAuto_textColor: "text-gray-900",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.tooltip;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Arrow Styles
    arrow_size: ["arrow", "base"],
    arrow_styleDark_bgColor: ["arrow", "style", "dark"],
    arrow_styleLight_bgColor: ["arrow", "style", "light"],
    arrow_styleAuto_bgColor: ["arrow", "style", "auto"],

    // Base Tooltip Container Styles
    base_rounding: ["base"],
    base_padding: ["base"],
    base_fontSize: ["base"],
    base_fontWeight: ["base"],
    base_shadow: ["base"],

    // --- Style Variants ---
    // Dark Style
    styleDark_bgColor: ["style", "dark"],
    styleDark_textColor: ["style", "dark"],
    // Light Style
    styleLight_borderWidth: ["style", "light"],
    styleLight_borderColor: ["style", "light"],
    styleLight_bgColor: ["style", "light"],
    styleLight_textColor: ["style", "light"],
    // Auto Style
    styleAuto_borderWidth: ["style", "auto"],
    styleAuto_borderColor: ["style", "auto"],
    styleAuto_bgColor: ["style", "auto"],
    styleAuto_textColor: ["style", "auto"],
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
    // The main FlowbitTooltip component accepts all standard props passed to it.
    <FlowbitTooltip
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {props.children}
    </FlowbitTooltip>
  );
};

export default Tooltip;
