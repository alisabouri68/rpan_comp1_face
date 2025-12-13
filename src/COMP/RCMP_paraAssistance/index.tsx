import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  TabItem,
  Tabs,
  Modal,
  Button,
  TextInput,
  Select,
  ToggleSwitch,
  Label,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Radio,
} from "flowbite-react";
import { Add, HambergerMenu } from "iconsax-react";
import lodash from "lodash";

// --- Local Imports ---
import AbsManager from "RACT/RACT_absMan";
import ParaWidget from "COMP/index";
import DimeClass from "RACT/RACT_absMan/template/dimensions";
import classNames from "classnames";

// =================================================================
// --- 1. Type Definitions & Interfaces ---
// =================================================================

type WidgetTab = "Meta" | "Geometric" | "Logic" | "Style";
const TABS: WidgetTab[] = ["Meta", "Geometric", "Logic", "Style"];

interface WidgetConfig {
  title?: string;
  mood?: "assign" | "config";
  border?: boolean;
  draggable?: boolean;
  addable?: boolean;
}

interface AddParamValues {
  name: string;
  className: string;
  dimension: string;
}

interface AddParamValues {
  name: string;
  className: string;
  dimension: string;
}

interface SettingsPanelProps {
  iswidget: Boolean;
  config: WidgetConfig;
  onConfigChange: (newConfig: WidgetConfig) => void;
}

interface AddParameterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddParam: (param: AddParamValues) => void;
}

const INITIAL_PARAMS: AddParamValues = {
  name: "",
  className: "single",
  dimension: "string",
};

// =================================================================
// --- 2. Custom Hook for Schema Management ---
// =================================================================
/**
 *
 * @param schema
 * @param value
 * @returns
 */
export const findSchema: any = (
  schema: AbsManager,
  isWidget: Boolean,
  selectedWidget: String | null = null,
  value = null
) => {
  if (isWidget) return schema;
  else if (!isWidget && !selectedWidget) return null;
  else {
    for (const key of Object.keys(schema?.NTT)) {
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
        continue;

      const schemaField: AbsManager | undefined = schema.getValue(
        key,
        "schema"
      );

      if (schemaField) {
        if (schemaField.getValue("Geometric", "i") == selectedWidget) {
          if (value) schema.value(key, "schema", value);
          else return schemaField;
        } else {
          const logicBody: AbsManager | undefined = schemaField.getValue(
            "Logic",
            "body"
          );

          if (!logicBody) continue;

          return findSchema(logicBody, isWidget);
        }
      }

      const bodyField: AbsManager | undefined = schema.getValue(key, "body");

      if (bodyField) return findSchema(bodyField, isWidget);
    }
  }

  return schema;
};
const useWidgetSchema = (
  isWidget: boolean,
  schema: AbsManager,
  selectedWidget: String | null,
  setSchema: any
) => {
  // --- Step 1: Treat `activeSchema` as derived state using useMemo ---
  // No need for useState and useEffect to keep this in sync.
  const activeSchema = useMemo(() => {
    if (!schema) return null;
    return findSchema(schema, isWidget, selectedWidget);
  }, [schema, selectedWidget, isWidget]);

  // --- Step 2: Treat `config` as derived state as well ---
  // This value is always calculated fresh when `activeSchema` changes.
  const config: WidgetConfig | null = useMemo(() => {
    if (!activeSchema) return null;
    const paraConfig = activeSchema.NTT?.para ?? {};
    const newConfig: any = {};
    Object.keys(paraConfig).forEach((key) => {
      if (key !== "meta") {
        newConfig[key] = paraConfig[key].edit.value;
      }
    });
    return newConfig;
  }, [activeSchema]);

  // --- Step 3: Redefine the update handler ---
  // This function, passed as `setConfig`, now directly dispatches the update,
  // creating a clean, one-way data flow.
  const handleConfigChange = useCallback(
    (newConfig: WidgetConfig) => {
      if (!activeSchema) return;

      const newSchema = lodash.cloneDeep(activeSchema);

      for (const [key, value] of Object.entries(newConfig)) {
        // Ensure the property exists before attempting to set it
        if (newSchema.NTT.para[key] !== undefined) {
          newSchema.value("para", key, value);
        }
      }

      // Dispatch the update to the single source of truth (Redux)
      setSchema(newSchema as any);
    },
    [activeSchema]
  );

  // This function remains for other types of schema updates
  const updateSchema = (newActiveSchema: AbsManager) => {
    setSchema(newActiveSchema as any);
  };

  // The public API of the hook remains the same!
  return { activeSchema, config, setConfig: handleConfigChange, updateSchema };
};

// =================================================================
// --- 3. Separated UI Components ---
// =================================================================

/**
 * A handy hook to detect clicks outside of a specified element.
 * @param ref The React ref of the element to monitor.
 * @param callback The function to call when a click outside is detected.
 */
const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

const SettingsPanel: FC<SettingsPanelProps> = ({
  iswidget,
  config,
  onConfigChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to close the panel when clicking outside
  useClickOutside(panelRef as any, () => setIsOpen(false));

  const handleFieldChange = (field: keyof WidgetConfig, value: any) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <span className="h-px w-3/12 bg-gray-300" />
      <span className="w-5/12 text-center font-semibold text-gray-700">
        {config.title ?? "Widget Settings"}
      </span>
      <span className="h-px w-3/12 bg-gray-300" />
      {iswidget && (
        <div className="w-1/12 relative" ref={panelRef}>
          <HambergerMenu
            onClick={() => setIsOpen(!isOpen)}
            className="w-full cursor-pointer text-gray-600 hover:text-blue-600"
            size={23}
            color="currentColor"
          />
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 border shadow-lg rounded-lg w-72 bg-white flex flex-col gap-4 p-4 z-20">
              {/* Title Input */}
              <div>
                <Label htmlFor="title-input" className="mb-2 font-semibold">
                  Title:
                </Label>
                <TextInput
                  id="title-input"
                  sizing="sm"
                  value={config.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                />
              </div>

              {/* Mood Radio Group */}
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 font-semibold">Mood:</legend>
                <div className="flex items-center gap-2">
                  <Radio
                    id="mood-assign"
                    name="mood"
                    value="assign"
                    checked={config.mood === "assign"}
                    onChange={(e) => handleFieldChange("mood", e.target.value)}
                  />
                  <Label htmlFor="mood-assign">Assign (Edit)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="mood-config"
                    name="mood"
                    value="config"
                    checked={config.mood === "config"}
                    onChange={(e) => handleFieldChange("mood", e.target.value)}
                  />
                  <Label htmlFor="mood-config">Config (Edit & Configure)</Label>
                </div>
              </fieldset>

              {/* Toggle Switches */}
              <div className="flex flex-col gap-3 pt-3 border-t">
                <ToggleSwitch
                  checked={!!config.border}
                  label="Border"
                  onChange={(checked) => handleFieldChange("border", checked)}
                />
                <ToggleSwitch
                  checked={!!config.draggable}
                  label="Draggable"
                  onChange={(checked) =>
                    handleFieldChange("draggable", checked)
                  }
                />
                <ToggleSwitch
                  checked={!!config.addable}
                  label="Addable"
                  onChange={(checked) => handleFieldChange("addable", checked)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AddParameterModal: FC<AddParameterModalProps> = ({
  isOpen,
  onClose,
  onAddParam,
}) => {
  // The form's state is managed inside the modal itself.
  const [params, setParams] = useState<AddParamValues>(INITIAL_PARAMS);

  // Reset the form when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setParams(INITIAL_PARAMS);
    }
  }, [isOpen]);

  const handleChange = (field: keyof AddParamValues, value: string) => {
    setParams((prev) => {
      const updated = { ...prev, [field]: value };
      // If className changes, reset dimension to the first available option
      if (field === "className") {
        const newDimensions = Object.keys(DimeClass[value] || {});
        updated.dimension = newDimensions.filter((k) => k !== "meta")[0] || "";
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddParam(params);
  };

  const classNameOptions = Object.keys(DimeClass).filter(
    (key) => key !== "meta"
  );
  const dimensionOptions = Object.keys(
    DimeClass[params.className] || {}
  ).filter((key) => key !== "meta");

  return (
    <Modal show={isOpen} onClose={onClose} popup className="z-[9999]">
      <ModalHeader>Add New Parameter</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Parameter Name</Label>
            </div>
            <TextInput
              id="name"
              value={params.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="className">Parameter Class</Label>
            </div>
            <Select
              id="className"
              value={params.className}
              onChange={(e) => handleChange("className", e.target.value)}
              required
            >
              {classNameOptions.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dimension">Parameter Dimension</Label>
            </div>
            <Select
              id="dimension"
              value={params.dimension}
              onChange={(e) => handleChange("dimension", e.target.value)}
              required
            >
              {dimensionOptions.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </div>
          <ModalFooter>
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Parameter</Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};
interface TabContentProps {
  mood: string;
  tab: WidgetTab;
  schema: AbsManager;
  config: WidgetConfig;
  onSchemaChange: (newSchema: AbsManager) => void;
  onAddParameter: () => void;
}
const TabContent: FC<TabContentProps> = ({
  tab,
  schema,
  config,
  onSchemaChange,
  onAddParameter,
  mood,
}) => {
  // The 'Meta' tab has unique content or no content in this view.
  if (tab === "Meta") {
    const meta: any = schema.getMeta();

    return (
      <div className="p-4 text-gray-500 w-full flex flex-col gap-2">
        {Object.keys(meta).map((key) => {
          if (!["id", "title", "version", "description"].includes(key))
            return null;
          const value = meta[key];

          const isConfigMood = config.mood === "config";

          return (
            <div key={key} className="w-full">
              <div className="border-2 w-full flex flex-col rounded-xl">
                <div className="flex items-center justify-between font-bold bg-gray-100 px-4 py-2">
                  <div
                    className={classNames({
                      "relative py-1 config-container": true,
                      "bg-gray-200 px-3 py-1 rounded-lg": isConfigMood,
                    })}
                  >
                    <span className="font-normal text-sm">{key}</span>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled={isConfigMood}
                    value={value}
                    onChange={(e) => {
                      schema.setMeta({
                        ...meta,
                        [key]: e.target.value,
                      });
                      onSchemaChange(lodash.cloneDeep(schema));
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Get the fields for the current tab from the schema, or an empty object if none exist.
  const fields = schema.NTT?.[tab] ?? {};

  // Sort the fields by their 'order' property before rendering.
  const sortedFieldKeys = Object.keys(fields)
    .filter((key) => key !== "meta")
    .sort((a, b) => (fields[a].order || 0) - (fields[b].order || 0));

  return (
    <div className="w-full flex flex-col gap-3">
      {sortedFieldKeys.map((key) => {
        const item = fields[key];
        // Dynamically get the correct widget component to render from the ParaWidget library.

        // let widget = item?.config?.widget,
        //   type = "";

        // if (widget?.includes(":")) {
        //   const [widgetName, widgetType] = widget.split(":");
        //   widget = widgetName;
        //   type = widgetType;
        // }
        // @ts-ignore - Assuming ParaWidget is an object with dynamic keys
        const ComponentToRender = ParaWidget?.[item?.config?.widget];

        if (!ComponentToRender) {
          console.warn(`Widget component "${item?.config?.widget}" not found.`);
          return null;
        }

        return (
          <div key={key} className="w-full">
            <ComponentToRender
              mood={config.mood}
              paraConfig={config}
              schema={schema}
              setSchema={onSchemaChange}
              packetId={tab}
              fieldId={key}
              fieldIndex={item.order}
              metaId={schema.NTT?.meta?.id}
              fieldClass={item?.className}
              fieldDimension={item?.dimension}
              // type={type}
              {...item}
            />
          </div>
        );
      })}

      {config.addable && mood === "dev" && (
        <Button onClick={onAddParameter} className="w-full mt-2">
          <Add className="mr-2 h-5 w-5" color="currectColor" />
          Add Parameter
        </Button>
      )}
    </div>
  );
};

// =================================================================
// --- 4. Main Orchestrator Component ---
// =================================================================

const ParaAssistance: FC<{
  iswidget?: boolean;
  mood?: string;
  schema: AbsManager;
  selectedWidget?: String | null;
  setSchema: any;
}> = ({
  iswidget = false,
  mood = "dev",
  schema,
  selectedWidget = null,
  setSchema,
}) => {
  const [activeTab, setActiveTab] = useState<WidgetTab>("Meta");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { activeSchema, config, setConfig, updateSchema } = useWidgetSchema(
    iswidget,
    schema,
    selectedWidget,
    setSchema
  );

  const handleAddParam = (paramValues: AddParamValues) => {
    if (!activeSchema) return;
    const newSchema = lodash.cloneDeep(activeSchema);
    newSchema.addField(activeTab, paramValues.name);
    newSchema.addDimension(
      activeTab,
      paramValues.name,
      paramValues.className,
      paramValues.dimension
    );
    updateSchema(newSchema);
    setIsModalOpen(false);
  };

  if (!activeSchema) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <p className="font-bold text-gray-500">
          Please select a widget to see its parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Tabs
        onActiveTabChange={(tabIndex) => setActiveTab(TABS[tabIndex])}
        variant="fullWidth"
        theme={{
          base: "flex flex-col gap-2",
          tablist: {
            base: "flex text-center",
            variant: {
              fullWidth:
                "w-full p-1 text-xs font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-xl bg-gray-200 gap-1",
            },
            tabitem: {
              base: "flex items-center justify-center p-2 rounded-t-lg text-xs first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none",
              variant: {
                fullWidth: {
                  base: "ml-0 first:ml-0 w-full rounded-xl flex",
                  active: {
                    on: "p-2 text-gray-900 bg-gray-200 active dark:bg-gray-700 dark:text-white rounded-xl",
                    off: "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl",
                  },
                },
              },
              icon: "mr-2 h-5 w-5",
            },
          },
          tabpanel: "py-3",
        }}
      >
        {TABS.map((title) => (
          <TabItem key={title} title={title} />
        ))}
      </Tabs>

      <SettingsPanel
        iswidget={iswidget}
        config={config ?? {}}
        onConfigChange={setConfig}
      />

      <div className="my-5 flex flex-col gap-2">
        <TabContent
          tab={activeTab}
          schema={activeSchema}
          config={config ?? {}}
          onSchemaChange={updateSchema}
          onAddParameter={() => setIsModalOpen(true)}
          mood={mood}
        />
      </div>

      <AddParameterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddParam={handleAddParam}
      />
    </div>
  );
};

export default ParaAssistance;
