import { FC, useMemo } from "react";
import * as Icons from "iconsax-react";
import { useGetActionQuery } from "RDUX/env/PlugSlice";
import Spinner from "WIDG/RWDG_spinner";
import queryData from "BNDL/CANV/CANV_compMngt/WRPR_desk/data/wdgtRegCtrl.json";

// =================================================================
// --- 1. Type Definitions & Interfaces ---
// =================================================================

interface GroupItem {
  _id: string;
  title: string;
}

interface WidgetItem {
  _id: string;
  title: string;
  compileCode: string;
  id: string;
  schema: string;
  group: GroupItem;
  // You can add an 'icon' property here to make icons dynamic
  icon?: keyof typeof Icons;
}

interface GroupedWidgets {
  [groupTitle: string]: WidgetItem[];
}

// =================================================================
// --- 2. Custom Hook for Data Management ---
// =================================================================

const useWidgetTrayData = () => {
  // Memoize the data transformation (grouping)
  const groupedWidgets = useMemo<GroupedWidgets>(() => {
    if (!queryData?.object?.data) return {};

    // Use reduce for a clean and efficient way to group the widgets
    return queryData.object.data.reduce((acc: any, widget: any) => {
      const groupTitle = widget.group?.title || "Uncategorized";
      if (!acc[groupTitle]) {
        acc[groupTitle] = [];
      }
      acc[groupTitle].push(widget);
      return acc;
    }, {} as GroupedWidgets);
  }, [queryData]);

  return { groupedWidgets, isLoading: false, error: null };
};

// =================================================================
// --- 3. Separated UI Components ---
// =================================================================

/**
 * Renders a single draggable widget icon and its name.
 */
const DraggableWidget: FC<{ widget: WidgetItem }> = ({ widget }) => {
  // Dynamically select an icon, defaulting to 'Box'
  const IconComponent = Icons[widget.icon || "Box"] || Icons.Box;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const dragData = {
      group: widget.group?.title,
      name: widget.id,
      schema: widget.schema,
      type: "widget",
    };
    e.dataTransfer.setData("application/json", JSON.stringify(dragData));
    e.dataTransfer.setData("text/plain", "");
  };

  return (
    <div
      title={widget.title}
      draggable={true}
      onDragStart={handleDragStart}
      className="flex flex-col items-center justify-center gap-2 cursor-grab"
    >
      <IconComponent
        color="currentColor"
        size={28}
        className="border p-1.5 w-10 h-10 rounded-lg bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
      />
      <span className="text-xs truncate w-16 text-center">{widget.title}</span>
    </div>
  );
};

/**
 * Renders a full section for a group of widgets.
 */
const WidgetGroup: FC<{ title: string; widgets: WidgetItem[] }> = ({
  title,
  widgets,
}) => (
  <div className="pb-2">
    <div className="flex items-center justify-between gap-2 mt-2">
      <h3 className="text-sm font-bold whitespace-nowrap text-gray-800 dark:text-white">
        {title}
      </h3>
      <div className="w-full h-px bg-gray-300 dark:bg-gray-700" />
      <Icons.ArrowDown2
        size={20}
        color="currentColor"
        className="text-gray-500"
      />
    </div>
    <div className="flex flex-wrap gap-5 mt-3 justify-start items-start">
      {widgets.map((widget) => (
        <DraggableWidget key={widget._id} widget={widget} />
      ))}
    </div>
  </div>
);

// =================================================================
// --- 4. Main Orchestrator Component ---
// =================================================================

const Tray: FC = () => {
  const { groupedWidgets, isLoading, error } = useWidgetTrayData();
  const groupTitles = Object.keys(groupedWidgets);

  if (isLoading) {
    return (
      <div className="p-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load widgets.</div>;
  }

  if (groupTitles.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No released widgets found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      {groupTitles.map((title) => (
        <WidgetGroup
          key={title}
          title={title}
          widgets={groupedWidgets[title]}
        />
      ))}
    </div>
  );
};

export default Tray;
