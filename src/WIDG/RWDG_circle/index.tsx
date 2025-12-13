/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React from "react";

// --- Interfaces ---

export interface Props {
  // Geometric properties specifically for position and size on a canvas
  geometric?: {
    width?: string;
    height?: string;
    rotation?: number; // Rotation in degrees (less common for circles, but possible)
  };
  logic?: {};
  // The style prop accepts a standard CSS object for the container.
  style?: CSSObject;
}

// --- ✨ NEW: Default Data ---
const defaultLogic = {};

const defaultGeometric = {
  width: "100%",
  height: "100%",
  rotation: 0, // No rotation by default
};

// --- The Component ---
const Circle: React.FC<Props> = ({
  geometric = defaultGeometric,
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  const { width, height, rotation } = geometric;

  // Combine geometric and logic styles with the custom style prop
  const componentCss: CSSObject = {
    width,
    height,
    borderRadius: "50%", // This is what makes it a circle!
    transform: `rotate(${rotation}deg)`, // Apply rotation
    ...style, // Custom styles can override defaults
  };

  return <div {...props} css={componentCss} />;
};

export default Circle;
