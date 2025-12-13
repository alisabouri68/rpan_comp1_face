/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Datepicker as FlowbiteDatepicker,
  type DatepickerProps,
  HelperText,
  Label,
} from "flowbite-react";
import React from "react";

// The props interface for our enhanced component.
export interface Props extends Omit<DatepickerProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode;
    helperText?: React.ReactNode;
  };
  // The style prop applies to the main wrapper div.
  style?: CSSObject;
}

// --- ✨ Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  label: "Select a Date",
  helperText: "",
};

const Datepicker: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨ Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-datepicker",
  ...props
}) => {
  // --- ✨ Cleaner prop and style handling ---
  const { label, helperText } = logic;

  // These styles apply to the container, giving you control over the whole block.
  const componentCss: CSSObject = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  return (
    <div css={componentCss}>
      {label && (
        <Label htmlFor={id} color={props.color}>
          {label}
        </Label>
      )}
      <FlowbiteDatepicker id={id} {...props} />
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default Datepicker;
