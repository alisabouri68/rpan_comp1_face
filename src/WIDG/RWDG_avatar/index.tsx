/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Avatar as FlowbiteAvatar,
  AvatarGroup,
  type AvatarGroupProps,
  type AvatarProps,
} from "flowbite-react";
import React from "react";

// The interface for a single avatar's data, extending Flowbite's props.
interface AvatarData extends AvatarProps {
  id: string | undefined; // A mandatory ID for stable React keys.
  link?: string; // An optional link for each avatar.
}

// Props for our main DynamicAvatarGroup component.
export interface Props extends Omit<AvatarGroupProps, "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    data: AvatarData[];
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default Demo Data ---
// This provides a helpful placeholder when no `logic` prop is passed.
// We're using `placeholderInitials` for a dependency-free look.
export const defaultLogic: { data: AvatarData[] } = {
  data: [
    {
      id: "user1",
      alt: "Bonny Green",
      placeholderInitials: "BG",
      rounded: true,
    },
    {
      id: "user2",
      alt: "Jese Leos",
      placeholderInitials: "JL",
      rounded: true,
      link: "#profile",
    },
    {
      id: "user3",
      alt: "Thomas Lean",
      placeholderInitials: "TL",
      rounded: true,
    },
    {
      id: "user4",
      alt: "Lana Byrd",
      placeholderInitials: "LB",
      rounded: true,
      link: "#profile",
    },
  ],
};

const Avatar: React.FC<Props> = ({
  geometric = { width: "fit-content" },
  // If `logic` isn't provided, our awesome demo data is used.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // Styling logic is cleaner and easier to read.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  return (
    <AvatarGroup {...props} css={componentCss}>
      {logic?.data?.map(({ id, link, ...avatarProps }) => {
        // If a 'link' is provided in the data, the avatar becomes a clickable anchor.
        if (link) {
          return (
            <a href={link} key={id} className="block">
              <FlowbiteAvatar {...avatarProps} />
            </a>
          );
        }

        // Otherwise, render a standard, non-clickable avatar.
        return <FlowbiteAvatar key={id} {...avatarProps} />;
      })}
    </AvatarGroup>
  );
};

export default Avatar;
