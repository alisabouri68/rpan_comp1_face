/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import React, { useMemo } from "react";
// Using a default icon for the demo
import { MagicStar } from "iconsax-react";

// --- Interfaces ---

export interface TextIconLogic {
  text?: React.ReactNode;
  // We accept a Component type (e.g. from iconsax) or a direct ReactNode
  icon?: React.ElementType;
  iconPosition?: "left" | "right" | "top" | "bottom";
  onClick?: () => void;
}

export interface Props {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: TextIconLogic;
  // The style prop accepts a standard CSS object.
  style?: CSSObject;
}

// --- ✨ NEW: Default Data ---
const defaultLogic: TextIconLogic = {
  text: "Feature Label",
  icon: MagicStar,
  iconPosition: "left",
};

// --- The Component ---
const TextIcon: React.FC<Props> = ({
  geometric = { width: "fit-content", height: "auto" },
  // If `logic` isn't provided, use the default demo.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  const { text, icon: IconComponent, iconPosition = "left", onClick } = logic;

  // --- Dynamic Styling Logic ---
  const containerCss: CSSObject = useMemo(() => {
    // We map positions to flex-directions to simplify layout logic.
    // Left   -> row             (Icon - Text)
    // Right  -> row-reverse     (Text - Icon)
    // Top    -> column          (Icon / Text)
    // Bottom -> column-reverse  (Text / Icon)
    const directionMap = {
      left: "row",
      right: "row-reverse",
      top: "column",
      bottom: "column-reverse",
    };

    return {
      display: "flex",
      flexDirection: directionMap[
        iconPosition
      ] as React.CSSProperties["flexDirection"],
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem", // Standard gap instead of conditional margins
      width: geometric.width,
      height: geometric.height,
      cursor: onClick ? "pointer" : "inherit",
      color: "inherit", // Inherit text color from parent
      ...style,
    };
  }, [geometric, iconPosition, onClick, style]);

  return (
    <div {...props} css={containerCss} onClick={onClick}>
      {/* We always render the Icon first in the DOM. 
        CSS flex-direction handles the visual ordering (left/right/top/bottom).
      */}
      {IconComponent && (
        <span className="flex items-center justify-center">
          <IconComponent size="1.2em" color="currentColor" />
        </span>
      )}

      {text && <span>{text}</span>}
    </div>
  );
};

export default TextIcon;
