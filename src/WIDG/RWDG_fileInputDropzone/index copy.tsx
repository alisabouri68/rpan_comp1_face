import {
  Label,
  FileInput as FlowbitFileInput,
  FileInputProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic file input component.
// It extends all standard FileInputProps and adds a mandatory 'label' prop
// along with optional helper text.
export interface Props
  extends Omit<FileInputProps, "children" | "style" | "color"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    label: string; // The label for the file input.
    helperText?: React.ReactNode; // Optional helper text to display below the input.
  };
  style?: {
    // Base Input Styles
    base_rounding?: string;
    base_border?: string;
    base_focus_ringWidth?: string;

    // File Button Styles
    fileButton_bgColor?: string;
    fileButton_padding?: string;
    fileButton_fontSize?: string;
    fileButton_fontWeight?: string;
    fileButton_textColor?: string;
    fileButton_hover_bgColor?: string;

    // --- Color Variants (Complete) ---
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
  };
}

/**
 * A dynamic wrapper component for the flowbite-react FileInput.
 * This component provides a complete form input with a label, a file input, and optional helper text.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the file input.
 * @param {React.ReactNode} [props.helperText] - The optional helper text.
 * @param {FileInputProps} props.rest - All other standard FileInput props.
 */
const FileInput: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Base Input Styles
    base_rounding: "rounded-lg",
    base_border: "border",
    base_focus_ringWidth: "focus:ring-1",

    // File Button Styles
    fileButton_bgColor: "file:bg-gray-800",
    fileButton_padding: "file:py-2.5 file:pe-4 file:ps-8",
    fileButton_fontSize: "file:text-sm",
    fileButton_fontWeight: "file:font-medium",
    fileButton_textColor: "file:text-white",
    fileButton_hover_bgColor: "hover:file:bg-gray-700",

    // --- Color Variants (Complete) ---
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
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.fileInput;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Input Styles
    base_rounding: ["base"],
    base_border: ["base"],
    base_focus_ringWidth: ["base"],

    // File Button Styles
    fileButton_bgColor: ["base"],
    fileButton_padding: ["base"],
    fileButton_fontSize: ["base"],
    fileButton_fontWeight: ["base"],
    fileButton_textColor: ["base"],
    fileButton_hover_bgColor: ["base"],

    // --- Color Variants ---
    // Gray
    colorGray_borderColor: ["colors", "gray"],
    colorGray_bgColor: ["colors", "gray"],
    colorGray_textColor: ["colors", "gray"],
    colorGray_focus_borderColor: ["colors", "gray"],
    colorGray_focus_ringColor: ["colors", "gray"],
    // Info
    colorInfo_borderColor: ["colors", "info"],
    colorInfo_bgColor: ["colors", "info"],
    colorInfo_textColor: ["colors", "info"],
    colorInfo_placeholderColor: ["colors", "info"],
    colorInfo_focus_borderColor: ["colors", "info"],
    colorInfo_focus_ringColor: ["colors", "info"],
    // Failure
    colorFailure_borderColor: ["colors", "failure"],
    colorFailure_bgColor: ["colors", "failure"],
    colorFailure_textColor: ["colors", "failure"],
    colorFailure_placeholderColor: ["colors", "failure"],
    colorFailure_focus_borderColor: ["colors", "failure"],
    colorFailure_focus_ringColor: ["colors", "failure"],
    // Warning
    colorWarning_borderColor: ["colors", "warning"],
    colorWarning_bgColor: ["colors", "warning"],
    colorWarning_textColor: ["colors", "warning"],
    colorWarning_placeholderColor: ["colors", "warning"],
    colorWarning_focus_borderColor: ["colors", "warning"],
    colorWarning_focus_ringColor: ["colors", "warning"],
    // Success
    colorSuccess_borderColor: ["colors", "success"],
    colorSuccess_bgColor: ["colors", "success"],
    colorSuccess_textColor: ["colors", "success"],
    colorSuccess_placeholderColor: ["colors", "success"],
    colorSuccess_focus_borderColor: ["colors", "success"],
    colorSuccess_focus_ringColor: ["colors", "success"],
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
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          {logic.label ? (
            logic.label
          ) : (
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag
              anddrop
            </p>
          )}

          {logic.helperText ? (
            logic.helperText
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          )}
        </div>
        <FlowbitFileInput
          className={containerClasses}
          {...props}
          theme={mergedTheme as any}
          id="dropzone-file"
        />
      </Label>
    </div>
  );
};

export default FileInput;
