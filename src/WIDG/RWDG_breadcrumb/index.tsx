/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import {
  Breadcrumb as FlowbiteBreadcrumb,
  BreadcrumbItem,
  type BreadcrumbItemProps,
  type BreadcrumbProps,
} from "flowbite-react";
// We'll use an icon for our default "Home" link.
import { Home } from "iconsax-react";
import React from "react";

// The interface for a single breadcrumb item's data.
interface BreadcrumbItemData
  extends Omit<BreadcrumbItemProps, "href" | "children"> {
  id: string | undefined; // ✨ ADDED: A unique ID for stable keys.
  label: React.ReactNode;
  href: string;
}

// The props for our main DynamicBreadcrumb component.
export interface Props extends Omit<BreadcrumbProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    path: BreadcrumbItemData[];
  };
  style?: CSSObject;
}

// This provides a helpful example of a navigation trail.
export const defaultLogic: { path: BreadcrumbItemData[] } = {
  path: [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "dashboard", label: "Dashboard", href: "/dashboard" },
    { id: "settings", label: "Settings", href: "/dashboard/settings" },
  ],
};

const Breadcrumb: React.FC<Props> = ({
  geometric,
  // If `logic` isn't provided, we use our default path.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // Styling logic is simplified for better readability.
  const componentCss: CSSObject = {
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  const pathItems = logic?.path ?? [];

  return (
    <FlowbiteBreadcrumb
      {...props}
      css={componentCss}
      aria-label="Dynamic breadcrumb"
    >
      {pathItems.map((item, index) => {
        // We destructure to separate the ID from the rest of the props.
        const { id, label, ...itemProps } = item;
        // The last item in a breadcrumb path is the current page and should not be a link.
        const isLastItem = index === pathItems.length - 1;

        return (
          <BreadcrumbItem
            key={id} // ✨ IMPROVED: Using a stable ID for the key.
            {...itemProps}
            // If it's the last item, we remove the `href` to make it plain text.
            href={isLastItem ? undefined : itemProps.href}
          >
            {label}
          </BreadcrumbItem>
        );
      })}
    </FlowbiteBreadcrumb>
  );
};

export default Breadcrumb;
