/** @jsxImportSource @emotion/react */
import {
  Button as FlowbiteButton,
  ButtonProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// Define a custom interface to extend Flowbite's ButtonProps.
export interface Props extends Omit<ButtonProps, "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    // The icon can now be any React node, not just a FontAwesomeIcon.
    // This allows for SVGs, emojis, or any other component.
    icon?: React.ReactNode;
    children?: React.ReactNode; // The content of the button is passed as children
    // A new prop to control the icon's position, defaulting to 'left'.
    iconPosition?: "left" | "right";
  };
  style?: {
    // Base Styles
    base_rounding?: string;
    base_fontWeight?: string;
    base_focus_ringWidth?: string;

    // Disabled State
    disabled_opacity?: string;

    // Full-width Variant
    fullSized_width?: string;

    // Grouped Variant
    grouped_rounding?: string;
    grouped_border?: string;
    grouped_focus_ringWidth?: string;

    // Pill Variant
    pill_rounding?: string;

    // --- Solid Color Variants (Complete) ---
    colorDefault_bgColor?: string;
    colorDefault_textColor?: string;
    colorDefault_hover_bgColor?: string;
    colorDefault_focus_ringColor?: string;
    colorAlternative_bgColor?: string;
    colorAlternative_textColor?: string;
    colorAlternative_hover_bgColor?: string;
    colorAlternative_hover_textColor?: string;
    colorAlternative_borderColor?: string;
    colorBlue_bgColor?: string;
    colorBlue_textColor?: string;
    colorBlue_hover_bgColor?: string;
    colorCyan_bgColor?: string;
    colorCyan_textColor?: string;
    colorCyan_hover_bgColor?: string;
    colorDark_bgColor?: string;
    colorDark_textColor?: string;
    colorDark_hover_bgColor?: string;
    colorGray_bgColor?: string;
    colorGray_textColor?: string;
    colorGray_hover_bgColor?: string;
    colorGreen_bgColor?: string;
    colorGreen_textColor?: string;
    colorGreen_hover_bgColor?: string;
    colorIndigo_bgColor?: string;
    colorIndigo_textColor?: string;
    colorIndigo_hover_bgColor?: string;
    colorLight_bgColor?: string;
    colorLight_textColor?: string;
    colorLight_hover_bgColor?: string;
    colorLight_borderColor?: string;
    colorLime_bgColor?: string;
    colorLime_textColor?: string;
    colorLime_hover_bgColor?: string;
    colorPink_bgColor?: string;
    colorPink_textColor?: string;
    colorPink_hover_bgColor?: string;
    colorPurple_bgColor?: string;
    colorPurple_textColor?: string;
    colorPurple_hover_bgColor?: string;
    colorRed_bgColor?: string;
    colorRed_textColor?: string;
    colorRed_hover_bgColor?: string;
    colorTeal_bgColor?: string;
    colorTeal_textColor?: string;
    colorTeal_hover_bgColor?: string;
    colorYellow_bgColor?: string;
    colorYellow_textColor?: string;
    colorYellow_hover_bgColor?: string;

    // --- Outline Color Variants (Complete) ---
    outlineColorDefault_borderColor?: string;
    outlineColorDefault_textColor?: string;
    outlineColorDefault_hover_borderColor?: string;
    outlineColorDefault_hover_bgColor?: string;
    outlineColorDefault_hover_textColor?: string;
    outlineColorBlue_borderColor?: string;
    outlineColorBlue_textColor?: string;
    outlineColorBlue_hover_bgColor?: string;
    outlineColorBlue_hover_textColor?: string;
    outlineColorCyan_borderColor?: string;
    outlineColorCyan_textColor?: string;
    outlineColorCyan_hover_bgColor?: string;
    outlineColorCyan_hover_textColor?: string;
    outlineColorDark_borderColor?: string;
    outlineColorDark_textColor?: string;
    outlineColorDark_hover_bgColor?: string;
    outlineColorDark_hover_textColor?: string;
    outlineColorGray_borderColor?: string;
    outlineColorGray_textColor?: string;
    outlineColorGray_hover_bgColor?: string;
    outlineColorGray_hover_textColor?: string;
    outlineColorGreen_borderColor?: string;
    outlineColorGreen_textColor?: string;
    outlineColorGreen_hover_bgColor?: string;
    outlineColorGreen_hover_textColor?: string;
    outlineColorIndigo_borderColor?: string;
    outlineColorIndigo_textColor?: string;
    outlineColorIndigo_hover_bgColor?: string;
    outlineColorIndigo_hover_textColor?: string;
    outlineColorLime_borderColor?: string;
    outlineColorLime_textColor?: string;
    outlineColorLime_hover_bgColor?: string;
    outlineColorLime_hover_textColor?: string;
    outlineColorPink_borderColor?: string;
    outlineColorPink_textColor?: string;
    outlineColorPink_hover_bgColor?: string;
    outlineColorPink_hover_textColor?: string;
    outlineColorPurple_borderColor?: string;
    outlineColorPurple_textColor?: string;
    outlineColorPurple_hover_bgColor?: string;
    outlineColorPurple_hover_textColor?: string;
    outlineColorRed_borderColor?: string;
    outlineColorRed_textColor?: string;
    outlineColorRed_hover_bgColor?: string;
    outlineColorRed_hover_textColor?: string;
    outlineColorTeal_borderColor?: string;
    outlineColorTeal_textColor?: string;
    outlineColorTeal_hover_bgColor?: string;
    outlineColorTeal_hover_textColor?: string;
    outlineColorYellow_borderColor?: string;
    outlineColorYellow_textColor?: string;
    outlineColorYellow_hover_bgColor?: string;
    outlineColorYellow_hover_textColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Button.
 * This component accepts all standard Button props from flowbite-react
 * and adds optional 'icon' and 'iconPosition' props for enhanced flexibility.
 */
const Button: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic = { iconPosition: "left" },
  style = {
    // Base Styles
    base_rounding: "rounded-lg",
    base_fontWeight: "font-medium",
    base_focus_ringWidth: "focus:ring-4",

    // Disabled State
    disabled_opacity: "opacity-50",

    // Full-width Variant
    fullSized_width: "w-full",

    // Grouped Variant
    grouped_rounding: "rounded-none first:rounded-s-lg last:rounded-e-lg",
    grouped_border: "border-l-0 first:border-l",
    grouped_focus_ringWidth: "focus:ring-2",

    // Pill Variant
    pill_rounding: "rounded-full",

    // --- Solid Color Variants ---
    colorDefault_bgColor: "bg-primary-700",
    colorDefault_textColor: "text-white",
    colorDefault_hover_bgColor: "hover:bg-primary-800",
    colorDefault_focus_ringColor: "focus:ring-primary-300",
    colorAlternative_bgColor: "bg-white",
    colorAlternative_textColor: "text-gray-900",
    colorAlternative_hover_bgColor: "hover:bg-gray-100",
    colorAlternative_hover_textColor: "hover:text-primary-700",
    colorAlternative_borderColor: "border border-gray-200",
    colorBlue_bgColor: "bg-blue-700",
    colorBlue_textColor: "text-white",
    colorBlue_hover_bgColor: "hover:bg-blue-800",
    colorCyan_bgColor: "bg-cyan-700",
    colorCyan_textColor: "text-white",
    colorCyan_hover_bgColor: "hover:bg-cyan-800",
    colorDark_bgColor: "bg-gray-800",
    colorDark_textColor: "text-white",
    colorDark_hover_bgColor: "hover:bg-gray-900",
    colorGray_bgColor: "bg-gray-700",
    colorGray_textColor: "text-white",
    colorGray_hover_bgColor: "hover:bg-gray-800",
    colorGreen_bgColor: "bg-green-700",
    colorGreen_textColor: "text-white",
    colorGreen_hover_bgColor: "hover:bg-green-800",
    colorIndigo_bgColor: "bg-indigo-700",
    colorIndigo_textColor: "text-white",
    colorIndigo_hover_bgColor: "hover:bg-indigo-800",
    colorLight_bgColor: "bg-white",
    colorLight_textColor: "text-gray-900",
    colorLight_hover_bgColor: "hover:bg-gray-100",
    colorLight_borderColor: "border border-gray-300",
    colorLime_bgColor: "bg-lime-700",
    colorLime_textColor: "text-white",
    colorLime_hover_bgColor: "hover:bg-lime-800",
    colorPink_bgColor: "bg-pink-700",
    colorPink_textColor: "text-white",
    colorPink_hover_bgColor: "hover:bg-pink-800",
    colorPurple_bgColor: "bg-purple-700",
    colorPurple_textColor: "text-white",
    colorPurple_hover_bgColor: "hover:bg-purple-800",
    colorRed_bgColor: "bg-red-700",
    colorRed_textColor: "text-white",
    colorRed_hover_bgColor: "hover:bg-red-800",
    colorTeal_bgColor: "bg-teal-700",
    colorTeal_textColor: "text-white",
    colorTeal_hover_bgColor: "hover:bg-teal-800",
    colorYellow_bgColor: "bg-yellow-400",
    colorYellow_textColor: "text-white",
    colorYellow_hover_bgColor: "hover:bg-yellow-500",

    // --- Outline Color Variants ---
    outlineColorDefault_borderColor: "border border-primary-700",
    outlineColorDefault_textColor: "text-primary-700",
    outlineColorDefault_hover_borderColor: "hover:border-primary-800",
    outlineColorDefault_hover_bgColor: "hover:bg-primary-800",
    outlineColorDefault_hover_textColor: "hover:text-white",
    outlineColorBlue_borderColor: "border border-blue-700",
    outlineColorBlue_textColor: "text-blue-700",
    outlineColorBlue_hover_bgColor: "hover:bg-blue-800",
    outlineColorBlue_hover_textColor: "hover:text-white",
    outlineColorCyan_borderColor: "border border-cyan-700",
    outlineColorCyan_textColor: "text-cyan-700",
    outlineColorCyan_hover_bgColor: "hover:bg-cyan-800",
    outlineColorCyan_hover_textColor: "hover:text-white",
    outlineColorDark_borderColor: "border border-gray-800",
    outlineColorDark_textColor: "text-gray-800",
    outlineColorDark_hover_bgColor: "hover:bg-gray-900",
    outlineColorDark_hover_textColor: "hover:text-white",
    outlineColorGray_borderColor: "border border-gray-700",
    outlineColorGray_textColor: "text-gray-700",
    outlineColorGray_hover_bgColor: "hover:bg-gray-800",
    outlineColorGray_hover_textColor: "hover:text-white",
    outlineColorGreen_borderColor: "border border-green-700",
    outlineColorGreen_textColor: "text-green-700",
    outlineColorGreen_hover_bgColor: "hover:bg-green-800",
    outlineColorGreen_hover_textColor: "hover:text-white",
    outlineColorIndigo_borderColor: "border border-indigo-700",
    outlineColorIndigo_textColor: "text-indigo-700",
    outlineColorIndigo_hover_bgColor: "hover:bg-indigo-800",
    outlineColorIndigo_hover_textColor: "hover:text-white",
    outlineColorLime_borderColor: "border border-lime-700",
    outlineColorLime_textColor: "text-lime-700",
    outlineColorLime_hover_bgColor: "hover:bg-lime-800",
    outlineColorLime_hover_textColor: "hover:text-white",
    outlineColorPink_borderColor: "border border-pink-700",
    outlineColorPink_textColor: "text-pink-700",
    outlineColorPink_hover_bgColor: "hover:bg-pink-800",
    outlineColorPink_hover_textColor: "hover:text-white",
    outlineColorPurple_borderColor: "border border-purple-700",
    outlineColorPurple_textColor: "text-purple-700",
    outlineColorPurple_hover_bgColor: "hover:bg-purple-800",
    outlineColorPurple_hover_textColor: "hover:text-white",
    outlineColorRed_borderColor: "border border-red-700",
    outlineColorRed_textColor: "text-red-700",
    outlineColorRed_hover_bgColor: "hover:bg-red-800",
    outlineColorRed_hover_textColor: "hover:text-white",
    outlineColorTeal_borderColor: "border border-teal-700",
    outlineColorTeal_textColor: "text-teal-700",
    outlineColorTeal_hover_bgColor: "hover:bg-teal-800",
    outlineColorTeal_hover_textColor: "hover:text-white",
    outlineColorYellow_borderColor: "border border-yellow-400",
    outlineColorYellow_textColor: "text-yellow-400",
    outlineColorYellow_hover_bgColor: "hover:bg-yellow-500",
    outlineColorYellow_hover_textColor: "hover:text-white",
  },
  children,
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.button;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Styles
    base_rounding: ["base"],
    base_fontWeight: ["base"],
    base_focus_ringWidth: ["base"],

    // Disabled State
    disabled_opacity: ["disabled"],

    // Full-width Variant
    fullSized_width: ["fullSized"],

    // Grouped Variant
    grouped_rounding: ["grouped"],
    grouped_border: ["grouped"],
    grouped_focus_ringWidth: ["grouped"],

    // Pill Variant
    pill_rounding: ["pill"],

    // --- Solid Color Variants ---
    colorDefault_bgColor: ["color", "default"],
    colorDefault_textColor: ["color", "default"],
    colorDefault_hover_bgColor: ["color", "default"],
    colorDefault_focus_ringColor: ["color", "default"],
    colorAlternative_bgColor: ["color", "alternative"],
    colorAlternative_textColor: ["color", "alternative"],
    colorAlternative_hover_bgColor: ["color", "alternative"],
    colorAlternative_hover_textColor: ["color", "alternative"],
    colorAlternative_borderColor: ["color", "alternative"],
    colorBlue_bgColor: ["color", "blue"],
    colorBlue_textColor: ["color", "blue"],
    colorBlue_hover_bgColor: ["color", "blue"],
    colorCyan_bgColor: ["color", "cyan"],
    colorCyan_textColor: ["color", "cyan"],
    colorCyan_hover_bgColor: ["color", "cyan"],
    colorDark_bgColor: ["color", "dark"],
    colorDark_textColor: ["color", "dark"],
    colorDark_hover_bgColor: ["color", "dark"],
    colorGray_bgColor: ["color", "gray"],
    colorGray_textColor: ["color", "gray"],
    colorGray_hover_bgColor: ["color", "gray"],
    colorGreen_bgColor: ["color", "green"],
    colorGreen_textColor: ["color", "green"],
    colorGreen_hover_bgColor: ["color", "green"],
    colorIndigo_bgColor: ["color", "indigo"],
    colorIndigo_textColor: ["color", "indigo"],
    colorIndigo_hover_bgColor: ["color", "indigo"],
    colorLight_bgColor: ["color", "light"],
    colorLight_textColor: ["color", "light"],
    colorLight_hover_bgColor: ["color", "light"],
    colorLight_borderColor: ["color", "light"],
    colorLime_bgColor: ["color", "lime"],
    colorLime_textColor: ["color", "lime"],
    colorLime_hover_bgColor: ["color", "lime"],
    colorPink_bgColor: ["color", "pink"],
    colorPink_textColor: ["color", "pink"],
    colorPink_hover_bgColor: ["color", "pink"],
    colorPurple_bgColor: ["color", "purple"],
    colorPurple_textColor: ["color", "purple"],
    colorPurple_hover_bgColor: ["color", "purple"],
    colorRed_bgColor: ["color", "red"],
    colorRed_textColor: ["color", "red"],
    colorRed_hover_bgColor: ["color", "red"],
    colorTeal_bgColor: ["color", "teal"],
    colorTeal_textColor: ["color", "teal"],
    colorTeal_hover_bgColor: ["color", "teal"],
    colorYellow_bgColor: ["color", "yellow"],
    colorYellow_textColor: ["color", "yellow"],
    colorYellow_hover_bgColor: ["color", "yellow"],

    // --- Outline Color Variants ---
    outlineColorDefault_borderColor: ["outlineColor", "default"],
    outlineColorDefault_textColor: ["outlineColor", "default"],
    outlineColorDefault_hover_borderColor: ["outlineColor", "default"],
    outlineColorDefault_hover_bgColor: ["outlineColor", "default"],
    outlineColorDefault_hover_textColor: ["outlineColor", "default"],
    outlineColorBlue_borderColor: ["outlineColor", "blue"],
    outlineColorBlue_textColor: ["outlineColor", "blue"],
    outlineColorBlue_hover_bgColor: ["outlineColor", "blue"],
    outlineColorBlue_hover_textColor: ["outlineColor", "blue"],
    outlineColorCyan_borderColor: ["outlineColor", "cyan"],
    outlineColorCyan_textColor: ["outlineColor", "cyan"],
    outlineColorCyan_hover_bgColor: ["outlineColor", "cyan"],
    outlineColorCyan_hover_textColor: ["outlineColor", "cyan"],
    outlineColorDark_borderColor: ["outlineColor", "dark"],
    outlineColorDark_textColor: ["outlineColor", "dark"],
    outlineColorDark_hover_bgColor: ["outlineColor", "dark"],
    outlineColorDark_hover_textColor: ["outlineColor", "dark"],
    outlineColorGray_borderColor: ["outlineColor", "gray"],
    outlineColorGray_textColor: ["outlineColor", "gray"],
    outlineColorGray_hover_bgColor: ["outlineColor", "gray"],
    outlineColorGray_hover_textColor: ["outlineColor", "gray"],
    outlineColorGreen_borderColor: ["outlineColor", "green"],
    outlineColorGreen_textColor: ["outlineColor", "green"],
    outlineColorGreen_hover_bgColor: ["outlineColor", "green"],
    outlineColorGreen_hover_textColor: ["outlineColor", "green"],
    outlineColorIndigo_borderColor: ["outlineColor", "indigo"],
    outlineColorIndigo_textColor: ["outlineColor", "indigo"],
    outlineColorIndigo_hover_bgColor: ["outlineColor", "indigo"],
    outlineColorIndigo_hover_textColor: ["outlineColor", "indigo"],
    outlineColorLime_borderColor: ["outlineColor", "lime"],
    outlineColorLime_textColor: ["outlineColor", "lime"],
    outlineColorLime_hover_bgColor: ["outlineColor", "lime"],
    outlineColorLime_hover_textColor: ["outlineColor", "lime"],
    outlineColorPink_borderColor: ["outlineColor", "pink"],
    outlineColorPink_textColor: ["outlineColor", "pink"],
    outlineColorPink_hover_bgColor: ["outlineColor", "pink"],
    outlineColorPink_hover_textColor: ["outlineColor", "pink"],
    outlineColorPurple_borderColor: ["outlineColor", "purple"],
    outlineColorPurple_textColor: ["outlineColor", "purple"],
    outlineColorPurple_hover_bgColor: ["outlineColor", "purple"],
    outlineColorPurple_hover_textColor: ["outlineColor", "purple"],
    outlineColorRed_borderColor: ["outlineColor", "red"],
    outlineColorRed_textColor: ["outlineColor", "red"],
    outlineColorRed_hover_bgColor: ["outlineColor", "red"],
    outlineColorRed_hover_textColor: ["outlineColor", "red"],
    outlineColorTeal_borderColor: ["outlineColor", "teal"],
    outlineColorTeal_textColor: ["outlineColor", "teal"],
    outlineColorTeal_hover_bgColor: ["outlineColor", "teal"],
    outlineColorTeal_hover_textColor: ["outlineColor", "teal"],
    outlineColorYellow_borderColor: ["outlineColor", "yellow"],
    outlineColorYellow_textColor: ["outlineColor", "yellow"],
    outlineColorYellow_hover_bgColor: ["outlineColor", "yellow"],
    outlineColorYellow_hover_textColor: ["outlineColor", "yellow"],
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
    <FlowbiteButton
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {/* Conditionally render the icon on the left if provided and positioned there */}
      {logic?.iconPosition === "left" && logic?.icon && (
        <span className="mr-2">{logic?.icon}</span>
      )}

      {/* Render the children (button text) */}
      {children}

      {/* Conditionally render the icon on the right if provided and positioned there */}
      {logic?.iconPosition === "right" && logic?.icon && (
        <span className="ml-2">{logic?.icon}</span>
      )}
    </FlowbiteButton>
  );
};

export default Button;
