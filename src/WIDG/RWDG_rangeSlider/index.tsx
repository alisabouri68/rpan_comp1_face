/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  RangeSlider as FlowbiteRangeSlider,
  type RangeSliderProps,
  HelperText,
  Label,
} from "flowbite-react";
import React from "react";

// The props for our dynamic range slider component.
export interface Props extends Omit<RangeSliderProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    label?: React.ReactNode;
    helperText?: React.ReactNode;
  };
  // The style prop now accepts a standard CSS object for the slider itself.
  style?: CSSObject;
}

// --- ✨ NEW: Default logic for a great out-of-the-box experience ---
export const defaultLogic = {
  label: "Volume",
  helperText: "Select a value between 0 and 100.",
};

const RangeSlider: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default settings are used.
  logic = defaultLogic,
  style = {},
  // ✨  Providing a default ID ensures the `htmlFor` always works.
  id = "default-dynamic-rangeslider",
  ...props
}) => {
  // --- ✨  Styles apply directly to the input, as requested. ---
  const sliderCss: CSSObject = {
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
      <FlowbiteRangeSlider id={id} {...props} css={sliderCss} />

      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default RangeSlider;
