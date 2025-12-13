/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  FloatingLabel as FlowbiteFloatingLabel,
  type FloatingLabelProps,
  HelperText,
} from "flowbite-react";
import React from "react";

// The props interface for our dynamic floating label component.
// ✨  We've omitted `label` as it's now part of our `logic` prop.
export interface Props
  extends Omit<FloatingLabelProps, "children" | "style" | "label"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: string;
    helperText?: React.ReactNode;
  };
  // The style prop now accepts a standard CSS object for the wrapper.
  style?: CSSObject;
}

// --- ✨ NEW: Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  label: "Email Address",
  helperText: "We'll never share your email.",
};

const FloatingLabel: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨  Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-floating-label",
  ...props
}) => {
  // --- ✨  Cleaner prop and style handling ---
  const { label, helperText } = logic;

  // ✨ FIXED: These styles now correctly apply to the wrapper div.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  return (
    <div className="flex flex-col gap-2">
      <FlowbiteFloatingLabel
        {...props}
        id={id}
        label={label ?? ""}
        // A common default for this component
        variant={props.variant ?? "outlined"}
        css={componentCss}
      />
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default FloatingLabel;
