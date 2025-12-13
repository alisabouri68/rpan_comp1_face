import {
  FloatingLabel as FlowbitFloatingLabel,
  FloatingLabelProps,
  HelperText,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic floating label component.
// We extend the base FloatingLabelProps to inherit all its properties.
export interface Props extends Omit<FloatingLabelProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    // All standard FloatingLabelProps are inherited.
    // The 'label' prop is required by the original component.
    // The 'variant' and 'helperText' props are also available.
    helperText?: React.ReactNode; // Optional helper text to display below the input.
  };
  style?: {
    // Filled Variant
    input_filled_default_sm_rounding?: string;
    input_filled_default_sm_borderWidth?: string;
    input_filled_default_sm_borderColor?: string;
    input_filled_default_sm_bgColor?: string;
    input_filled_default_sm_padding?: string;
    input_filled_default_sm_fontSize?: string;
    input_filled_default_sm_textColor?: string;
    input_filled_default_sm_focus_borderColor?: string;
    input_filled_default_md_rounding?: string;
    input_filled_default_md_borderWidth?: string;
    input_filled_default_md_borderColor?: string;
    input_filled_default_md_bgColor?: string;
    input_filled_default_md_padding?: string;
    input_filled_default_md_fontSize?: string;
    input_filled_default_md_textColor?: string;
    input_filled_default_md_focus_borderColor?: string;
    // Outlined Variant
    input_outlined_default_sm_rounding?: string;
    input_outlined_default_sm_borderWidth?: string;
    input_outlined_default_sm_borderColor?: string;
    input_outlined_default_sm_bgColor?: string;
    input_outlined_default_sm_padding?: string;
    input_outlined_default_sm_fontSize?: string;
    input_outlined_default_sm_textColor?: string;
    input_outlined_default_sm_focus_borderColor?: string;
    input_outlined_default_md_rounding?: string;
    input_outlined_default_md_borderWidth?: string;
    input_outlined_default_md_borderColor?: string;
    input_outlined_default_md_bgColor?: string;
    input_outlined_default_md_padding?: string;
    input_outlined_default_md_fontSize?: string;
    input_outlined_default_md_textColor?: string;
    input_outlined_default_md_focus_borderColor?: string;
    // Standard Variant
    input_standard_default_sm_borderWidth?: string;
    input_standard_default_sm_borderColor?: string;
    input_standard_default_sm_bgColor?: string;
    input_standard_default_sm_padding?: string;
    input_standard_default_sm_fontSize?: string;
    input_standard_default_sm_textColor?: string;
    input_standard_default_sm_focus_borderColor?: string;
    input_standard_default_md_borderWidth?: string;
    input_standard_default_md_borderColor?: string;
    input_standard_default_md_bgColor?: string;
    input_standard_default_md_padding?: string;
    input_standard_default_md_fontSize?: string;
    input_standard_default_md_textColor?: string;
    input_standard_default_md_focus_borderColor?: string;

    // --- Input / Success State ---
    // Filled Variant
    input_filled_success_sm_borderColor?: string;
    input_filled_success_md_borderColor?: string;
    // Outlined Variant
    input_outlined_success_sm_borderColor?: string;
    input_outlined_success_md_borderColor?: string;
    // Standard Variant
    input_standard_success_sm_borderColor?: string;
    input_standard_success_md_borderColor?: string;

    // --- Input / Error State ---
    // Filled Variant
    input_filled_error_sm_borderColor?: string;
    input_filled_error_md_borderColor?: string;
    // Outlined Variant
    input_outlined_error_sm_borderColor?: string;
    input_outlined_error_md_borderColor?: string;
    // Standard Variant
    input_standard_error_sm_borderColor?: string;
    input_standard_error_md_borderColor?: string;

    // --- Label / Default State ---
    label_filled_default_sm_fontSize?: string;
    label_filled_default_sm_textColor?: string;
    label_filled_default_sm_focus_textColor?: string;
    label_filled_default_md_fontSize?: string;
    label_filled_default_md_textColor?: string;
    label_filled_default_md_focus_textColor?: string;
    label_outlined_default_sm_bgColor?: string;
    label_outlined_default_sm_padding?: string;
    label_outlined_default_sm_fontSize?: string;
    label_outlined_default_sm_textColor?: string;
    label_outlined_default_sm_focus_textColor?: string;
    label_outlined_default_md_bgColor?: string;
    label_outlined_default_md_padding?: string;
    label_outlined_default_md_fontSize?: string;
    label_outlined_default_md_textColor?: string;
    label_outlined_default_md_focus_textColor?: string;
    label_standard_default_sm_fontSize?: string;
    label_standard_default_sm_textColor?: string;
    label_standard_default_sm_focus_textColor?: string;
    label_standard_default_md_fontSize?: string;
    label_standard_default_md_textColor?: string;
    label_standard_default_md_focus_textColor?: string;

    // --- Label / Success State ---
    label_filled_success_sm_textColor?: string;
    label_filled_success_md_textColor?: string;
    label_outlined_success_sm_textColor?: string;
    label_outlined_success_md_textColor?: string;
    label_standard_success_sm_textColor?: string;
    label_standard_success_md_textColor?: string;

    // --- Label / Error State ---
    label_filled_error_sm_textColor?: string;
    label_filled_error_md_textColor?: string;
    label_outlined_error_sm_textColor?: string;
    label_outlined_error_md_textColor?: string;
    label_standard_error_sm_textColor?: string;
    label_standard_error_md_textColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react FloatingLabel.
 * This component accepts all standard FloatingLabelProps and renders a single
 * input field with a floating label. It is designed to be a controlled component,
 * making it easy to manage its state from a parent.
 *
 * @param {object} props - The component props, which are all standard FloatingLabelProps.
 */
const FloatingInput: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // --- Input / Default State ---
    input_filled_default_sm_rounding: "rounded-t-lg",
    input_filled_default_sm_borderWidth: "border-0 border-b-2",
    input_filled_default_sm_borderColor: "border-gray-300",
    input_filled_default_sm_bgColor: "bg-gray-50",
    input_filled_default_sm_padding: "px-2.5 pb-2.5 pt-5",
    input_filled_default_sm_fontSize: "text-xs",
    input_filled_default_sm_textColor: "text-gray-900",
    input_filled_default_sm_focus_borderColor: "focus:border-primary-600",
    input_filled_default_md_rounding: "rounded-t-lg",
    input_filled_default_md_borderWidth: "border-0 border-b-2",
    input_filled_default_md_borderColor: "border-gray-300",
    input_filled_default_md_bgColor: "bg-gray-50",
    input_filled_default_md_padding: "px-2.5 pb-2.5 pt-5",
    input_filled_default_md_fontSize: "text-sm",
    input_filled_default_md_textColor: "text-gray-900",
    input_filled_default_md_focus_borderColor: "focus:border-primary-600",
    input_outlined_default_sm_rounding: "rounded-lg",
    input_outlined_default_sm_borderWidth: "border",
    input_outlined_default_sm_borderColor: "border-gray-300",
    input_outlined_default_sm_bgColor: "bg-transparent",
    input_outlined_default_sm_padding: "px-2.5 pb-2.5 pt-4",
    input_outlined_default_sm_fontSize: "text-xs",
    input_outlined_default_sm_textColor: "text-gray-900",
    input_outlined_default_sm_focus_borderColor: "focus:border-primary-600",
    input_outlined_default_md_rounding: "rounded-lg",
    input_outlined_default_md_borderWidth: "border",
    input_outlined_default_md_borderColor: "border-gray-300",
    input_outlined_default_md_bgColor: "bg-transparent",
    input_outlined_default_md_padding: "px-2.5 pb-2.5 pt-4",
    input_outlined_default_md_fontSize: "text-sm",
    input_outlined_default_md_textColor: "text-gray-900",
    input_outlined_default_md_focus_borderColor: "focus:border-primary-600",
    input_standard_default_sm_borderWidth: "border-0 border-b-2",
    input_standard_default_sm_borderColor: "border-gray-300",
    input_standard_default_sm_bgColor: "bg-transparent",
    input_standard_default_sm_padding: "px-0 py-2.5",
    input_standard_default_sm_fontSize: "text-xs",
    input_standard_default_sm_textColor: "text-gray-900",
    input_standard_default_sm_focus_borderColor: "focus:border-primary-600",
    input_standard_default_md_borderWidth: "border-0 border-b-2",
    input_standard_default_md_borderColor: "border-gray-300",
    input_standard_default_md_bgColor: "bg-transparent",
    input_standard_default_md_padding: "px-0 py-2.5",
    input_standard_default_md_fontSize: "text-sm",
    input_standard_default_md_textColor: "text-gray-900",
    input_standard_default_md_focus_borderColor: "focus:border-primary-600",

    // --- Input / Success State ---
    input_filled_success_sm_borderColor: "border-green-600",
    input_filled_success_md_borderColor: "border-green-600",
    input_outlined_success_sm_borderColor: "border-green-600",
    input_outlined_success_md_borderColor: "border-green-600",
    input_standard_success_sm_borderColor: "border-green-600",
    input_standard_success_md_borderColor: "border-green-600",

    // --- Input / Error State ---
    input_filled_error_sm_borderColor: "border-red-600",
    input_filled_error_md_borderColor: "border-red-600",
    input_outlined_error_sm_borderColor: "border-red-600",
    input_outlined_error_md_borderColor: "border-red-600",
    input_standard_error_sm_borderColor: "border-red-600",
    input_standard_error_md_borderColor: "border-red-600",

    // --- Label / Default State ---
    label_filled_default_sm_fontSize: "text-xs",
    label_filled_default_sm_textColor: "text-gray-500",
    label_filled_default_sm_focus_textColor: "peer-focus:text-primary-600",
    label_filled_default_md_fontSize: "text-sm",
    label_filled_default_md_textColor: "text-gray-500",
    label_filled_default_md_focus_textColor: "peer-focus:text-primary-600",
    label_outlined_default_sm_bgColor: "bg-white",
    label_outlined_default_sm_padding: "px-2",
    label_outlined_default_sm_fontSize: "text-xs",
    label_outlined_default_sm_textColor: "text-gray-500",
    label_outlined_default_sm_focus_textColor: "peer-focus:text-primary-600",
    label_outlined_default_md_bgColor: "bg-white",
    label_outlined_default_md_padding: "px-2",
    label_outlined_default_md_fontSize: "text-sm",
    label_outlined_default_md_textColor: "text-gray-500",
    label_outlined_default_md_focus_textColor: "peer-focus:text-primary-600",
    label_standard_default_sm_fontSize: "text-xs",
    label_standard_default_sm_textColor: "text-gray-500",
    label_standard_default_sm_focus_textColor: "peer-focus:text-primary-600",
    label_standard_default_md_fontSize: "text-sm",
    label_standard_default_md_textColor: "text-gray-500",
    label_standard_default_md_focus_textColor: "peer-focus:text-primary-600",

    // --- Label / Success State ---
    label_filled_success_sm_textColor: "text-green-600",
    label_filled_success_md_textColor: "text-green-600",
    label_outlined_success_sm_textColor: "text-green-600",
    label_outlined_success_md_textColor: "text-green-600",
    label_standard_success_sm_textColor: "text-green-600",
    label_standard_success_md_textColor: "text-green-600",

    // --- Label / Error State ---
    label_filled_error_sm_textColor: "text-red-600",
    label_filled_error_md_textColor: "text-red-600",
    label_outlined_error_sm_textColor: "text-red-600",
    label_outlined_error_md_textColor: "text-red-600",
    label_standard_error_sm_textColor: "text-red-600",
    label_standard_error_md_textColor: "text-red-600",
  },
  ...props
}: any) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.floatingLabel;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // --- Input / Default State ---
    input_filled_default_sm_rounding: ["input", "default", "filled", "sm"],
    input_filled_default_sm_borderWidth: ["input", "default", "filled", "sm"],
    input_filled_default_sm_borderColor: ["input", "default", "filled", "sm"],
    input_filled_default_sm_bgColor: ["input", "default", "filled", "sm"],
    input_filled_default_sm_padding: ["input", "default", "filled", "sm"],
    input_filled_default_sm_fontSize: ["input", "default", "filled", "sm"],
    input_filled_default_sm_textColor: ["input", "default", "filled", "sm"],
    input_filled_default_sm_focus_borderColor: [
      "input",
      "default",
      "filled",
      "sm",
    ],
    input_filled_default_md_rounding: ["input", "default", "filled", "md"],
    input_filled_default_md_borderWidth: ["input", "default", "filled", "md"],
    input_filled_default_md_borderColor: ["input", "default", "filled", "md"],
    input_filled_default_md_bgColor: ["input", "default", "filled", "md"],
    input_filled_default_md_padding: ["input", "default", "filled", "md"],
    input_filled_default_md_fontSize: ["input", "default", "filled", "md"],
    input_filled_default_md_textColor: ["input", "default", "filled", "md"],
    input_filled_default_md_focus_borderColor: [
      "input",
      "default",
      "filled",
      "md",
    ],
    input_outlined_default_sm_rounding: ["input", "default", "outlined", "sm"],
    input_outlined_default_sm_borderWidth: [
      "input",
      "default",
      "outlined",
      "sm",
    ],
    input_outlined_default_sm_borderColor: [
      "input",
      "default",
      "outlined",
      "sm",
    ],
    input_outlined_default_sm_bgColor: ["input", "default", "outlined", "sm"],
    input_outlined_default_sm_padding: ["input", "default", "outlined", "sm"],
    input_outlined_default_sm_fontSize: ["input", "default", "outlined", "sm"],
    input_outlined_default_sm_textColor: ["input", "default", "outlined", "sm"],
    input_outlined_default_sm_focus_borderColor: [
      "input",
      "default",
      "outlined",
      "sm",
    ],
    input_outlined_default_md_rounding: ["input", "default", "outlined", "md"],
    input_outlined_default_md_borderWidth: [
      "input",
      "default",
      "outlined",
      "md",
    ],
    input_outlined_default_md_borderColor: [
      "input",
      "default",
      "outlined",
      "md",
    ],
    input_outlined_default_md_bgColor: ["input", "default", "outlined", "md"],
    input_outlined_default_md_padding: ["input", "default", "outlined", "md"],
    input_outlined_default_md_fontSize: ["input", "default", "outlined", "md"],
    input_outlined_default_md_textColor: ["input", "default", "outlined", "md"],
    input_outlined_default_md_focus_borderColor: [
      "input",
      "default",
      "outlined",
      "md",
    ],
    input_standard_default_sm_borderWidth: [
      "input",
      "default",
      "standard",
      "sm",
    ],
    input_standard_default_sm_borderColor: [
      "input",
      "default",
      "standard",
      "sm",
    ],
    input_standard_default_sm_bgColor: ["input", "default", "standard", "sm"],
    input_standard_default_sm_padding: ["input", "default", "standard", "sm"],
    input_standard_default_sm_fontSize: ["input", "default", "standard", "sm"],
    input_standard_default_sm_textColor: ["input", "default", "standard", "sm"],
    input_standard_default_sm_focus_borderColor: [
      "input",
      "default",
      "standard",
      "sm",
    ],
    input_standard_default_md_borderWidth: [
      "input",
      "default",
      "standard",
      "md",
    ],
    input_standard_default_md_borderColor: [
      "input",
      "default",
      "standard",
      "md",
    ],
    input_standard_default_md_bgColor: ["input", "default", "standard", "md"],
    input_standard_default_md_padding: ["input", "default", "standard", "md"],
    input_standard_default_md_fontSize: ["input", "default", "standard", "md"],
    input_standard_default_md_textColor: ["input", "default", "standard", "md"],
    input_standard_default_md_focus_borderColor: [
      "input",
      "default",
      "standard",
      "md",
    ],

    // --- Input / Success State ---
    input_filled_success_sm_borderColor: ["input", "success", "filled", "sm"],
    input_filled_success_md_borderColor: ["input", "success", "filled", "md"],
    input_outlined_success_sm_borderColor: [
      "input",
      "success",
      "outlined",
      "sm",
    ],
    input_outlined_success_md_borderColor: [
      "input",
      "success",
      "outlined",
      "md",
    ],
    input_standard_success_sm_borderColor: [
      "input",
      "success",
      "standard",
      "sm",
    ],
    input_standard_success_md_borderColor: [
      "input",
      "success",
      "standard",
      "md",
    ],

    // --- Input / Error State ---
    input_filled_error_sm_borderColor: ["input", "error", "filled", "sm"],
    input_filled_error_md_borderColor: ["input", "error", "filled", "md"],
    input_outlined_error_sm_borderColor: ["input", "error", "outlined", "sm"],
    input_outlined_error_md_borderColor: ["input", "error", "outlined", "md"],
    input_standard_error_sm_borderColor: ["input", "error", "standard", "sm"],
    input_standard_error_md_borderColor: ["input", "error", "standard", "md"],

    // --- Label / Default State ---
    label_filled_default_sm_fontSize: ["label", "default", "filled", "sm"],
    label_filled_default_sm_textColor: ["label", "default", "filled", "sm"],
    label_filled_default_sm_focus_textColor: [
      "label",
      "default",
      "filled",
      "sm",
    ],
    label_filled_default_md_fontSize: ["label", "default", "filled", "md"],
    label_filled_default_md_textColor: ["label", "default", "filled", "md"],
    label_filled_default_md_focus_textColor: [
      "label",
      "default",
      "filled",
      "md",
    ],
    label_outlined_default_sm_bgColor: ["label", "default", "outlined", "sm"],
    label_outlined_default_sm_padding: ["label", "default", "outlined", "sm"],
    label_outlined_default_sm_fontSize: ["label", "default", "outlined", "sm"],
    label_outlined_default_sm_textColor: ["label", "default", "outlined", "sm"],
    label_outlined_default_sm_focus_textColor: [
      "label",
      "default",
      "outlined",
      "sm",
    ],
    label_outlined_default_md_bgColor: ["label", "default", "outlined", "md"],
    label_outlined_default_md_padding: ["label", "default", "outlined", "md"],
    label_outlined_default_md_fontSize: ["label", "default", "outlined", "md"],
    label_outlined_default_md_textColor: ["label", "default", "outlined", "md"],
    label_outlined_default_md_focus_textColor: [
      "label",
      "default",
      "outlined",
      "md",
    ],
    label_standard_default_sm_fontSize: ["label", "default", "standard", "sm"],
    label_standard_default_sm_textColor: ["label", "default", "standard", "sm"],
    label_standard_default_sm_focus_textColor: [
      "label",
      "default",
      "standard",
      "sm",
    ],
    label_standard_default_md_fontSize: ["label", "default", "standard", "md"],
    label_standard_default_md_textColor: ["label", "default", "standard", "md"],
    label_standard_default_md_focus_textColor: [
      "label",
      "default",
      "standard",
      "md",
    ],

    // --- Label / Success State ---
    label_filled_success_sm_textColor: ["label", "success", "filled", "sm"],
    label_filled_success_md_textColor: ["label", "success", "filled", "md"],
    label_outlined_success_sm_textColor: ["label", "success", "outlined", "sm"],
    label_outlined_success_md_textColor: ["label", "success", "outlined", "md"],
    label_standard_success_sm_textColor: ["label", "success", "standard", "sm"],
    label_standard_success_md_textColor: ["label", "success", "standard", "md"],

    // --- Label / Error State ---
    label_filled_error_sm_textColor: ["label", "error", "filled", "sm"],
    label_filled_error_md_textColor: ["label", "error", "filled", "md"],
    label_outlined_error_sm_textColor: ["label", "error", "outlined", "sm"],
    label_outlined_error_md_textColor: ["label", "error", "outlined", "md"],
    label_standard_error_sm_textColor: ["label", "error", "standard", "sm"],
    label_standard_error_md_textColor: ["label", "error", "standard", "md"],
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
        //@ts-ignore
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
      {/* The main FlowbitFloatingLabel component accepts all standard props passed to it. */}
      <FlowbitFloatingLabel
        className={containerClasses}
        {...props}
        theme={mergedTheme as any}
      />
      {logic.helperText && <HelperText>{logic.helperText}</HelperText>}
    </div>
  );
};

export default FloatingInput;
