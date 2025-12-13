/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  HelperText,
  Label,
  TextInput as FlowbiteTextInput,
  type TextInputProps as FlowbiteTextInputProps,
} from "flowbite-react";
import React from "react";

// The props for our dynamic text input component.
export interface Props
  extends Omit<FlowbiteTextInputProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode;
    helperText?: React.ReactNode;
  };
  // The style prop now accepts a standard CSS object for the wrapper.
  style?: CSSObject;
}

// --- ✨ NEW: Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  label: "Username",
  helperText: "Must be unique and at least 8 characters long.",
};

const TextInput: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨  Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-textinput",
  ...props
}) => {
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  const { label, helperText } = logic;

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      {/* The input itself no longer needs the dynamic styles. */}
      <FlowbiteTextInput id={id} {...props} css={componentCss} />
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default TextInput;
