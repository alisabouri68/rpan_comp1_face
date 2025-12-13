import {
  Checkbox as FlowbitCheckbox,
  CheckboxProps,
  Label,
  HelperText,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic checkbox component.
// It extends all standard CheckboxProps and makes the 'label' prop optional.
// A new prop, 'checkboxPosition', is added to control the checkbox's placement.
export interface Props extends Omit<CheckboxProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    label?: React.ReactNode; // The label for the checkbox, now optional.
    helperText?: React.ReactNode; // Optional helper text to display below the input.
    checkboxPosition?: "left" | "right"; // New: Position of the checkbox relative to the label.
  };
  style?: {
    // Base Styles
    base_size?: string;
    base_rounding?: string;
    base_borderWidth?: string;
    base_borderColor?: string;
    base_bgColor?: string;
    base_focus_ringWidth?: string;
    base_focus_ringOffset?: string;

    // Indeterminate State Styles
    indeterminate_borderColor?: string;
    indeterminate_bgColor?: string;

    // --- Color Variants (Complete) ---
    colorDefault_checkColor?: string;
    colorDefault_focus_ringColor?: string;
    colorDark_checkColor?: string;
    colorDark_focus_ringColor?: string;
    colorFailure_checkColor?: string;
    colorFailure_focus_ringColor?: string;
    colorGray_checkColor?: string;
    colorGray_focus_ringColor?: string;
    colorInfo_checkColor?: string;
    colorInfo_focus_ringColor?: string;
    colorLight_checkColor?: string;
    colorLight_focus_ringColor?: string;
    colorPurple_checkColor?: string;
    colorPurple_focus_ringColor?: string;
    colorSuccess_checkColor?: string;
    colorSuccess_focus_ringColor?: string;
    colorWarning_checkColor?: string;
    colorWarning_focus_ringColor?: string;
    colorBlue_checkColor?: string;
    colorBlue_focus_ringColor?: string;
    colorCyan_checkColor?: string;
    colorCyan_focus_ringColor?: string;
    colorGreen_checkColor?: string;
    colorGreen_focus_ringColor?: string;
    colorIndigo_checkColor?: string;
    colorIndigo_focus_ringColor?: string;
    colorLime_checkColor?: string;
    colorLime_focus_ringColor?: string;
    colorPink_checkColor?: string;
    colorPink_focus_ringColor?: string;
    colorRed_checkColor?: string;
    colorRed_focus_ringColor?: string;
    colorTeal_checkColor?: string;
    colorTeal_focus_ringColor?: string;
    colorYellow_checkColor?: string;
    colorYellow_focus_ringColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Checkbox.
 * This component provides a complete form input with a checkbox, a label, and optional helper text.
 * It is designed to be a controlled component, making it easy to manage its state from a parent.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} [props.label] - The optional label for the checkbox.
 * @param {React.ReactNode} [props.helperText] - The optional helper text.
 * @param {'left' | 'right'} [props.checkboxPosition] - The position of the checkbox.
 * @param {CheckboxProps} props.rest - All other standard Checkbox props.
 */
const Checkbox: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic = { checkboxPosition: "left" },
  style = {
    // Base Styles
    base_size: "h-4 w-4",
    base_rounding: "rounded",
    base_borderWidth: "border",
    base_borderColor: "border-gray-300",
    base_bgColor: "bg-gray-100",
    base_focus_ringWidth: "focus:ring-2",
    base_focus_ringOffset: "focus:ring-offset-2",

    // Indeterminate State Styles
    indeterminate_borderColor: "border-transparent",
    indeterminate_bgColor: "bg-current",

    // --- Color Variants (Complete) ---
    colorDefault_checkColor: "text-primary-600",
    colorDefault_focus_ringColor: "focus:ring-primary-600",
    colorDark_checkColor: "text-gray-800",
    colorDark_focus_ringColor: "focus:ring-gray-800",
    colorFailure_checkColor: "text-red-900",
    colorFailure_focus_ringColor: "focus:ring-red-900",
    colorGray_checkColor: "text-gray-900",
    colorGray_focus_ringColor: "focus:ring-gray-900",
    colorInfo_checkColor: "text-cyan-800",
    colorInfo_focus_ringColor: "focus:ring-cyan-800",
    colorLight_checkColor: "text-gray-900",
    colorLight_focus_ringColor: "focus:ring-gray-900",
    colorPurple_checkColor: "text-purple-600",
    colorPurple_focus_ringColor: "focus:ring-purple-600",
    colorSuccess_checkColor: "text-green-800",
    colorSuccess_focus_ringColor: "focus:ring-green-800",
    colorWarning_checkColor: "text-yellow-400",
    colorWarning_focus_ringColor: "focus:ring-yellow-400",
    colorBlue_checkColor: "text-blue-700",
    colorBlue_focus_ringColor: "focus:ring-blue-600",
    colorCyan_checkColor: "text-cyan-600",
    colorCyan_focus_ringColor: "focus:ring-cyan-600",
    colorGreen_checkColor: "text-green-600",
    colorGreen_focus_ringColor: "focus:ring-green-600",
    colorIndigo_checkColor: "text-indigo-700",
    colorIndigo_focus_ringColor: "focus:ring-indigo-700",
    colorLime_checkColor: "text-lime-700",
    colorLime_focus_ringColor: "focus:ring-lime-700",
    colorPink_checkColor: "text-pink-600",
    colorPink_focus_ringColor: "focus:ring-pink-600",
    colorRed_checkColor: "text-red-600",
    colorRed_focus_ringColor: "focus:ring-red-600",
    colorTeal_checkColor: "text-teal-600",
    colorTeal_focus_ringColor: "focus:ring-teal-600",
    colorYellow_checkColor: "text-yellow-400",
    colorYellow_focus_ringColor: "focus:ring-yellow-400",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.checkbox;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Styles
    base_size: ["base"],
    base_rounding: ["base"],
    base_borderWidth: ["base"],
    base_borderColor: ["base"],
    base_bgColor: ["base"],
    base_focus_ringWidth: ["base"],
    base_focus_ringOffset: ["base"],

    // Indeterminate State Styles
    indeterminate_borderColor: ["indeterminate"],
    indeterminate_bgColor: ["indeterminate"],

    // --- Color Variants (Complete) ---
    colorDefault_checkColor: ["color", "default"],
    colorDefault_focus_ringColor: ["color", "default"],
    colorDark_checkColor: ["color", "dark"],
    colorDark_focus_ringColor: ["color", "dark"],
    colorFailure_checkColor: ["color", "failure"],
    colorFailure_focus_ringColor: ["color", "failure"],
    colorGray_checkColor: ["color", "gray"],
    colorGray_focus_ringColor: ["color", "gray"],
    colorInfo_checkColor: ["color", "info"],
    colorInfo_focus_ringColor: ["color", "info"],
    colorLight_checkColor: ["color", "light"],
    colorLight_focus_ringColor: ["color", "light"],
    colorPurple_checkColor: ["color", "purple"],
    colorPurple_focus_ringColor: ["color", "purple"],
    colorSuccess_checkColor: ["color", "success"],
    colorSuccess_focus_ringColor: ["color", "success"],
    colorWarning_checkColor: ["color", "warning"],
    colorWarning_focus_ringColor: ["color", "warning"],
    colorBlue_checkColor: ["color", "blue"],
    colorBlue_focus_ringColor: ["color", "blue"],
    colorCyan_checkColor: ["color", "cyan"],
    colorCyan_focus_ringColor: ["color", "cyan"],
    colorGreen_checkColor: ["color", "green"],
    colorGreen_focus_ringColor: ["color", "green"],
    colorIndigo_checkColor: ["color", "indigo"],
    colorIndigo_focus_ringColor: ["color", "indigo"],
    colorLime_checkColor: ["color", "lime"],
    colorLime_focus_ringColor: ["color", "lime"],
    colorPink_checkColor: ["color", "pink"],
    colorPink_focus_ringColor: ["color", "pink"],
    colorRed_checkColor: ["color", "red"],
    colorRed_focus_ringColor: ["color", "red"],
    colorTeal_checkColor: ["color", "teal"],
    colorTeal_focus_ringColor: ["color", "teal"],
    colorYellow_checkColor: ["color", "yellow"],
    colorYellow_focus_ringColor: ["color", "yellow"],
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
      <div className="flex items-center gap-2">
        {/* Conditionally render the checkbox and label based on position */}
        {logic?.checkboxPosition === "left" && (
          <FlowbitCheckbox
            className={containerClasses}
            {...props}
            theme={mergedTheme as any}
          />
        )}
        {logic?.label && (
          <Label htmlFor={props.id} color={props.color}>
            {logic?.label}
          </Label>
        )}
        {logic?.checkboxPosition === "right" && (
          <FlowbitCheckbox
            className={containerClasses}
            {...props}
            theme={mergedTheme as any}
          />
        )}
      </div>
      {logic?.helperText && <HelperText>{logic?.helperText}</HelperText>}
    </div>
  );
};

export default Checkbox;
