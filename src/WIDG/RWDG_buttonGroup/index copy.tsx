import {
  ButtonGroup as FlowbiteButtonGroup,
  ButtonGroupProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Button, { Props as DynamicButtonProps } from "WIDG/RWDG_button";

// The interface for a single button's data.
// We extend the base ButtonProps to inherit all its properties,
// and add a unique `id` for list rendering.
interface ButtonData extends Omit<DynamicButtonProps, "children"> {
  id: string | undefined;
  label: React.ReactNode; // The content of the button, e.g., a string or an icon
  onClick?: () => void; // A function to handle button clicks
  href?: string; // An optional URL for the button
}

// The props for our main DynamicButtonGroup component.
// It accepts all standard ButtonGroupProps and our custom `buttons` array.
interface Props extends Omit<ButtonGroupProps, "children" | "style"> {
  geometric?: {
    width: String;
    height: String;
  };
  logic: {
    buttons: ButtonData[];
  };
  style?: {
    // Base Container Styles
    base_rounding?: string;
    base_shadow?: string;
  };
}

/**
 * A dynamic wrapper component for the flowbite-react ButtonGroup.
 * This component accepts an array of button data and renders a group of Buttons.
 * It simplifies the process of creating a button group from a data source,
 * making the component highly reusable and easy to manage.
 *
 * @param {object} props - The component props.
 * @param {ButtonData[]} props.buttons - An array of objects, where each object represents a button.
 * @param {ButtonGroupProps} props.rest - All other standard ButtonGroup props.
 */
const ButtonGroup: React.FC<Props> = ({
  geometric = { width: "w-full", height: "h-full" },
  logic,
  style = {
    // Base Container Styles
    base_rounding: "rounded-md",
    base_shadow: "shadow-sm",
  },
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.buttonGroup;

  // This object maps the flat appearance keys to their nested path in the theme object.
  const themeMap: { [key in keyof typeof style]?: string[] } = {
    // Base Container Styles
    base_rounding: ["base"],
    base_shadow: ["base"],
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
    // The main Button.Group component accepts all its standard props.
    <FlowbiteButtonGroup
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
    >
      {logic?.buttons.map((button) => (
        // Map over the buttons array to create each Button component.
        <Button key={button.id} {...button}>
          {button.label}
        </Button>
      ))}
    </FlowbiteButtonGroup>
  );
};

export default ButtonGroup;
