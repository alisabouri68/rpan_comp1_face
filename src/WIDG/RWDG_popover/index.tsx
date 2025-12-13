/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Popover as FlowbitePopover,
  type PopoverProps,
  Button, // ✨ We need this for our default trigger
} from "flowbite-react";
import React from "react";

// --- ✨ NEW: Default content for the popover ---
export const defaultLogic = {
  // The default element that triggers the popover
  trigger: <Button>Show Popover</Button>,
  // The default content inside the popover
  content: (
    <div className="w-64 p-3 text-sm text-gray-500 dark:text-gray-400">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Demo Popover
      </h3>
      <p className="mb-2">
        This is the default content. Pass your own via the `logic` prop.
      </p>
    </div>
  ),
};

// The props for our main Popover component.
// ✨  We now Omit `content` and `trigger` to manage them in `logic`.
export interface Props
  extends Omit<PopoverProps, "children" | "style" | "content" | "trigger"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    content?: React.ReactNode;
    trigger?: any;
  };
  // The style prop accepts a standard CSS object for the trigger's wrapper.
  style?: CSSObject;
}

const Popover: React.FC<Props> = ({
  geometric,
  // If `logic` isn't provided, our default content and trigger are used.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // These styles will be applied to the div that wraps the trigger element.
  const componentCss: CSSObject = {
    // A good default for a trigger wrapper
    display: "inline-block",
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  // ✨  We destructure our logic props with defaults.
  const { content, trigger } = logic;

  return (
    <FlowbitePopover
      // Pass the content and trigger from our logic
      content={content}
      trigger={trigger}
      {...props}
      // Apply the dynamic styles to the trigger's wrapper
      css={componentCss}
    />
  );
};

export default Popover;
