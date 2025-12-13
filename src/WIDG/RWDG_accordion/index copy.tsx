import {
  Accordion as FlowbiteAccordion,
  AccordionContent,
  AccordionPanel,
  AccordionProps,
  AccordionTitle,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// The interface for a single accordion panel's data.
// It includes a unique ID, a title (which can be a string or any React node),
// and the content for the panel, which can also be any React node.
interface AccordionPanelData {
  id: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
}

// The props for our main DynamicAccordion component.
// It extends the original AccordionProps to accept all standard props
// (like `alwaysOpen` or `collapseAll`) and adds our custom `panels` prop.
interface Props extends Omit<AccordionProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    panels: AccordionPanelData[];
  };
  // style?: DeepPartial<AccordionTheme> | { [key: string]: any };
  style?: {
    root_divideColor?: string;
    root_borderColor?: string;

    rootFlushOff_borderRadius?: string;
    rootFlushOff_borderWidth?: string;
    rootFlushOn_borderWidth?: string;

    content_padding?: string;
    contentFirst_borderRadius?: string;
    contentLast_borderRadius?: string;

    arrow_width?: string;
    arrow_height?: string;

    title_width?: string;
    title_padding?: string;
    title_fontWeight?: string;
    title_textColor?: string;
    titleFirst_borderRadius?: string;
    titleLast_borderRadius?: string;

    title_hover_bgColor?: string;
    title_focus_ringColor?: string;
    title_ringWidth?: string;

    titleFlushOn_bgColor?: string;

    titleOpen_bgColor?: string;
    titleOpen_textColor?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react Accordion.
 * This component accepts an array of panel data and renders a list of Accordion panels.
 * This makes it easy to generate accordion content from a data source.
 *
 * @param {object} props - The component props.
 * @param {AccordionPanelData[]} props.panels - An array of objects, where each object represents a panel.
 * @param {AccordionProps} props.rest - All other standard Accordion props (e.g., `alwaysOpen`).
 */
const Accordion: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    root_divideColor: "divide-gray-200",
    root_borderColor: "border-gray-200",

    rootFlushOff_borderRadius: "rounded-lg",
    rootFlushOff_borderWidth: "border",
    rootFlushOn_borderWidth: "border-b",

    content_padding: "p-5",
    contentFirst_borderRadius: "first:rounded-t-lg",
    contentLast_borderRadius: "last:rounded-b-lg",

    arrow_width: "h-6",
    arrow_height: "w-6",

    title_width: "w-full",
    title_padding: "p-5",
    title_fontWeight: "font-medium",
    title_textColor: "text-gray-500",
    titleFirst_borderRadius: "first:rounded-t-lg",
    titleLast_borderRadius: "last:rounded-b-lg",

    title_hover_bgColor: "hover:bg-gray-100",
    title_focus_ringColor: "focus:ring-4",
    title_ringWidth: "focus:ring-gray-200",

    titleFlushOn_bgColor: "bg-transparent",

    titleOpen_bgColor: "bg-gray-100",
    titleOpen_textColor: "text-gray-900",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.accordion;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    root_divideColor: ["root", "base"],
    root_borderColor: ["root", "base"],
    rootFlushOff_borderRadius: ["root", "flush", "off"],
    rootFlushOff_borderWidth: ["root", "flush", "off"],
    rootFlushOn_borderWidth: ["root", "flush", "on"],
    content_padding: ["content", "base"],
    contentFirst_borderRadius: ["content", "base"],
    contentLast_borderRadius: ["content", "base"],
    arrow_width: ["title", "arrow", "base"],
    arrow_height: ["title", "arrow", "base"],
    title_width: ["title", "base"],
    title_padding: ["title", "base"],
    title_fontWeight: ["title", "base"],
    title_textColor: ["title", "base"],
    titleFirst_borderRadius: ["title", "base"],
    titleLast_borderRadius: ["title", "base"],
    title_hover_bgColor: ["title", "flush", "off"],
    title_focus_ringColor: ["title", "flush", "off"],
    title_ringWidth: ["title", "flush", "off"],
    titleFlushOn_bgColor: ["title", "flush", "on"],
    titleOpen_bgColor: ["title", "open", "on"],
    titleOpen_textColor: ["title", "open", "on"],
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
    // The main Accordion component accepts all its standard props.
    <FlowbiteAccordion
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic.panels.map((panel: AccordionPanelData) => (
        // Map over the panels array to create each Accordion.Panel.
        <AccordionPanel key={panel.id}>
          {/* The title of the panel comes from the `panel.title` prop. */}
          <AccordionTitle>{panel.title}</AccordionTitle>
          {/* The content of the panel comes from the `panel.content` prop. */}
          <AccordionContent>{panel.content}</AccordionContent>
        </AccordionPanel>
      ))}
    </FlowbiteAccordion>
  );
};

export default Accordion;
