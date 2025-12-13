/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Checkbox as FlowbiteCheckbox,
  type CheckboxProps,
  HelperText,
  Label,
} from "flowbite-react";
import React from "react";

// The interface for our dynamic checkbox component.
export interface Props extends Omit<CheckboxProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    checkboxPosition?: "left" | "right";
  };
  style?: CSSObject;
}

// --- ✨ Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  label: "I agree to the terms and conditions",
  helperText: "You must agree before you can proceed.",
  checkboxPosition: "left" as const,
};

const Checkbox: React.FC<Props> = ({
  geometric,
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨ IMPROVED: Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-checkbox",
  ...props
}) => {
  // --- ✨ Cleaner prop and style handling ---
  const { label, helperText, checkboxPosition } = logic;

  const componentCss: CSSObject = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem", // space-y-2
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  const labelContainerCss: CSSObject = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    // This clever trick efficiently positions the checkbox.
    flexDirection: checkboxPosition === "right" ? "row-reverse" : "row",
  };

  return (
    <div css={componentCss}>
      <div css={labelContainerCss}>
        <FlowbiteCheckbox id={id} {...props} />
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

export default Checkbox;
