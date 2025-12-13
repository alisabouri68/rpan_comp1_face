/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { ArchiveTick, MoneySend, People, ShoppingCart } from "iconsax-react";
import React, { useMemo } from "react";

// --- Interfaces ---

interface CardData {
  id: string | number;
  title: React.ReactNode;
  value: string | number;
  subtitle: string;
  // We expect the icon to be a component type (e.g. from iconsax-react)
  icon: React.ElementType;
  // Can be a Tailwind class ("bg-blue-100") or a hex code ("#E0F2FE")
  backgroundColor: string;
}

export interface Props {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    cards: CardData[];
  };
  // The style prop accepts a standard CSS object for the grid container.
  style?: CSSObject;
}

// --- ✨ Default Data ---
const defaultLogic = {
  cards: [
    {
      id: "users",
      title: "Total Users",
      value: "11,238",
      subtitle: "+16%",
      icon: People,
      backgroundColor: "bg-blue-100", // Tailwind class
    },
    {
      id: "orders",
      title: "Total Orders",
      value: "23,890",
      subtitle: "+8%",
      icon: ShoppingCart,
      backgroundColor: "bg-green-100",
    },
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$1.2M",
      subtitle: "+21%",
      icon: MoneySend,
      backgroundColor: "bg-yellow-100",
    },
    {
      id: "completed",
      title: "Tasks Completed",
      value: "5,430",
      subtitle: "this week",
      icon: ArchiveTick,
      backgroundColor: "bg-indigo-100",
    },
  ],
};

// --- The Component ---
const DynamicStatsGrid: React.FC<Props> = ({
  geometric = { width: "100%" }, // Default width
  // If `logic` isn't provided, use our awesome default data.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  const { cards } = logic;

  // --- Dynamic Styles ---
  const containerCss: CSSObject = useMemo(() => {
    return {
      width: geometric.width,
      height: geometric.height,
      ...style,
    };
  }, [geometric, style]);

  return (
    // We keep the Tailwind grid classes for the layout logic as it handles responsiveness beautifully,
    // but we apply geometric sizing via the `css` prop.
    <div
      {...props}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      css={containerCss}
    >
      {(cards ?? []).map((card) => {
        const {
          id,
          backgroundColor,
          icon: Icon,
          title,
          value,
          subtitle,
        } = card;

        // Check if the background is a hex code or a class
        const isHexColor = backgroundColor.startsWith("#") || backgroundColor.startsWith("rgb");

        return (
          <div
            key={id}
            // If it's a class, we add it here. If it's a hex, we handle it in style.
            className={`flex items-center justify-center gap-2 rounded-lg border py-4 ${
              !isHexColor ? backgroundColor : ""
            }`}
            style={isHexColor ? { backgroundColor: backgroundColor } : undefined}
          >
            {/* Icon Container */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Icon size={32} className="text-gray-800" variant="Bulk" color="currentColor" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start space-y-1">
              <div className="text-sm font-medium text-gray-500">{title}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {value}
                </span>
                <span
                  className={`text-xs font-medium ${
                    subtitle.includes("-") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ({subtitle})
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicStatsGrid;