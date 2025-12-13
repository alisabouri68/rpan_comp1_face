/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { Button as FlowbiteButton, type ButtonProps } from "flowbite-react";
// Let's add a cool default icon!
import { Send } from "iconsax-react";
import React from "react";

export interface Props extends Omit<ButtonProps, "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // The content for the button if `children` isn't provided.
    content?: React.ReactNode;
    // We expect the icon to be a component.
    icon?: React.ElementType;
    iconPosition?: "left" | "right";
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  content: "Click Me",
  icon: Send,
  iconPosition: "left" as const,
};

const Button: React.FC<Props> = ({
  geometric,
  // If `logic` isn't provided, our default is used.
  logic = defaultLogic,
  style = {},
  // We destructure `children` to check if it's provided.
  children,
  ...props
}) => {
  // Styling logic is simplified for better readability.
  const componentCss: CSSObject = {
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  // --- ✨ Smart Content & Icon Handling ---
  const { icon: IconComponent, iconPosition } = logic;

  // If `children` is passed directly, it wins. Otherwise, use `logic.content`.
  const finalContent = children ?? logic.content;

  // Create the icon element once to keep our JSX clean.
  const iconElement = IconComponent && (
    <span
      className={
        finalContent ? (iconPosition === "left" ? "mr-2" : "ml-2") : ""
      }
    >
      <IconComponent size="1.2em" />
    </span>
  );

  return (
    <FlowbiteButton {...props} css={componentCss}>
      {iconPosition === "left" && iconElement}
      {finalContent}
      {iconPosition === "right" && iconElement}
    </FlowbiteButton>
  );
};

export default Button;
