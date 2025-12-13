import {
  Spinner as FlowbitSpinner,
  SpinnerProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<SpinnerProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {};
  // style?: DeepPartial<AccordionTheme> | { [key: string]: any };
  style?: {
    // Base Styles
    base_trackColor?: string;

    // --- Fill Color Variants (Complete) ---
    colorDefault_fillColor?: string;
    colorFailure_fillColor?: string;
    colorGray_fillColor?: string;
    colorInfo_fillColor?: string;
    colorPink_fillColor?: string;
    colorPurple_fillColor?: string;
    colorSuccess_fillColor?: string;
    colorWarning_fillColor?: string;

    // --- Light "off" State ---
    // (These apply when the `light` prop is false on dark mode)
    lightOff_trackColor?: string;
    lightOff_colorGray_fillColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Spinner.
 * This component accepts all standard SpinnerProps and renders a single
 * spinner element. It simplifies the process of creating spinners
 * by providing a clean, reusable interface.
 *
 * @param {object} props - The component props, which are all standard SpinnerProps.
 */
const Spinner: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Base Styles
    base_trackColor: "text-gray-200",

    // --- Fill Color Variants (Complete) ---
    colorDefault_fillColor: "fill-primary-600",
    colorFailure_fillColor: "fill-red-600",
    colorGray_fillColor: "fill-gray-600",
    colorInfo_fillColor: "fill-cyan-600",
    colorPink_fillColor: "fill-pink-600",
    colorPurple_fillColor: "fill-purple-600",
    colorSuccess_fillColor: "fill-green-500",
    colorWarning_fillColor: "fill-yellow-400",

    // --- Light "off" State ---
    lightOff_trackColor: "dark:text-gray-600",
    lightOff_colorGray_fillColor: "dark:fill-gray-300",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.spinner;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Styles
    base_trackColor: ["base"],

    // --- Fill Color Variants ---
    colorDefault_fillColor: ["color", "default"],
    colorFailure_fillColor: ["color", "failure"],
    colorGray_fillColor: ["color", "gray"],
    colorInfo_fillColor: ["color", "info"],
    colorPink_fillColor: ["color", "pink"],
    colorPurple_fillColor: ["color", "purple"],
    colorSuccess_fillColor: ["color", "success"],
    colorWarning_fillColor: ["color", "warning"],

    // --- Light "off" State ---
    lightOff_trackColor: ["light", "off", "base"],
    lightOff_colorGray_fillColor: ["light", "off", "color", "gray"],
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
    // The main FlowbitSpinner component accepts all standard props passed to it.
    <FlowbitSpinner
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    />
  );
};

export default Spinner;
