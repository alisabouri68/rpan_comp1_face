import {
  Progress as FlowbitProgress,
  ProgressProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<ProgressProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {};
  style?: {
    // Base Container Styles
    base_rounding?: string;
    base_bgColor?: string;

    // Label Styles
    label_fontWeight?: string;

    // Bar Styles
    bar_rounding?: string;
    bar_fontWeight?: string;
    bar_textColor?: string;

    // --- Bar Color Variants (Complete) ---
    colorDefault_bgColor?: string;
    colorDark_bgColor?: string;
    colorBlue_bgColor?: string;
    colorRed_bgColor?: string;
    colorGreen_bgColor?: string;
    colorYellow_bgColor?: string;
    colorIndigo_bgColor?: string;
    colorPurple_bgColor?: string;
    colorCyan_bgColor?: string;
    colorGray_bgColor?: string;
    colorLime_bgColor?: string;
    colorPink_bgColor?: string;
    colorTeal_bgColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Progress.
 * This component accepts all standard ProgressProps and renders a single
 * progress bar element. It simplifies the process of creating progress bars
 * by providing a clean, reusable interface.
 *
 * @param {object} props - The component props, which are all standard ProgressProps.
 */
const Progress: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Base Container Styles
    base_rounding: "rounded-full",
    base_bgColor: "bg-gray-200",

    // Label Styles
    label_fontWeight: "font-medium",

    // Bar Styles
    bar_rounding: "rounded-full",
    bar_fontWeight: "font-medium",
    bar_textColor: "text-primary-300",

    // --- Bar Color Variants (Complete) ---
    colorDefault_bgColor: "bg-primary-600",
    colorDark_bgColor: "bg-gray-600",
    colorBlue_bgColor: "bg-blue-600",
    colorRed_bgColor: "bg-red-600",
    colorGreen_bgColor: "bg-green-600",
    colorYellow_bgColor: "bg-yellow-400",
    colorIndigo_bgColor: "bg-indigo-600",
    colorPurple_bgColor: "bg-purple-600",
    colorCyan_bgColor: "bg-cyan-600",
    colorGray_bgColor: "bg-gray-500",
    colorLime_bgColor: "bg-lime-600",
    colorPink_bgColor: "bg-pink-500",
    colorTeal_bgColor: "bg-teal-600",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.progress;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Container Styles
    base_rounding: ["base"],
    base_bgColor: ["base"],

    // Label Styles
    label_fontWeight: ["label"],

    // Bar Styles
    bar_rounding: ["bar"],
    bar_fontWeight: ["bar"],
    bar_textColor: ["bar"],

    // --- Bar Color Variants ---
    colorDefault_bgColor: ["color", "default"],
    colorDark_bgColor: ["color", "dark"],
    colorBlue_bgColor: ["color", "blue"],
    colorRed_bgColor: ["color", "red"],
    colorGreen_bgColor: ["color", "green"],
    colorYellow_bgColor: ["color", "yellow"],
    colorIndigo_bgColor: ["color", "indigo"],
    colorPurple_bgColor: ["color", "purple"],
    colorCyan_bgColor: ["color", "cyan"],
    colorGray_bgColor: ["color", "gray"],
    colorLime_bgColor: ["color", "lime"],
    colorPink_bgColor: ["color", "pink"],
    colorTeal_bgColor: ["color", "teal"],
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
    // The main FlowbitProgress component accepts all standard props passed to it.
    <FlowbitProgress
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    />
  );
};

export default Progress;
