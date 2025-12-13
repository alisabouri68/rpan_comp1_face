/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  Radio as FlowbiteRadio,
  type RadioProps,
  HelperText,
  Label,
} from "flowbite-react";
import React from "react";

// The props for our dynamic radio button component.
export interface Props extends Omit<RadioProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    radioPosition?: "left" | "right";
  };
  // The style prop now accepts a standard CSS object for the wrapper.
  style?: CSSObject;
}

// --- ✨ NEW: Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  label: "Default Option",
  helperText: "Please select one of the options.",
  radioPosition: "left" as const,
};

const Radio: React.FC<Props> = ({
  geometric = { width: "fit-content" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨  Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-radio",
  ...props
}) => {
  // --- ✨ FIXED: These styles now correctly apply to the wrapper div. ---
  const componentCss: CSSObject = {};

  const { label, helperText, radioPosition } = logic;

  const labelContainerStyles: CSSObject = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    // This logic remains perfect.
    flexDirection: radioPosition === "right" ? "row-reverse" : "row",
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  return (
    <div className="flex flex-col gap-2">
      <div css={labelContainerStyles}>
        <FlowbiteRadio id={id} {...props} css={componentCss} />
        {label && (
          <Label htmlFor={id} color={props.color}>
            {label}
          </Label>
        )}
      </div>
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default Radio;
