import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  CloseCircle,
  ArrowDown2,
  ArrowUp2,
  Layer,
  Element3,
  FolderOpen,
  More,
  Copy,
  Eye,
  EyeSlash,
  Fatrows,
  ArrowUp,
  ArrowDown,
} from "iconsax-react";
import lodash from "lodash";
import classNames from "classnames";

// --- Local Imports ---
import AbsMan from "RACT/RACT_absMan";
import { setSchema, setSelectedWidget } from "RDUX/env/SpkSlice";

// =================================================================
// --- 1. Type Definitions ---
// =================================================================

interface WidgetNode {
  packKey: string;
  id: string;
  name: string;
  groupId?: string;
  layout?: AbsMan;
  isVirtualGroup?: boolean;
  isHidden?: boolean; // New: Track visibility state
}

interface WidgetListItemProps {
  node: WidgetNode;
  childNodes?: WidgetNode[];
  level: number;
  selectedWidget: string | null;
  openGroups: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (id: string, isGroup: boolean) => void;
  // Actions
  onDelete: (node: WidgetNode) => void;
  onDuplicate: (node: WidgetNode) => void;
  onVisibility: (node: WidgetNode) => void;
  onUngroup: (node: WidgetNode) => void;
  onLayer: (node: WidgetNode, direction: "front" | "back") => void;
}

// =================================================================
// --- 2. UI Component: Single List Item ---
// =================================================================

const WidgetListItem: FC<WidgetListItemProps> = ({
  node,
  childNodes = [],
  level,
  selectedWidget,
  openGroups,
  onToggle,
  onSelect,
  onDelete,
  onDuplicate,
  onVisibility,
  onUngroup,
  onLayer,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isGroup = node.isVirtualGroup || childNodes.length > 0;
  const isOpen = openGroups[node.id] ?? false;
  const isSelected = selectedWidget === node.id;
  const isHidden = node.isHidden;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id, !!isGroup);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div
        onClick={handleRowClick}
        className={classNames(
          "flex items-center justify-between px-3 py-2 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-colors group",
          {
            "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500":
              isSelected,
            "hover:bg-gray-50 dark:hover:bg-gray-700/50 border-l-4 border-l-transparent":
              !isSelected,
            "bg-gray-50 dark:bg-gray-800": isGroup && !isSelected,
            "opacity-50": isHidden, // Visual cue for hidden items
          }
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {/* LEFT SIDE: Icon & Name */}
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          {/* Toggle Icon */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              isGroup && onToggle(node.id);
            }}
            className={classNames("p-1 rounded-md transition-colors", {
              "hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer":
                isGroup,
              "opacity-0 pointer-events-none": !isGroup,
            })}
          >
            {isOpen ? (
              <ArrowUp2 size={14} color="currentColor" />
            ) : (
              <ArrowDown2 size={14} color="currentColor" />
            )}
          </div>

          {/* Type Icon */}
          {isGroup ? (
            <FolderOpen
              size={16}
              className="text-purple-500 flex-shrink-0"
              variant="Bold"
              color="currentColor"
            />
          ) : (
            <Element3
              size={16}
              className="text-gray-500 flex-shrink-0"
              color="currentColor"
            />
          )}

          {/* Label */}
          <span
            className={classNames("text-sm truncate select-none", {
              "font-bold text-gray-800 dark:text-gray-100": isGroup,
              "font-medium text-gray-700 dark:text-gray-200": !isGroup,
            })}
          >
            {node.name}
          </span>

          {isGroup && (
            <span className="text-xs text-gray-400">({childNodes.length})</span>
          )}
        </div>

        {/* RIGHT SIDE: Actions */}
        <div className="flex items-center gap-1">
          {/* Quick Visibility Toggle (Always visible on hover) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVisibility(node);
            }}
            className={`p-1 text-gray-400 hover:text-gray-600 ${
              isHidden ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {isHidden ? (
              <EyeSlash size={16} color="currentColor" />
            ) : (
              <Eye size={16} color="currentColor" />
            )}
          </button>

          {/* Context Menu Trigger */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <More size={16} className="rotate-90" color="currentColor" />
            </button>

            {/* DROPDOWN MENU */}
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 shadow-xl rounded-md border border-gray-100 dark:border-gray-600 z-50 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem
                  icon={<Copy size={16} color="currentColor" />}
                  label="Duplicate"
                  onClick={() => {
                    onDuplicate(node);
                    setShowMenu(false);
                  }}
                />
                <MenuItem
                  icon={
                    isHidden ? (
                      <Eye size={16} color="currentColor" />
                    ) : (
                      <EyeSlash size={16} color="currentColor" />
                    )
                  }
                  label={isHidden ? "Show" : "Hide"}
                  onClick={() => {
                    onVisibility(node);
                    setShowMenu(false);
                  }}
                />

                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />

                <MenuItem
                  icon={<ArrowUp size={16} color="currentColor" />}
                  label="Bring to Front"
                  onClick={() => {
                    onLayer(node, "front");
                    setShowMenu(false);
                  }}
                />
                <MenuItem
                  icon={<ArrowDown size={16} color="currentColor" />}
                  label="Send to Back"
                  onClick={() => {
                    onLayer(node, "back");
                    setShowMenu(false);
                  }}
                />

                {isGroup && (
                  <MenuItem
                    icon={<Fatrows size={16} color="currentColor" />}
                    label="Ungroup"
                    onClick={() => {
                      onUngroup(node);
                      setShowMenu(false);
                    }}
                  />
                )}

                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />

                <MenuItem
                  icon={<CloseCircle size={16} color="currentColor" />}
                  label="Delete"
                  isDanger
                  onClick={() => {
                    onDelete(node);
                    setShowMenu(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Children Rendering */}
      {isGroup && isOpen && (
        <div className="flex flex-col bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-700 ml-4">
          {childNodes.map((child) => (
            <WidgetListItem
              key={child.id}
              node={child}
              childNodes={[]}
              level={level}
              selectedWidget={selectedWidget}
              openGroups={openGroups}
              onToggle={onToggle}
              onSelect={onSelect}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onVisibility={onVisibility}
              onUngroup={onUngroup}
              onLayer={onLayer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Helper for menu items
const MenuItem = ({ icon, label, onClick, isDanger = false }: any) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 ${
      isDanger ? "text-red-500" : "text-gray-700 dark:text-gray-200"
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

// =================================================================
// --- 3. Main Component: WidgetList ---
// =================================================================

const WidgetList: FC = () => {
  const { schema, selectedWidget } = AbsMan.useAppSelector(
    (state) => state.spk
  );
  const dispatch = AbsMan.useAppDispatch();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // --- 1. Process Schema ---
  const { rootNodes, childrenMap } = useMemo(() => {
    const groupMap: Record<string, WidgetNode[]> = {};
    const virtualRoots: Record<string, WidgetNode> = {};
    const standaloneRoots: WidgetNode[] = [];

    if (!schema?.NTT) return { rootNodes: [], childrenMap: {} };

    const reservedKeys = new Set([
      "meta",
      "para",
      "Geometric",
      "Logic",
      "Style",
      "Dimensions",
      "Tray",
    ]);

    Object.keys(schema.NTT).forEach((key) => {
      if (reservedKeys.has(key)) return;
      const layout = schema.getValue(key, "schema");
      if (!layout) return;

      const id = layout.getValue("Geometric", "i");
      if (!id) return;

      const groupId = layout.getValue("Geometric", "groupId");
      const name =
        layout.getValue("Geometric", "name") || layout.NTT?.meta?.id || key;
      const isHidden = layout.getValue("Geometric", "isHidden") || false;

      const node: WidgetNode = {
        packKey: key,
        id,
        name,
        groupId,
        layout,
        isHidden,
      };

      if (groupId) {
        if (!groupMap[groupId]) groupMap[groupId] = [];
        groupMap[groupId].push(node);

        if (!virtualRoots[groupId]) {
          virtualRoots[groupId] = {
            packKey: groupId,
            id: groupId,
            name: "Group",
            isVirtualGroup: true,
            isHidden: false, // Virtual group visibility could be derived if needed
          };
        }
      } else {
        standaloneRoots.push(node);
      }
    });

    return {
      rootNodes: [...Object.values(virtualRoots), ...standaloneRoots],
      childrenMap: groupMap,
    };
  }, [schema]);

  // --- 2. Action Logic Helpers ---

  const getTargetNodes = useCallback(
    (node: WidgetNode) => {
      // If virtual group, return all children. If single node, return array of self.
      if (node.isVirtualGroup) {
        return childrenMap[node.id] || [];
      }
      return [node];
    },
    [childrenMap]
  );

  const commitUpdates = useCallback(
    (newSchema: AbsMan) => {
      dispatch(setSchema(newSchema as any));
    },
    [dispatch]
  );

  // --- 3. Handlers ---

  const handleSelect = useCallback(
    (id: string, isVirtualGroup: boolean) => {
      if (isVirtualGroup && childrenMap[id]?.length > 0) {
        dispatch(setSelectedWidget(childrenMap[id][0].id as any));
      } else if (!isVirtualGroup) {
        dispatch(setSelectedWidget(id as any));
      }
    },
    [selectedWidget, dispatch, childrenMap]
  );

  const handleToggle = useCallback((id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // --- DELETE ---
  const handleDelete = useCallback(
    (node: WidgetNode) => {
      if (!schema) return;
      const newSchema = lodash.cloneDeep(schema);
      const targets = getTargetNodes(node);

      targets.forEach((t) => newSchema.removePack(t.packKey));
      commitUpdates(newSchema);
      dispatch(setSelectedWidget(null as any));
    },
    [schema, getTargetNodes, commitUpdates]
  );

  // --- VISIBILITY ---
  const handleVisibility = useCallback(
    (node: WidgetNode) => {
      if (!schema) return;
      const newSchema = lodash.cloneDeep(schema);
      const targets = getTargetNodes(node);

      // Toggle based on the first item's state (if group) or self
      const currentState = node.isVirtualGroup
        ? targets[0]?.isHidden
        : node.isHidden;

      const newState = !currentState;

      targets.forEach((t) => {
        const widget = newSchema.getValue(t.packKey, "schema");
        widget.value("Geometric", "isHidden", newState);
      });

      commitUpdates(newSchema);
    },
    [schema, getTargetNodes, commitUpdates]
  );

  // --- DUPLICATE ---
  const handleDuplicate = useCallback(
    (node: WidgetNode) => {
      if (!schema) return;
      const newSchema = lodash.cloneDeep(schema);
      const targets = getTargetNodes(node);

      // If duplicating a group, generate a NEW group ID
      const newGroupId = node.isVirtualGroup
        ? `GROUP_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
        : undefined;

      targets.forEach((t) => {
        const originalWidget = newSchema.getValue(t.packKey, "schema");
        const serialized = originalWidget.serialize();

        const newWidget = new AbsMan();
        newWidget.unserialize(serialized);

        // Update ID and Position
        const newName = originalWidget.getValue("Geometric", "name") + "_copy";
        newWidget.value("Geometric", "i", Math.random().toString());
        newWidget.value(
          "Geometric",
          "x",
          (newWidget.getValue("Geometric", "x") || 0) + 20
        );
        newWidget.value(
          "Geometric",
          "y",
          (newWidget.getValue("Geometric", "y") || 0) + 20
        );
        newWidget.value("Geometric", "groupId", newGroupId); // Assign new group (or undefined)

        // Add to schema
        const newPackKey = newName + "_" + Date.now();
        newSchema.addPack(newPackKey, "body");
        newSchema.setPack(newPackKey, {
          title: newName,
          description: "Duplicate",
        });
        newSchema.addField(newPackKey, "schema");
        newSchema.value(newPackKey, "schema", newWidget);
      });

      commitUpdates(newSchema);
    },
    [schema, getTargetNodes, commitUpdates]
  );

  // --- UNGROUP ---
  const handleUngroup = useCallback(
    (node: WidgetNode) => {
      if (!node.isVirtualGroup || !schema) return;
      const newSchema = lodash.cloneDeep(schema);
      const targets = getTargetNodes(node);

      targets.forEach((t) => {
        const widget = newSchema.getValue(t.packKey, "schema");
        widget.value("Geometric", "groupId", undefined); // Remove group ID
      });

      commitUpdates(newSchema);
    },
    [schema, getTargetNodes, commitUpdates]
  );

  // --- LAYERING (Front/Back) ---
  const handleLayer = useCallback(
    (node: WidgetNode, direction: "front" | "back") => {
      if (!schema) return;
      const newSchema = lodash.cloneDeep(schema);
      const targets = getTargetNodes(node);

      // 1. Calculate min/max Z
      const zValues: number[] = [];
      Object.keys(newSchema.NTT).forEach((key) => {
        if (
          [
            "meta",
            "para",
            "Geometric",
            "Logic",
            "Style",
            "Dimensions",
            "Tray",
          ].includes(key)
        )
          return;
        const z = newSchema
          .getValue(key, "schema")
          .getValue("Geometric", "zIndex");
        if (typeof z === "number") zValues.push(z);
      });

      const maxZ = zValues.length > 0 ? Math.max(...zValues) : 0;
      const minZ = zValues.length > 0 ? Math.min(...zValues) : 0;

      targets.forEach((t, index) => {
        const widget = newSchema.getValue(t.packKey, "schema");
        if (direction === "front") {
          widget.value("Geometric", "zIndex", maxZ + 1 + index);
        } else {
          widget.value("Geometric", "zIndex", minZ - 1 - index);
        }
      });

      commitUpdates(newSchema);
    },
    [schema, getTargetNodes, commitUpdates]
  );

  // --- Render ---

  if (rootNodes.length === 0) {
    return (
      <div className="px-5 py-8 flex flex-col items-center justify-center w-full text-gray-400 gap-2">
        <Layer
          size={32}
          variant="Bulk"
          className="opacity-50"
          color="currentColor"
        />
        <span className="text-sm">No Layers Found</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex flex-col border-t border-gray-200 dark:border-gray-700">
        {rootNodes.map((node) => (
          <WidgetListItem
            key={node.id}
            node={node}
            childNodes={childrenMap[node.id]}
            level={0}
            selectedWidget={selectedWidget}
            openGroups={openGroups}
            onToggle={handleToggle}
            onSelect={handleSelect}
            // Pass Actions
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onVisibility={handleVisibility}
            onUngroup={handleUngroup}
            onLayer={handleLayer}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetList;
