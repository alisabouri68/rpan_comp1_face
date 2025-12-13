import {
  Label,
  Select as FlowbitSelect,
  SelectProps,
  HelperText,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// Interface for a single option in the select input.
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// The interface for our dynamic select input component.
// It extends all standard SelectProps and adds a mandatory 'label' prop
// along with the array of options and optional helper text.
export interface Props extends Omit<SelectProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    label?: string; // The label for the select input.
    helperText?: React.ReactNode; // Optional helper text to display below the input.
    options: SelectOption[]; // The array of options to render.
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

    // Icon Styles
    icon_padding?: string;
    icon_size?: string;
    icon_color?: string;

    // Base Select Styles
    select_borderWidth?: string;
    select_paddingRight?: string;
    select_focus_ringWidth?: string;
    select_disabled_opacity?: string;

    // --- Select Color Variants (Complete) ---
    // Gray
    colorGray_borderColor?: string;
    colorGray_bgColor?: string;
    colorGray_textColor?: string;
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

    // --- Select Structural Variants ---
    selectWithIcon_padding?: string;
    selectWithAddon_rounding?: string;
    selectWithoutAddon_rounding?: string;
    selectWithShadow_shadow?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Select.
 * This component provides a complete form input with a label, select dropdown, and optional helper text.
 * It is designed to be a controlled component, making it easy to manage its state from a parent.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the select input.
 * @param {React.ReactNode} [props.helperText] - The optional helper text.
 * @param {SelectOption[]} props.options - An array of objects for the select options.
 * @param {SelectProps} props.rest - All other standard Select props.
 */
const SelectInput: React.FC<Props> = ({
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

    // Icon Styles
    icon_padding: "pl-3",
    icon_size: "h-5 w-5",
    icon_color: "text-gray-500",

    // Base Select Styles
    select_borderWidth: "border",
    select_paddingRight: "pr-10",
    select_focus_ringWidth: "focus:ring-1",
    select_disabled_opacity: "disabled:opacity-50",

    // --- Select Color Variants ---
    // Gray
    colorGray_borderColor: "border-gray-300",
    colorGray_bgColor: "bg-gray-50",
    colorGray_textColor: "text-gray-900",
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

    // --- Select Structural Variants ---
    selectWithIcon_padding: "pl-10",
    selectWithAddon_rounding: "rounded-r-lg",
    selectWithoutAddon_rounding: "rounded-lg",
    selectWithShadow_shadow: "shadow-sm",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.select;

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

    // Icon Styles
    icon_padding: ["field", "icon", "base"],
    icon_size: ["field", "icon", "svg"],
    icon_color: ["field", "icon", "svg"],

    // Base Select Styles
    select_borderWidth: ["field", "select", "base"],
    select_paddingRight: ["field", "select", "base"],
    select_focus_ringWidth: ["field", "select", "base"],
    select_disabled_opacity: ["field", "select", "base"],

    // --- Select Color Variants ---
    // Gray
    colorGray_borderColor: ["field", "select", "colors", "gray"],
    colorGray_bgColor: ["field", "select", "colors", "gray"],
    colorGray_textColor: ["field", "select", "colors", "gray"],
    colorGray_focus_borderColor: ["field", "select", "colors", "gray"],
    colorGray_focus_ringColor: ["field", "select", "colors", "gray"],
    // Info
    colorInfo_borderColor: ["field", "select", "colors", "info"],
    colorInfo_bgColor: ["field", "select", "colors", "info"],
    colorInfo_textColor: ["field", "select", "colors", "info"],
    colorInfo_placeholderColor: ["field", "select", "colors", "info"],
    colorInfo_focus_borderColor: ["field", "select", "colors", "info"],
    colorInfo_focus_ringColor: ["field", "select", "colors", "info"],
    // Failure
    colorFailure_borderColor: ["field", "select", "colors", "failure"],
    colorFailure_bgColor: ["field", "select", "colors", "failure"],
    colorFailure_textColor: ["field", "select", "colors", "failure"],
    colorFailure_placeholderColor: ["field", "select", "colors", "failure"],
    colorFailure_focus_borderColor: ["field", "select", "colors", "failure"],
    colorFailure_focus_ringColor: ["field", "select", "colors", "failure"],
    // Warning
    colorWarning_borderColor: ["field", "select", "colors", "warning"],
    colorWarning_bgColor: ["field", "select", "colors", "warning"],
    colorWarning_textColor: ["field", "select", "colors", "warning"],
    colorWarning_placeholderColor: ["field", "select", "colors", "warning"],
    colorWarning_focus_borderColor: ["field", "select", "colors", "warning"],
    colorWarning_focus_ringColor: ["field", "select", "colors", "warning"],
    // Success
    colorSuccess_borderColor: ["field", "select", "colors", "success"],
    colorSuccess_bgColor: ["field", "select", "colors", "success"],
    colorSuccess_textColor: ["field", "select", "colors", "success"],
    colorSuccess_placeholderColor: ["field", "select", "colors", "success"],
    colorSuccess_focus_borderColor: ["field", "select", "colors", "success"],
    colorSuccess_focus_ringColor: ["field", "select", "colors", "success"],

    // --- Select Structural Variants ---
    selectWithIcon_padding: ["field", "select", "withIcon", "on"],
    selectWithAddon_rounding: ["field", "select", "withAddon", "on"],
    selectWithoutAddon_rounding: ["field", "select", "withAddon", "off"],
    selectWithShadow_shadow: ["field", "select", "withShadow", "on"],
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
      <FlowbitSelect
        className={containerClasses}
        {...props}
        theme={mergedTheme as any}
      >
        {logic.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </FlowbitSelect>
      {logic.helperText && <HelperText>{logic.helperText}</HelperText>}
    </div>
  );
};

export default SelectInput;
