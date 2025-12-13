import {
  Radio as FlowbitRadio,
  RadioProps,
  Label,
  HelperText,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic radio button component.
// It extends all standard RadioProps and makes the 'label' prop optional.
// A new prop, 'radioPosition', is added to control the radio button's placement.
export interface Props extends Omit<RadioProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    label?: React.ReactNode; // The label for the radio button, now optional.
    helperText?: React.ReactNode; // Optional helper text to display below the input.
    radioPosition?: "left" | "right"; // New: Position of the radio button relative to the label.
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

    // --- Color Variants (Complete) ---
    colorDefault_dotColor?: string;
    colorDefault_focus_ringColor?: string;
    colorDark_dotColor?: string;
    colorDark_focus_ringColor?: string;
    colorFailure_dotColor?: string;
    colorFailure_focus_ringColor?: string;
    colorGray_dotColor?: string;
    colorGray_focus_ringColor?: string;
    colorInfo_dotColor?: string;
    colorInfo_focus_ringColor?: string;
    colorLight_dotColor?: string;
    colorLight_focus_ringColor?: string;
    colorPurple_dotColor?: string;
    colorPurple_focus_ringColor?: string;
    colorSuccess_dotColor?: string;
    colorSuccess_focus_ringColor?: string;
    colorWarning_dotColor?: string;
    colorWarning_focus_ringColor?: string;
    colorBlue_dotColor?: string;
    colorBlue_focus_ringColor?: string;
    colorCyan_dotColor?: string;
    colorCyan_focus_ringColor?: string;
    colorGreen_dotColor?: string;
    colorGreen_focus_ringColor?: string;
    colorIndigo_dotColor?: string;
    colorIndigo_focus_ringColor?: string;
    colorLime_dotColor?: string;
    colorLime_focus_ringColor?: string;
    colorPink_dotColor?: string;
    colorPink_focus_ringColor?: string;
    colorRed_dotColor?: string;
    colorRed_focus_ringColor?: string;
    colorTeal_dotColor?: string;
    colorTeal_focus_ringColor?: string;
    colorYellow_dotColor?: string;
    colorYellow_focus_ringColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Radio button.
 * This component provides a complete form input with a radio button, a label, and optional helper text.
 * It is designed to be a controlled component, making it easy to manage its state from a parent.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} [props.label] - The optional label for the radio button.
 * @param {React.ReactNode} [props.helperText] - The optional helper text.
 * @param {'left' | 'right'} [props.radioPosition] - The position of the radio button.
 * @param {RadioProps} props.rest - All other standard RadioProps.
 */
const RadioButton: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Base Styles
    base_size: "h-4 w-4",
    base_rounding: "rounded-full",
    base_borderWidth: "border",
    base_borderColor: "border-gray-300",
    base_bgColor: "bg-gray-100",
    base_focus_ringWidth: "focus:ring-2",
    base_focus_ringOffset: "focus:ring-offset-2",

    // --- Color Variants (Complete) ---
    colorDefault_dotColor: "text-primary-600",
    colorDefault_focus_ringColor: "focus:ring-primary-600",
    colorDark_dotColor: "text-gray-800",
    colorDark_focus_ringColor: "focus:ring-gray-800",
    colorFailure_dotColor: "text-red-900",
    colorFailure_focus_ringColor: "focus:ring-red-900",
    colorGray_dotColor: "text-gray-900",
    colorGray_focus_ringColor: "focus:ring-gray-900",
    colorInfo_dotColor: "text-cyan-800",
    colorInfo_focus_ringColor: "focus:ring-cyan-800",
    colorLight_dotColor: "text-gray-900",
    colorLight_focus_ringColor: "focus:ring-gray-900",
    colorPurple_dotColor: "text-purple-600",
    colorPurple_focus_ringColor: "focus:ring-purple-600",
    colorSuccess_dotColor: "text-green-800",
    colorSuccess_focus_ringColor: "focus:ring-green-800",
    colorWarning_dotColor: "text-yellow-400",
    colorWarning_focus_ringColor: "focus:ring-yellow-400",
    colorBlue_dotColor: "text-blue-700",
    colorBlue_focus_ringColor: "focus:ring-blue-600",
    colorCyan_dotColor: "text-cyan-600",
    colorCyan_focus_ringColor: "focus:ring-cyan-600",
    colorGreen_dotColor: "text-green-600",
    colorGreen_focus_ringColor: "focus:ring-green-600",
    colorIndigo_dotColor: "text-indigo-700",
    colorIndigo_focus_ringColor: "focus:ring-indigo-700",
    colorLime_dotColor: "text-lime-700",
    colorLime_focus_ringColor: "focus:ring-lime-700",
    colorPink_dotColor: "text-pink-600",
    colorPink_focus_ringColor: "focus:ring-pink-600",
    colorRed_dotColor: "text-red-600",
    colorRed_focus_ringColor: "focus:ring-red-600",
    colorTeal_dotColor: "text-teal-600",
    colorTeal_focus_ringColor: "focus:ring-teal-600",
    colorYellow_dotColor: "text-yellow-400",
    colorYellow_focus_ringColor: "focus:ring-yellow-400",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.radio;

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

    // --- Color Variants (Complete) ---
    colorDefault_dotColor: ["color", "default"],
    colorDefault_focus_ringColor: ["color", "default"],
    colorDark_dotColor: ["color", "dark"],
    colorDark_focus_ringColor: ["color", "dark"],
    colorFailure_dotColor: ["color", "failure"],
    colorFailure_focus_ringColor: ["color", "failure"],
    colorGray_dotColor: ["color", "gray"],
    colorGray_focus_ringColor: ["color", "gray"],
    colorInfo_dotColor: ["color", "info"],
    colorInfo_focus_ringColor: ["color", "info"],
    colorLight_dotColor: ["color", "light"],
    colorLight_focus_ringColor: ["color", "light"],
    colorPurple_dotColor: ["color", "purple"],
    colorPurple_focus_ringColor: ["color", "purple"],
    colorSuccess_dotColor: ["color", "success"],
    colorSuccess_focus_ringColor: ["color", "success"],
    colorWarning_dotColor: ["color", "warning"],
    colorWarning_focus_ringColor: ["color", "warning"],
    colorBlue_dotColor: ["color", "blue"],
    colorBlue_focus_ringColor: ["color", "blue"],
    colorCyan_dotColor: ["color", "cyan"],
    colorCyan_focus_ringColor: ["color", "cyan"],
    colorGreen_dotColor: ["color", "green"],
    colorGreen_focus_ringColor: ["color", "green"],
    colorIndigo_dotColor: ["color", "indigo"],
    colorIndigo_focus_ringColor: ["color", "indigo"],
    colorLime_dotColor: ["color", "lime"],
    colorLime_focus_ringColor: ["color", "lime"],
    colorPink_dotColor: ["color", "pink"],
    colorPink_focus_ringColor: ["color", "pink"],
    colorRed_dotColor: ["color", "red"],
    colorRed_focus_ringColor: ["color", "red"],
    colorTeal_dotColor: ["color", "teal"],
    colorTeal_focus_ringColor: ["color", "teal"],
    colorYellow_dotColor: ["color", "yellow"],
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
        {/* Conditionally render the radio button and label based on position */}
        {logic.radioPosition === "left" && (
          <FlowbitRadio
            className={containerClasses}
            {...props}
            theme={mergedTheme as any}
          />
        )}
        {logic.label && (
          <Label htmlFor={props.id} color={props.color}>
            {logic.label}
          </Label>
        )}
        {logic.radioPosition === "right" && (
          <FlowbitRadio
            className={containerClasses}
            {...props}
            theme={mergedTheme as any}
          />
        )}
      </div>
      {logic.helperText && <HelperText>{logic.helperText}</HelperText>}
    </div>
  );
};

export default RadioButton;
