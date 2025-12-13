/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  FileInput as FlowbiteFileInput,
  type FileInputProps,
  HelperText,
  Label,
} from "flowbite-react";
import React from "react";

// The interface for our dynamic file input component.
export interface Props extends Omit<FileInputProps, "children" | "style"> {
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
  label: "Upload file",
  helperText: "SVG, PNG, JPG or GIF (MAX. 800x400px).",
};

const FileInput: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨  Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-fileinput",
  ...props
}) => {
  // --- ✨  Cleaner prop and style handling ---
  const { label, helperText } = logic;

  // These styles apply to the container, giving you control over the whole block.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <FlowbiteFileInput id={id} {...props} css={componentCss} />
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default FileInput;
