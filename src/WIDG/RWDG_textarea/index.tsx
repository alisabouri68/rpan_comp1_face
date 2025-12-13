/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  Textarea as FlowbiteTextarea,
  type TextareaProps,
  HelperText,
  Label,
} from "flowbite-react";
import React from "react";

// The props for our dynamic textarea component.
export interface Props extends Omit<TextareaProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode; // ✨ Better type for flexibility
    helperText?: React.ReactNode;
  };
  // The style prop now accepts a standard CSS object for the textarea.
  style?: CSSObject;
}

// --- ✨ NEW: Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  label: "Your Message",
  helperText: "Leave a comment or a detailed description.",
};

const Textarea: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨  Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-textarea",
  ...props
}) => {
  // --- ✨  Styles apply directly to the textarea, as requested. ---
  const textareaCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  const { label, helperText } = logic;

  return (
    // The wrapper div now only handles layout.
    <div className="flex w-full flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      {/* ✨ The `css` prop is applied directly to the Flowbite component. */}
      <FlowbiteTextarea id={id} {...props} css={textareaCss} />

      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default Textarea;
