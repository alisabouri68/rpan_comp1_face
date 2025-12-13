import {
  Breadcrumb as FlowbiteBreadcrumb,
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbItem,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for a single breadcrumb item's data.
// We extend the base BreadcrumbItemProps from Flowbite to inherit all its properties,
// and make `label` mandatory for our dynamic component.
interface BreadcrumbItemData
  extends Omit<BreadcrumbItemProps, "href" | "children"> {
  label: React.ReactNode; // The content of the breadcrumb item
  href: string; // The URL for the breadcrumb link
  icon?: any; // Optional icon for the item
}

// The props for our main DynamicBreadcrumb component.
// It accepts all standard BreadcrumbProps and our custom `path` array.
interface Props extends Omit<BreadcrumbProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    path: BreadcrumbItemData[];
  };
  style?: {
    // Separator (Chevron) Styles
    separator_size?: string;
    separator_color?: string;
    separator_margin?: string;

    // Inactive Link Styles
    inactiveLink_fontSize?: string;
    inactiveLink_fontWeight?: string;
    inactiveLink_textColor?: string;

    // Active/Hoverable Link Styles
    activeLink_fontSize?: string;
    activeLink_fontWeight?: string;
    activeLink_textColor?: string;
    activeLink_hover_textColor?: string;

    // Icon Styles
    icon_size?: string;
    icon_margin?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Breadcrumb.
 * This component accepts an array of breadcrumb item data and renders a full navigation path.
 * It simplifies the process of creating breadcrumbs from a data source,
 * making the component highly reusable.
 *
 * @param {object} props - The component props.
 * @param {BreadcrumbItemData[]} props.path - An array of objects, where each object represents a breadcrumb item.
 * @param {BreadcrumbProps} props.rest - All other standard Breadcrumb props.
 */
const Breadcrumb: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Separator (Chevron) Styles
    separator_size: "h-4 w-4",
    separator_color: "text-gray-400",
    separator_margin: "mx-1 md:mx-2",

    // Inactive Link Styles
    inactiveLink_fontSize: "text-sm",
    inactiveLink_fontWeight: "font-medium",
    inactiveLink_textColor: "text-gray-500",

    // Active/Hoverable Link Styles
    activeLink_fontSize: "text-sm",
    activeLink_fontWeight: "font-medium",
    activeLink_textColor: "text-gray-700",
    activeLink_hover_textColor: "hover:text-gray-900",

    // Icon Styles
    icon_size: "h-4 w-4",
    icon_margin: "mr-2",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.breadcrumb;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Separator (Chevron) Styles
    separator_size: ["item", "chevron"],
    separator_color: ["item", "chevron"],
    separator_margin: ["item", "chevron"],

    // Inactive Link Styles
    inactiveLink_fontSize: ["item", "href", "off"],
    inactiveLink_fontWeight: ["item", "href", "off"],
    inactiveLink_textColor: ["item", "href", "off"],

    // Active/Hoverable Link Styles
    activeLink_fontSize: ["item", "href", "on"],
    activeLink_fontWeight: ["item", "href", "on"],
    activeLink_textColor: ["item", "href", "on"],
    activeLink_hover_textColor: ["item", "href", "on"],

    // Icon Styles
    icon_size: ["item", "icon"],
    icon_margin: ["item", "icon"],
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
    // The main Breadcrumb component accepts all standard props.
    <FlowbiteBreadcrumb
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic?.path.map((item, index) => (
        // Map over the path array to create each Breadcrumb.Item component.
        <BreadcrumbItem key={index} {...item}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </FlowbiteBreadcrumb>
  );
};

export default Breadcrumb;
