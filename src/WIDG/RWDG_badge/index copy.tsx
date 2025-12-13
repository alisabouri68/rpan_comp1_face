import {
  Badge as FlowbiteBadge,
  BadgeProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic badge component.
// We extend the base BadgeProps to accept all its properties like color, size, and href.
// This ensures full compatibility with the flowbite-react documentation.
interface Props extends Omit<BadgeProps, "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {};
  style?: {
    // Root Styles
    root_gap?: string;
    root_fontWeight?: string;

    // Icon with Text Styles ('off' state)
    iconOff_rounding?: string;
    iconOff_padding?: string;

    // Icon-Only Styles ('on' state)
    iconOn_rounding?: string;
    iconOn_padding?: string;

    // --- Color Variants (Complete) ---
    colorInfo_bgColor?: string;
    colorInfo_textColor?: string;
    colorInfo_hover_bgColor?: string;
    colorGray_bgColor?: string;
    colorGray_textColor?: string;
    colorGray_hover_bgColor?: string;
    colorFailure_bgColor?: string;
    colorFailure_textColor?: string;
    colorFailure_hover_bgColor?: string;
    colorSuccess_bgColor?: string;
    colorSuccess_textColor?: string;
    colorSuccess_hover_bgColor?: string;
    colorWarning_bgColor?: string;
    colorWarning_textColor?: string;
    colorWarning_hover_bgColor?: string;
    colorIndigo_bgColor?: string;
    colorIndigo_textColor?: string;
    colorIndigo_hover_bgColor?: string;
    colorPurple_bgColor?: string;
    colorPurple_textColor?: string;
    colorPurple_hover_bgColor?: string;
    colorPink_bgColor?: string;
    colorPink_textColor?: string;
    colorPink_hover_bgColor?: string;
    colorBlue_bgColor?: string;
    colorBlue_textColor?: string;
    colorBlue_hover_bgColor?: string;
    colorCyan_bgColor?: string;
    colorCyan_textColor?: string;
    colorCyan_hover_bgColor?: string;
    colorDark_bgColor?: string;
    colorDark_textColor?: string;
    colorDark_hover_bgColor?: string;
    colorLight_bgColor?: string;
    colorLight_textColor?: string;
    colorLight_hover_bgColor?: string;
    colorGreen_bgColor?: string;
    colorGreen_textColor?: string;
    colorGreen_hover_bgColor?: string;
    colorLime_bgColor?: string;
    colorLime_textColor?: string;
    colorLime_hover_bgColor?: string;
    colorRed_bgColor?: string;
    colorRed_textColor?: string;
    colorRed_hover_bgColor?: string;
    colorTeal_bgColor?: string;
    colorTeal_textColor?: string;
    colorTeal_hover_bgColor?: string;
    colorYellow_bgColor?: string;
    colorYellow_textColor?: string;
    colorYellow_hover_bgColor?: string;
  };
}

/**
 * A dynamic wrapper component for a single flowbite-react Badge.
 * This component accepts all standard BadgeProps and renders a single Badge element.
 * It simplifies the process of displaying badges with various properties
 * like color, size, href, and icons in a reusable manner.
 *
 * @param {object} props - The component props, which are all standard BadgeProps.
 */
const Badge: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Root Styles
    root_gap: "gap-1",
    root_fontWeight: "font-semibold",

    // Icon with Text Styles ('off' state)
    iconOff_rounding: "rounded",
    iconOff_padding: "px-2 py-0.5",

    // Icon-Only Styles ('on' state)
    iconOn_rounding: "rounded-full",
    iconOn_padding: "p-1.5",

    // --- Color Variants (Complete) ---
    colorInfo_bgColor: "bg-cyan-100",
    colorInfo_textColor: "text-cyan-800",
    colorInfo_hover_bgColor: "hover:bg-cyan-200",
    colorGray_bgColor: "bg-gray-100",
    colorGray_textColor: "text-gray-800",
    colorGray_hover_bgColor: "hover:bg-gray-200",
    colorFailure_bgColor: "bg-red-100",
    colorFailure_textColor: "text-red-800",
    colorFailure_hover_bgColor: "hover:bg-red-200",
    colorSuccess_bgColor: "bg-green-100",
    colorSuccess_textColor: "text-green-800",
    colorSuccess_hover_bgColor: "hover:bg-green-200",
    colorWarning_bgColor: "bg-yellow-100",
    colorWarning_textColor: "text-yellow-800",
    colorWarning_hover_bgColor: "hover:bg-yellow-200",
    colorIndigo_bgColor: "bg-indigo-100",
    colorIndigo_textColor: "text-indigo-800",
    colorIndigo_hover_bgColor: "hover:bg-indigo-200",
    colorPurple_bgColor: "bg-purple-100",
    colorPurple_textColor: "text-purple-800",
    colorPurple_hover_bgColor: "hover:bg-purple-200",
    colorPink_bgColor: "bg-pink-100",
    colorPink_textColor: "text-pink-800",
    colorPink_hover_bgColor: "hover:bg-pink-200",
    colorBlue_bgColor: "bg-blue-100",
    colorBlue_textColor: "text-blue-800",
    colorBlue_hover_bgColor: "hover:bg-blue-200",
    colorCyan_bgColor: "bg-cyan-100",
    colorCyan_textColor: "text-cyan-800",
    colorCyan_hover_bgColor: "hover:bg-cyan-200",
    colorDark_bgColor: "bg-gray-600",
    colorDark_textColor: "text-gray-100",
    colorDark_hover_bgColor: "hover:bg-gray-500",
    colorLight_bgColor: "bg-gray-200",
    colorLight_textColor: "text-gray-800",
    colorLight_hover_bgColor: "hover:bg-gray-300",
    colorGreen_bgColor: "bg-green-100",
    colorGreen_textColor: "text-green-800",
    colorGreen_hover_bgColor: "hover:bg-green-200",
    colorLime_bgColor: "bg-lime-100",
    colorLime_textColor: "text-lime-800",
    colorLime_hover_bgColor: "hover:bg-lime-200",
    colorRed_bgColor: "bg-red-100",
    colorRed_textColor: "text-red-800",
    colorRed_hover_bgColor: "hover:bg-red-200",
    colorTeal_bgColor: "bg-teal-100",
    colorTeal_textColor: "text-teal-800",
    colorTeal_hover_bgColor: "hover:bg-teal-200",
    colorYellow_bgColor: "bg-yellow-100",
    colorYellow_textColor: "text-yellow-800",
    colorYellow_hover_bgColor: "hover:bg-yellow-200",
  },
  children,
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.badge;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Root Styles
    root_gap: ["root", "base"],
    root_fontWeight: ["root", "base"],

    // Icon with Text Styles ('off' state)
    iconOff_rounding: ["icon", "off"],
    iconOff_padding: ["icon", "off"],

    // Icon-Only Styles ('on' state)
    iconOn_rounding: ["icon", "on"],
    iconOn_padding: ["icon", "on"],

    // --- Color Variants ---
    colorInfo_bgColor: ["root", "color", "info"],
    colorInfo_textColor: ["root", "color", "info"],
    colorInfo_hover_bgColor: ["root", "color", "info"],
    colorGray_bgColor: ["root", "color", "gray"],
    colorGray_textColor: ["root", "color", "gray"],
    colorGray_hover_bgColor: ["root", "color", "gray"],
    colorFailure_bgColor: ["root", "color", "failure"],
    colorFailure_textColor: ["root", "color", "failure"],
    colorFailure_hover_bgColor: ["root", "color", "failure"],
    colorSuccess_bgColor: ["root", "color", "success"],
    colorSuccess_textColor: ["root", "color", "success"],
    colorSuccess_hover_bgColor: ["root", "color", "success"],
    colorWarning_bgColor: ["root", "color", "warning"],
    colorWarning_textColor: ["root", "color", "warning"],
    colorWarning_hover_bgColor: ["root", "color", "warning"],
    colorIndigo_bgColor: ["root", "color", "indigo"],
    colorIndigo_textColor: ["root", "color", "indigo"],
    colorIndigo_hover_bgColor: ["root", "color", "indigo"],
    colorPurple_bgColor: ["root", "color", "purple"],
    colorPurple_textColor: ["root", "color", "purple"],
    colorPurple_hover_bgColor: ["root", "color", "purple"],
    colorPink_bgColor: ["root", "color", "pink"],
    colorPink_textColor: ["root", "color", "pink"],
    colorPink_hover_bgColor: ["root", "color", "pink"],
    colorBlue_bgColor: ["root", "color", "blue"],
    colorBlue_textColor: ["root", "color", "blue"],
    colorBlue_hover_bgColor: ["root", "color", "blue"],
    colorCyan_bgColor: ["root", "color", "cyan"],
    colorCyan_textColor: ["root", "color", "cyan"],
    colorCyan_hover_bgColor: ["root", "color", "cyan"],
    colorDark_bgColor: ["root", "color", "dark"],
    colorDark_textColor: ["root", "color", "dark"],
    colorDark_hover_bgColor: ["root", "color", "dark"],
    colorLight_bgColor: ["root", "color", "light"],
    colorLight_textColor: ["root", "color", "light"],
    colorLight_hover_bgColor: ["root", "color", "light"],
    colorGreen_bgColor: ["root", "color", "green"],
    colorGreen_textColor: ["root", "color", "green"],
    colorGreen_hover_bgColor: ["root", "color", "green"],
    colorLime_bgColor: ["root", "color", "lime"],
    colorLime_textColor: ["root", "color", "lime"],
    colorLime_hover_bgColor: ["root", "color", "lime"],
    colorRed_bgColor: ["root", "color", "red"],
    colorRed_textColor: ["root", "color", "red"],
    colorRed_hover_bgColor: ["root", "color", "red"],
    colorTeal_bgColor: ["root", "color", "teal"],
    colorTeal_textColor: ["root", "color", "teal"],
    colorTeal_hover_bgColor: ["root", "color", "teal"],
    colorYellow_bgColor: ["root", "color", "yellow"],
    colorYellow_textColor: ["root", "color", "yellow"],
    colorYellow_hover_bgColor: ["root", "color", "yellow"],
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
    // The main Badge component accepts all standard props passed to it.
    <FlowbiteBadge
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {children}
    </FlowbiteBadge>
  );
};

export default Badge;
