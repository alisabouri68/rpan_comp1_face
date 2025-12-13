/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  ToggleSwitch as FlowbiteToggleSwitch,
  type ToggleSwitchProps,
  HelperText,
} from "flowbite-react";
import React from "react";

// The props for our dynamic toggle switch component.
export interface Props extends Omit<ToggleSwitchProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    helperText?: React.ReactNode;
    label?: string;
  };
  // The style prop now accepts a standard CSS object.
  style?: CSSObject;
}

// --- ✨ NEW: Default logic and props ---
export const defaultLogic = {
  helperText: "Toggle this feature on or off.",
  label: "Enable Feature",
};

const ToggleSwitch: React.FC<Props> = ({
  geometric,
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // --- ✨  Styles apply directly to the toggle switch itself. ---
  const componentCss: CSSObject = {
    // Note: Applying width/height directly to the switch itself
    // might be less effective than styling a wrapper.
    // We'll follow the pattern of applying to the component:
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  const { helperText, label } = logic;

  return (
    // The wrapper div just handles layout.
    <div className="flex w-full flex-col gap-2">
      <FlowbiteToggleSwitch
        {...props}
        label={label} // Pass default or user-provided label
        css={componentCss} // Apply styles directly
      />
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default ToggleSwitch;
