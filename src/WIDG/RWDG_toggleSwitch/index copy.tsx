import {
  ToggleSwitch as FlowbitToggleSwitch,
  ToggleSwitchProps,
  HelperText,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for our dynamic toggle switch component.
// It extends all standard ToggleSwitchProps and makes the 'label' prop optional.
// A new prop, 'togglePosition', is added to control the switch's placement.
export interface Props extends Omit<ToggleSwitchProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    helperText?: React.ReactNode; // Optional helper text to display below the input.
  };
  style?: {
    // Root Disabled State
    rootDisabled_opacity?: string;

    // Label Styles
    label_fontSize?: string;
    label_fontWeight?: string;
    label_textColor?: string;

    // Toggle Switch Base Styles
    toggle_rounding?: string;
    toggle_focus_ringWidth?: string;

    // Toggle "Off" State Styles
    toggleOff_bgColor?: string;
    toggleOff_knob_borderColor?: string;

    // --- Toggle "On" State Color Variants (Complete) ---
    toggleOn_colorDefault_bgColor?: string;
    toggleOn_colorDefault_focus_ringColor?: string;
    toggleOn_colorBlue_bgColor?: string;
    toggleOn_colorBlue_focus_ringColor?: string;
    toggleOn_colorDark_bgColor?: string;
    toggleOn_colorDark_focus_ringColor?: string;
    toggleOn_colorFailure_bgColor?: string;
    toggleOn_colorFailure_focus_ringColor?: string;
    toggleOn_colorGray_bgColor?: string;
    toggleOn_colorGray_focus_ringColor?: string;
    toggleOn_colorGreen_bgColor?: string;
    toggleOn_colorGreen_focus_ringColor?: string;
    toggleOn_colorLight_bgColor?: string;
    toggleOn_colorLight_focus_ringColor?: string;
    toggleOn_colorRed_bgColor?: string;
    toggleOn_colorRed_focus_ringColor?: string;
    toggleOn_colorPurple_bgColor?: string;
    toggleOn_colorPurple_focus_ringColor?: string;
    toggleOn_colorSuccess_bgColor?: string;
    toggleOn_colorSuccess_focus_ringColor?: string;
    toggleOn_colorYellow_bgColor?: string;
    toggleOn_colorYellow_focus_ringColor?: string;
    toggleOn_colorWarning_bgColor?: string;
    toggleOn_colorWarning_focus_ringColor?: string;
    toggleOn_colorCyan_bgColor?: string;
    toggleOn_colorCyan_focus_ringColor?: string;
    toggleOn_colorLime_bgColor?: string;
    toggleOn_colorLime_focus_ringColor?: string;
    toggleOn_colorIndigo_bgColor?: string;
    toggleOn_colorIndigo_focus_ringColor?: string;
    toggleOn_colorTeal_bgColor?: string;
    toggleOn_colorTeal_focus_ringColor?: string;
    toggleOn_colorInfo_bgColor?: string;
    toggleOn_colorInfo_focus_ringColor?: string;
    toggleOn_colorPink_bgColor?: string;
    toggleOn_colorPink_focus_ringColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react ToggleSwitch.
 * This component provides a complete form input with a toggle switch, a label, and optional helper text.
 * It is designed to be a controlled component, making it easy to manage its state from a parent.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} [props.label] - The optional label for the toggle switch.
 * @param {React.ReactNode} [props.helperText] - The optional helper text.
 * @param {'left' | 'right'} [props.togglePosition] - The position of the toggle switch.
 * @param {ToggleSwitchProps} props.rest - All other standard ToggleSwitchProps.
 */
const ToggleSwitch: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Root Disabled State
    rootDisabled_opacity: "opacity-50",

    // Label Styles
    label_fontSize: "text-sm",
    label_fontWeight: "font-medium",
    label_textColor: "text-gray-900",

    // Toggle Switch Base Styles
    toggle_rounding: "rounded-full",
    toggle_focus_ringWidth: "group-focus:ring-4",

    // Toggle "Off" State Styles
    toggleOff_bgColor: "bg-gray-200",
    toggleOff_knob_borderColor: "after:border-gray-300",

    // --- Toggle "On" State Color Variants (Complete) ---
    toggleOn_colorDefault_bgColor: "bg-primary-700",
    toggleOn_colorDefault_focus_ringColor: "group-focus:ring-primary-300",
    toggleOn_colorBlue_bgColor: "bg-blue-700",
    toggleOn_colorBlue_focus_ringColor: "group-focus:ring-blue-300",
    toggleOn_colorDark_bgColor: "bg-gray-700",
    toggleOn_colorDark_focus_ringColor: "group-focus:ring-gray-300",
    toggleOn_colorFailure_bgColor: "bg-red-700",
    toggleOn_colorFailure_focus_ringColor: "group-focus:ring-red-300",
    toggleOn_colorGray_bgColor: "bg-gray-500",
    toggleOn_colorGray_focus_ringColor: "group-focus:ring-gray-300",
    toggleOn_colorGreen_bgColor: "bg-green-600",
    toggleOn_colorGreen_focus_ringColor: "group-focus:ring-green-300",
    toggleOn_colorLight_bgColor: "bg-gray-300",
    toggleOn_colorLight_focus_ringColor: "group-focus:ring-gray-300",
    toggleOn_colorRed_bgColor: "bg-red-700",
    toggleOn_colorRed_focus_ringColor: "group-focus:ring-red-300",
    toggleOn_colorPurple_bgColor: "bg-purple-700",
    toggleOn_colorPurple_focus_ringColor: "group-focus:ring-purple-300",
    toggleOn_colorSuccess_bgColor: "bg-green-500",
    toggleOn_colorSuccess_focus_ringColor: "group-focus:ring-green-300",
    toggleOn_colorYellow_bgColor: "bg-yellow-400",
    toggleOn_colorYellow_focus_ringColor: "group-focus:ring-yellow-300",
    toggleOn_colorWarning_bgColor: "bg-yellow-600",
    toggleOn_colorWarning_focus_ringColor: "group-focus:ring-yellow-300",
    toggleOn_colorCyan_bgColor: "bg-cyan-500",
    toggleOn_colorCyan_focus_ringColor: "group-focus:ring-cyan-300",
    toggleOn_colorLime_bgColor: "bg-lime-400",
    toggleOn_colorLime_focus_ringColor: "group-focus:ring-lime-300",
    toggleOn_colorIndigo_bgColor: "bg-indigo-400",
    toggleOn_colorIndigo_focus_ringColor: "group-focus:ring-indigo-300",
    toggleOn_colorTeal_bgColor: "bg-teal-400",
    toggleOn_colorTeal_focus_ringColor: "group-focus:ring-teal-300",
    toggleOn_colorInfo_bgColor: "bg-cyan-600",
    toggleOn_colorInfo_focus_ringColor: "group-focus:ring-cyan-300",
    toggleOn_colorPink_bgColor: "bg-pink-600",
    toggleOn_colorPink_focus_ringColor: "group-focus:ring-pink-300",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.toggleSwitch;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Root Disabled State
    rootDisabled_opacity: ["root", "active", "off"],

    // Label Styles
    label_fontSize: ["root", "label"],
    label_fontWeight: ["root", "label"],
    label_textColor: ["root", "label"],

    // Toggle Switch Base Styles
    toggle_rounding: ["toggle", "base"],
    toggle_focus_ringWidth: ["toggle", "base"],

    // Toggle "Off" State Styles
    toggleOff_bgColor: ["toggle", "checked", "off"],
    toggleOff_knob_borderColor: ["toggle", "checked", "off"],

    // --- Toggle "On" State Color Variants ---
    toggleOn_colorDefault_bgColor: ["toggle", "checked", "color", "default"],
    toggleOn_colorDefault_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "default",
    ],
    toggleOn_colorBlue_bgColor: ["toggle", "checked", "color", "blue"],
    toggleOn_colorBlue_focus_ringColor: ["toggle", "checked", "color", "blue"],
    toggleOn_colorDark_bgColor: ["toggle", "checked", "color", "dark"],
    toggleOn_colorDark_focus_ringColor: ["toggle", "checked", "color", "dark"],
    toggleOn_colorFailure_bgColor: ["toggle", "checked", "color", "failure"],
    toggleOn_colorFailure_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "failure",
    ],
    toggleOn_colorGray_bgColor: ["toggle", "checked", "color", "gray"],
    toggleOn_colorGray_focus_ringColor: ["toggle", "checked", "color", "gray"],
    toggleOn_colorGreen_bgColor: ["toggle", "checked", "color", "green"],
    toggleOn_colorGreen_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "green",
    ],
    toggleOn_colorLight_bgColor: ["toggle", "checked", "color", "light"],
    toggleOn_colorLight_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "light",
    ],
    toggleOn_colorRed_bgColor: ["toggle", "checked", "color", "red"],
    toggleOn_colorRed_focus_ringColor: ["toggle", "checked", "color", "red"],
    toggleOn_colorPurple_bgColor: ["toggle", "checked", "color", "purple"],
    toggleOn_colorPurple_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "purple",
    ],
    toggleOn_colorSuccess_bgColor: ["toggle", "checked", "color", "success"],
    toggleOn_colorSuccess_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "success",
    ],
    toggleOn_colorYellow_bgColor: ["toggle", "checked", "color", "yellow"],
    toggleOn_colorYellow_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "yellow",
    ],
    toggleOn_colorWarning_bgColor: ["toggle", "checked", "color", "warning"],
    toggleOn_colorWarning_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "warning",
    ],
    toggleOn_colorCyan_bgColor: ["toggle", "checked", "color", "cyan"],
    toggleOn_colorCyan_focus_ringColor: ["toggle", "checked", "color", "cyan"],
    toggleOn_colorLime_bgColor: ["toggle", "checked", "color", "lime"],
    toggleOn_colorLime_focus_ringColor: ["toggle", "checked", "color", "lime"],
    toggleOn_colorIndigo_bgColor: ["toggle", "checked", "color", "indigo"],
    toggleOn_colorIndigo_focus_ringColor: [
      "toggle",
      "checked",
      "color",
      "indigo",
    ],
    toggleOn_colorTeal_bgColor: ["toggle", "checked", "color", "teal"],
    toggleOn_colorTeal_focus_ringColor: ["toggle", "checked", "color", "teal"],
    toggleOn_colorInfo_bgColor: ["toggle", "checked", "color", "info"],
    toggleOn_colorInfo_focus_ringColor: ["toggle", "checked", "color", "info"],
    toggleOn_colorPink_bgColor: ["toggle", "checked", "color", "pink"],
    toggleOn_colorPink_focus_ringColor: ["toggle", "checked", "color", "pink"],
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
      <FlowbitToggleSwitch
        className={containerClasses}
        {...props}
        theme={mergedTheme as any}
      />
      {logic.helperText && <HelperText>{logic.helperText}</HelperText>}
    </div>
  );
};

export default ToggleSwitch;
