/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import { Tooltip as FlowbiteTooltip, type TooltipProps } from "flowbite-react";
import React from "react";

// The props for our main Tooltip component.
// ✨ NOTE: We're removing the empty `logic` prop, as `content` is the logic.
export interface Props extends Omit<TooltipProps, "style" | "content"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    children?: React.ReactNode;
    content?: string;
  };
  // The style prop accepts a standard CSS object for the trigger's wrapper.
  style?: CSSObject;
}

export const defaultLogic = {
  children: <span>Title</span>,
  // --- ✨ NEW: Smart default for the 'content' prop ---
  content: "This is a default tooltip.",
};

const Tooltip: React.FC<Props> = ({
  geometric,
  style = {},
  logic = defaultLogic,

  ...props
}) => {
  // These styles will be applied to the div that wraps the trigger element.
  const componentCss: CSSObject = {
    // A good default for a tooltip trigger wrapper
    display: "inline-block",
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  return (
    <FlowbiteTooltip
      // Pass the default or user-provided content
      content={logic.content}
      {...props}
      css={componentCss}
    >
      {/* `children` is the element that triggers the tooltip */}
      {logic.children}
    </FlowbiteTooltip>
  );
};

export default Tooltip;
