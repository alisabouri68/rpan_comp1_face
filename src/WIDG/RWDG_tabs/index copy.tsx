import {
  Tabs as FlowbitTabs,
  TabsProps,
  TabItemProps,
  TabItem,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for a single tab's data.
// It includes a unique ID, a label, and the content for the tab panel.
interface TabData extends Omit<TabItemProps, "title" | "children"> {
  id: string | undefined;
  label: React.ReactNode; // The label for the tab header
  content: any; // The content to display when the tab is active
  icon?: any; // Optional icon for the tab
  title: string;
}

// The props for our main dynamic Tabs component.
// It accepts all standard TabsProps and our custom `items` array.
interface Props extends Omit<TabsProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    items: TabData[];
  };
  style?: {
    // Base Styles
    base_gap?: string;

    // TabList: Default Variant
    tablistDefault_borderWidth?: string;
    tablistDefault_borderColor?: string;

    // TabList: Underline Variant
    tablistUnderline_borderWidth?: string;
    tablistUnderline_borderColor?: string;

    // TabList: Pills Variant
    tablistPills_spacing?: string;
    tablistPills_fontSize?: string;
    tablistPills_fontWeight?: string;
    tablistPills_textColor?: string;

    // TabList: FullWidth Variant
    tablistFullWidth_divideWidth?: string;
    tablistFullWidth_divideColor?: string;
    tablistFullWidth_rounding?: string;
    tablistFullWidth_fontSize?: string;
    tablistFullWidth_fontWeight?: string;
    tablistFullWidth_shadow?: string;
    tablistFullWidth_textColor?: string;

    // TabItem: Base Styles
    tabitem_rounding?: string;
    tabitem_padding?: string;
    tabitem_fontSize?: string;
    tabitem_fontWeight?: string;
    tabitem_disabled_textColor?: string;

    // TabItem: Default Variant
    tabitemDefaultActive_bgColor?: string;
    tabitemDefaultActive_textColor?: string;
    tabitemDefaultInactive_textColor?: string;
    tabitemDefaultInactive_hover_bgColor?: string;
    tabitemDefaultInactive_hover_textColor?: string;

    // TabItem: Underline Variant
    tabitemUnderlineActive_borderWidth?: string;
    tabitemUnderlineActive_borderColor?: string;
    tabitemUnderlineActive_textColor?: string;
    tabitemUnderlineInactive_textColor?: string;
    tabitemUnderlineInactive_hover_borderColor?: string;
    tabitemUnderlineInactive_hover_textColor?: string;

    // TabItem: Pills Variant
    tabitemPillsActive_rounding?: string;
    tabitemPillsActive_bgColor?: string;
    tabitemPillsActive_textColor?: string;
    tabitemPillsInactive_rounding?: string;
    tabitemPillsInactive_hover_bgColor?: string;
    tabitemPillsInactive_hover_textColor?: string;

    // TabItem: FullWidth Variant
    tabitemFullWidthActive_rounding?: string;
    tabitemFullWidthActive_bgColor?: string;
    tabitemFullWidthActive_textColor?: string;
    tabitemFullWidthInactive_rounding?: string;
    tabitemFullWidthInactive_bgColor?: string;
    tabitemFullWidthInactive_hover_bgColor?: string;
    tabitemFullWidthInactive_hover_textColor?: string;

    // TabItem: Icon
    tabitemIcon_margin?: string;
    tabitemIcon_size?: string;

    // TabPanel
    tabpanel_padding?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Tabs.
 * This component accepts an array of tab data and renders a full tabbed interface.
 * It simplifies the process of creating tabs from a data source,
 * making the component highly reusable and easy to manage.
 *
 * @param {object} props - The component props.
 * @param {TabData[]} props.items - An array of objects, where each object represents a tab.
 * @param {TabsProps} props.rest - All other standard Tabs props.
 */
const Tabs: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Base Styles
    base_gap: "gap-2",

    // TabList: Default Variant
    tablistDefault_borderWidth: "border-b",
    tablistDefault_borderColor: "border-gray-200",

    // TabList: Underline Variant
    tablistUnderline_borderWidth: "border-b",
    tablistUnderline_borderColor: "border-gray-200",

    // TabList: Pills Variant
    tablistPills_spacing: "space-x-2",
    tablistPills_fontSize: "text-sm",
    tablistPills_fontWeight: "font-medium",
    tablistPills_textColor: "text-gray-500",

    // TabList: FullWidth Variant
    tablistFullWidth_divideWidth: "divide-x",
    tablistFullWidth_divideColor: "divide-gray-200",
    tablistFullWidth_rounding: "rounded-none",
    tablistFullWidth_fontSize: "text-sm",
    tablistFullWidth_fontWeight: "font-medium",
    tablistFullWidth_shadow: "shadow",
    tablistFullWidth_textColor: "dark:text-gray-400",

    // TabItem: Base Styles
    tabitem_rounding: "rounded-t-lg",
    tabitem_padding: "p-4",
    tabitem_fontSize: "text-sm",
    tabitem_fontWeight: "font-medium",
    tabitem_disabled_textColor: "disabled:text-gray-400",

    // TabItem: Default Variant
    tabitemDefaultActive_bgColor: "bg-gray-100",
    tabitemDefaultActive_textColor: "text-primary-600",
    tabitemDefaultInactive_textColor: "text-gray-500",
    tabitemDefaultInactive_hover_bgColor: "hover:bg-gray-50",
    tabitemDefaultInactive_hover_textColor: "hover:text-gray-600",

    // TabItem: Underline Variant
    tabitemUnderlineActive_borderWidth: "border-b-2",
    tabitemUnderlineActive_borderColor: "border-primary-600",
    tabitemUnderlineActive_textColor: "text-primary-600",
    tabitemUnderlineInactive_textColor: "text-gray-500",
    tabitemUnderlineInactive_hover_borderColor: "hover:border-gray-300",
    tabitemUnderlineInactive_hover_textColor: "hover:text-gray-600",

    // TabItem: Pills Variant
    tabitemPillsActive_rounding: "rounded-lg",
    tabitemPillsActive_bgColor: "bg-primary-600",
    tabitemPillsActive_textColor: "text-white",
    tabitemPillsInactive_rounding: "rounded-lg",
    tabitemPillsInactive_hover_bgColor: "hover:bg-gray-100",
    tabitemPillsInactive_hover_textColor: "hover:text-gray-900",

    // TabItem: FullWidth Variant
    tabitemFullWidthActive_rounding: "rounded-none",
    tabitemFullWidthActive_bgColor: "bg-gray-100",
    tabitemFullWidthActive_textColor: "text-gray-900",
    tabitemFullWidthInactive_rounding: "rounded-none",
    tabitemFullWidthInactive_bgColor: "bg-white",
    tabitemFullWidthInactive_hover_bgColor: "hover:bg-gray-50",
    tabitemFullWidthInactive_hover_textColor: "hover:text-gray-700",

    // TabItem: Icon
    tabitemIcon_margin: "mr-2",
    tabitemIcon_size: "h-5 w-5",

    // TabPanel
    tabpanel_padding: "py-3",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.tabs;

  // This object maps the flat appearance keys to their nested path in the theme object.

  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Styles
    base_gap: ["base"],

    // TabList: Default Variant
    tablistDefault_borderWidth: ["tablist", "variant", "default"],
    tablistDefault_borderColor: ["tablist", "variant", "default"],

    // TabList: Underline Variant
    tablistUnderline_borderWidth: ["tablist", "variant", "underline"],
    tablistUnderline_borderColor: ["tablist", "variant", "underline"],

    // TabList: Pills Variant
    tablistPills_spacing: ["tablist", "variant", "pills"],
    tablistPills_fontSize: ["tablist", "variant", "pills"],
    tablistPills_fontWeight: ["tablist", "variant", "pills"],
    tablistPills_textColor: ["tablist", "variant", "pills"],

    // TabList: FullWidth Variant
    tablistFullWidth_divideWidth: ["tablist", "variant", "fullWidth"],
    tablistFullWidth_divideColor: ["tablist", "variant", "fullWidth"],
    tablistFullWidth_rounding: ["tablist", "variant", "fullWidth"],
    tablistFullWidth_fontSize: ["tablist", "variant", "fullWidth"],
    tablistFullWidth_fontWeight: ["tablist", "variant", "fullWidth"],
    tablistFullWidth_shadow: ["tablist", "variant", "fullWidth"],
    tablistFullWidth_textColor: ["tablist", "variant", "fullWidth"],

    // TabItem: Base Styles
    tabitem_rounding: ["tablist", "tabitem", "base"],
    tabitem_padding: ["tablist", "tabitem", "base"],
    tabitem_fontSize: ["tablist", "tabitem", "base"],
    tabitem_fontWeight: ["tablist", "tabitem", "base"],
    tabitem_disabled_textColor: ["tablist", "tabitem", "base"],

    // TabItem: Default Variant
    tabitemDefaultActive_bgColor: [
      "tablist",
      "tabitem",
      "variant",
      "default",
      "active",
      "on",
    ],
    tabitemDefaultActive_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "default",
      "active",
      "on",
    ],
    tabitemDefaultInactive_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "default",
      "active",
      "off",
    ],
    tabitemDefaultInactive_hover_bgColor: [
      "tablist",
      "tabitem",
      "variant",
      "default",
      "active",
      "off",
    ],
    tabitemDefaultInactive_hover_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "default",
      "active",
      "off",
    ],

    // TabItem: Underline Variant
    tabitemUnderlineActive_borderWidth: [
      "tablist",
      "tabitem",
      "variant",
      "underline",
      "active",
      "on",
    ],
    tabitemUnderlineActive_borderColor: [
      "tablist",
      "tabitem",
      "variant",
      "underline",
      "active",
      "on",
    ],
    tabitemUnderlineActive_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "underline",
      "active",
      "on",
    ],
    tabitemUnderlineInactive_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "underline",
      "active",
      "off",
    ],
    tabitemUnderlineInactive_hover_borderColor: [
      "tablist",
      "tabitem",
      "variant",
      "underline",
      "active",
      "off",
    ],
    tabitemUnderlineInactive_hover_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "underline",
      "active",
      "off",
    ],

    // TabItem: Pills Variant
    tabitemPillsActive_rounding: [
      "tablist",
      "tabitem",
      "variant",
      "pills",
      "active",
      "on",
    ],
    tabitemPillsActive_bgColor: [
      "tablist",
      "tabitem",
      "variant",
      "pills",
      "active",
      "on",
    ],
    tabitemPillsActive_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "pills",
      "active",
      "on",
    ],
    tabitemPillsInactive_rounding: [
      "tablist",
      "tabitem",
      "variant",
      "pills",
      "active",
      "off",
    ],
    tabitemPillsInactive_hover_bgColor: [
      "tablist",
      "tabitem",
      "variant",
      "pills",
      "active",
      "off",
    ],
    tabitemPillsInactive_hover_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "pills",
      "active",
      "off",
    ],

    // TabItem: FullWidth Variant
    tabitemFullWidthActive_rounding: [
      "tablist",
      "tabitem",
      "variant",
      "fullWidth",
      "active",
      "on",
    ],
    tabitemFullWidthActive_bgColor: [
      "tablist",
      "tabitem",
      "variant",
      "fullWidth",
      "active",
      "on",
    ],
    tabitemFullWidthActive_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "fullWidth",
      "active",
      "on",
    ],
    tabitemFullWidthInactive_rounding: [
      "tablist",
      "tabitem",
      "variant",
      "fullWidth",
      "active",
      "off",
    ],
    tabitemFullWidthInactive_bgColor: [
      "tablist",
      "tabitem",
      "variant",
      "fullWidth",
      "active",
      "off",
    ],
    tabitemFullWidthInactive_hover_bgColor: [
      "tablist",
      "tabitem",
      "variant",
      "fullWidth",
      "active",
      "off",
    ],
    tabitemFullWidthInactive_hover_textColor: [
      "tablist",
      "tabitem",
      "variant",
      "fullWidth",
      "active",
      "off",
    ],

    // TabItem: Icon
    tabitemIcon_margin: ["tablist", "tabitem", "icon"],
    tabitemIcon_size: ["tablist", "tabitem", "icon"],

    // TabPanel
    tabpanel_padding: ["tabpanel"],
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
    // The main FlowbitTabs component accepts all its standard props.
    <FlowbitTabs
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic.items.map((item) => (
        // Map over the items array to create each Tabs.Item component.
        <TabItem key={item.id} {...item}>
          {item.content}
        </TabItem>
      ))}
    </FlowbitTabs>
  );
};

export default Tabs;
