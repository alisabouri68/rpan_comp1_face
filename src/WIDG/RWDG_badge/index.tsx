/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { Badge as FlowbiteBadge, type BadgeProps } from "flowbite-react";
import React from "react";

// The interface for our dynamic badge component.
// We no longer need to Omit `children` because we handle it gracefully.
export interface Props extends Omit<BadgeProps, "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // This prop provides default content for the badge.
    content?: React.ReactNode;
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default content for the badge ---
export const defaultLogic = {
  content: "Default",
};

const Badge: React.FC<Props> = ({
  geometric = { width: "fit-content" },
  // If `logic` isn't provided, our default content is used.
  logic = defaultLogic,
  style = {},
  // We explicitly destructure `children` to decide what to render.
  children,
  ...props // All standard BadgeProps like `icon`, `href`, `color` are passed here.
}) => {
  // Styling logic is simplified for better readability.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  // If the user passes `children` directly, we use that.
  // Otherwise, we fall back to the content from our `logic` prop.
  const finalContent = children ?? logic.content;

  return (
    // The `css` prop applies our dynamic styles.
    // All other props (`color`, `icon`, `href`, etc.) are passed directly.
    <FlowbiteBadge {...props} css={componentCss}>
      {finalContent}
    </FlowbiteBadge>
  );
};

export default Badge;
