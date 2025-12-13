import {
  Alert as FlowbiteAlert,
  AlertProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The new props interface, structured like your preferred Accordion pattern.
// Define a custom interface for our DynamicAlert component.
// It extends all the standard props from flowbite-react's AlertProps,
// and adds our custom `icon` and `iconPosition` props.
interface Props extends Omit<AlertProps, "children" | "style"> {
  geometric?: {
    width: string;
    height: string;
  };
  logic: {
    // The main content for the alert, replacing the `children` prop for consistency.
    content: React.ReactNode;
    // The icon is now part of the `logic` prop and should be a renderable component.
    icon?: any;
    // An optional prop to control the icon's position, defaulting to 'left'.
    iconPosition?: "left" | "right";
  };
  // The style prop is now a deep partial of the official Flowbite Alert theme.
  style?: {
    // Base Styles
    padding?: string;
    fontSize?: string;
    gap?: string;
    borderRadius?: string;
    accentBorderWidth?: string;

    // Icon Styles
    iconSize?: string;
    iconMargin?: string;

    // Close Button Styles
    closeButton_borderRadius?: string;
    closeButton_padding?: string;
    closeButton_iconSize?: string;

    // --- Main Color Variants (Complete) ---
    colorInfo_bgColor?: string;
    colorInfo_textColor?: string;
    colorInfo_borderColor?: string;
    colorGray_bgColor?: string;
    colorGray_textColor?: string;
    colorGray_borderColor?: string;
    colorFailure_bgColor?: string;
    colorFailure_textColor?: string;
    colorFailure_borderColor?: string;
    colorSuccess_bgColor?: string;
    colorSuccess_textColor?: string;
    colorSuccess_borderColor?: string;
    colorWarning_bgColor?: string;
    colorWarning_textColor?: string;
    colorWarning_borderColor?: string;
    colorRed_bgColor?: string;
    colorRed_textColor?: string;
    colorRed_borderColor?: string;
    colorGreen_bgColor?: string;
    colorGreen_textColor?: string;
    colorGreen_borderColor?: string;
    colorYellow_bgColor?: string;
    colorYellow_textColor?: string;
    colorYellow_borderColor?: string;
    colorBlue_bgColor?: string;
    colorBlue_textColor?: string;
    colorBlue_borderColor?: string;
    colorCyan_bgColor?: string;
    colorCyan_textColor?: string;
    colorCyan_borderColor?: string;
    colorPink_bgColor?: string;
    colorPink_textColor?: string;
    colorPink_borderColor?: string;
    colorLime_bgColor?: string;
    colorLime_textColor?: string;
    colorLime_borderColor?: string;
    colorDark_bgColor?: string;
    colorDark_textColor?: string;
    colorDark_borderColor?: string;
    colorIndigo_bgColor?: string;
    colorIndigo_textColor?: string;
    colorIndigo_borderColor?: string;
    colorPurple_bgColor?: string;
    colorPurple_textColor?: string;
    colorPurple_borderColor?: string;
    colorTeal_bgColor?: string;
    colorTeal_textColor?: string;
    colorTeal_borderColor?: string;
    colorLight_bgColor?: string;
    colorLight_textColor?: string;
    colorLight_borderColor?: string;

    // --- Close Button Color Variants (Complete) ---
    closeButtonColorInfo_bgColor?: string;
    closeButtonColorInfo_textColor?: string;
    closeButtonColorInfo_hover_bgColor?: string;
    closeButtonColorGray_bgColor?: string;
    closeButtonColorGray_textColor?: string;
    closeButtonColorGray_hover_bgColor?: string;
    closeButtonColorFailure_bgColor?: string;
    closeButtonColorFailure_textColor?: string;
    closeButtonColorFailure_hover_bgColor?: string;
    closeButtonColorSuccess_bgColor?: string;
    closeButtonColorSuccess_textColor?: string;
    closeButtonColorSuccess_hover_bgColor?: string;
    closeButtonColorWarning_bgColor?: string;
    closeButtonColorWarning_textColor?: string;
    closeButtonColorWarning_hover_bgColor?: string;
    closeButtonColorRed_bgColor?: string;
    closeButtonColorRed_textColor?: string;
    closeButtonColorRed_hover_bgColor?: string;
    closeButtonColorGreen_bgColor?: string;
    closeButtonColorGreen_textColor?: string;
    closeButtonColorGreen_hover_bgColor?: string;
    closeButtonColorYellow_bgColor?: string;
    closeButtonColorYellow_textColor?: string;
    closeButtonColorYellow_hover_bgColor?: string;
    closeButtonColorBlue_bgColor?: string;
    closeButtonColorBlue_textColor?: string;
    closeButtonColorBlue_hover_bgColor?: string;
    closeButtonColorCyan_bgColor?: string;
    closeButtonColorCyan_textColor?: string;
    closeButtonColorCyan_hover_bgColor?: string;
    closeButtonColorPink_bgColor?: string;
    closeButtonColorPink_textColor?: string;
    closeButtonColorPink_hover_bgColor?: string;
    closeButtonColorLime_bgColor?: string;
    closeButtonColorLime_textColor?: string;
    closeButtonColorLime_hover_bgColor?: string;
    closeButtonColorDark_bgColor?: string;
    closeButtonColorDark_textColor?: string;
    closeButtonColorDark_hover_bgColor?: string;
    closeButtonColorIndigo_bgColor?: string;
    closeButtonColorIndigo_textColor?: string;
    closeButtonColorIndigo_hover_bgColor?: string;
    closeButtonColorPurple_bgColor?: string;
    closeButtonColorPurple_textColor?: string;
    closeButtonColorPurple_hover_bgColor?: string;
    closeButtonColorTeal_bgColor?: string;
    closeButtonColorTeal_textColor?: string;
    closeButtonColorTeal_hover_bgColor?: string;
    closeButtonColorLight_bgColor?: string;
    closeButtonColorLight_textColor?: string;
    closeButtonColorLight_hover_bgColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Alert.
 * This component accepts all standard Alert props and adds an optional 'icon'
 * and 'iconPosition' prop. This makes it easy to create alerts with custom
 * icons that can be placed on either side of the message.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {'left'|'right'} props.iconPosition - The position of the icon.
 * @param {React.ReactNode} props.children - The content of the alert.
 * @param {AlertProps} props.rest - All other standard Alert props.
 */
const Alert: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic = { iconPosition: "left", icon: null, content: "" },
  style = {
    // Base Styles
    padding: "p-4",
    fontSize: "text-sm",
    gap: "gap-2",
    borderRadius: "rounded-lg",
    accentBorderWidth: "border-t-4",

    // Icon Styles
    iconSize: "h-5 w-5",
    iconMargin: "mr-3",

    // Close Button Styles
    closeButton_borderRadius: "rounded-lg",
    closeButton_padding: "p-1.5",
    closeButton_iconSize: "h-5 w-5",

    // --- Main Color Variants ---
    colorInfo_bgColor: "bg-cyan-100",
    colorInfo_textColor: "text-cyan-700",
    colorInfo_borderColor: "border-cyan-500",
    colorGray_bgColor: "bg-gray-100",
    colorGray_textColor: "text-gray-700",
    colorGray_borderColor: "border-gray-500",
    colorFailure_bgColor: "bg-red-100",
    colorFailure_textColor: "text-red-700",
    colorFailure_borderColor: "border-red-500",
    colorSuccess_bgColor: "bg-green-100",
    colorSuccess_textColor: "text-green-700",
    colorSuccess_borderColor: "border-green-500",
    colorWarning_bgColor: "bg-yellow-100",
    colorWarning_textColor: "text-yellow-700",
    colorWarning_borderColor: "border-yellow-500",
    colorRed_bgColor: "bg-red-100",
    colorRed_textColor: "text-red-700",
    colorRed_borderColor: "border-red-500",
    colorGreen_bgColor: "bg-green-100",
    colorGreen_textColor: "text-green-700",
    colorGreen_borderColor: "border-green-500",
    colorYellow_bgColor: "bg-yellow-100",
    colorYellow_textColor: "text-yellow-700",
    colorYellow_borderColor: "border-yellow-500",
    colorBlue_bgColor: "bg-blue-100",
    colorBlue_textColor: "text-blue-700",
    colorBlue_borderColor: "border-blue-500",
    colorCyan_bgColor: "bg-cyan-100",
    colorCyan_textColor: "text-cyan-700",
    colorCyan_borderColor: "border-cyan-500",
    colorPink_bgColor: "bg-pink-100",
    colorPink_textColor: "text-pink-700",
    colorPink_borderColor: "border-pink-500",
    colorLime_bgColor: "bg-lime-100",
    colorLime_textColor: "text-lime-700",
    colorLime_borderColor: "border-lime-500",
    colorDark_bgColor: "bg-gray-800",
    colorDark_textColor: "text-gray-200",
    colorDark_borderColor: "border-gray-600",
    colorIndigo_bgColor: "bg-indigo-100",
    colorIndigo_textColor: "text-indigo-700",
    colorIndigo_borderColor: "border-indigo-500",
    colorPurple_bgColor: "bg-purple-100",
    colorPurple_textColor: "text-purple-700",
    colorPurple_borderColor: "border-purple-500",
    colorTeal_bgColor: "bg-teal-100",
    colorTeal_textColor: "text-teal-700",
    colorTeal_borderColor: "border-teal-500",
    colorLight_bgColor: "bg-gray-50",
    colorLight_textColor: "text-gray-600",
    colorLight_borderColor: "border-gray-400",

    // --- Close Button Color Variants ---
    closeButtonColorInfo_bgColor: "bg-cyan-100",
    closeButtonColorInfo_textColor: "text-cyan-500",
    closeButtonColorInfo_hover_bgColor: "hover:bg-cyan-200",
    closeButtonColorGray_bgColor: "bg-gray-100",
    closeButtonColorGray_textColor: "text-gray-500",
    closeButtonColorGray_hover_bgColor: "hover:bg-gray-200",
    closeButtonColorFailure_bgColor: "bg-red-100",
    closeButtonColorFailure_textColor: "text-red-500",
    closeButtonColorFailure_hover_bgColor: "hover:bg-red-200",
    closeButtonColorSuccess_bgColor: "bg-green-100",
    closeButtonColorSuccess_textColor: "text-green-500",
    closeButtonColorSuccess_hover_bgColor: "hover:bg-green-200",
    closeButtonColorWarning_bgColor: "bg-yellow-100",
    closeButtonColorWarning_textColor: "text-yellow-500",
    closeButtonColorWarning_hover_bgColor: "hover:bg-yellow-200",
    closeButtonColorRed_bgColor: "bg-red-100",
    closeButtonColorRed_textColor: "text-red-500",
    closeButtonColorRed_hover_bgColor: "hover:bg-red-200",
    closeButtonColorGreen_bgColor: "bg-green-100",
    closeButtonColorGreen_textColor: "text-green-500",
    closeButtonColorGreen_hover_bgColor: "hover:bg-green-200",
    closeButtonColorYellow_bgColor: "bg-yellow-100",
    closeButtonColorYellow_textColor: "text-yellow-500",
    closeButtonColorYellow_hover_bgColor: "hover:bg-yellow-200",
    closeButtonColorBlue_bgColor: "bg-blue-100",
    closeButtonColorBlue_textColor: "text-blue-500",
    closeButtonColorBlue_hover_bgColor: "hover:bg-blue-200",
    closeButtonColorCyan_bgColor: "bg-cyan-100",
    closeButtonColorCyan_textColor: "text-cyan-500",
    closeButtonColorCyan_hover_bgColor: "hover:bg-cyan-200",
    closeButtonColorPink_bgColor: "bg-pink-100",
    closeButtonColorPink_textColor: "text-pink-500",
    closeButtonColorPink_hover_bgColor: "hover:bg-pink-200",
    closeButtonColorLime_bgColor: "bg-lime-100",
    closeButtonColorLime_textColor: "text-lime-500",
    closeButtonColorLime_hover_bgColor: "hover:bg-lime-200",
    closeButtonColorDark_bgColor: "bg-gray-100",
    closeButtonColorDark_textColor: "text-gray-500",
    closeButtonColorDark_hover_bgColor: "hover:bg-gray-200",
    closeButtonColorIndigo_bgColor: "bg-indigo-100",
    closeButtonColorIndigo_textColor: "text-indigo-500",
    closeButtonColorIndigo_hover_bgColor: "hover:bg-indigo-200",
    closeButtonColorPurple_bgColor: "bg-purple-100",
    closeButtonColorPurple_textColor: "text-purple-500",
    closeButtonColorPurple_hover_bgColor: "hover:bg-purple-200",
    closeButtonColorTeal_bgColor: "bg-teal-100",
    closeButtonColorTeal_textColor: "text-teal-500",
    closeButtonColorTeal_hover_bgColor: "hover:bg-teal-200",
    closeButtonColorLight_bgColor: "bg-gray-50",
    closeButtonColorLight_textColor: "text-gray-500",
    closeButtonColorLight_hover_bgColor: "hover:bg-gray-100",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.alert;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Styles
    padding: ["base"],
    fontSize: ["base"],
    gap: ["base"],
    borderRadius: ["rounded"],
    accentBorderWidth: ["borderAccent"],

    // Icon Styles
    iconSize: ["icon"],
    iconMargin: ["icon"],

    // Close Button Styles
    closeButton_borderRadius: ["closeButton", "base"],
    closeButton_padding: ["closeButton", "base"],
    closeButton_iconSize: ["closeButton", "icon"],

    // --- Main Color Variants ---
    colorInfo_bgColor: ["color", "info"],
    colorInfo_textColor: ["color", "info"],
    colorInfo_borderColor: ["color", "info"],
    colorGray_bgColor: ["color", "gray"],
    colorGray_textColor: ["color", "gray"],
    colorGray_borderColor: ["color", "gray"],
    colorFailure_bgColor: ["color", "failure"],
    colorFailure_textColor: ["color", "failure"],
    colorFailure_borderColor: ["color", "failure"],
    colorSuccess_bgColor: ["color", "success"],
    colorSuccess_textColor: ["color", "success"],
    colorSuccess_borderColor: ["color", "success"],
    colorWarning_bgColor: ["color", "warning"],
    colorWarning_textColor: ["color", "warning"],
    colorWarning_borderColor: ["color", "warning"],
    colorRed_bgColor: ["color", "red"],
    colorRed_textColor: ["color", "red"],
    colorRed_borderColor: ["color", "red"],
    colorGreen_bgColor: ["color", "green"],
    colorGreen_textColor: ["color", "green"],
    colorGreen_borderColor: ["color", "green"],
    colorYellow_bgColor: ["color", "yellow"],
    colorYellow_textColor: ["color", "yellow"],
    colorYellow_borderColor: ["color", "yellow"],
    colorBlue_bgColor: ["color", "blue"],
    colorBlue_textColor: ["color", "blue"],
    colorBlue_borderColor: ["color", "blue"],
    colorCyan_bgColor: ["color", "cyan"],
    colorCyan_textColor: ["color", "cyan"],
    colorCyan_borderColor: ["color", "cyan"],
    colorPink_bgColor: ["color", "pink"],
    colorPink_textColor: ["color", "pink"],
    colorPink_borderColor: ["color", "pink"],
    colorLime_bgColor: ["color", "lime"],
    colorLime_textColor: ["color", "lime"],
    colorLime_borderColor: ["color", "lime"],
    colorDark_bgColor: ["color", "dark"],
    colorDark_textColor: ["color", "dark"],
    colorDark_borderColor: ["color", "dark"],
    colorIndigo_bgColor: ["color", "indigo"],
    colorIndigo_textColor: ["color", "indigo"],
    colorIndigo_borderColor: ["color", "indigo"],
    colorPurple_bgColor: ["color", "purple"],
    colorPurple_textColor: ["color", "purple"],
    colorPurple_borderColor: ["color", "purple"],
    colorTeal_bgColor: ["color", "teal"],
    colorTeal_textColor: ["color", "teal"],
    colorTeal_borderColor: ["color", "teal"],
    colorLight_bgColor: ["color", "light"],
    colorLight_textColor: ["color", "light"],
    colorLight_borderColor: ["color", "light"],

    // --- Close Button Color Variants ---
    closeButtonColorInfo_bgColor: ["closeButton", "color", "info"],
    closeButtonColorInfo_textColor: ["closeButton", "color", "info"],
    closeButtonColorInfo_hover_bgColor: ["closeButton", "color", "info"],
    closeButtonColorGray_bgColor: ["closeButton", "color", "gray"],
    closeButtonColorGray_textColor: ["closeButton", "color", "gray"],
    closeButtonColorGray_hover_bgColor: ["closeButton", "color", "gray"],
    closeButtonColorFailure_bgColor: ["closeButton", "color", "failure"],
    closeButtonColorFailure_textColor: ["closeButton", "color", "failure"],
    closeButtonColorFailure_hover_bgColor: ["closeButton", "color", "failure"],
    closeButtonColorSuccess_bgColor: ["closeButton", "color", "success"],
    closeButtonColorSuccess_textColor: ["closeButton", "color", "success"],
    closeButtonColorSuccess_hover_bgColor: ["closeButton", "color", "success"],
    closeButtonColorWarning_bgColor: ["closeButton", "color", "warning"],
    closeButtonColorWarning_textColor: ["closeButton", "color", "warning"],
    closeButtonColorWarning_hover_bgColor: ["closeButton", "color", "warning"],
    closeButtonColorRed_bgColor: ["closeButton", "color", "red"],
    closeButtonColorRed_textColor: ["closeButton", "color", "red"],
    closeButtonColorRed_hover_bgColor: ["closeButton", "color", "red"],
    closeButtonColorGreen_bgColor: ["closeButton", "color", "green"],
    closeButtonColorGreen_textColor: ["closeButton", "color", "green"],
    closeButtonColorGreen_hover_bgColor: ["closeButton", "color", "green"],
    closeButtonColorYellow_bgColor: ["closeButton", "color", "yellow"],
    closeButtonColorYellow_textColor: ["closeButton", "color", "yellow"],
    closeButtonColorYellow_hover_bgColor: ["closeButton", "color", "yellow"],
    closeButtonColorBlue_bgColor: ["closeButton", "color", "blue"],
    closeButtonColorBlue_textColor: ["closeButton", "color", "blue"],
    closeButtonColorBlue_hover_bgColor: ["closeButton", "color", "blue"],
    closeButtonColorCyan_bgColor: ["closeButton", "color", "cyan"],
    closeButtonColorCyan_textColor: ["closeButton", "color", "cyan"],
    closeButtonColorCyan_hover_bgColor: ["closeButton", "color", "cyan"],
    closeButtonColorPink_bgColor: ["closeButton", "color", "pink"],
    closeButtonColorPink_textColor: ["closeButton", "color", "pink"],
    closeButtonColorPink_hover_bgColor: ["closeButton", "color", "pink"],
    closeButtonColorLime_bgColor: ["closeButton", "color", "lime"],
    closeButtonColorLime_textColor: ["closeButton", "color", "lime"],
    closeButtonColorLime_hover_bgColor: ["closeButton", "color", "lime"],
    closeButtonColorDark_bgColor: ["closeButton", "color", "dark"],
    closeButtonColorDark_textColor: ["closeButton", "color", "dark"],
    closeButtonColorDark_hover_bgColor: ["closeButton", "color", "dark"],
    closeButtonColorIndigo_bgColor: ["closeButton", "color", "indigo"],
    closeButtonColorIndigo_textColor: ["closeButton", "color", "indigo"],
    closeButtonColorIndigo_hover_bgColor: ["closeButton", "color", "indigo"],
    closeButtonColorPurple_bgColor: ["closeButton", "color", "purple"],
    closeButtonColorPurple_textColor: ["closeButton", "color", "purple"],
    closeButtonColorPurple_hover_bgColor: ["closeButton", "color", "purple"],
    closeButtonColorTeal_bgColor: ["closeButton", "color", "teal"],
    closeButtonColorTeal_textColor: ["closeButton", "color", "teal"],
    closeButtonColorTeal_hover_bgColor: ["closeButton", "color", "teal"],
    closeButtonColorLight_bgColor: ["closeButton", "color", "light"],
    closeButtonColorLight_textColor: ["closeButton", "color", "light"],
    closeButtonColorLight_hover_bgColor: ["closeButton", "color", "light"],
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

  // We use the default icon from flowbite-react if no custom icon is provided.
  const alertIcon = logic?.icon ? logic.icon : null;

  const containerClasses = twMerge(geometric.width, geometric.height);

  return (
    // The main Alert component accepts all its standard props.
    <FlowbiteAlert
      className={containerClasses}
      {...props}
      icon={() => null}
      theme={mergedTheme as any}
    >
      {" "}
      {/* Pass a null icon to prevent the default flowbite icon */}
      <div className="flex items-center">
        {/* Render the icon on the left if iconPosition is 'left' */}
        {logic.iconPosition === "left" && (
          <span className="mr-3">{alertIcon}</span>
        )}

        {/* Render the main alert content */}
        {logic.content}

        {/* Render the icon on the right if iconPosition is 'right' */}
        {logic.iconPosition === "right" && (
          <span className="ml-3">{alertIcon}</span>
        )}
      </div>
    </FlowbiteAlert>
  );
};

export default Alert;
