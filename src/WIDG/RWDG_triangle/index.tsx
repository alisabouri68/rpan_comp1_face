/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React from "react";

// --- Interfaces ---

export interface Props {
  // Geometric properties for position and dimensions
  geometric?: {
    width?: number; // Triangles can be stretched, so we use width/height
    height?: number;
    rotation?: number;
  };
  logic?: {};
  // Standard CSS object for the wrapper
  style?: CSSObject;
}

// --- ✨ NEW: Default Data ---
const defaultLogic = {};

const defaultGeometric = {
  width: "100%",
  height: "100%", // Equilateral-ish by default
  rotation: 0,
};

// --- The Component ---
const Triangle: React.FC<Props> = ({
  geometric = defaultGeometric,
  logic = defaultLogic,
  style = { color: "#000000" },
  ...props
}) => {
  const { width, height, rotation } = geometric;

  // Style for the wrapper div (Positions the widget)
  const wrapperCss: CSSObject = {
    width,
    height,
    transform: `rotate(${rotation}deg)`,
    // We need pointer-events none on wrapper so clicks pass through to SVG if needed,
    // but usually, for a widget, we want the whole block clickable.
    ...style,
  };

  return (
    <div {...props} css={wrapperCss}>
      {/* We use an SVG to draw the triangle. 
        This allows for proper borders (strokes) and scaling.
      */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none" // Allows the triangle to stretch if width != height
        style={{ overflow: "visible" }} // Ensures thick borders don't get clipped
      >
        <polygon
          // Points: Top-Center, Bottom-Right, Bottom-Left
          points="50,0 100,100 0,100"
          //@ts-ignore
          fill={style?.color ?? "#000000"}
          vectorEffect="non-scaling-stroke" // Keeps border width constant even if resized
          strokeLinejoin="round" // Rounded corners on the border look more like Figma
        />
      </svg>
    </div>
  );
};

export default Triangle;
