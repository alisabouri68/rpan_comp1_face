/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import React, { useMemo } from "react";

// --- Interfaces ---

export interface SeparatorLogic {
  orientation?: "horizontal" | "vertical";
  text?: React.ReactNode;
  textPosition?: "start" | "center" | "end";
}

export interface Props {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: SeparatorLogic;
  // The style prop accepts a standard CSS object for customization (e.g., color, thickness).
  style?: CSSObject;
}

// --- ✨ NEW: Default Data ---
const defaultLogic: SeparatorLogic = {
  orientation: "horizontal",
  text: "Section Break",
  textPosition: "center",
};

// --- The Component ---
const DynamicSeparator: React.FC<Props> = ({
  geometric = { width: "100%", height: "auto" },
  // If `logic` isn't provided, use the default "Section Break" demo.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // Destructure logic with safe fallbacks
  const { orientation = "horizontal", text, textPosition = "center" } = logic;

  const isHorizontal = orientation === "horizontal";

  // --- Dynamic Styles ---

  // 1. Container Styles
  const containerCss: CSSObject = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: isHorizontal ? "row" : "column",
      width: geometric.width,
      height: geometric.height,
      // Default color for lines and text (can be overridden by `style`)
      color: "#9CA3AF", // gray-400
      fontSize: "0.875rem", // text-sm
      ...style,
    }),
    [geometric, style, isHorizontal]
  );

  // 2. Line Styles (The graphical separator)
  const lineCss: CSSObject = {
    flexGrow: 1, // Takes up remaining space
    borderStyle: "solid",
    borderColor: "currentColor", // Inherits color from container
    borderWidth: 0, // Reset
    // Apply border based on orientation
    borderTopWidth: isHorizontal ? "1px" : "0",
    borderLeftWidth: isHorizontal ? "0" : "1px",
    // Ensure the line stretches correctly in vertical mode
    width: isHorizontal ? "auto" : "0",
    height: isHorizontal ? "0" : "auto",
    opacity: 0.5, // Subtle look by default
  };

  // 3. Spacing Logic
  // We determine where to put the lines based on text position.
  const showStartLine =
    textPosition === "center" || textPosition === "end" || !text;
  const showEndLine =
    textPosition === "center" || textPosition === "start" || !text;

  // Margin for the text (gap between text and lines)
  const textMargin = isHorizontal ? "0 1rem" : "1rem 0";

  return (
    <div
      {...props}
      css={containerCss}
      role="separator"
      aria-orientation={orientation}
    >
      {/* Start Line */}
      {showStartLine && <span css={lineCss} />}

      {/* Text Content */}
      {text && (
        <span
          css={{
            margin: showStartLine || showEndLine ? textMargin : 0,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      )}

      {/* End Line */}
      {showEndLine && <span css={lineCss} />}
    </div>
  );
};

export default DynamicSeparator;
