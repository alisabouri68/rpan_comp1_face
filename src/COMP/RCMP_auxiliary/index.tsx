import { useRef } from "react";
import { TabItem, Tabs, TabsRef } from "flowbite-react";

function Auxiliary(props: {
  tabs: Array<{
    active: boolean;
    disabled: boolean;
    title: string;
    children: any;
  }>;
}) {
  const { tabs } = props;

  const tabsRef = useRef<TabsRef>(null);

  return (
    <Tabs
      ref={tabsRef}
      onActiveTabChange={(activeTab) => activeTab === 0}
      aria-label="Default tabs"
      variant="underline"
      theme={{
        base: "flex flex-col gap-2",
        tablist: {
          base: "flex text-center",
          variant: {
            underline:
              "w-full -mb-px border-b border-gray-200 dark:border-gray-700",
          },
          tabitem: {
            base: "flex items-center justify-center p-4 rounded-t-lg text-xs font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none",
            variant: {
              underline: {
                base: "rounded-t-lg",
                active: {
                  on: "text-cyan-600 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500",
                  off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
                },
              },
            },
            icon: "mr-2 h-5 w-5",
          },
        },
        tabpanel: "py-3",
      }}
    >
      {tabs?.map((tab) => {
        return (
          <TabItem
            active={tab?.active}
            disabled={tab?.disabled}
            title={tab?.title}
          >
            {tab?.children}
          </TabItem>
        );
      })}
    </Tabs>
  );
}

export default Auxiliary;
