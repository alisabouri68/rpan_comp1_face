/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { Alert as FlowbiteAlert, type AlertProps } from "flowbite-react";
// Let's use a more fitting default icon
import { InfoCircle } from "iconsax-react";
import React from "react";

// The props for our main DynamicAlert component.
export interface Props extends Omit<AlertProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    content?: React.ReactNode;
    // We specify that the icon should be a component type.
    icon?: React.ElementType;
    iconPosition?: "left" | "right";
  };
  style?: CSSObject;
}

// --- ✨ NEW: A more descriptive default logic ---
export const defaultLogic = {
  content: "This is a default alert. Customize it via the `logic` prop!",
  icon: InfoCircle,
  iconPosition: "left" as const, // `as const` provides better type inference
};

const Alert: React.FC<Props> = ({
  geometric = { width: "100%", height: "auto" },
  // Our new, cleaner default prop.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // We destructure logic here for direct access, making the JSX cleaner.
  // We also provide a final fallback for the icon.
  const { content, icon: IconComponent = InfoCircle, iconPosition } = logic;

  // The styling logic is simplified for better readability.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style, // Custom styles will override geometric defaults if they conflict.
  };





  // Create the icon element once to use in multiple places.
  const iconElement = IconComponent && (
    // A dedicated class for easier styling via nested selectors.
    <span
      className={`dynamic-alert-icon ${
        iconPosition === "left" ? "mr-3" : "ml-3"
      }`}
    >
      <IconComponent size={18} color="currentColor" />
    </span>
  );



  
  return (
    <FlowbiteAlert
      {...props}
      css={componentCss}
      // This clever trick disables Flowbite's default icon,
      // giving us full control over our own.
      icon={() => null}
    >
      <div className="flex w-full items-center">
        {iconPosition === "left" && iconElement}

        <div className="flex-grow">{content}</div>

        {iconPosition === "right" && iconElement}
      </div>
    </FlowbiteAlert>
  );
};

export default Alert;
