import {
  ListGroup as FlowbiteListGroup,
  ListGroupProps,
  ListGroupItemProps,
  ListGroupItem,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for a single list group item's data.
// We extend the base ListGroupItemProps to inherit all its properties,
// and make `label` mandatory for our dynamic component.
interface ListItemData extends Omit<ListGroupItemProps, "children" | "ref"> {
  id: string | undefined;
  label: React.ReactNode; // The content of the list item, e.g., a string or any JSX
  href: string; // The URL for the list item link
  icon?: any; // Optional icon for the item
}

// The props for our main DynamicListGroup component.
// It accepts all standard ListGroupProps and our custom `items` array.
interface Props extends Omit<ListGroupProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    items: ListItemData[];
  };
  style?: {
    // Root Container Styles
    root_rounding?: string;
    root_borderWidth?: string;
    root_borderColor?: string;
    root_bgColor?: string;
    root_fontSize?: string;
    root_fontWeight?: string;
    root_textColor?: string;

    // Base Item Styles
    item_borderWidth?: string;
    item_borderColor?: string;
    item_padding?: string;

    // Inactive Item State Styles
    itemInactive_hover_bgColor?: string;
    itemInactive_hover_textColor?: string;
    itemInactive_focus_textColor?: string;
    itemInactive_focus_ringWidth?: string;
    itemInactive_focus_ringColor?: string;

    // Active Item State Styles
    itemActive_bgColor?: string;
    itemActive_textColor?: string;

    // Disabled Item State Styles
    itemDisabled_bgColor?: string;
    itemDisabled_textColor?: string;

    // Item Icon Styles
    icon_margin?: string;
    icon_size?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react ListGroup.
 * This component accepts an array of list item data and renders a full list group.
 * It simplifies the process of creating list groups from a data source,
 * making the component highly reusable and easy to manage.
 *
 * @param {object} props - The component props.
 * @param {ListItemData[]} props.items - An array of objects, where each object represents a list item.
 * @param {ListGroupProps} props.rest - All other standard ListGroup props.
 */
const ListGroup: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Root Container Styles
    root_rounding: "rounded-lg",
    root_borderWidth: "border",
    root_borderColor: "border-gray-200",
    root_bgColor: "bg-white",
    root_fontSize: "text-sm",
    root_fontWeight: "font-medium",
    root_textColor: "text-gray-900",

    // Base Item Styles
    item_borderWidth: "border-b",
    item_borderColor: "border-gray-200",
    item_padding: "px-4 py-2",

    // Inactive Item State Styles
    itemInactive_hover_bgColor: "hover:bg-gray-100",
    itemInactive_hover_textColor: "hover:text-cyan-700",
    itemInactive_focus_textColor: "focus:text-cyan-700",
    itemInactive_focus_ringWidth: "focus:ring-2",
    itemInactive_focus_ringColor: "focus:ring-cyan-700",

    // Active Item State Styles
    itemActive_bgColor: "bg-cyan-700",
    itemActive_textColor: "text-white",

    // Disabled Item State Styles
    itemDisabled_bgColor: "bg-gray-100",
    itemDisabled_textColor: "text-gray-900",

    // Item Icon Styles
    icon_margin: "mr-2",
    icon_size: "h-4 w-4",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.listGroup;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Root Container Styles
    root_rounding: ["root", "base"],
    root_borderWidth: ["root", "base"],
    root_borderColor: ["root", "base"],
    root_bgColor: ["root", "base"],
    root_fontSize: ["root", "base"],
    root_fontWeight: ["root", "base"],
    root_textColor: ["root", "base"],

    // Base Item Styles
    item_borderWidth: ["item", "link", "base"],
    item_borderColor: ["item", "link", "base"],
    item_padding: ["item", "link", "base"],

    // Inactive Item State Styles
    itemInactive_hover_bgColor: ["item", "link", "active", "off"],
    itemInactive_hover_textColor: ["item", "link", "active", "off"],
    itemInactive_focus_textColor: ["item", "link", "active", "off"],
    itemInactive_focus_ringWidth: ["item", "link", "active", "off"],
    itemInactive_focus_ringColor: ["item", "link", "active", "off"],

    // Active Item State Styles
    itemActive_bgColor: ["item", "link", "active", "on"],
    itemActive_textColor: ["item", "link", "active", "on"],

    // Disabled Item State Styles
    itemDisabled_bgColor: ["item", "link", "disabled", "on"],
    itemDisabled_textColor: ["item", "link", "disabled", "on"],

    // Item Icon Styles
    icon_margin: ["item", "link", "icon"],
    icon_size: ["item", "link", "icon"],
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
    // The main ListGroup component accepts all its standard props.
    <FlowbiteListGroup
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic.items.map((item) => (
        // Map over the items array to create each ListGroup.Item component.
        <ListGroupItem key={item.id} {...item}>
          {item.label}
        </ListGroupItem>
      ))}
    </FlowbiteListGroup>
  );
};

export default ListGroup;
