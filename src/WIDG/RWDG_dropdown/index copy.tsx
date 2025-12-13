import {
  Dropdown as FlowbiteDropdown,
  DropdownProps,
  DropdownItemProps,
  DropdownItem,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for a single dropdown item's data.
// It includes a unique ID, a label, and an optional onClick handler.
interface DropdownItemData extends Omit<DropdownItemProps, "children"> {
  id: string | undefined;
  label: React.ReactNode; // The content of the dropdown item, e.g., a string, icon, or any JSX
  onClick?: () => void; // An optional function to handle clicks on the item
  icon?: any; // Optional icon for the item
  iconPosition?: "left" | "right"; // New: Position of the icon relative to the label
}

// The props for our main DynamicDropdown component.
// It accepts all standard DropdownProps and our custom `items` array.
interface Props extends Omit<DropdownProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    items: DropdownItemData[];
  };
  style?: {
    // Trigger Button Arrow Icon Styles
    arrowIcon_size?: string;
    arrowIcon_margin?: string;

    // Floating Panel Styles
    floating_divideColor?: string;
    floating_rounding?: string;
    floating_shadow?: string;

    // Floating Arrow Styles
    floatingArrow_size?: string;
    floatingArrow_styleDark_bgColor?: string;
    floatingArrow_styleLight_bgColor?: string;
    floatingArrow_styleAuto_bgColor?: string;

    // Floating Content Styles (wrapper for items)
    floatingContent_padding?: string;
    floatingContent_fontSize?: string;
    floatingContent_textColor?: string;

    // Divider Styles
    floatingDivider_margin?: string;
    floatingDivider_height?: string;
    floatingDivider_bgColor?: string;

    // Header Styles
    floatingHeader_padding?: string;
    floatingHeader_fontSize?: string;
    floatingHeader_textColor?: string;

    // Item Styles
    floatingItem_padding?: string;
    floatingItem_fontSize?: string;
    floatingItem_textColor?: string;
    floatingItem_hover_bgColor?: string;
    floatingItem_focus_bgColor?: string;

    // Item Icon Styles
    floatingItemIcon_margin?: string;
    floatingItemIcon_size?: string;

    // Floating Panel Main Style Variants
    floatingStyleDark_bgColor?: string;
    floatingStyleDark_textColor?: string;
    floatingStyleLight_borderColor?: string;
    floatingStyleLight_bgColor?: string;
    floatingStyleLight_textColor?: string;
    floatingStyleAuto_borderColor?: string;
    floatingStyleAuto_bgColor?: string;
    floatingStyleAuto_textColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Dropdown.
 * This component accepts an array of dropdown item data and renders a full dropdown menu.
 * It simplifies the process of creating dropdowns from a data source,
 * making the component highly reusable and easy to manage.
 *
 * @param {object} props - The component props.
 * @param {DropdownItemData[]} props.items - An array of objects, where each object represents a dropdown item.
 * @param {DropdownProps} props.rest - All other standard Dropdown props.
 */
const Dropdown: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Trigger Button Arrow Icon Styles
    arrowIcon_size: "h-4 w-4",
    arrowIcon_margin: "ml-2",

    // Floating Panel Styles
    floating_divideColor: "divide-gray-100",
    floating_rounding: "rounded",
    floating_shadow: "shadow",

    // Floating Arrow Styles
    floatingArrow_size: "h-2 w-2",
    floatingArrow_styleDark_bgColor: "bg-gray-900",
    floatingArrow_styleLight_bgColor: "bg-white",
    floatingArrow_styleAuto_bgColor: "bg-white",

    // Floating Content Styles (wrapper for items)
    floatingContent_padding: "py-1",
    floatingContent_fontSize: "text-sm",
    floatingContent_textColor: "text-gray-700",

    // Divider Styles
    floatingDivider_margin: "my-1",
    floatingDivider_height: "h-px",
    floatingDivider_bgColor: "bg-gray-100",

    // Header Styles
    floatingHeader_padding: "px-4 py-2",
    floatingHeader_fontSize: "text-sm",
    floatingHeader_textColor: "text-gray-700",

    // Item Styles
    floatingItem_padding: "px-4 py-2",
    floatingItem_fontSize: "text-sm",
    floatingItem_textColor: "text-gray-700",
    floatingItem_hover_bgColor: "hover:bg-gray-100",
    floatingItem_focus_bgColor: "focus:bg-gray-100",

    // Item Icon Styles
    floatingItemIcon_margin: "mr-2",
    floatingItemIcon_size: "h-4 w-4",

    // Floating Panel Main Style Variants
    floatingStyleDark_bgColor: "bg-gray-900",
    floatingStyleDark_textColor: "text-white",
    floatingStyleLight_borderColor: "border border-gray-200",
    floatingStyleLight_bgColor: "bg-white",
    floatingStyleLight_textColor: "text-gray-900",
    floatingStyleAuto_borderColor: "border border-gray-200",
    floatingStyleAuto_bgColor: "bg-white",
    floatingStyleAuto_textColor: "text-gray-900",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.dropdown;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Trigger Button Arrow Icon Styles
    arrowIcon_size: ["arrowIcon"],
    arrowIcon_margin: ["arrowIcon"],

    // Floating Panel Styles
    floating_divideColor: ["floating", "base"],
    floating_rounding: ["floating", "base"],
    floating_shadow: ["floating", "base"],

    // Floating Arrow Styles
    floatingArrow_size: ["floating", "arrow", "base"],
    floatingArrow_styleDark_bgColor: ["floating", "arrow", "style", "dark"],
    floatingArrow_styleLight_bgColor: ["floating", "arrow", "style", "light"],
    floatingArrow_styleAuto_bgColor: ["floating", "arrow", "style", "auto"],

    // Floating Content Styles (wrapper for items)
    floatingContent_padding: ["floating", "content"],
    floatingContent_fontSize: ["floating", "content"],
    floatingContent_textColor: ["floating", "content"],

    // Divider Styles
    floatingDivider_margin: ["floating", "divider"],
    floatingDivider_height: ["floating", "divider"],
    floatingDivider_bgColor: ["floating", "divider"],

    // Header Styles
    floatingHeader_padding: ["floating", "header"],
    floatingHeader_fontSize: ["floating", "header"],
    floatingHeader_textColor: ["floating", "header"],

    // Item Styles
    floatingItem_padding: ["floating", "item", "base"],
    floatingItem_fontSize: ["floating", "item", "base"],
    floatingItem_textColor: ["floating", "item", "base"],
    floatingItem_hover_bgColor: ["floating", "item", "base"],
    floatingItem_focus_bgColor: ["floating", "item", "base"],

    // Item Icon Styles
    floatingItemIcon_margin: ["floating", "item", "icon"],
    floatingItemIcon_size: ["floating", "item", "icon"],

    // Floating Panel Main Style Variants
    floatingStyleDark_bgColor: ["floating", "style", "dark"],
    floatingStyleDark_textColor: ["floating", "style", "dark"],
    floatingStyleLight_borderColor: ["floating", "style", "light"],
    floatingStyleLight_bgColor: ["floating", "style", "light"],
    floatingStyleLight_textColor: ["floating", "style", "light"],
    floatingStyleAuto_borderColor: ["floating", "style", "auto"],
    floatingStyleAuto_bgColor: ["floating", "style", "auto"],
    floatingStyleAuto_textColor: ["floating", "style", "auto"],
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
    // The main Dropdown component accepts all its standard props.
    <FlowbiteDropdown
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic.items.map((item) => (
        // Map over the items array to create each Dropdown.Item component.
        <DropdownItem key={item.id} {...item}>
          <div className="flex items-center">
            {/* Render icon on the left if specified, with default padding */}
            {(item.iconPosition === "left" || !item.iconPosition) &&
              item.icon && <span className="mr-2">{item.icon}</span>}
            {/* Render the item label */}
            {item.label}
            {/* Render icon on the right if specified */}
            {item.iconPosition === "right" && item.icon && (
              <span className="ml-2">{item.icon}</span>
            )}
          </div>
        </DropdownItem>
      ))}
    </FlowbiteDropdown>
  );
};

export default Dropdown;
