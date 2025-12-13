/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  Progress as FlowbiteProgress,
  type ProgressProps,
} from "flowbite-react";
import React from "react";

// The props for our dynamic progress component.
// ✨ NOTE: We're removing the empty `logic` prop, as the state
// props (`progress`, `labelProgress`, etc.) are the "logic".
export interface Props
  extends Omit<
    ProgressProps,
    "children" | "style" | "progress" | "labelProgress"
  > {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    progress: number;
    labelProgress?: boolean;
  };
  // The style prop now accepts a standard CSS object.
  style?: CSSObject;
}

export const defaultLogic = {
  progress: 45,
  labelProgress: true,
};

const Progress: React.FC<Props> = ({
  geometric = { width: "100%" },
  style = {},
  logic = defaultLogic,
  ...props
}) => {
  // These styles will be applied to the root <div> element of the progress bar.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  const { progress, labelProgress } = logic;
  return (
    <FlowbiteProgress
      // We pass our defaults, which will be overridden
      // by any matching props in the `...props` spread.
      progress={progress}
      labelProgress={labelProgress}
      {...props}
      css={componentCss}
    />
  );
};

export default Progress;
