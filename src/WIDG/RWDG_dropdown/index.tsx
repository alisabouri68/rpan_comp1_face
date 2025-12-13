/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Dropdown as FlowbiteDropdown,
  type DropdownProps,
  DropdownItem,
  type DropdownItemProps,
} from "flowbite-react";
// We'll import icons for our demo data.
import { Logout, Setting2, User } from "iconsax-react";
import React from "react";

// Data for a single dropdown item.
interface DropdownItemData extends Omit<DropdownItemProps, "children"> {
  id: string | undefined; // ✨  A mandatory ID for stable keys.
  label: React.ReactNode;
  icon?: React.ElementType | any; // ✨  Better type for a component.
  iconPosition?: "left" | "right";
}

// Props for our main DynamicDropdown component.
export interface Props extends Omit<DropdownProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    items: DropdownItemData[];
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default demo items for a user menu ---
export const defaultLogic: { items: DropdownItemData[] } = {
  items: [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Setting2 },
    { id: "signout", label: "Sign Out", icon: Logout },
  ],
};

const Dropdown: React.FC<Props> = ({
  geometric,
  // If `logic` isn't provided, our default user menu appears.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // Styling for the trigger button.
  const componentCss: CSSObject = {
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  return (
    <FlowbiteDropdown
      {...props}
      // The styles are applied directly to the trigger button.
      css={componentCss}
    >
      {logic?.items?.map((item) => {
        // --- ✨  We now implement the icon and iconPosition logic! ---
        const {
          id,
          label,
          icon: IconComponent,
          iconPosition = "left", // Default to left
          ...itemProps
        } = item;

        // Create the icon element.
        const iconElement = IconComponent && (
          <span
            className={
              // Add margin based on position.
              label ? (iconPosition === "left" ? "mr-2" : "ml-2") : ""
            }
          >
            <IconComponent size="1.2em" />
          </span>
        );

        return (
          <DropdownItem key={id} {...itemProps}>
            {iconPosition === "left" && iconElement}
            {label}
            {iconPosition === "right" && iconElement}
          </DropdownItem>
        );
      })}
    </FlowbiteDropdown>
  );
};

export default Dropdown;
