/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  ButtonGroup as FlowbiteButtonGroup,
  type ButtonGroupProps,
} from "flowbite-react";
import { Message, Setting2, User } from "iconsax-react";
import React from "react";
// We import our own powerful, dynamic Button component.
import DynamicButton, { Props as DynamicButtonProps } from "WIDG/RWDG_button";

// The interface for a single button's data within the group.
interface ButtonData extends Omit<DynamicButtonProps, "children"> {
  id: string | undefined; // ✨ A mandatory ID for stable keys.
  label: React.ReactNode;
}

// The props for our main DynamicButtonGroup component.
export interface Props extends Omit<ButtonGroupProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    buttons: ButtonData[];
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default button data for an awesome demo ---
export const defaultLogic: { buttons: ButtonData[] } = {
  buttons: [
    {
      id: "profile",
      label: "Profile",
      logic: { icon: User },
    },
    {
      id: "settings",
      label: "Settings",
      logic: { icon: Setting2 },
    },
    {
      id: "messages",
      label: "Messages",
      logic: { icon: Message },
    },
  ],
};

const ButtonGroup: React.FC<Props> = ({
  geometric,
  // If `logic` is not provided, our default button team assembles!
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // Styling logic is simplified for better readability.
  const componentCss: CSSObject = {
    display: "inline-flex", // A good default for button groups
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  return (
    <FlowbiteButtonGroup {...props} css={componentCss}>
      {logic?.buttons?.map(({ id, label, ...buttonProps }) => (
        // We render our custom Button for each item in the data array.
        // `label` is passed as children to the Button component.
        <DynamicButton key={id} {...buttonProps}>
          {label}
        </DynamicButton>
      ))}
    </FlowbiteButtonGroup>
  );
};

export default ButtonGroup;
