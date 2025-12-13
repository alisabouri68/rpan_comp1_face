import {
  Label,
  TextInput as FlowbitTextInput,
  TextInputProps as FlowbiteTextInputProps,
  HelperText,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic text input component.
// It extends all standard TextInputProps and adds a mandatory 'label' prop.
export interface Props
  extends Omit<FlowbiteTextInputProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    id: string;
    label?: string; // The label for the text input.
    helperText?: React.ReactNode; // Optional helper text to display below the input.
  };
  style?: {
    // Addon Styles
    addon_rounding?: string;
    addon_borderWidth?: string;
    addon_borderColor?: string;
    addon_bgColor?: string;
    addon_padding?: string;
    addon_fontSize?: string;
    addon_textColor?: string;

    // Left Icon Styles
    icon_padding?: string;
    icon_size?: string;
    icon_color?: string;

    // Right Icon Styles
    rightIcon_padding?: string;
    rightIcon_size?: string;
    rightIcon_color?: string;

    // Base Input Styles
    input_disabled_opacity?: string;

    // --- Input Color Variants (Complete) ---
    // Gray
    colorGray_borderColor?: string;
    colorGray_bgColor?: string;
    colorGray_textColor?: string;
    colorGray_placeholderColor?: string;
    colorGray_focus_borderColor?: string;
    colorGray_focus_ringColor?: string;
    // Info
    colorInfo_borderColor?: string;
    colorInfo_bgColor?: string;
    colorInfo_textColor?: string;
    colorInfo_placeholderColor?: string;
    colorInfo_focus_borderColor?: string;
    colorInfo_focus_ringColor?: string;
    // Failure
    colorFailure_borderColor?: string;
    colorFailure_bgColor?: string;
    colorFailure_textColor?: string;
    colorFailure_placeholderColor?: string;
    colorFailure_focus_borderColor?: string;
    colorFailure_focus_ringColor?: string;
    // Warning
    colorWarning_borderColor?: string;
    colorWarning_bgColor?: string;
    colorWarning_textColor?: string;
    colorWarning_placeholderColor?: string;
    colorWarning_focus_borderColor?: string;
    colorWarning_focus_ringColor?: string;
    // Success
    colorSuccess_borderColor?: string;
    colorSuccess_bgColor?: string;
    colorSuccess_textColor?: string;
    colorSuccess_placeholderColor?: string;
    colorSuccess_focus_borderColor?: string;
    colorSuccess_focus_ringColor?: string;

    // --- Input Structural Variants ---
    inputWithRightIcon_padding?: string;
    inputWithIcon_padding?: string;
    inputWithAddon_rounding?: string;
    inputWithoutAddon_rounding?: string;
    inputWithShadow_shadow?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react TextInput.
 * This component provides a complete form input with a label, text input, and optional helper text.
 * It's designed to be a controlled component, making it easy to manage its state from a parent.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the text input.
 * @param {React.ReactNode} [props.helperText] - The optional helper text.
 * @param {TextInputProps} props.rest - All other standard TextInput props.
 */
const Input: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Addon Styles
    addon_rounding: "rounded-l-md",
    addon_borderWidth: "border border-r-0",
    addon_borderColor: "border-gray-300",
    addon_bgColor: "bg-gray-200",
    addon_padding: "px-3",
    addon_fontSize: "text-sm",
    addon_textColor: "text-gray-900",

    // Left Icon Styles
    icon_padding: "pl-3",
    icon_size: "h-5 w-5",
    icon_color: "text-gray-500",

    // Right Icon Styles
    rightIcon_padding: "pr-3",
    rightIcon_size: "h-5 w-5",
    rightIcon_color: "text-gray-500",

    // Base Input Styles
    input_disabled_opacity: "disabled:opacity-50",

    // --- Input Color Variants ---
    // Gray
    colorGray_borderColor: "border-gray-300",
    colorGray_bgColor: "bg-gray-50",
    colorGray_textColor: "text-gray-900",
    colorGray_placeholderColor: "placeholder-gray-500",
    colorGray_focus_borderColor: "focus:border-primary-500",
    colorGray_focus_ringColor: "focus:ring-primary-500",
    // Info
    colorInfo_borderColor: "border-cyan-500",
    colorInfo_bgColor: "bg-cyan-50",
    colorInfo_textColor: "text-cyan-900",
    colorInfo_placeholderColor: "placeholder-cyan-700",
    colorInfo_focus_borderColor: "focus:border-cyan-500",
    colorInfo_focus_ringColor: "focus:ring-cyan-500",
    // Failure
    colorFailure_borderColor: "border-red-500",
    colorFailure_bgColor: "bg-red-50",
    colorFailure_textColor: "text-red-900",
    colorFailure_placeholderColor: "placeholder-red-700",
    colorFailure_focus_borderColor: "focus:border-red-500",
    colorFailure_focus_ringColor: "focus:ring-red-500",
    // Warning
    colorWarning_borderColor: "border-yellow-500",
    colorWarning_bgColor: "bg-yellow-50",
    colorWarning_textColor: "text-yellow-900",
    colorWarning_placeholderColor: "placeholder-yellow-700",
    colorWarning_focus_borderColor: "focus:border-yellow-500",
    colorWarning_focus_ringColor: "focus:ring-yellow-500",
    // Success
    colorSuccess_borderColor: "border-green-500",
    colorSuccess_bgColor: "bg-green-50",
    colorSuccess_textColor: "text-green-900",
    colorSuccess_placeholderColor: "placeholder-green-700",
    colorSuccess_focus_borderColor: "focus:border-green-500",
    colorSuccess_focus_ringColor: "focus:ring-green-500",

    // --- Input Structural Variants ---
    inputWithRightIcon_padding: "pr-10",
    inputWithIcon_padding: "pl-10",
    inputWithAddon_rounding: "rounded-r-lg",
    inputWithoutAddon_rounding: "rounded-lg",
    inputWithShadow_shadow: "shadow-sm",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.textInput;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Addon Styles
    addon_rounding: ["addon"],
    addon_borderWidth: ["addon"],
    addon_borderColor: ["addon"],
    addon_bgColor: ["addon"],
    addon_padding: ["addon"],
    addon_fontSize: ["addon"],
    addon_textColor: ["addon"],

    // Left Icon Styles
    icon_padding: ["field", "icon", "base"],
    icon_size: ["field", "icon", "svg"],
    icon_color: ["field", "icon", "svg"],

    // Right Icon Styles
    rightIcon_padding: ["field", "rightIcon", "base"],
    rightIcon_size: ["field", "rightIcon", "svg"],
    rightIcon_color: ["field", "rightIcon", "svg"],

    // Base Input Styles
    input_disabled_opacity: ["field", "input", "base"],

    // --- Input Color Variants ---
    // Gray
    colorGray_borderColor: ["field", "input", "colors", "gray"],
    colorGray_bgColor: ["field", "input", "colors", "gray"],
    colorGray_textColor: ["field", "input", "colors", "gray"],
    colorGray_placeholderColor: ["field", "input", "colors", "gray"],
    colorGray_focus_borderColor: ["field", "input", "colors", "gray"],
    colorGray_focus_ringColor: ["field", "input", "colors", "gray"],
    // Info
    colorInfo_borderColor: ["field", "input", "colors", "info"],
    colorInfo_bgColor: ["field", "input", "colors", "info"],
    colorInfo_textColor: ["field", "input", "colors", "info"],
    colorInfo_placeholderColor: ["field", "input", "colors", "info"],
    colorInfo_focus_borderColor: ["field", "input", "colors", "info"],
    colorInfo_focus_ringColor: ["field", "input", "colors", "info"],
    // Failure
    colorFailure_borderColor: ["field", "input", "colors", "failure"],
    colorFailure_bgColor: ["field", "input", "colors", "failure"],
    colorFailure_textColor: ["field", "input", "colors", "failure"],
    colorFailure_placeholderColor: ["field", "input", "colors", "failure"],
    colorFailure_focus_borderColor: ["field", "input", "colors", "failure"],
    colorFailure_focus_ringColor: ["field", "input", "colors", "failure"],
    // Warning
    colorWarning_borderColor: ["field", "input", "colors", "warning"],
    colorWarning_bgColor: ["field", "input", "colors", "warning"],
    colorWarning_textColor: ["field", "input", "colors", "warning"],
    colorWarning_placeholderColor: ["field", "input", "colors", "warning"],
    colorWarning_focus_borderColor: ["field", "input", "colors", "warning"],
    colorWarning_focus_ringColor: ["field", "input", "colors", "warning"],
    // Success
    colorSuccess_borderColor: ["field", "input", "colors", "success"],
    colorSuccess_bgColor: ["field", "input", "colors", "success"],
    colorSuccess_textColor: ["field", "input", "colors", "success"],
    colorSuccess_placeholderColor: ["field", "input", "colors", "success"],
    colorSuccess_focus_borderColor: ["field", "input", "colors", "success"],
    colorSuccess_focus_ringColor: ["field", "input", "colors", "success"],

    // --- Input Structural Variants ---
    inputWithRightIcon_padding: ["field", "input", "withRightIcon", "on"],
    inputWithIcon_padding: ["field", "input", "withIcon", "on"],
    inputWithAddon_rounding: ["field", "input", "withAddon", "on"],
    inputWithoutAddon_rounding: ["field", "input", "withAddon", "off"],
    inputWithShadow_shadow: ["field", "input", "withShadow", "on"],
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
      {logic.label && (
        <Label htmlFor={props.id} color={props.color}>
          {logic.label}
        </Label>
      )}
      <FlowbitTextInput
        className={containerClasses}
        {...props}
        theme={mergedTheme as any}
      />
      {logic.helperText && <HelperText>{logic.helperText}</HelperText>}
    </div>
  );
};

export default Input;
