import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  FC,
  RefObject,
} from "react";

// External Libraries
import Moveable, {
  MoveableManagerInterface,
  Renderer,
  OnDragGroup,
  OnResizeGroup,
  OnRotateGroup,
} from "react-moveable";
import Selecto from "react-selecto";
import Guides from "@scena/react-guides";
import classNames from "classnames";
import lodash from "lodash";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";

// Icons
import {
  AlignBottom,
  AlignHorizontally,
  AlignLeft,
  AlignRight,
  AlignTop,
  AlignVertically,
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  Fatrows,
  I3DRotate,
  Layer,
  More,
  SearchZoomIn,
  SearchZoomOut,
  Setting2,
  Trash,
  ArrowRotateLeft,
  ArrowRotateRight,
} from "iconsax-react";

// Internal Logic & State
import AbsManager from "RACT/RACT_absMan";
import AbsMan from "RACT/RACT_absMan"; // Duplicate import in source, kept for compatibility
import { setMode, setSelectedWidget } from "RDUX/env/SpkSlice";

// =================================================================
// --- 1. Types & Interfaces ---
// =================================================================

export interface SplashRef {
  handleAlign: (
    direction: "left" | "h_center" | "right" | "top" | "v_center" | "bottom"
  ) => void;
}

export interface ContextMenuState {
  x: number;
  y: number;
  i: any;
  display: boolean;
  id: string;
}

interface SplashProps {
  geometric: {
    width?: number;
    height?: number;
  };
  logic: {
    data: any;
    minimal?: boolean;
    isProduction?: boolean;
    schema?: AbsManager;
    setSchema?: Dispatch<SetStateAction<AbsManager>>;
    onDrop?: (layout: any, item: any, event: any) => void;
    onDragStop?: (layout: any, oldItem: any, newItem: any) => void;
    onResizeStop?: (layout: any, oldItem: any, newItem: any) => void;
    onDimensionChange?: (dim: "width" | "height", value: number) => void;
  };
  style: {
    containerPadding?: [number, number];
  };
}

// =================================================================
// --- 2. Moveable Ables (Custom Controls) ---
// =================================================================

export const DimensionViewable = {
  name: "dimensionViewable",
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();

    return (
      <div
        key={"dimension-viewer"}
        className={"moveable-dimension"}
        style={{
          position: "absolute",
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          background: "#4af",
          borderRadius: "2px",
          padding: "2px 4px",
          color: "white",
          fontSize: "13px",
          whiteSpace: "nowrap",
          fontWeight: "bold",
          willChange: "transform",
          transform: `translate(-50%, 0px)`,
        }}
      >
        {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
      </div>
    );
  },
} as const;

export const ActionControls = {
  name: "actionControls",
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    const { pos2 } = moveable.state;

    // Retrieve callbacks
    const {
      onSettings,
      onDuplicate,
      onDelete,
      onBringToFront,
      onSendToBack,
      onUngroup,
      onGroup,
      onToggleHide,
      isGroup,
    } = moveable.props;

    return (
      <div className="flex gap-2">
        {/* Single Item Controls */}
        <div
          key={"editable-viewer"}
          className={
            "moveable-editable flex flex-col gap-1 items-center justify-center"
          }
          style={{
            transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
          }}
        >
          <button
            className="bg-[#4af] text-white p-1 rounded-md"
            onClick={onSettings}
            title="Settings"
          >
            <Setting2 size={20} color="currentColor" />
          </button>
          <button
            className="bg-[#4af] text-white p-1 rounded-md"
            onClick={onDuplicate}
            title="Duplicate"
          >
            <Copy size={20} color="currentColor" />
          </button>
          <button
            className="bg-[#4af] text-white p-1 rounded-md"
            onClick={onDelete}
            title="Delete"
          >
            <Trash size={20} color="currentColor" />
          </button>
          <button
            className="bg-[#4af] text-white p-1 rounded-md"
            onClick={onToggleHide}
            title="Toggle Visibility"
          >
            <Eye size={20} color="currentColor" />
          </button>
        </div>

        {/* Group/Layering Controls */}
        <div
          key={"editable-viewer-2"}
          className={
            "moveable-editable flex flex-col gap-1 items-center justify-center"
          }
          style={{
            transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
          }}
        >
          {isGroup && (
            <>
              <button
                className="bg-[#4af] text-white p-1 rounded-md"
                onClick={onGroup}
                title="Group Items"
              >
                <Layer size={20} color="currentColor" />
              </button>
              <button
                className="bg-[#4af] text-white p-1 rounded-md"
                onClick={onUngroup}
                title="Ungroup"
              >
                <Fatrows size={20} color="currentColor" />
              </button>
            </>
          )}
          <button
            className="bg-[#4af] text-white p-1 rounded-md"
            onClick={onBringToFront}
            title="Bring to Front"
          >
            <ArrowUp size={20} color="currentColor" />
          </button>
          <button
            className="bg-[#4af] text-white p-1 rounded-md"
            onClick={onSendToBack}
            title="Send to Back"
          >
            <ArrowDown size={20} color="currentColor" />
          </button>
        </div>
      </div>
    );
  },
} as const;

// =================================================================
// --- 3. Dynamic Renderer (Render.tsx) ---
// =================================================================

// 1. Use glob to get all files.
const rcmpModules = import.meta.glob("../../COMP/**/*.{tsx,jsx,ts,js}");
const widgModules = import.meta.glob("../../WIDG/**/*.{tsx,jsx,ts,js}");

/**
 * Helper to check if a value is undefined or an empty object.
 */
const isMissingOrEmptyObject = (val: any): boolean => {
  if (val === undefined) {
    return true;
  }
  if (
    typeof val === "object" &&
    val !== null &&
    Object.keys(val).length === 1
  ) {
    return true;
  }
  return false;
};

function Render(props: any) {
  //@ts-ignore
  const { path, geometric, logic, style, type } = props;
  const [DynamicComponent, setDynamicComponent] = useState<any>(null);

  useEffect(() => {
    if (!path) {
      setDynamicComponent(null);
      return;
    }

    setDynamicComponent(null);

    const loadComponent = async () => {
      try {
        const modules = type === "component" ? rcmpModules : widgModules;
        const targetName = path;

        // Flexible Finder
        const fullPath = Object.keys(modules).find((key) => {
          const normalizedKey = key.replace(/\\/g, "/");
          return (
            normalizedKey.includes(`/${targetName}.`) ||
            normalizedKey.includes(`/${targetName}/index.`)
          );
        });

        if (!fullPath || !modules[fullPath]) {
          console.error(`Available Modules in ${type}:`, Object.keys(modules));
          throw new Error(`Could not find module matching: ${targetName}`);
        }

        const module: any = await modules[fullPath]();
        const Component = module?.default;
        const defaultLogic = module?.defaultLogic;
        setDynamicComponent({ Component, defaultLogic });
      } catch (error) {
        console.error("Error loading dynamic component:", error);
      }
    };

    loadComponent();
  }, [path, type]);

  if (!DynamicComponent || !DynamicComponent.Component) {
    return null;
  }

  const useDefaultLogic = isMissingOrEmptyObject(logic);
  const finalLogic = useDefaultLogic ? DynamicComponent.defaultLogic : logic;

  //@ts-ignore
  return (
    <DynamicComponent.Component {...{ geometric, logic: finalLogic, style }} />
  );
}

// =================================================================
// --- 4. Sub-Components (Guides, Context Menu, Toolbar) ---
// =================================================================

// --- Guides ---
interface SplashGuidesHProps {
  isDev: boolean;
  guidesRefH: RefObject<Guides | null>;
}
function SplashGuidesH({ isDev, guidesRefH }: SplashGuidesHProps) {
  if (!isDev) return null;
  return (
    <Guides
      ref={guidesRefH}
      type="horizontal"
      backgroundColor="#000"
      lineColor="#ddd"
      textColor="#fff"
      height={35}
    />
  );
}

interface SplashGuidesVProps {
  isDev: boolean;
  guidesRefV: RefObject<Guides | null>;
}
function SplashGuidesV({ isDev, guidesRefV }: SplashGuidesVProps) {
  if (!isDev) return null;
  return (
    <Guides
      ref={guidesRefV}
      style={{ width: "35px" }}
      type="vertical"
      backgroundColor="#000"
      lineColor="#ddd"
      textColor="#fff"
    />
  );
}

// --- Context Menu ---
interface SplashContextMenuProps {
  isDev: boolean;
  minimal: boolean;
  context: ContextMenuState;
  dispatch: Dispatch<any>;
  setContext: Dispatch<SetStateAction<ContextMenuState>>;
  duplicate: () => void;
  deleteItem: () => void;
  bringToFront: () => void;
  sendToBack: () => void;
  toggleHide: () => void;
  handleGroup: () => void;
  handleUngroup: () => void;
  hasMultipleTargets: boolean;
}
function SplashContextMenu({
  isDev,
  minimal,
  context,
  dispatch,
  setContext,
  duplicate,
  deleteItem,
  bringToFront,
  sendToBack,
  toggleHide,
  handleGroup,
  handleUngroup,
  hasMultipleTargets,
}: SplashContextMenuProps) {
  if (!isDev) return null;

  return (
    <div
      className={`${
        minimal ? "z-[99999]" : "z-[9999999]"
      } bg-white divide-y divide-gray-100 rounded-lg shadow w-fit fixed`}
      style={{
        display: context.display ? "block" : "none",
        top: context.y,
        left: context.x,
      }}
    >
      <ul className="py-2 text-sm text-gray-700">
        <li>
          <button
            className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
            onClick={() => {
              dispatch(setSelectedWidget(context.i as any));
              setContext({
                x: 0,
                y: 0,
                i: null,
                display: false,
                id: "",
              });
            }}
          >
            <Setting2 size={24} color="currentColor" />
            <span>Settings</span>
          </button>
        </li>
        <li>
          <button
            onClick={duplicate}
            className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
          >
            <Copy size={24} color="currentColor" />
            <span>Duplicate</span>
          </button>
        </li>
        <li>
          <button
            onClick={deleteItem}
            className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
          >
            <Trash size={24} color="currentColor" />
            <span>Delete</span>
          </button>
        </li>
        <li>
          <button
            onClick={bringToFront}
            className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
          >
            <ArrowUp size={24} color="currentColor" />
            <span>Bring to Front</span>
          </button>
        </li>
        <li>
          <button
            onClick={sendToBack}
            className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
          >
            <ArrowDown size={24} color="currentColor" />
            <span>Send to Back</span>
          </button>
        </li>
        {hasMultipleTargets && (
          <li>
            <button
              onClick={handleGroup}
              className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
            >
              <Layer size={24} color="currentColor" />
              <span>Group Items</span>
            </button>
          </li>
        )}
        <li>
          <button
            onClick={handleUngroup}
            className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
          >
            <Fatrows size={24} color="currentColor" />
            <span>Ungroup</span>
          </button>
        </li>
        <li>
          <button
            onClick={toggleHide}
            className="px-4 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 w-full"
          >
            <Eye size={24} color="currentColor" />
            <span>Toggle Visibility</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

// --- Editor Toolbar ---
interface EditorToolbarProps {
  dimensions: { width: number; height: number };
  onDimensionChange: (dim: "width" | "height", value: number) => void;
  data: any;
  onAlignTrigger: (
    dir: "left" | "h_center" | "right" | "top" | "v_center" | "bottom"
  ) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
const EditorToolbar: FC<EditorToolbarProps> = ({
  dimensions,
  onDimensionChange,
  data,
  onAlignTrigger,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  const dispatch = AbsMan.useAppDispatch();
  const { mood } = AbsMan.useAppSelector((state) => state.spk);

  const handleToggleMode = () => {
    dispatch(setMode(mood === "dev" ? "view" : ("dev" as any)));
  };

  const AlignBtn = ({ icon, onClick, title, disabled }: any) => (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded transition-all active:scale-95 ${
        disabled
          ? "text-gray-300 cursor-not-allowed"
          : "hover:bg-white hover:shadow-sm text-gray-600"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-col border border-b-4 px-3 pt-2 rounded-lg bg-gray-100 mt-2 shadow-lg">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbItem title="id">{data?.object?.id}</BreadcrumbItem>
            <BreadcrumbItem title="group name">
              {data?.object?.group?.id}
            </BreadcrumbItem>
            <BreadcrumbItem title="version">
              {data?.object?.version}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="bg-white border-0 rounded-xl text-sm py-1 w-24"
            value={dimensions.width}
            onChange={(e) => onDimensionChange("width", +e.target.value)}
          />
          <span>x</span>
          <input
            type="number"
            className="bg-white border-0 rounded-xl text-sm py-1 w-24"
            value={dimensions.height}
            onChange={(e) => onDimensionChange("height", +e.target.value)}
          />
          <select className="bg-white border-0 rounded-xl text-sm py-1">
            <option>90%</option>
          </select>
          <SearchZoomIn
            size={24}
            className="cursor-pointer"
            color="currentColor"
          />
          <SearchZoomOut
            size={24}
            className="cursor-pointer"
            color="currentColor"
          />
          <button onClick={handleToggleMode} title="Toggle Dev/View Mode">
            <I3DRotate
              size={24}
              className="cursor-pointer"
              color="currentColor"
            />
          </button>
          <More size={24} className="cursor-pointer" color="currentColor" />
        </div>
      </div>
      <div className="w-full flex justify-end items-center">
        {/* NEW: History Controls */}
        <div className="flex items-center justify-between px-2 py-1.5 gap-1 border-b border-gray-200 border-r mr-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">
            Edit
          </span>
          <div className="flex gap-1">
            <AlignBtn
              icon={<ArrowRotateLeft size={16} color="currentColor" />}
              onClick={onUndo}
              title="Undo (Ctrl+Z)"
              disabled={!canUndo}
            />
            <AlignBtn
              icon={<ArrowRotateRight size={16} color="currentColor" />}
              onClick={onRedo}
              title="Redo (Ctrl+Shift+Z)"
              disabled={!canRedo}
            />
          </div>
        </div>
        {/* Row 1: Horizontal */}
        <div className="flex items-center justify-between px-2 py-1.5 gap-1 border-b border-gray-200">
          <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">
            Horz
          </span>
          <div className="flex gap-1">
            <AlignBtn
              icon={<AlignLeft size={16} color="currentColor" />}
              onClick={() => onAlignTrigger("left")}
              title="Align Left"
            />
            <AlignBtn
              icon={<AlignHorizontally size={16} color="currentColor" />}
              onClick={() => onAlignTrigger("h_center")}
              title="Align Center (Horizontal)"
            />
            <AlignBtn
              icon={<AlignRight size={16} color="currentColor" />}
              onClick={() => onAlignTrigger("right")}
              title="Align Right"
            />
          </div>
        </div>

        {/* Row 2: Vertical */}
        <div className="flex items-center justify-between px-2 py-1.5 gap-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">
            Vert
          </span>
          <div className="flex gap-1">
            <AlignBtn
              icon={<AlignTop size={16} color="currentColor" />}
              onClick={() => onAlignTrigger("top")}
              title="Align Top"
            />
            <AlignBtn
              icon={<AlignVertically size={16} color="currentColor" />}
              onClick={() => onAlignTrigger("v_center")}
              title="Align Center (Vertical)"
            />
            <AlignBtn
              icon={<AlignBottom size={16} color="currentColor" />}
              onClick={() => onAlignTrigger("bottom")}
              title="Align Bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// --- 5. Selection & Interaction Components ---
// =================================================================

// --- SplashSelecto ---
interface SplashSelectoProps {
  isDev: boolean;
  moveableRef: RefObject<Moveable | null>;
  setTargets: Dispatch<SetStateAction<(HTMLElement | SVGElement)[]>>;
  dispatch: Dispatch<any>;
  processTargets: (elements: (HTMLElement | SVGElement)[]) => any;
}
function SplashSelecto({
  isDev,
  moveableRef,
  setTargets,
  dispatch,
  processTargets,
}: SplashSelectoProps) {
  if (!isDev) return null;

  return (
    <Selecto
      dragContainer={".layout"}
      selectableTargets={[".absolute"]}
      hitRate={0}
      selectByClick={true}
      selectFromInside={false}
      toggleContinueSelect={["shift"]}
      ratio={0}
      onDragStart={(e) => {
        const moveable = moveableRef.current;
        const target = e.inputEvent.target;

        if (
          (moveable && moveable.isMoveableElement(target)) ||
          (e.inputEvent.target as HTMLElement).classList.contains("absolute")
        ) {
          e.stop();
        }
      }}
      onSelectEnd={(e) => {
        const rawSelected = e.selected;
        const formattedTargets = processTargets(rawSelected);
        setTargets(formattedTargets);

        if (rawSelected.length === 1) {
          const firstId = rawSelected[0].getAttribute("data-id");
          if (firstId) dispatch(setSelectedWidget(firstId as any));
        }

        if (e.isDragStart) {
          e.inputEvent.preventDefault();
          setTimeout(() => {
            moveableRef.current?.dragStart(e.inputEvent);
          });
        }
      }}
    />
  );
}

// --- SplashMoveable ---
type MoveableEndHandler = () => void;
type MoveableGroupEndHandler = ({
  targets,
}: {
  targets: (HTMLElement | SVGElement)[];
}) => void;
type ActionHandler = () => void;

interface SplashMoveableProps {
  isDev: boolean;
  moveableRef: RefObject<Moveable | null>;
  selectedWidget: string | null;
  targets: (HTMLElement | SVGElement)[];
  itemRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
  elementGuidelines: HTMLElement[];
  containerRef: RefObject<HTMLDivElement | null>;

  onDragEnd: MoveableEndHandler;
  onResizeEnd: MoveableEndHandler;
  onRotateEnd: MoveableEndHandler;
  onDragGroupEnd: MoveableGroupEndHandler;
  onResizeGroupEnd: MoveableGroupEndHandler;
  onRotateGroupEnd: MoveableGroupEndHandler;

  onSettings: ActionHandler;
  onDuplicate: ActionHandler;
  onDelete: ActionHandler;
  onBringToFront: ActionHandler;
  onSendToBack: ActionHandler;
  onUngroup: ActionHandler;
  onGroup: ActionHandler;
  onToggleHide: ActionHandler;
}

function SplashMoveable({
  isDev,
  moveableRef,
  selectedWidget,
  targets,
  itemRefs,
  elementGuidelines,
  containerRef,
  onDragEnd,
  onResizeEnd,
  onRotateEnd,
  onDragGroupEnd,
  onResizeGroupEnd,
  onRotateGroupEnd,
  onSettings,
  onDuplicate,
  onDelete,
  onBringToFront,
  onSendToBack,
  onUngroup,
  onGroup,
  onToggleHide,
}: SplashMoveableProps) {
  if (!isDev) return null;

  const finalTargets =
    targets.length > 0
      ? targets
      : selectedWidget && itemRefs.current[selectedWidget]
      ? [itemRefs.current[selectedWidget]!]
      : [];

  const isGroup =
    finalTargets.length > 1 ||
    (finalTargets[0] && Array.isArray(finalTargets[0]));

  return (
    <Moveable
      ref={moveableRef}
      target={finalTargets}
      edgeDraggable={false}
      snappable={true}
      snapDirections={{
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true,
      }}
      elementSnapDirections={{
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true,
      }}
      elementGuidelines={elementGuidelines}
      snapGridWidth={10}
      snapGridHeight={10}
      isDisplayGridGuidelines={false}
      verticalGuidelines={[50, 150, 250, 450, 550]}
      horizontalGuidelines={[0, 100, 200, 400, 500]}
      draggable={true}
      resizable={true}
      rotatable={true}
      throttleDrag={1}
      throttleResize={1}
      throttleRotate={1}
      onResize={(e) => {
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
        onResizeEnd();
      }}
      onRotate={(e) => {
        e.target.style.transform = e.drag.transform;
        onRotateEnd();
      }}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
        onDragEnd();
      }}
      onDragGroup={({ events, targets }: OnDragGroup) => {
        events.forEach((ev) => {
          ev.target.style.transform = ev.transform;
        });
        onDragGroupEnd({ targets });
      }}
      onResizeGroup={({ events, targets }: OnResizeGroup) => {
        events.forEach((ev) => {
          ev.target.style.width = `${ev.width}px`;
          ev.target.style.height = `${ev.height}px`;
          ev.target.style.transform = ev.drag.transform;
        });
        onResizeGroupEnd({ targets });
      }}
      onRotateGroup={({ events, targets }: OnRotateGroup) => {
        events.forEach((ev) => {
          ev.target.style.transform = ev.drag.transform;
        });
        onRotateGroupEnd({ targets });
      }}
      startDragRotate={0}
      renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
      rotationPosition={"top"}
      pinchable={true}
      originDraggable={true}
      ables={[DimensionViewable, ActionControls]}
      props={{
        dimensionViewable: true,
        actionControls: true,
        onSettings,
        onDuplicate,
        onDelete,
        onBringToFront,
        onSendToBack,
        onUngroup,
        onGroup,
        onToggleHide,
        isGroup,
      }}
      bounds={{
        left: 0,
        top: 0,
        right: containerRef?.current?.offsetWidth,
        bottom: containerRef?.current?.offsetHeight,
      }}
    />
  );
}

// --- SplashItem ---
interface SplashItemProps {
  itemKey: string;
  WIDG: AbsManager;
  isDev: boolean;
  itemRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
  dispatch: Dispatch<any>;
  onSelect: (id: string, isShift: boolean) => void;
}
function SplashItem({
  itemKey,
  WIDG,
  isDev,
  itemRefs,
  dispatch,
  onSelect,
}: SplashItemProps) {
  const geometric: any = {},
    logic: any = { parentId: WIDG?.getValue?.("Geometric", "i") },
    style: any = {};
    console.log(WIDG)

  for (const packName of Object.keys(WIDG?.NTT ?? {})) {
    if (["meta", "group"].includes(packName)) continue;
    const pack = WIDG.getPack(packName);
    for (const fieldName of Object.keys(pack)) {
      if (fieldName === "meta") continue;
      const field = WIDG.getField(packName, fieldName);
      if (packName === "Geometric") geometric[fieldName] = field?.edit?.value;
      if (packName === "Logic") logic[fieldName] = field?.edit?.value;
      if (packName === "Style") style[fieldName] = field?.edit?.value;
    }
  }
  const isHidden = geometric.isHidden ?? false;

  if (isHidden && !isDev) {
    return null;
  }

  geometric.x = geometric.x ?? 0;
  geometric.y = geometric.y ?? 0;
  geometric.width = geometric.width ?? 100;
  geometric.height = geometric.height ?? 100;
  geometric.rotate = geometric.rotate ?? 0;
  geometric.i = geometric.i ?? logic.parentId;

  let path = null;
  const name: string = lodash.camelCase(WIDG?.getValue?.("Geometric", "name"));
  if (WIDG.type === "component") path = `RCMP_${name}`;
  else path = `RWDG_${name}`;

  return (
    <div
      key={geometric.i}
      ref={(el) => (itemRefs.current[geometric.i] = el) as any}
      data-id={geometric.i}
      className={classNames({
        absolute: true,
        "opacity-10 border border-dotted border-red-500": isHidden,
      })}
      style={{
        width: `${geometric.width}px`,
        height: `${geometric.height}px`,
        transform: `translate(${geometric.x}px, ${geometric.y}px) rotate(${geometric.rotate}deg)`,
        zIndex: geometric.zIndex ?? 1,
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (isDev) {
          onSelect(geometric.i, event.shiftKey);
        }
      }}
    >
      <Render
        {...{
          path,
          WIDG,
          geometric,
          logic,
          style,
          type: WIDG.type,
        }}
      />
    </div>
  );
}

// =================================================================
// --- 6. Main Component (Splash) ---
// =================================================================

const Splash = forwardRef<SplashRef, SplashProps>((props, ref) => {
  const {
    geometric: { width = 600, height = 600 },
    logic: {
      data = null,
      minimal = false,
      isProduction = false,
      schema = new AbsManager(),
      setSchema = () => {},
      onDrop = () => {},
      onDragStop = () => {},
      onResizeStop = () => {},
      onDimensionChange = () => {},
    },
  } = props;

  const dispatch = AbsManager.useAppDispatch();
  const { selectedWidget, mood, pickRequest } = AbsManager.useAppSelector(
    (state) => state.spk
  );

  // --- Refs ---
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const canvasResizerRef = useRef<Moveable>(null);
  const moveableRef = useRef<Moveable>(null);
  const guidesRefH = useRef<Guides>(null);
  const guidesRefV = useRef<Guides>(null);

  const [elementGuidelines, setElementGuidelines] = useState<HTMLElement[]>([]);

  // Selecto Targets State
  const [targets, setTargets] = useState<any>([]);
  const [canvasSize, setCanvasSize] = useState({
    width: typeof width === "number" ? width : 600,
    height: typeof height === "number" ? height : 600,
  });

  // ADD STATE
  const [historyPast, setHistoryPast] = useState<AbsManager[]>([]);
  const [historyFuture, setHistoryFuture] = useState<AbsManager[]>([]);

  // Context Menu State
  const [context, setContext] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    i: null,
    display: false,
    id: "",
  });

  const isDev = isProduction ? !isProduction : mood === "dev";

  // --- Effects ---

  // Cursor Update
  useEffect(() => {
    const splash = canvasRef.current;
    if (!splash) return;
    if (!pickRequest) splash.style.cursor = "default";
    else splash.style.cursor = "help";
  }, [pickRequest, canvasRef]);

  // Update Guidelines when items change
  useEffect(() => {
    if (!itemRefs.current) return;
    const guidelines = Object.values(itemRefs.current).filter(
      (el) => el != null
    ) as HTMLElement[];
    setElementGuidelines(["#canvas-main" as any, ...guidelines]);
  }, [schema]);

  // Init / Schema Change: Refresh Targets based on selection
  useEffect(() => {
    if (selectedWidget) {
      const el = itemRefs.current[selectedWidget];
      if (el) {
        const widgetSchema: AbsManager = searchPackName(selectedWidget) as any;
        const groupId = widgetSchema?.getValue("Geometric", "groupId");

        if (groupId) {
          const peers: HTMLElement[] = [];
          Object.keys(schema.NTT).forEach((key) => {
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
            const w = schema.getValue(key, "schema");
            if (w?.getValue("Geometric", "groupId") === groupId) {
              const domEl = itemRefs.current[w.getValue("Geometric", "i")];
              if (domEl) peers.push(domEl);
            }
          });
          setTargets([peers]);
        } else {
          setTargets([el]);
        }
      }
    }
  }, [selectedWidget, schema]);

  useImperativeHandle(ref, () => ({
    handleAlign: (dir) => handleAlign(dir),
  }));

  // --- Helper Functions ---

  const addToHistory = () => {
    // Save current schema to past before making a change
    // We use cloneDeep to ensure we store a snapshot, not a reference
    setHistoryPast((prev) => [...prev, lodash.cloneDeep(schema)]);
    // Clear future because we branched off a new timeline
    setHistoryFuture([]);
  };

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;

    const previous = historyPast[historyPast.length - 1];
    const newPast = historyPast.slice(0, -1);

    // Push current to future
    setHistoryFuture((prev) => [lodash.cloneDeep(schema), ...prev]);

    // Set current to previous
    setSchema(previous);
    setHistoryPast(newPast);

    // Clear selection to avoid errors with missing IDs
    dispatch(setSelectedWidget(null as any));
    setTargets([]);
  }, [historyPast, schema, dispatch]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;

    const next = historyFuture[0];
    const newFuture = historyFuture.slice(1);

    // Push current to past
    setHistoryPast((prev) => [...prev, lodash.cloneDeep(schema)]);

    // Set current to next
    setSchema(next);
    setHistoryFuture(newFuture);

    dispatch(setSelectedWidget(null as any));
    setTargets([]);
  }, [historyFuture, schema, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl (or Cmd on Mac)
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z" || e.key === "Z") {
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  const handleAlign = (
    direction: "left" | "h_center" | "right" | "top" | "v_center" | "bottom"
  ) => {
    let activeIds: string[] = [];
    if (targets.length > 0) {
      const flatTargets = targets.flat() as HTMLElement[];
      activeIds = flatTargets
        .map((el) => el.getAttribute("data-id"))
        .filter(Boolean) as string[];
    } else if (selectedWidget) {
      activeIds = resolveTargetIds(selectedWidget);
    }

    if (activeIds.length === 0) return;

    addToHistory();

    const cloneSchm = lodash.cloneDeep(schema);
    const itemsToAlign: any[] = [];

    activeIds.forEach((id) => {
      const packName = Object.keys(cloneSchm.NTT).find((key) => {
        try {
          return (
            cloneSchm.getValue(key, "schema")?.getValue("Geometric", "i") == id
          );
        } catch (e) {
          return false;
        }
      });
      if (packName) {
        const widget = cloneSchm.getValue(packName, "schema");
        const tray = widget.getPack("Geometric");
        itemsToAlign.push({
          widget,
          x: tray.x.edit.value || 0,
          y: tray.y.edit.value || 0,
          width: tray.width.edit.value || 0,
          height: tray.height.edit.value || 0,
        });
      }
    });

    let bounds = {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      width: 0,
      height: 0,
      midX: 0,
      midY: 0,
    };

    if (itemsToAlign.length > 1) {
      bounds.minX = Math.min(...itemsToAlign.map((i) => i.x));
      bounds.minY = Math.min(...itemsToAlign.map((i) => i.y));
      bounds.maxX = Math.max(...itemsToAlign.map((i) => i.x + i.width));
      bounds.maxY = Math.max(...itemsToAlign.map((i) => i.y + i.height));
    } else {
      bounds.minX = 0;
      bounds.minY = 0;
      bounds.maxX = canvasSize.width;
      bounds.maxY = canvasSize.height;
    }

    bounds.width = bounds.maxX - bounds.minX;
    bounds.height = bounds.maxY - bounds.minY;
    bounds.midX = bounds.minX + bounds.width / 2;
    bounds.midY = bounds.minY + bounds.height / 2;

    itemsToAlign.forEach((item) => {
      switch (direction) {
        case "left":
          item.widget.value("Geometric", "x", bounds.minX);
          break;
        case "h_center":
          item.widget.value("Geometric", "x", bounds.midX - item.width / 2);
          break;
        case "right":
          item.widget.value("Geometric", "x", bounds.maxX - item.width);
          break;
        case "top":
          item.widget.value("Geometric", "y", bounds.minY);
          break;
        case "v_center":
          item.widget.value("Geometric", "y", bounds.midY - item.height / 2);
          break;
        case "bottom":
          item.widget.value("Geometric", "y", bounds.maxY - item.height);
          break;
      }
    });

    setSchema(cloneSchm);
    setTimeout(() => {
      moveableRef.current?.updateRect();
    }, 0);
  };

  const getActiveActionId = () => {
    if (selectedWidget) return selectedWidget;
    if (targets.length > 0 && !Array.isArray(targets[0])) {
      return targets[0].getAttribute("data-id");
    }
    if (targets.length > 0 && Array.isArray(targets[0])) {
      return targets[0][0].getAttribute("data-id");
    }
    return null;
  };

  const searchPackName = useCallback(
    (i: any, returnPackName = false): AbsManager | string | undefined => {
      if (!schema || !schema.NTT) return undefined;

      const packName: any = Object.keys(schema.NTT).find((packName: any) => {
        if (
          [
            "meta",
            "para",
            "Geometric",
            "Logic",
            "Style",
            "Dimensions",
            "Tray",
          ].includes(packName)
        )
          return false;

        try {
          const widgetSchm: AbsManager = schema.getValue(packName, "schema");
          return widgetSchm?.getValue("Geometric", "i") == i;
        } catch (e) {
          return false;
        }
      });

      if (!packName) return undefined;
      if (returnPackName) return packName;

      return schema.getValue(packName, "schema");
    },
    [schema]
  );

  const calcCordinates = useCallback(() => {
    const groups = Object.keys(schema?.NTT ?? {}).filter((val: any) =>
      val.includes("Group")
    );
    const coordinates: any = {};
    groups.forEach((key: any) => {
      try {
        const pack: AbsManager = schema.getValue(key, "schema");
        const tray = pack.getPack("Geometric");
        const i = tray.i.edit.value;
        const x = tray.x.edit.value;
        const y = tray.y.edit.value;
        const width = tray.width.edit.value;
        const height = tray.height.edit.value;

        coordinates[i] = {
          start: { x: x, y: y },
          end: { x: x + width, y: y + height },
        };
      } catch (e) {
        console.warn("Error calculating coords", e);
      }
    });
    return coordinates;
  }, [schema]);

  const processTargets = useCallback(
    (elements: (HTMLElement | SVGElement)[]) => {
      const groups: { [key: string]: (HTMLElement | SVGElement)[] } = {};
      const singles: (HTMLElement | SVGElement)[] = [];

      const uniqueElements = Array.from(new Set(elements.filter(Boolean)));

      uniqueElements.forEach((el) => {
        const id = el.getAttribute("data-id");
        if (!id) return;

        const widgetSchema: AbsManager = searchPackName(id) as any;
        const groupId = widgetSchema?.getValue("Tray", "groupId");

        if (groupId) {
          if (!groups[groupId]) {
            groups[groupId] = [];
          }
          if (!groups[groupId].includes(el)) {
            groups[groupId].push(el);
          }
        } else {
          singles.push(el);
        }
      });

      return [...Object.values(groups), ...singles];
    },
    [schema, searchPackName]
  );

  const resolveTargetIds = (initialId: string): string[] => {
    const initialSchema = searchPackName(initialId) as AbsManager;
    if (!initialSchema) return [];

    const groupId = initialSchema.getValue("Geometric", "groupId");

    if (groupId) {
      const groupIds: string[] = [];
      Object.keys(schema.NTT).forEach((key) => {
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

        const w = schema.getValue(key, "schema");
        if (w?.getValue("Geometric", "groupId") === groupId) {
          groupIds.push(w.getValue("Geometric", "i"));
        }
      });
      return groupIds;
    }

    return [initialId];
  };

  const onDropHandler = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!canvasRef.current) return;

    try {
      const info = JSON.parse(event.dataTransfer.getData("application/json"));

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - canvasRect.left;
      const y = event.clientY - canvasRect.top;

      const coordinates: any = calcCordinates();
      let groupId: string | undefined = undefined;

      for (const i of Object.keys(coordinates)) {
        const coordinate = coordinates[i];
        if (
          x >= coordinate.start.x &&
          x <= coordinate.end.x &&
          y >= coordinate.start.y &&
          y <= coordinate.end.y
        ) {
          groupId = i;
        }
      }

      if (groupId && info.name == "Group") return;

      addToHistory();

      const widgetSchema: AbsManager = new AbsManager();
      widgetSchema.unserialize(info?.schema);

      const cloneSchm: AbsManager = lodash.cloneDeep(schema);

      widgetSchema.group = info.group;
      widgetSchema.type = info.type;

      const name = info.name + "_" + Object.keys(cloneSchm?.NTT).length;

      cloneSchm.addPack(name, "body");
      cloneSchm.setPack(name, { title: info.name, description: info.name });
      cloneSchm.addField(name, "schema");
      cloneSchm.setField(name, "schema", {
        title: "schema",
        description: "schema",
      });
      cloneSchm.addDimension(name, "schema", "dpendentNtt", "ntt");

      const oldTray = widgetSchema.getPack("Geometric");
      const width = oldTray?.width?.edit?.value ?? 100;
      const height = oldTray?.height?.edit?.value ?? 100;
      const rotate = oldTray?.rotate?.edit?.value ?? 0;

      widgetSchema.value(
        "Geometric",
        "i",
        `RWDG_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
      );
      widgetSchema.value("Geometric", "x", x);
      widgetSchema.value("Geometric", "y", y);
      widgetSchema.value("Geometric", "width", width);
      widgetSchema.value("Geometric", "height", height);
      widgetSchema.value("Geometric", "rotate", rotate);
      widgetSchema.value("Geometric", "groupId", groupId);

      cloneSchm.value(name, "schema", widgetSchema);

      setSchema(cloneSchm);
      onDrop([], { x, y, width, height }, event);
    } catch (error) {
      console.log(error);
    }
  };

  const commitSchemaChange = (target: HTMLElement | SVGElement) => {
    const id = target.getAttribute("data-id");
    if (!id) return;

    const layoutSchm: any = searchPackName(id);
    if (!layoutSchm) return;

    addToHistory();

    const style = window.getComputedStyle(target as Element);
    const transform = style.transform;
    const width = parseFloat(style.width);
    const height = parseFloat(style.height);

    let x = 0,
      y = 0,
      rotate = 0;

    if (transform !== "none") {
      const matrix = new DOMMatrix(transform);
      x = matrix.m41;
      y = matrix.m42;
      rotate = Math.round(Math.atan2(matrix.m12, matrix.m11) * (180 / Math.PI));
    }

    layoutSchm.value("Geometric", "x", x);
    layoutSchm.value("Geometric", "y", y);
    layoutSchm.value("Geometric", "width", width);
    layoutSchm.value("Geometric", "height", height);
    layoutSchm.value("Geometric", "rotate", rotate);

    setSchema(lodash.cloneDeep(schema));

    onDragStop([], {}, { i: id, ...layoutSchm.getPack("Geometric") });
    onResizeStop([], {}, { i: id, ...layoutSchm.getPack("Geometric") });
  };

  const handleSelect = (clickedId: string, isShift: boolean) => {
    const clickedEl = itemRefs.current[clickedId];
    if (!clickedEl) return;

    const idsToSelect = resolveTargetIds(clickedId);
    const newElements = idsToSelect
      .map((id) => itemRefs.current[id])
      .filter(Boolean) as HTMLElement[];

    let finalFlatList: (HTMLElement | SVGElement)[] = [];

    if (isShift) {
      const currentFlat = targets.flat() as (HTMLElement | SVGElement)[];
      finalFlatList = [...currentFlat, ...newElements];
    } else {
      finalFlatList = newElements;
    }

    setTargets(processTargets(finalFlatList));

    if (!isShift && idsToSelect.length === 1) {
      dispatch(setSelectedWidget(clickedId as any));
    } else {
      dispatch(setSelectedWidget(null as any));
    }
  };

  const handleSingleEnd = () => {
    if (selectedWidget && itemRefs.current[selectedWidget]) {
      commitSchemaChange(itemRefs.current[selectedWidget]!);
    }
  };

  const handleGroupEnd = (targets: (HTMLElement | SVGElement)[]) => {
    targets.forEach((target) => {
      commitSchemaChange(target);
    });
  };

  // --- Context Menu Actions ---

  const deleteItem = () => {
    const id = getActiveActionId();
    if (!id) return;

    addToHistory();

    const idsToDelete = resolveTargetIds(id);
    const cloneSchm = lodash.cloneDeep(schema);

    idsToDelete.forEach((id) => {
      const packName = Object.keys(cloneSchm.NTT).find((key) => {
        try {
          return (
            cloneSchm.getValue(key, "schema")?.getValue("Geometric", "i") == id
          );
        } catch (e) {
          return false;
        }
      });
      if (packName) cloneSchm.removePack(packName);
    });

    setSchema(cloneSchm);
    dispatch(setSelectedWidget(null as any));
    setTargets([]);
  };

  const duplicate = () => {
    const id = getActiveActionId();
    if (!id) return;

    addToHistory();

    const idsToDuplicate = resolveTargetIds(id);
    const cloneSchm = lodash.cloneDeep(schema);

    const newGroupId =
      idsToDuplicate.length > 1
        ? `GRP_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
        : undefined;

    idsToDuplicate.forEach((id) => {
      const originalPackName = Object.keys(cloneSchm.NTT).find((key) => {
        try {
          return (
            cloneSchm.getValue(key, "schema")?.getValue("Geometric", "i") == id
          );
        } catch (e) {
          return false;
        }
      });

      if (!originalPackName) return;

      const originalWidget = cloneSchm.getValue(originalPackName, "schema");
      const serialized = originalWidget.serialize();
      const newWidget = new AbsManager();
      newWidget.unserialize(serialized);

      const newName =
        originalWidget.getValue("Geometric", "name") +
        "_" +
        Date.now() +
        "_" +
        Math.random();
      newWidget.value("Geometric", "i", Math.random().toString());

      const oldX = newWidget.getValue("Geometric", "x") || 0;
      const oldY = newWidget.getValue("Geometric", "y") || 0;
      newWidget.value("Geometric", "x", oldX + 20);
      newWidget.value("Geometric", "y", oldY + 20);
      newWidget.value("Geometric", "isHidden", false);

      newWidget.value("Geometric", "groupId", newGroupId);

      const newPackKey = newName;
      cloneSchm.addPack(newPackKey, "body");
      cloneSchm.setPack(newPackKey, {
        title: newName,
        description: "Duplicate",
      });
      cloneSchm.addField(newPackKey, "schema");
      cloneSchm.value(newPackKey, "schema", newWidget);
    });

    setSchema(cloneSchm);
  };

  const bringToFront = () => {
    const id = getActiveActionId();
    if (!id) return;

    addToHistory();

    const idsToMove = resolveTargetIds(id);
    const cloneSchm = lodash.cloneDeep(schema);

    const zValues: number[] = [];
    Object.keys(cloneSchm.NTT).forEach((key) => {
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
      const z = cloneSchm
        .getValue(key, "schema")
        .getValue("Geometric", "zIndex");
      if (typeof z === "number") zValues.push(z);
    });
    const maxZ = zValues.length > 0 ? Math.max(...zValues) : 0;

    idsToMove.forEach((id, index) => {
      const packName = Object.keys(cloneSchm.NTT).find((key) => {
        try {
          return (
            cloneSchm.getValue(key, "schema")?.getValue("Geometric", "i") == id
          );
        } catch (e) {
          return false;
        }
      });
      if (packName) {
        cloneSchm
          .getValue(packName, "schema")
          .value("Geometric", "zIndex", maxZ + 1 + index);
      }
    });

    setSchema(cloneSchm);
  };

  const sendToBack = () => {
    const id = getActiveActionId();
    if (!id) return;

    addToHistory();

    const idsToMove = resolveTargetIds(id);
    const cloneSchm = lodash.cloneDeep(schema);

    const zValues: number[] = [];
    Object.keys(cloneSchm.NTT).forEach((key) => {
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
      const z = cloneSchm
        .getValue(key, "schema")
        .getValue("Geometric", "zIndex");
      if (typeof z === "number") zValues.push(z);
    });
    const minZ = zValues.length > 0 ? Math.min(...zValues) : 0;

    idsToMove.forEach((id, index) => {
      const packName = Object.keys(cloneSchm.NTT).find((key) => {
        try {
          return (
            cloneSchm.getValue(key, "schema")?.getValue("Geometric", "i") == id
          );
        } catch (e) {
          return false;
        }
      });
      if (packName) {
        cloneSchm
          .getValue(packName, "schema")
          .value("Geometric", "zIndex", minZ - 1 - index);
      }
    });

    setSchema(cloneSchm);
  };

  const toggleHide = () => {
    const id = getActiveActionId();
    if (!id) return;

    addToHistory();

    const idsToToggle = resolveTargetIds(id);
    const cloneSchm = lodash.cloneDeep(schema);

    const clickedPackName = searchPackName(id, true) as string;
    const currentVal = cloneSchm
      .getValue(clickedPackName, "schema")
      .getValue("Geometric", "isHidden");
    const newState = !currentVal;

    idsToToggle.forEach((id) => {
      const packName = Object.keys(cloneSchm.NTT).find((key) => {
        try {
          return (
            cloneSchm.getValue(key, "schema")?.getValue("Geometric", "i") == id
          );
        } catch (e) {
          return false;
        }
      });
      if (packName) {
        cloneSchm
          .getValue(packName, "schema")
          .value("Geometric", "isHidden", newState);
      }
    });

    setSchema(cloneSchm);
  };

  const handleGroup = () => {
    const rawElements = targets.flat() as HTMLElement[];
    if (rawElements.length < 2) return;

    addToHistory();

    const cloneSchm = lodash.cloneDeep(schema);
    const newGroupId = `GRP_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 5)}`;

    rawElements.forEach((target) => {
      const id = target.getAttribute("data-id");
      if (!id) return;
      const packName = searchPackName(id, true) as string;
      if (packName) {
        const widgetSchm = cloneSchm.getValue(packName, "schema");
        widgetSchm.value("Geometric", "groupId", newGroupId);
      }
    });

    setSchema(cloneSchm);
    setTargets([rawElements]);
  };

  const handleUngroup = () => {
    addToHistory();
    const cloneSchm = lodash.cloneDeep(schema);
    const itemsToUngroup = targets.flat() as HTMLElement[];

    itemsToUngroup.forEach((target) => {
      const id = target.getAttribute("data-id");
      if (!id) return;
      const packName = searchPackName(id, true) as string;
      if (packName) {
        const widgetSchm = cloneSchm.getValue(packName, "schema");
        widgetSchm.value("Geometric", "groupId", undefined);
      }
    });

    setSchema(cloneSchm);
    setTargets(itemsToUngroup);
  };

  // --- Render ---
  return (
    <div className="flex flex-col h-auto">
      <EditorToolbar
        data={data}
        dimensions={{ width, height }}
        onDimensionChange={onDimensionChange}
        onAlignTrigger={handleAlign}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyPast.length > 0}
        canRedo={historyFuture.length > 0}
      />
      <div>
        <SplashGuidesH isDev={isDev} guidesRefH={guidesRefH} />
        <div className="flex">
          <SplashGuidesV isDev={isDev} guidesRefV={guidesRefV} />
          <div
            id={!minimal && isDev ? "splash-container" : ""}
            ref={containerRef}
            className={classNames({
              "w-full flex items-center justify-center relative overflow-x-auto":
                true,
              "bg-gray-500 p-16": !minimal && isDev,
            })}
          >
            {/* Context Menu */}
            <SplashContextMenu
              isDev={isDev}
              minimal={minimal}
              context={context}
              dispatch={dispatch}
              setContext={setContext}
              duplicate={duplicate}
              deleteItem={deleteItem}
              bringToFront={bringToFront}
              sendToBack={sendToBack}
              toggleHide={toggleHide}
              handleGroup={handleGroup}
              handleUngroup={handleUngroup}
              hasMultipleTargets={targets.length > 1}
            />

            {/* Main Canvas */}
            <div
              ref={canvasRef}
              id={"canvas-main"}
              className={classNames({
                layout: true, // Class hook for Selecto
                "bg-gray-50": minimal && isDev,
                "bg-white": !minimal && isDev,
                "relative overflow-hidden z-0": true,
              })}
              style={
                typeof width == "number"
                  ? { width: `${width}px`, height: `${height}px` }
                  : {}
              }
              onDrop={onDropHandler}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => {
                // Click on canvas clears selection
                dispatch(setSelectedWidget(null as any));
                setTargets([]);
              }}
            >
              {/* Render Widgets */}
              {Object.keys(schema?.NTT ?? {})?.map((key: string) => {
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
                  return null;

                const WIDG: any = schema.getValue(key, "schema") ?? {};

                return (
                  <SplashItem
                    key={key}
                    itemKey={key}
                    WIDG={WIDG}
                    isDev={isDev}
                    itemRefs={itemRefs}
                    dispatch={dispatch}
                    onSelect={handleSelect}
                  />
                );
              })}

              {/* Selecto (Multi-Select) */}
              <SplashSelecto
                isDev={isDev}
                moveableRef={moveableRef}
                setTargets={setTargets}
                dispatch={dispatch}
                processTargets={processTargets}
              />
            </div>

            {/* CANVAS RESIZER */}
            {isDev && !selectedWidget && targets.length === 0 && (
              <Moveable
                ref={canvasResizerRef}
                target={canvasRef}
                resizable={true}
                renderDirections={["n", "s", "e", "w"]}
                edge={false}
                zoom={1}
                origin={false}
                padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
                onResize={(e) => {
                  e.target.style.width = `${e.width}px`;
                  e.target.style.height = `${e.height}px`;
                  e.target.style.transform = e.drag.transform;
                }}
                onResizeEnd={(e) => {
                  const w = e.lastEvent?.width;
                  const h = e.lastEvent?.height;
                  if (w && h) {
                    setCanvasSize({ width: w, height: h });
                    onDimensionChange("width", w);
                    onDimensionChange("height", h);
                    guidesRefH.current?.resize();
                    guidesRefV.current?.resize();
                  }
                }}
              />
            )}

            {/* Moveable Controls */}
            <SplashMoveable
              isDev={isDev}
              moveableRef={moveableRef}
              selectedWidget={selectedWidget}
              targets={targets}
              itemRefs={itemRefs}
              elementGuidelines={elementGuidelines}
              containerRef={containerRef}
              onDragEnd={() =>
                targets.length ? handleGroupEnd(targets) : handleSingleEnd()
              }
              onResizeEnd={() =>
                targets.length ? handleGroupEnd(targets) : handleSingleEnd()
              }
              onRotateEnd={() =>
                targets.length ? handleGroupEnd(targets) : handleSingleEnd()
              }
              onDragGroupEnd={({ targets }: any) => handleGroupEnd(targets)}
              onResizeGroupEnd={({ targets }: any) => handleGroupEnd(targets)}
              onRotateGroupEnd={({ targets }: any) => handleGroupEnd(targets)}
              onSettings={() => {
                // dispatch(setSelectedWidget(context.i as any));
              }}
              onDuplicate={duplicate}
              onDelete={deleteItem}
              onBringToFront={bringToFront}
              onSendToBack={sendToBack}
              onUngroup={handleUngroup}
              onGroup={handleGroup}
              onToggleHide={toggleHide}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Splash;
