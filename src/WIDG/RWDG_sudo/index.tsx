/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import React from "react";
// Using an icon for the default code content
import { DocumentCode } from "iconsax-react";

// --- Configuration ---
// Construct the base URL from environment variables
const baseUrl = `${import.meta.env.VITE_ORES_ADDRESS}:${
  import.meta.env.VITE_ORES_PORT
}`;

// --- Interfaces ---

export interface Props {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional
    image?: string; // URL for the image to display
    code?: React.ReactNode; // An HTML string to render
  };
  // Style for the main container
  style?: CSSObject;
}

// --- Default Data ---
export const defaultLogic = {
  // A default placeholder image as a fallback
  image: "https://via.placeholder.com/600x400.png?text=Default+Image+Fallback",
  // A default HTML string as the code content
  code: (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f3f4f6",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        fontFamily: "sans-serif",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <DocumentCode size={40} color="#4b5563" />
      <h3 style={{ marginTop: 0, color: "#111827" }}>Default Code (TSX)</h3>
      <p style={{ color: "#4b5563" }}>
        This is a default React component (TSX).
      </p>
    </div>
  ),
};

// --- The Component ---
const DynamicEmbed: React.FC<Props> = ({
  geometric = { width: "100%", height: "100%" },
  // If `logic` isn't provided, our full default is used
  logic = defaultLogic,
  style = {},
  ...props // For any other extra props that might be needed
}) => {
  // Styles are applied to the main container
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    overflow: "auto", // Allow scrolling if the code content is large
    ...style,
  };

  const { image, code } = logic;

  // --- Priority Logic ---
  // We check if `code` is a truthy value (e.g., not null or undefined).
  // This gives it priority over the image.
  const hasCode = !!code;

  // --- Image URL Processing ---
  const processImageUrl = (imgUrl?: string) => {
    if (!imgUrl) return "";

    // Check if it starts with http:// or https://
    const hasProtocol =
      imgUrl.startsWith("http://") || imgUrl.startsWith("https://");

    if (hasProtocol) {
      return imgUrl;
    }

    // If no protocol, prepend the base URL
    // Note: You might want to ensure there is a '/' separator if your variables don't include it
    return `${baseUrl}/${imgUrl}`;
  };

  const finalImageSrc = processImageUrl(image);

  return (
    <div {...props} css={componentCss}>
      {hasCode ? (
        // Priority 1: If code (React.ReactNode) is provided, render it.
        <>{code}</>
      ) : (
        // Priority 2: If no code, display the processed image
        <img
          src={finalImageSrc}
          alt="Dynamic content fallback"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
        />
      )}
    </div>
  );
};

export default DynamicEmbed;
