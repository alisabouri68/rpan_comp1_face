import {
  Label,
  HelperText,
  RangeSlider as FlowbitRangeSlider,
  RangeSliderProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic range slider component.
// It extends all standard RangeSliderProps and adds a mandatory 'label' prop
// along with optional helper text.
export interface Props extends Omit<RangeSliderProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    label?: string; // The label for the range slider.
    helperText?: React.ReactNode; // Optional helper text to display below the input.
  };
  style?: {
    // Input (track) Styles
    input_rounding?: string;
    input_bgColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react RangeSlider.
 * This component provides a complete form input with a label, a range slider, and optional helper text.
 * It is designed to be a controlled component, making it easy to manage its state from a parent.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the range slider.
 * @param {React.ReactNode} [props.helperText] - The optional helper text.
 * @param {RangeSliderProps} props.rest - All other standard RangeSlider props.
 */
const RangeSlider: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Input (track) Styles
    input_rounding: "rounded-lg",
    input_bgColor: "bg-gray-200",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.rangeSlider;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Input (track) Styles
    input_rounding: ["field", "input", "base"],
    input_bgColor: ["field", "input", "base"],
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
      {logic.label && <Label htmlFor={props.id}>{logic.label}</Label>}
      <FlowbitRangeSlider
        className={containerClasses}
        {...props}
        theme={mergedTheme as any}
      />
      {logic.helperText && <HelperText>{logic.helperText}</HelperText>}
    </div>
  );
};

export default RangeSlider;
