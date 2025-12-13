import { FC, useEffect, useRef, ReactNode } from "react";
import { TabItem, Tabs, TabsRef } from "flowbite-react";

// --- Local Imports & API ---
import AbsMan from "RACT/RACT_absMan";

// --- Child Components for Tab Content ---
import EnviMngr from "COMP/RCMP_envimngr_v00.04/index"

// =================================================================
// --- 1. Type Definitions & Interfaces ---
// =================================================================
interface TabConfig {
  title: string;
  component: ReactNode;
  /**
   * A tab can be disabled based on whether a widget is selected.
   * `false` = always enabled. `true` = only enabled if a widget is selected.
   */
  requiresWidget?: boolean;
}

// =================================================================
// --- 2. Component Configuration ---
// =================================================================

/**
 * The custom theme object is moved outside the component for better readability.
 */
const CUSTOM_TABS_THEME = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    variant: {
      underline: "w-full -mb-px border-b border-gray-200 dark:border-gray-700",
    },
    tabitem: {
      base: "flex items-center justify-center p-4 rounded-t-lg text-xs font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none",
      variant: {
        underline: {
          base: "rounded-t-lg",
          active: {
            on: "text-cyan-600 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500",
            off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600",
          },
        },
      },
    },
  },
  tabpanel: "py-3",
};

// =================================================================
// --- 3. Main Component ---
// =================================================================

const MenuBar: FC = () => {
  const { selectedWidget, schema } = AbsMan.useAppSelector(
    (state) => state.spk
  );

  const dispatch = AbsMan.useAppDispatch();

  const tabsRef = useRef<TabsRef>(null);

  // This effect programmatically changes the active tab when a widget is selected/deselected.
  useEffect(() => {
    // If a widget is selected, switch to the "Param" tab (index 1).
    // Otherwise, switch to the "Widget" tab (index 0).
    const targetTabIndex = selectedWidget ? 1 : 0;
    // tabsRef.current?.setActiveTab(targetTabIndex);
  }, [selectedWidget]);

  // When the user manually changes tabs, clear the selected widget if they return to the "Widget" tab.
  // const handleTabChange = (activeTabIndex: number) => {
  //   if (activeTabIndex === 0) {
  //     dispatch(setSelectedWidget(null as any));
  //   }
  // };

  /**
   * A centralized configuration for the tabs.
   * This makes it easy to add, remove, or reorder tabs without touching the main JSX.
   */
  const TABS_CONFIG: TabConfig[] = [
    { title: "Envi managment", component: <EnviMngr /> },
    { title: "para Assigner", component: <span>در حال ساختن</span> },
    { title: "para Editor", component: <span>در حال ساختن</span> },

  ];

  return (
    <Tabs
      ref={tabsRef}
      // onActiveTabChange={handleTabChange}
      aria-label="Widget Editor Tabs"
      variant="underline"
      theme={CUSTOM_TABS_THEME}
    >
      {TABS_CONFIG.map(({ title, component, requiresWidget }) => (
        <TabItem
          key={title}
          title={title}
          disabled={requiresWidget && !selectedWidget}
        >
          {component}
        </TabItem>
      ))}
    </Tabs>
  );
};

export default MenuBar;
