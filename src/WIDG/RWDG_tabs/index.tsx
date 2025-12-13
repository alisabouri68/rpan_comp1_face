/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  Tabs as FlowbiteTabs,
  type TabsProps,
  TabItem,
  type TabItemProps,
} from "flowbite-react";
// Import icons for our demo data
import { Home, Setting2, User, People } from "iconsax-react";
import React from "react";

// The interface for a single tab's data.
// We omit `title` and `children` from Flowbite's props because
// we will manage them with our own `label` and `content` props.
interface TabData extends Omit<TabItemProps, "title" | "children"> {
  id: string | undefined; // A unique ID for the tab
  label: React.ReactNode; // The content for the tab button (passed to `title`)
  content: any; // The content for the tab panel (passed as `children`)
}

// The props for our main dynamic Tabs component.
export interface Props extends Omit<TabsProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    // `logic` is now optional.
    items: TabData[];
  };
  style?: CSSObject;
}

// --- ✨ NEW: Default demo data for a user dashboard ---
const defaultTabsData: TabData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    content: (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        This is the <strong>Dashboard tab's content</strong>. You can put
        charts, stats, or summaries here.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Setting2,
    content: (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        This is the <strong>Settings tab's content</strong>. All your
        application settings and preferences go here.
      </p>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    content: (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        This is the <strong>Profile tab's content</strong>. Update your personal
        information.
      </p>
    ),
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: People,
    disabled: true, // ✨ Let's show off a disabled state
    content: "This content is not reachable.",
  },
];

export const defaultLogic = {
  items: defaultTabsData,
};

const Tabs: React.FC<Props> = ({
  geometric = { width: "100%" },
  // If `logic` isn't provided, our default dashboard tabs are used.
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  // These styles will be applied to the root element of the tabs.
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  return (
    <FlowbiteTabs {...props} css={componentCss}>
      {logic?.items?.map((item) => {
        // We destructure to separate our custom props from Flowbite's
        const { id, label, content, ...itemProps } = item;

        return (
          <TabItem
            key={id}
            // `label` is passed to Flowbite's `title` prop
            title={label}
            // All other props (like `icon` or `disabled`) are spread
            {...itemProps}
          >
            {content}
          </TabItem>
        );
      })}
    </FlowbiteTabs>
  );
};

export default Tabs;
