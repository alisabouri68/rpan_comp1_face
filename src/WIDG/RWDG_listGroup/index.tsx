/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  ListGroup as FlowbiteListGroup,
  type ListGroupProps,
  ListGroupItem,
  type ListGroupItemProps,
} from "flowbite-react";
// Import icons for our demo data
import { Logout, Setting2, User } from "iconsax-react";
import React from "react";

// The interface for a single list group item's data.
interface ListItemData extends Omit<ListGroupItemProps, "children" | "ref"> {
  id: string | undefined; // ✨  A mandatory ID for stable keys.
  label: React.ReactNode;
  href: string;
  icon?: any; // ✨  A better type for icon components.
}

// The props for our main DynamicListGroup component.
export interface Props extends Omit<ListGroupProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    items: ListItemData[];
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default demo data for a user settings menu ---
const defaultItemsData: ListItemData[] = [
  { id: "profile", label: "Profile", href: "#profile", icon: User },
  {
    id: "settings",
    label: "Settings",
    href: "#settings",
    icon: Setting2,
    active: true,
  },
  { id: "signout", label: "Sign Out", href: "#signout", icon: Logout },
];

export const defaultLogic = {
  items: defaultItemsData,
};

const ListGroup: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default user menu is used.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // These styles will be applied to the root <FlowbiteListGroup> element.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  return (
    <FlowbiteListGroup {...props} css={componentCss}>
      {logic?.items?.map((item) => {
        // We destructure to separate the label and id from other props.
        const { id, label, ...itemProps } = item;

        // `itemProps` now contains `href`, `icon`, `active`, `disabled`, etc.
        // Flowbite's `ListGroupItem` handles the `icon` prop automatically!
        return (
          <ListGroupItem key={id} {...itemProps}>
            {label}
          </ListGroupItem>
        );
      })}
    </FlowbiteListGroup>
  );
};

export default ListGroup;
