/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  FileInput as FlowbiteFileInput,
  type FileInputProps,
  Label,
} from "flowbite-react";
import React from "react";

// The props for our dynamic dropzone component.
export interface Props
  extends Omit<FileInputProps, "children" | "style" | "color"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode;
    helperText?: React.ReactNode;
  };
  // The style prop accepts a standard CSS object for the dropzone.
  style?: CSSObject;
}

// --- ✨ NEW: Default logic for the dropzone text ---
export const defaultLogic = {
  label: (
    <>
      <span className="font-semibold">Click to upload</span> or drag and drop
    </>
  ),
  helperText: "SVG, PNG, JPG or GIF (MAX. 800x400px)",
};

const Dropzone: React.FC<Props> = ({
  // ✨ Cleaner defaults
  geometric = { width: "100%", height: "16rem" }, // default h-64
  logic = defaultLogic,
  style = {},
  // ✨ Cleaner default ID for accessibility
  id = "default-dynamic-dropzone",
  ...props
}) => {
  // Styling for the main <Label> which acts as the dropzone.
  const componentCss: CSSObject = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: geometric.width,
    height: geometric.height,
    // Sensible defaults, can be overridden by `style` prop.
    border: "2px dashed #D1D5DB", // border-2 border-dashed border-gray-300
    borderRadius: "0.5rem", // rounded-lg
    backgroundColor: "#F9FAFB", // bg-gray-50
    ...style,
  };

  // ✨ Cleaner access to logic props
  const { label, helperText } = logic;

  return (
    <Label htmlFor={id} css={componentCss}>
      <div className="flex flex-col items-center justify-center pb-6 pt-5">
        <svg
          // ✨ Added default Flowbite styling
          className="dropzone-icon mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>

        {/* ✨ Added default Flowbite styling */}
        <p className="dropzone-label mb-2 text-sm text-gray-500 dark:text-gray-400">
          {label}
        </p>

        {/* ✨ Added default Flowbite styling */}
        <p className="dropzone-helper-text text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      </div>

      {/* The actual file input is hidden. */}
      <FlowbiteFileInput {...props} id={id} className="hidden" />
    </Label>
  );
};

export default Dropzone;
