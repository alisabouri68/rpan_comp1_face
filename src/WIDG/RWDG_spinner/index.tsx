/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { Spinner as FlowbiteSpinner, type SpinnerProps } from "flowbite-react";
import React from "react";

// The props for our dynamic spinner component.
// ✨ NOTE: We're removing the empty `logic` prop, as the state
// props (`color`, `size`, `label`, etc.) are the "logic".
export interface Props extends Omit<SpinnerProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    size: string;
    ariaLabel: string;
  };
  // The style prop now accepts a standard CSS object.
  style?: CSSObject;
}

export const defaultLogic = {
  ariaLabel: "Loading content...",
  size: "md", // A good medium-sized default
};

const Spinner: React.FC<Props> = ({
  geometric,
  style = {},
  logic = defaultLogic,

  ...props
}) => {
  // These styles will be applied to the root <svg> element of the spinner.
  const componentCss: CSSObject = {
    // Flowbite's spinner uses width/height, so we can set them here.
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  return (
    <FlowbiteSpinner
      // We pass our defaults, which will be overridden
      // by any matching props in the `...props` spread.
      aria-label={logic.ariaLabel}
      size={logic.size}
      {...props}
      css={componentCss}
    />
  );
};

export default Spinner;
