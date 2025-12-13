import {
  Avatar as FlowbiteAvatar,
  AvatarGroup,
  AvatarGroupProps,
  AvatarProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// Interface for a single avatar's data.
// We extend the base AvatarProps from Flowbite to inherit all its properties,
// and make `img` mandatory for our dynamic component.
interface AvatarData extends AvatarProps {
  link?: string; // An optional link for the avatar
}

// Interface for the DynamicAvatarGroup component's props.
// It accepts all standard AvatarGroupProps and our custom `users` array.
interface Props extends Omit<AvatarGroupProps, "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    data: AvatarData[];
  };
  style?: {
    // Root Styles
    root_rounding?: string;
    root_spacing?: string;

    // Bordered Variant Styles
    bordered_padding?: string;
    bordered_ringWidth?: string;

    // Rounded Variant Styles
    rounded_style?: string;

    // Bordered Color Variants
    colorDark_ringColor?: string;
    colorFailure_ringColor?: string;
    colorGray_ringColor?: string;
    colorInfo_ringColor?: string;
    colorLight_ringColor?: string;
    colorPurple_ringColor?: string;
    colorSuccess_ringColor?: string;
    colorWarning_ringColor?: string;
    colorPink_ringColor?: string;

    // Image & Placeholder Styles
    img_rounding?: string;
    imgOff_bgColor?: string; // 'off' state is when no image is provided (placeholder is shown)
    placeholder_textColor?: string;

    // Stacked Variant Styles
    stacked_ringWidth?: string;
    stacked_ringColor?: string;

    // Status Indicator Styles
    status_base_size?: string;
    status_base_rounding?: string;
    status_base_borderWidth?: string;
    status_base_borderColor?: string;
    statusAway_bgColor?: string;
    statusBusy_bgColor?: string;
    statusOffline_bgColor?: string;
    statusOnline_bgColor?: string;

    // Initials Placeholder Styles
    initials_base_bgColor?: string;
    initials_textColor?: string;

    // Group Styles
    group_spacing?: string;

    // Group Counter Styles
    groupCounter_size?: string;
    groupCounter_rounding?: string;
    groupCounter_bgColor?: string;
    groupCounter_textColor?: string;
    groupCounter_fontSize?: string;
    groupCounter_fontWeight?: string;
    groupCounter_ringWidth?: string;
    groupCounter_ringColor?: string;
    groupCounter_hover_bgColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react AvatarGroup.
 * This component accepts an array of user data and renders a group of Avatars.
 * It simplifies the process of displaying a group of users with various properties
 * like status, size, and links.
 *
 * @param {object} props - The component props.
 * @param {AvatarData[]} props.users - An array of objects, where each object represents a user's avatar.
 * @param {AvatarGroupProps} props.rest - All other standard AvatarGroup props.
 */
const Avatar: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Root Styles
    root_rounding: "rounded",
    root_spacing: "space-x-4",

    // Bordered Variant Styles
    bordered_padding: "p-1",
    bordered_ringWidth: "ring-2",

    // Rounded Variant Styles
    rounded_style: "rounded-full",

    // Bordered Color Variants
    colorDark_ringColor: "ring-gray-800",
    colorFailure_ringColor: "ring-red-500",
    colorGray_ringColor: "ring-gray-500",
    colorInfo_ringColor: "ring-cyan-400",
    colorLight_ringColor: "ring-gray-300",
    colorPurple_ringColor: "ring-purple-500",
    colorSuccess_ringColor: "ring-green-500",
    colorWarning_ringColor: "ring-yellow-300",
    colorPink_ringColor: "ring-pink-500",

    // Image & Placeholder Styles
    img_rounding: "rounded",
    imgOff_bgColor: "bg-gray-100",
    placeholder_textColor: "text-gray-400",

    // Stacked Variant Styles
    stacked_ringWidth: "ring-2",
    stacked_ringColor: "ring-gray-300",

    // Status Indicator Styles
    status_base_size: "h-3.5 w-3.5",
    status_base_rounding: "rounded-full",
    status_base_borderWidth: "border-2",
    status_base_borderColor: "border-white",
    statusAway_bgColor: "bg-yellow-400",
    statusBusy_bgColor: "bg-red-400",
    statusOffline_bgColor: "bg-gray-400",
    statusOnline_bgColor: "bg-green-400",

    // Initials Placeholder Styles
    initials_base_bgColor: "bg-gray-100",
    initials_textColor: "font-medium text-gray-600",

    // Group Styles
    group_spacing: "-space-x-4",

    // Group Counter Styles
    groupCounter_size: "h-10 w-10",
    groupCounter_rounding: "rounded-full",
    groupCounter_bgColor: "bg-gray-700",
    groupCounter_textColor: "text-white",
    groupCounter_fontSize: "text-xs",
    groupCounter_fontWeight: "font-medium",
    groupCounter_ringWidth: "ring-2",
    groupCounter_ringColor: "ring-gray-300",
    groupCounter_hover_bgColor: "hover:bg-gray-600",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.avatar;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Root Styles
    root_rounding: ["root", "base"],
    root_spacing: ["root", "base"],

    // Bordered Variant Styles
    bordered_padding: ["root", "bordered"],
    bordered_ringWidth: ["root", "bordered"],

    // Rounded Variant Styles
    rounded_style: ["root", "rounded"],

    // Bordered Color Variants
    colorDark_ringColor: ["root", "color", "dark"],
    colorFailure_ringColor: ["root", "color", "failure"],
    colorGray_ringColor: ["root", "color", "gray"],
    colorInfo_ringColor: ["root", "color", "info"],
    colorLight_ringColor: ["root", "color", "light"],
    colorPurple_ringColor: ["root", "color", "purple"],
    colorSuccess_ringColor: ["root", "color", "success"],
    colorWarning_ringColor: ["root", "color", "warning"],
    colorPink_ringColor: ["root", "color", "pink"],

    // Image & Placeholder Styles
    img_rounding: ["root", "img", "base"],
    imgOff_bgColor: ["root", "img", "off"],
    placeholder_textColor: ["root", "img", "placeholder"],

    // Stacked Variant Styles
    stacked_ringWidth: ["root", "stacked"],
    stacked_ringColor: ["root", "stacked"],

    // Status Indicator Styles
    status_base_size: ["root", "status", "base"],
    status_base_rounding: ["root", "status", "base"],
    status_base_borderWidth: ["root", "status", "base"],
    status_base_borderColor: ["root", "status", "base"],
    statusAway_bgColor: ["root", "status", "away"],
    statusBusy_bgColor: ["root", "status", "busy"],
    statusOffline_bgColor: ["root", "status", "offline"],
    statusOnline_bgColor: ["root", "status", "online"],

    // Initials Placeholder Styles
    initials_base_bgColor: ["root", "initials", "base"],
    initials_textColor: ["root", "initials", "text"],

    // Group Styles
    group_spacing: ["group", "base"],

    // Group Counter Styles
    groupCounter_size: ["groupCounter", "base"],
    groupCounter_rounding: ["groupCounter", "base"],
    groupCounter_bgColor: ["groupCounter", "base"],
    groupCounter_textColor: ["groupCounter", "base"],
    groupCounter_fontSize: ["groupCounter", "base"],
    groupCounter_fontWeight: ["groupCounter", "base"],
    groupCounter_ringWidth: ["groupCounter", "base"],
    groupCounter_ringColor: ["groupCounter", "base"],
    groupCounter_hover_bgColor: ["groupCounter", "base"],
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
    // The main AvatarGroup component accepts all standard props.
    <AvatarGroup
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic?.data.map((item, index) => (
        // Map over the users array to create each Avatar component.
        <FlowbiteAvatar key={index} {...item} />
      ))}
    </AvatarGroup>
  );
};

export default Avatar;
