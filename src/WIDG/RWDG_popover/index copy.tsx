import {
  Popover as FlowbitPopover,
  PopoverProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<PopoverProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {};
  style?: {
    // Base Container Styles
    base_rounding?: string;
    base_borderWidth?: string;
    base_borderColor?: string;
    base_bgColor?: string;
    base_shadow?: string;

    // Inner Content Styles
    content_rounding?: string;

    // Arrow Styles
    arrow_size?: string;
    arrow_borderWidth?: string;
    arrow_borderColor?: string;
    arrow_bgColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Popover.
 * This component accepts all standard PopoverProps and renders a single
 * popover element. It simplifies the process of creating popovers by
 * providing a clean, reusable interface.
 *
 * @param {object} props - The component props, which are all standard PopoverProps.
 */
const Popover: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Base Container Styles
    base_rounding: "rounded-lg",
    base_borderWidth: "border",
    base_borderColor: "border-gray-200",
    base_bgColor: "bg-white",
    base_shadow: "shadow-sm",

    // Inner Content Styles
    content_rounding: "rounded-[7px]",

    // Arrow Styles
    arrow_size: "h-2 w-2",
    arrow_borderWidth: "border",
    arrow_borderColor: "border-gray-200",
    arrow_bgColor: "bg-white",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.popover;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Container Styles
    base_rounding: ["base"],
    base_borderWidth: ["base"],
    base_borderColor: ["base"],
    base_bgColor: ["base"],
    base_shadow: ["base"],

    // Inner Content Styles
    content_rounding: ["content"],

    // Arrow Styles
    arrow_size: ["arrow", "base"],
    arrow_borderWidth: ["arrow", "base"],
    arrow_borderColor: ["arrow", "base"],
    arrow_bgColor: ["arrow", "base"],
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
    // The main FlowbitPopover component accepts all standard props passed to it.
    <FlowbitPopover
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    />
  );
};

export default Popover;
